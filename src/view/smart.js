import AbstractView from './abstract';

export default class SmartView extends AbstractView {
  constructor () {
    super();
    this._data = {};
  }

  _restoreHandlers() {
    throw new Error('Cannot initialize this method by the abstract class: restoreHandlers');
  }

  updateElement() {
    const prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();
    parent.replaceChild(newElement, prevElement);

    this._restoreHandlers();
  }

  updateData(update, noRerender) {
    if (!update) {
      return;
    }

    this._data = Object.assign(
      {},
      this._data,
      update,
    );

    if (noRerender) {
      return;
    }

    this.updateElement();
  }
}
