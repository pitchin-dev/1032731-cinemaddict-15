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
import { FILMS_LIST_QUANTITY, FILMS_LIST_EXTRA_QUANTITY, FILM_BLOCK_SIZE } from './const.js';
import { renderElement, RenderPosition } from './utils/utils.js';

const body = document.body;
const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footerStats = document.querySelector('.footer__statistics');
const films = [];

for (let i = 0; i < FILMS_LIST_QUANTITY; i++) {
  films.push(createMovie());
}

renderElement(header, new UserRank(films).getElement(), RenderPosition.BEFOREEND);
renderElement(main, new Menu(films).getElement(), RenderPosition.BEFOREEND);
renderElement(main, new SortPanel(buttons).getElement(), RenderPosition.BEFOREEND);
renderElement(main, new MovieList().getElement(), RenderPosition.BEFOREEND);

const filmsList = document.querySelector('.films-list');
const filmsListContainer = filmsList.querySelector('.films-list__container');
const filmsListTopRated = document.querySelectorAll('.films-list--extra')[0];
const filmsListTopRatedContainer = filmsListTopRated.querySelector('.films-list__container');
const filmsListMostCommented = document.querySelectorAll('.films-list--extra')[1];
const filmsListMostCommentedContainer = filmsListMostCommented.querySelector('.films-list__container');


for (let i = 0; i < FILM_BLOCK_SIZE; i++) {
  renderElement(filmsListContainer, new MovieCard(films[i]).getElement(), RenderPosition.BEFOREEND);
}

if (films.length > FILM_BLOCK_SIZE) {
  let filmsCounter = FILM_BLOCK_SIZE;

  renderElement(filmsList, new ShowMore().getElement(), RenderPosition.BEFOREEND);

  const showMoreButton = document.querySelector('.films-list__show-more');

  showMoreButton.addEventListener('click', () => {
    if (filmsCounter < films.length) {
      for (let i = filmsCounter; i < filmsCounter + FILM_BLOCK_SIZE; i++) {
        renderElement(filmsListContainer, new MovieCard(films[i]).getElement(), RenderPosition.BEFOREEND);
      }
      filmsCounter += FILM_BLOCK_SIZE;
    } else {
      showMoreButton.style.display = 'none';
    }
  });
}

for (let i = 0; i < FILMS_LIST_EXTRA_QUANTITY; i++) {
  renderElement(filmsListTopRatedContainer, new MovieCard(filmsTopRated(films)[i]).getElement(), RenderPosition.BEFOREEND);
}

for (let i = 0; i < FILMS_LIST_EXTRA_QUANTITY; i++) {
  renderElement(filmsListMostCommentedContainer, new MovieCard(filmsMostCommented(films)[i]).getElement(), RenderPosition.BEFOREEND);
}

renderElement(footerStats, new MovieStatistics(films).getElement(), RenderPosition.BEFOREEND);
renderElement(body, new MoviePopup(films[0]).getElement(), RenderPosition.BEFOREEND);

export {films};
