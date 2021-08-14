import AbstractView from './abstract';

const createMovieListTemplate = () => (
  `<section class="films">

  </section>`
);

export default class MovieListMainView extends AbstractView {
  constructor() {
    super();
  }

  getTemplate() {
    return createMovieListTemplate();
  }
}
