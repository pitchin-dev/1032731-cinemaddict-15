import {generateMovie} from './mock/movie';
import {generateComment} from './mock/comment';
import ProfileModel from './model/profile-model';
import FilterModel from './model/filter-model';
import MoviesModel from './model/movies-model';
import CommentsModel from './model/comments-model';
import ProfilePresenter from './presenter/profile-presenter';
import FilterPresenter from './presenter/filter-presenter';
import MoviesPresenter from './presenter/movies-presenter';
import StatisticsView from './view/statistics-view';
import {render} from './utils/dom-utils';
import {MOVIES_COUNT} from './const';

const headerElement = document.querySelector('.header');
const mainElement = document.querySelector('.main');
const footerElement = document.querySelector('.footer');
const statisticsElement = footerElement.querySelector('.footer__statistics');

const movies = new Array(MOVIES_COUNT).fill(null).map((_, index) => generateMovie(index));
const allComments = movies.map((movie) => movie.comments.map((id) => generateComment(id)));

const profileModel = new ProfileModel();
const filterModel = new FilterModel();
const moviesModel = new MoviesModel();
const commentsModel = new CommentsModel();

const profilePresenter = new ProfilePresenter(headerElement, profileModel, moviesModel);
const filterPresenter = new FilterPresenter(mainElement, filterModel, moviesModel);
const moviesPresenter = new MoviesPresenter(mainElement, moviesModel, commentsModel, filterModel);

moviesModel.setMovies(movies);
commentsModel.setAllComments(allComments);

profilePresenter.init();
filterPresenter.init();
moviesPresenter.init();
render(statisticsElement, new StatisticsView(movies.length));
