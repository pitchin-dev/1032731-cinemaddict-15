import SortView from '../view/sort-view';
import MoviesView from '../view/movies-view';
import MoviesExtraView from '../view/movies-extra-view';
import ShowMoreButtonView from '../view/show-more-button-view';
import MoviePresenter from './movie-presenter';
import MovieDetailsPresenter from './movie-details-presenter';
import {render, remove} from '../utils/dom-utils';
import {applyCamelCase} from '../utils/text-formatting-utils';
import {RenderPlace, FilterType, SortType, ExtraList, UserAction, UpdateType} from '../types';
import {MOVIES_COUNT_PER_STEP, MOVIES_EXTRA_COUNT} from '../const';

export default class MoviesPresenter {
  constructor(mainContainer, moviesModel, commentsModel, filterModel) {
    this._mainContainer = mainContainer;
    this._moviesModel = moviesModel;
    this._commentsModel = commentsModel;
    this._filterModel = filterModel;

    this._moviesCountToRender = MOVIES_COUNT_PER_STEP;
    this._currentSortType = SortType.DEFAULT.name;

    this._moviePresenters = new Map();
    this._movieTopRatedPresenters = new Map();
    this._movieMostCommentedPresenters = new Map();
    this._moviesExtraComponents = new Map();

    this._sortComponent = null;
    this._showMoreButtonComponent = null;
    this._movieDetailsPresenter = null;

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleMovieDetailsOpen = this._handleMovieDetailsOpen.bind(this);
    this._handleMovieDetailsClose = this._handleMovieDetailsClose.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
  }

  init() {
    this._moviesModel.addObserver(this._handleModelEvent);
    this._commentsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._moviesComponent = new MoviesView(this._getMovies().length, FilterType[this._filterModel.getFilter().toUpperCase()].title);
    this._movieListContainerElement = this._moviesComponent.getElement().querySelector('.films-list__container');

    this._renderMoviesContainer();
    this._renderMoviesBoard();
    this._renderMoviesExtra();
  }

  destroy() {
    this._clearFilmsExtra();
    this._clearFilmsBoard();
    this._clearFilmsContainer();

    this._filmDetailsPresenter && this._filmDetailsPresenter.destroy();
    this._currentSortType = SortType.DEFAULT.name;

    this._filmsModel.removeObserver(this._handleModelEvent);
    this._commentsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  _getMovies() {
    const movies = this._moviesModel.getMovies();
    const currentFilterType = this._filterModel.getFilter();
    const currentSortType = SortType[this._currentSortType.toUpperCase()];
    const filteredMovies = (FilterType[currentFilterType.toUpperCase()] === FilterType.ALL)
      ? movies
      : movies.filter((movie) => FilterType[currentFilterType.toUpperCase()].getProperty(movie));

    return (currentSortType === SortType.DEFAULT)
      ? filteredMovies
      : filteredMovies.slice().sort((first, second) => currentSortType.getProperty(second) - currentSortType.getProperty(first));
  }

  _renderMoviesContainer() {
    render(this._mainContainer, this._moviesComponent);
  }

  _clearMoviesContainer() {
    remove(this._moviesComponent);
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._moviesComponent, this._sortComponent, RenderPlace.BEFORE_BEGIN);
  }

  _renderMovie(movieListContainer, movie, type) {
    const moviePresenter = new MoviePresenter(movieListContainer, this._handleMovieDetailsOpen, this._handleViewAction);
    moviePresenter.init(movie);
    this[`_movie${(type) ? applyCamelCase(type) : ''}Presenters`].set(movie.id, moviePresenter);
  }

  _renderMovies(movies) {
    movies.forEach((movie) => this._renderMovie(this._movieListContainerElement, movie));
  }

  _renderShowMoreButton() {
    if (this._showMoreButtonComponent !== null) {
      this._showMoreButtonComponent = null;
    }

    this._showMoreButtonComponent = new ShowMoreButtonView();
    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);

