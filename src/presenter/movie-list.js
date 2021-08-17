import MovieCard from './movie-card';
import UserRankView from '../view/user-rank';
import MenuView from '../view/menu';
import SortPanelView from '../view/sort';
import MovieListMainView from '../view/movie-list-main';
import MovieListBlockMainView from '../view/movie-list-block-main';
import MovieListBlockExtraView from '../view/movie-list-block-extra';
import ShowMoreView from '../view/show-more-button';
import NoMovieList from '../view/movie-list-block-empty';
import { renderElement, RenderPosition, removeComponent } from '../utils/render';
import { FILM_BLOCK_SIZE, LIST_TYPES } from '../const';

export default class MovieList {
  constructor (headerContainer, mainContainer) {
    this._headerContainer = headerContainer;
    this._mainContainer = mainContainer;
    this._filmsCounter = FILM_BLOCK_SIZE;

    this._showMoreMovies = this._showMoreMovies.bind(this);
  }

  init(movies, buttons) {
    this._movies = movies;
    this._moviesMostCommented = this._movies.slice().sort((a, b) => b.comments.length - a.comments.length).slice(0, 2);
    this._moviesTopRated = this._movies.slice().sort((a, b) => b.rating - a.rating).slice(0, 2);
    this._buttons = buttons;

    this._renderMainElements();
    this._renderMovieList();
    this._renderMovieCards();
    this._showMoreMovies();
  }

  _renderMainElements() {
    renderElement(this._headerContainer, new UserRankView(this._movies).getElement(), RenderPosition.BEFOREEND);
    renderElement(this._mainContainer, new MenuView(this._movies).getElement(), RenderPosition.BEFOREEND);
    renderElement(this._mainContainer, new SortPanelView(this._buttons).getElement(), RenderPosition.BEFOREEND);
  }

  _renderMovieListBlockMain() {
    this._movieListMainComponent = new MovieListMainView().getElement();
    this._movieListBlockMainComponent = new MovieListBlockMainView().getElement();
    this._movieListBlockMainContainer = this._movieListBlockMainComponent.querySelector('.films-list__container');

    renderElement(this._mainContainer, this._movieListMainComponent, RenderPosition.BEFOREEND);

    if (!this._movies.length) {
      this._renderNoMovieList();
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

  _renderMovieCard(container, movie) {
    this._card = new MovieCard(container);
    this._card.init(movie);
  }

  _renderMovieCards() {
    this._movies.slice(0, FILM_BLOCK_SIZE).forEach((movie) => this._renderMovieCard(this._movieListBlockMainContainer, movie));
    this._moviesTopRated.forEach((movie) => this._renderMovieCard(this._movieListBlockTopRatedContainer, movie));
    this._moviesMostCommented.forEach((movie) => this._renderMovieCard(this._movieListBlockMostCommentedContainer, movie));
  }

  _showMoreMovies() {
    if (this._movies.length > this._filmsCounter) {
      this._showMoreButtonComponent = new ShowMoreView();

      renderElement(this._movieListBlockMainComponent, this._showMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

      this._showMoreButtonComponent.setClickHandler(() => {
        if (this._filmsCounter < this._movies.length) {
          this._movies.slice(this._filmsCounter, this._filmsCounter + FILM_BLOCK_SIZE).forEach((movie) => this._renderMovieCard(this._movieListBlockMainContainer, movie));
          this._filmsCounter += FILM_BLOCK_SIZE;
        } else {
          removeComponent(this._showMoreButtonComponent);
        }
      });
    }
  }

  _renderNoMovieList() {
    this._noMovieList = new NoMovieList('ALL').getElement();
    renderElement(this._movieListMainComponent, this._noMovieList, RenderPosition.AFTERBEGIN);
  }

  _renderMovieList() {
    if (!this._movies.length) {
      this._renderNoMovieList();
      return false;
    }

    this._renderMovieListBlockMain();
    this._renderMovieListBlockExtra();
  }
}
