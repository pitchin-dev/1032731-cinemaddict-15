import MovieCard from './movie-card';
import UserRankView from '../view/user-rank';
import MenuView from '../view/menu';
import SortPanelView from '../view/sort';
import MovieListMainView from '../view/movie-list-main';
import MovieListBlockMainView from '../view/movie-list-block-main';
import MovieListBlockExtraView from '../view/movie-list-block-extra';
import ShowMoreView from '../view/show-more-button';
import EmptyMovieList from '../view/movie-list-block-empty';
import { renderElement, RenderPosition, removeComponent } from '../utils/render';
import { updateItem } from '../utils/utils';
import { FILM_BLOCK_SIZE, LIST_TYPES, SORT_TYPES } from '../const';
import MovieStatisticsView from '../view/movie-stats';

export default class MovieList {
  constructor (headerContainer, mainContainer, movieModel, buttons) {
    this._headerContainer = headerContainer;
    this._mainContainer = mainContainer;
    this._movieModel = movieModel;

    this._movies = this._getMovies();
    this._moviesByDefault = this._getMovies();
    this._buttons = buttons;

    this._sortComponent = new SortPanelView(this._buttons);
    this._showMoreButtonComponent = new ShowMoreView();

    this._filmsCounter = FILM_BLOCK_SIZE;
    this._currentSortType = SORT_TYPES.DEFAULT;
    this._movieListPresenterMain = new Map();
    this._movieListPresenterRated = new Map();
    this._movieListPresenterCommented = new Map();

    this._renderShowMoreButton = this._renderShowMoreButton.bind(this);
    this._handleMainMovieChange = this._handleMainMovieChange.bind(this);
    this._handleRatedMovieChange = this._handleRatedMovieChange.bind(this);
    this._handleCommentedMovieChange = this._handleCommentedMovieChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init() {
    this._renderMainElements();
    this._renderSort();
    this._renderMovieList();
    this._renderMovieCardsMain();
    this._renderMovieCardsExtra();
    this._renderShowMoreButton();
    this._renderFooterStatistics();
  }

  _getMovies() {
    return this._movieModel.getMovies();
  }

  _handleMainMovieChange(updatedMovie) {
    this._movies = updateItem(this._movies, updatedMovie);
    this._sourcedBoardTasks = updateItem(this._moviesByDefault, updatedMovie);
    this._movieListPresenterMain.get(updatedMovie.id).init(updatedMovie);
  }

  _handleRatedMovieChange(updatedMovie) {
    this._movies = updateItem(this._movies, updatedMovie);
    this._sourcedBoardTasks = updateItem(this._moviesByDefault, updatedMovie);
    this._movieListPresenterRated.get(updatedMovie.id).init(updatedMovie);
  }

  _handleCommentedMovieChange(updatedMovie) {
    this._movies = updateItem(this._movies, updatedMovie);
    this._sourcedBoardTasks = updateItem(this._moviesByDefault, updatedMovie);
    this._movieListPresenterCommented.get(updatedMovie.id).init(updatedMovie);
  }

  _sortMovies(sortType) {
    switch (sortType) {
      case SORT_TYPES.RATING:
        this._movies.sort((a, b) => b.rating - a.rating);
        break;
      case SORT_TYPES.DATE:
        this._movies.sort((a, b) => b.year - a.year);
        break;
      default:
        this._movies = this._moviesByDefault.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortMovies(sortType);
    this._clearMovieList();
    this._renderMovieCardsMain();
    this._renderShowMoreButton();
  }

  _renderMainElements() {
    renderElement(this._headerContainer, new UserRankView(this._movies).getElement(), RenderPosition.BEFOREEND);
    renderElement(this._mainContainer, new MenuView(this._movies).getElement(), RenderPosition.BEFOREEND);
  }

  _renderSort() {
    renderElement(this._mainContainer, this._sortComponent.getElement(), RenderPosition.BEFOREEND);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderMovieListBlockMain() {
    this._movieListMainComponent = new MovieListMainView().getElement();
    this._movieListBlockMainComponent = new MovieListBlockMainView().getElement();
    this._movieListBlockMainContainer = this._movieListBlockMainComponent.querySelector('.films-list__container');

    renderElement(this._mainContainer, this._movieListMainComponent, RenderPosition.BEFOREEND);

    if (!this._movies.length) {
      this._renderEmptyMovieList();
      return;
    }

    renderElement(this._movieListMainComponent, this._movieListBlockMainComponent, RenderPosition.BEFOREEND);
  }

  _renderMovieListBlockExtra() {
    this._movieListBlockTopRatedComponent = new MovieListBlockExtraView(LIST_TYPES.topRated).getElement();
    this._movieListBlockMostCommentedComponent = new MovieListBlockExtraView(LIST_TYPES.mostCommented).getElement();
    this._movieListBlockTopRatedContainer = this._movieListBlockTopRatedComponent.querySelector('.films-list__container');
    this._movieListBlockMostCommentedContainer = this._movieListBlockMostCommentedComponent.querySelector('.films-list__container');

    if(this._movies.length) {
      renderElement(this._movieListMainComponent, this._movieListBlockTopRatedComponent, RenderPosition.BEFOREEND);
      renderElement(this._movieListMainComponent, this._movieListBlockMostCommentedComponent, RenderPosition.BEFOREEND);
    }
  }

  _renderMovieCardMain(container, movie) {
    const card = new MovieCard(container, this._handleMainMovieChange);
    this._movieListPresenterMain.set(movie.id, card);
    card.init(movie);
  }

  _renderMovieCardRated(container, movie) {
    const card = new MovieCard(container, this._handleRatedMovieChange);
    this._movieListPresenterRated.set(movie.id, card);
    card.init(movie);
  }

  _renderMovieCardCommented(container, movie) {
    const card = new MovieCard(container, this._handleCommentedMovieChange);
    this._movieListPresenterCommented.set(movie.id, card);
    card.init(movie);
  }

  _renderMovieCardsMain() {
    this._movies.slice(0, FILM_BLOCK_SIZE).forEach((movie) => this._renderMovieCardMain(this._movieListBlockMainContainer, movie));
  }

  _renderMovieCardsExtra() {
    this._moviesMostCommented = this._movies.sort((a, b) => b.comments.length - a.comments.length).slice(0, 2);
    this._moviesTopRated = this._movies.sort((a, b) => b.rating - a.rating).slice(0, 2);

    this._moviesTopRated.forEach((movie) => this._renderMovieCardRated(this._movieListBlockTopRatedContainer, movie));
    this._moviesMostCommented.forEach((movie) => this._renderMovieCardCommented(this._movieListBlockMostCommentedContainer, movie));
  }

  _clearMovieList() {
    this._movieListPresenterMain.forEach((presenter) => presenter.destroy());
    this._movieListPresenterMain.clear();
    this._filmsCounter = FILM_BLOCK_SIZE;
    removeComponent(this._showMoreButtonComponent);
  }

  _renderShowMoreButton() {
    if (this._movies.length > this._filmsCounter) {
      renderElement(this._movieListBlockMainComponent, this._showMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

      this._showMoreButtonComponent.setClickHandler(() => {
        if (this._filmsCounter < this._movies.length) {
          this._movies.slice(this._filmsCounter, this._filmsCounter + FILM_BLOCK_SIZE).forEach((movie) => this._renderMovieCardMain(this._movieListBlockMainContainer, movie));
          this._filmsCounter += FILM_BLOCK_SIZE;
        } else {
          removeComponent(this._showMoreButtonComponent);
        }
      });
    }
  }

  _renderFooterStatistics() {
    const footerStats = document.querySelector('.footer__statistics');
    renderElement(footerStats, new MovieStatisticsView(this._movies).getElement(), RenderPosition.BEFOREEND);
  }

  _renderEmptyMovieList() {
    this._emptyMovieList = new EmptyMovieList('ALL').getElement();
    renderElement(this._movieListMainComponent, this._emptyMovieList, RenderPosition.AFTERBEGIN);
  }

  _renderMovieList() {
    this._renderMovieListBlockMain();
    this._renderMovieListBlockExtra();
  }
}
