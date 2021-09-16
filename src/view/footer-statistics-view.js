import AbstractView from './abstract-view';
import {REGEXP_ALL_MOVIES_COUNT} from '../const';

const createFooterStatisticsTemplate = (moviesCount) => `<p>${moviesCount.toString().replace(REGEXP_ALL_MOVIES_COUNT, ' ')} movies inside</p>`;

export default class FooterStatisticView extends AbstractView {
  constructor(moviesCount = 0) {
    super();
    this._filmsCount = moviesCount;
  }

  getTemplate() {
    return createFooterStatisticsTemplate(this._moviesCount);
  }
}
