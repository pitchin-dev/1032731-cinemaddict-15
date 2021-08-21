import AbstractView from './abstract';
import { SORT_TYPES } from '../const';

const createSortTemplate = ({byDefault, byDate, byRating}) => (
  `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active" data-sort-type=${SORT_TYPES.DEFAULT}>${byDefault}</a></li>
    <li><a href="#" class="sort__button" data-sort-type=${SORT_TYPES.DATE}>${byDate}</a></li>
    <li><a href="#" class="sort__button" data-sort-type=${SORT_TYPES.RATING}>${byRating}</a></li>
  </ul>`
);

export default class SortPanelView extends AbstractView {
  constructor(buttons) {
    super();
    this._buttons = buttons;
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSortTemplate(this._buttons);
  }

  _sortTypeChangeHandler(e) {
    if (e.target.tagName !== 'A') {
      return;
    }

    e.preventDefault();
    this._callback.sortTypeChange(e.target.dataset.sortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener('click', this._sortTypeChangeHandler);
  }
}
