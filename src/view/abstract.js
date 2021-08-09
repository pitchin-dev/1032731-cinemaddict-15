import { createElement } from '../utils/utils';

export default class AbstractView {
  constructor () {
    if (new.target === AbstractView) {
      throw new Error('Can\'t instantiate Abstract, only concrete one.');
    }

    this._element = null;
  }

  getTemplate() {
    throw new Error('Cannot initialize this method by the abstract class');
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
