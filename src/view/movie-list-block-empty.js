import AbstractView from './abstract.js';

const EmptyMessage = {
  ALL: 'There are no movies in our database',
  WATCH_LIST: 'There are no movies to watch now',
  HISTORY: 'There are no watched movies now',
  FAVORITE: 'There are no favorite movies now',
};

const createNoMovieList = (filter) => (`<h2 class="films-list__title">${EmptyMessage[filter]}</h2>`);

export default class EmptyMovieList extends AbstractView{
  constructor(filter) {
    super();
    this._filter = filter;
  }

  getTemplate() {
    return createNoMovieList(this._filter);
  }
}
