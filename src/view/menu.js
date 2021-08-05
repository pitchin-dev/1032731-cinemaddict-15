import { createElement } from "../utils/utils";

const createMenuTemplate = (movies) => {
  const watchlistCount = movies.filter((item) => item.isInWatchlist).length;
  const watchedCount = movies.filter((item) => item.isWatched).length;
  const favoriteCount = movies.filter((item) => item.isFavorite).length;
  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${watchlistCount}</span></a>
        <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${watchedCount}</span></a>
        <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${favoriteCount}</span></a>
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class Menu {
  constructor(movies) {
    this._movies = movies;
    this._element = null;
  }

  getTemplate() {
    return createMenuTemplate(this._movies);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
