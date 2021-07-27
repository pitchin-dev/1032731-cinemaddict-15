import { createUserRankTemplate } from './view/user-rank';

const header = document.querySelector('.header');

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
}

render(header, createUserRankTemplate(), 'beforeend');
