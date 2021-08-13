import UserRankView from './view/user-rank';
import MenuView from './view/menu';
import SortPanelView from './view/sort';
import MovieListView from './view/movie-list';
import MovieCardView from './view/movie-card';
import ShowMoreView from './view/show-more-button';
import MovieStatisticsView from './view/movie-stats';
import MoviePopupView from './view/movie-popup';
import { createMovie } from './mock/movie-mock.js';
import { buttons, filmsMostCommented, filmsTopRated } from './mock/filter-mock.js';
import { FILMS_LIST_QUANTITY, FILM_BLOCK_SIZE } from './const.js';
import { renderElement, RenderPosition } from './utils/render.js';

const body = document.body;
const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footerStats = document.querySelector('.footer__statistics');
const films = new Array(FILMS_LIST_QUANTITY).fill(null).map(createMovie);

renderElement(header, new UserRankView(films).getElement(), RenderPosition.BEFOREEND);
renderElement(main, new MenuView(films).getElement(), RenderPosition.BEFOREEND);
renderElement(main, new SortPanelView(buttons).getElement(), RenderPosition.BEFOREEND);
renderElement(main, new MovieListView().getElement(), RenderPosition.BEFOREEND);

const filmsList = document.querySelector('.films-list');
const filmsListContainer = filmsList.querySelector('.films-list__container');
const filmsListTopRatedBlock = document.querySelectorAll('.films-list--extra')[0];
const filmsListTopRatedContainer = filmsListTopRatedBlock.querySelector('.films-list__container');
const filmsListMostCommentedBlock = document.querySelectorAll('.films-list--extra')[1];
const filmsListMostCommentedContainer = filmsListMostCommentedBlock.querySelector('.films-list__container');

const renderMovie = (movieList, movie) => {
  const movieComponent = new MovieCardView(movie);
  const popupComponent = new MoviePopupView(movie);

  const onPopupShow = () => {
    body.appendChild(popupComponent.getElement());
    body.classList.add('hide-overflow');
  };

  const onPopupHide = () => {
    body.removeChild(popupComponent.getElement());
    body.classList.remove('hide-overflow');
  };

  const onEscKeyDown = (e) => {
    if (e.key === 'Escape' || e.key === 'Esc') {
      onPopupHide();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  movieComponent.setClickHandler(() => {
    onPopupShow();
    document.addEventListener('keydown', onEscKeyDown);
  });

  popupComponent.setClickHandler(() => {
    onPopupHide();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  renderElement(movieList, movieComponent.getElement(), RenderPosition.BEFOREEND);
};

films.slice(0, FILM_BLOCK_SIZE).forEach((film) => renderMovie(filmsListContainer, film));

if (films.length > FILM_BLOCK_SIZE) {
  let filmsCounter = FILM_BLOCK_SIZE;
  const showMoreButtonComponent = new ShowMoreView();

  renderElement(filmsList, showMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

  showMoreButtonComponent.setClickHandler(() => {
    if (filmsCounter < films.length) {
      films.slice(filmsCounter, filmsCounter + FILM_BLOCK_SIZE).forEach((film) => renderMovie(filmsListContainer, film));
      filmsCounter += FILM_BLOCK_SIZE;
    } else {
      showMoreButtonComponent.getElement().remove();
      showMoreButtonComponent.removeElement();
    }
  });
}

filmsTopRated(films).forEach((film) => renderMovie(filmsListTopRatedContainer, film));
filmsMostCommented(films).forEach((film) => renderMovie(filmsListMostCommentedContainer, film));
renderElement(footerStats, new MovieStatistics(films).getElement(), RenderPosition.BEFOREEND);

export {films};
