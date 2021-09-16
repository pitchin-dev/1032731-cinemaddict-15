import AbstractView from './abstract-view';
import {REGEXP_ALL_MOVIES_COUNT} from '../const';

const createStatisticsTemplate = (moviesCount) => `<p>${moviesCount.toString().replace(REGEXP_ALL_MOVIES_COUNT, ' ')} movies inside</p>`;

export default class StatisticsView extends AbstractView {
  constructor(moviesCount) {
    super();
    this._moviesCount = moviesCount;
  }

  getTemplate() {
    return createStatisticsTemplate(this._moviesCount);
  }
}
