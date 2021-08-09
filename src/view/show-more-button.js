import AbstractView from './abstract';

const createShowMoreButtonTemplate = () => (
  `<button class="films-list__show-more">
    Show more
  </button>`
);

export default class ShowMore extends AbstractView {
  constructor() {
    super();
  }

  getTemplate() {
    return createShowMoreButtonTemplate();
  }
}
