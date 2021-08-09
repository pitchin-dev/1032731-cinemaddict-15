import UserRank from './view/user-rank';
import Menu from './view/menu';
import SortPanel from './view/sort';
import MovieList from './view/movie-list';
import MovieCard from './view/movie-card';
import ShowMore from './view/show-more-button';
import MovieStatistics from './view/movie-stats';
import MoviePopup from './view/movie-popup';
import { createMovie } from './mock/movie-mock.js';
import { buttons, filmsMostCommented, filmsTopRated } from './mock/filter-mock.js';
import { FILMS_LIST_QUANTITY, FILM_BLOCK_SIZE } from './const.js';
import { renderElement, RenderPosition } from './utils/render.js';

const body = document.body;
const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footerStats = document.querySelector('.footer__statistics');
const films = new Array(FILMS_LIST_QUANTITY).fill(null).map(createMovie);

renderElement(header, new UserRank(films).getElement(), RenderPosition.BEFOREEND);
renderElement(main, new Menu(films).getElement(), RenderPosition.BEFOREEND);
renderElement(main, new SortPanel(buttons).getElement(), RenderPosition.BEFOREEND);
renderElement(main, new MovieList().getElement(), RenderPosition.BEFOREEND);

const filmsList = document.querySelector('.films-list');
const filmsListContainer = filmsList.querySelector('.films-list__container');
const filmsListTopRatedBlock = document.querySelectorAll('.films-list--extra')[0];
const filmsListTopRatedContainer = filmsListTopRatedBlock.querySelector('.films-list__container');
const filmsListMostCommentedBlock = document.querySelectorAll('.films-list--extra')[1];
const filmsListMostCommentedContainer = filmsListMostCommentedBlock.querySelector('.films-list__container');

const renderMovie = (movieList, movie) => {
  const movieComponent = new MovieCard(movie);
  const popupComponent = new MoviePopup(movie);

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

  movieComponent.getElement().querySelector('.film-card__poster').addEventListener('click', () => {
    onPopupShow();
    document.addEventListener('keydown', onEscKeyDown);
  });

  popupComponent.getElement().querySelector('.film-details__close-btn').addEventListener('click', () => {
    onPopupHide();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  renderElement(movieList, movieComponent.getElement(), RenderPosition.BEFOREEND);
};

films.slice(0, FILM_BLOCK_SIZE).forEach((film) => renderMovie(filmsListContainer, film));

if (films.length > FILM_BLOCK_SIZE) {
  let filmsCounter = FILM_BLOCK_SIZE;
  const showMoreButtonComponent = new ShowMore();

  renderElement(filmsList, showMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

  const showMoreButton = document.querySelector('.films-list__show-more');

  showMoreButton.addEventListener('click', () => {
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