    render(this._movieListContainerElement, this._showMoreButtonComponent, RenderPlace.AFTER_END);
  }

  _renderMoviesBoard() {
    const movies = this._getMovies();
    const moviesCount = movies.length;

    if (moviesCount === 0) {
      return;
    }

    this._renderSort();
    this._renderMovies(movies.slice(0, Math.min(moviesCount, this._moviesCountToRender)));

    if (moviesCount > this._moviesCountToRender) {
      this._renderShowMoreButton();
    }
  }

  _clearMoviesBoard({isMoviesCountReset = false, isSortTypeReset = false} = {}) {
    this._moviePresenters.forEach((presenter) => presenter.destroy());
    this._moviePresenters.clear();

    remove(this._sortComponent);
    remove(this._showMoreButtonComponent);

    if (this._getMovies().length) {
      this._moviesCountToRender = MOVIES_COUNT_PER_STEP;
    }

    isMoviesCountReset
      ? this._moviesCountToRender = MOVIES_COUNT_PER_STEP
      : this._moviesCountToRender = Math.min(this._getMovies().length, this._moviesCountToRender);

    if (isSortTypeReset) {
      this._currentSortType = SortType.DEFAULT.name;
    }
  }

  _renderMoviesExtra() {
    Object
      .entries(ExtraList)
      .forEach(([, {title, getProperty}]) => {
        const sortedMovies = this._moviesModel.getMovies()
          .filter((movie) => getProperty(movie) > 0)
          .sort((first, second) => getProperty(second) - getProperty(first))
          .slice(0, MOVIES_EXTRA_COUNT);

        if (sortedMovies.length) {
          const newMoviesExtraComponent = new MoviesExtraView(title);
          const movieListContainerElement = newMoviesExtraComponent.getElement().querySelector('.films-list__container');

          render(this._moviesComponent, newMoviesExtraComponent);
          sortedMovies.map((sortedMovie) => this._renderMovie(movieListContainerElement, sortedMovie, title));
          this._moviesExtraComponents.set(`movie${applyCamelCase(title)}Components`, newMoviesExtraComponent);
        }
      });
  }

  _clearMoviesExtra() {
    this._moviesExtraComponents.forEach((component) => remove(component));
    this._moviesExtraComponents.clear();
    this._movieTopRatedPresenters.clear();
    this._movieMostCommentedPresenters.clear();
  }

  _updateAllMovies(updatedMovie) {
    [].concat(
      this._moviePresenters.get(updatedMovie.id),
      this._movieTopRatedPresenters.get(updatedMovie.id),
      this._movieMostCommentedPresenters.get(updatedMovie.id),
    ).forEach((presenter) => presenter && presenter.init(updatedMovie));
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._moviesCountToRender = MOVIES_COUNT_PER_STEP;
    this._currentSortType = sortType;
    this._clearMoviesBoard();
    this._renderMoviesBoard();
  }

  _handleShowMoreButtonClick() {
    const moviesCount = this._getMovies().length;
    const newMoviesCountToRender = Math.min(moviesCount, this._moviesCountToRender + MOVIES_COUNT_PER_STEP);
    const movies = this._getMovies().slice(this._moviesCountToRender, newMoviesCountToRender);

    this._renderMovies(movies);
    this._moviesCountToRender = newMoviesCountToRender;

    if (this._moviesCountToRender >= moviesCount) {
      remove(this._showMoreButtonComponent);
    }
  }

  _handleMovieDetailsOpen(movie) {
    if (this._movieDetailsPresenter && this._movieDetailsPresenter.movieId === movie.id) {
      return;
    }

    if (this._movieDetailsPresenter) {
      this._movieDetailsPresenter.destroy();
    }

    this._movieDetailsPresenter = new MovieDetailsPresenter(this._commentsModel, this._handleMovieDetailsClose, this._handleViewAction);
    this._movieDetailsPresenter.init(movie);
  }

  _handleMovieDetailsClose() {
    this._movieDetailsPresenter = null;
  }

  _handleViewAction(actionType, updateType, update, updatedMovie) {
    switch (actionType) {
      case UserAction.UPDATE_MOVIE:
        this._moviesModel.updateMovie(updateType, update);
        break;
      case UserAction.ADD_COMMENT:
        this._commentsModel.addComment(updateType, update, updatedMovie);
        break;
      case UserAction.DELETE_COMMENT:
        this._commentsModel.deleteComment(updateType, update, updatedMovie);
        break;
      case UserAction.UPDATE_LOCAL_COMMENT:
        this._commentsModel.updateLocalComment(update);
        break;
      case UserAction.RESET_LOCAL_COMMENT:
        this._commentsModel.resetLocalComments();
        break;
    }
  }

  _handleModelEvent(updateType, updatedMovie) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._updateAllMovies(updatedMovie);
        this._clearMoviesExtra();
        this._renderMoviesExtra();

        if (this._movieDetailsPresenter && this._movieDetailsPresenter.movieId === updatedMovie.id) {
          this._movieDetailsPresenter.init(updatedMovie);
        }
        break;
      case UpdateType.MINOR:
        this._clearMoviesContainer();
        this._clearMoviesBoard();
        this._clearMoviesExtra();
        this.init();

        if (this._movieDetailsPresenter && this._movieDetailsPresenter.movieId === updatedMovie.id) {
          this._movieDetailsPresenter.init(updatedMovie);
        }
        break;
      case UpdateType.MAJOR:
        this._clearMoviesContainer();
        this._clearMoviesBoard({isMoviesCountReset: true, isSortTypeReset: true});
        this._clearMoviesExtra();
        this.init();

        if (this._movieDetailsPresenter && this._movieDetailsPresenter.movieId === updatedMovie.id) {
          this._movieDetailsPresenter.init(updatedMovie);
        }
        break;
    }
  }
}
