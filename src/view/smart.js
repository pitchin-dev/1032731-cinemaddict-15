import { replaceComponent } from '../utils/render';
import AbstractView from './abstract';

export default class SmartView extends AbstractView {
  constructor () {
    super();
  }

  restoreHandlers() {
    throw new Error('Cannot initialize this method by the abstract class: restoreHandlers');
  }

  _updateElement() {
    const prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();
    parent.replaceComponent(newElement, prevElement);

    this.restoreHandlers();
  }
}
