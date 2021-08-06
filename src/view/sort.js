import { createElement } from '../utils/utils';

const createSortTemplate = ({byDefault, byDate, byRating}) => (
  `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active">${byDefault}</a></li>
    <li><a href="#" class="sort__button">${byDate}</a></li>
    <li><a href="#" class="sort__button">${byRating}</a></li>
  </ul>`
);

export default class SortPanel {
  constructor(buttons) {
    this._buttons = buttons;
    this._element = null;
  }

  getTemplate() {
    return createSortTemplate(this._buttons);
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
