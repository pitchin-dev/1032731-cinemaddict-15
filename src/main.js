import Api from './api.js';
import ProfileModel from './model/profile-model';
import FilterModel from './model/filter-model';
import MoviesModel from './model/movies-model';
import CommentsModel from './model/comments-model';
import ProfilePresenter from './presenter/profile-presenter';
import FilterPresenter from './presenter/filter-presenter';
import MoviesPresenter from './presenter/movies-presenter';
import NavigationView from './view/navigation-view';
import StatisticView from './view/statistics-view';
import FooterStatisticView from './view/footer-statistics-view';
import {remove, render} from './utils/dom-utils';
import {RenderPlace, UpdateType} from './types';
import {END_POINT, AUTHORIZATION} from './const';

const headerContainer = document.querySelector('.header');
const mainContainer = document.querySelector('.main');
const footerContainer = document.querySelector('.footer');
const footerStatisticContainer = footerContainer.querySelector('.footer__statistics');

const api = new Api(END_POINT, AUTHORIZATION);
const profileModel = new ProfileModel();
const filterModel = new FilterModel();
const moviesModel = new MoviesModel();
const commentsModel = new CommentsModel();

const navigationComponent = new NavigationView();
const footerStatisticComponent = new FooterStatisticView();

const profilePresenter = new ProfilePresenter(headerContainer, profileModel, moviesModel);
const filterPresenter = new FilterPresenter(navigationComponent, filterModel, moviesModel);
const moviesPresenter = new MoviesPresenter(mainContainer, moviesModel, commentsModel, filterModel, api);

let isPrevTarget = false;
let statisticComponent = null;

const handleNavigationClick = (isStatsTarget) => {
  if (isPrevTarget === isStatsTarget) {
    return;
  }

  isPrevTarget = isStatsTarget;

  if (isStatsTarget) {
    moviesPresenter.destroy();
    filterModel.setState(UpdateType.MAJOR, !isStatsTarget);
    statisticComponent = new StatisticView(profileModel.getRank(), moviesModel.getMovies());
    render(mainContainer, statisticComponent, RenderPlace.BEFORE_END);
    return;
  }

  remove(statisticComponent);
  moviesPresenter.destroy();
  filterModel.setState(UpdateType.MAJOR, !isStatsTarget);
  moviesPresenter.init();
};

profilePresenter.init();
render(mainContainer, navigationComponent, RenderPlace.AFTER_BEGIN);
navigationComponent.setNavigationClickHandler(handleNavigationClick);
filterPresenter.init();
moviesPresenter.init();
render(footerStatisticContainer, footerStatisticComponent);

api.getMovies()
  .then((movies) => moviesModel.setMovies(UpdateType.INIT, movies))
  .then(() => {
    remove(footerStatisticComponent);
    render(footerStatisticContainer, new FooterStatisticView(moviesModel.getMovies().length));
  })
  .catch(() => moviesModel.setMovies(UpdateType.INIT, []));
