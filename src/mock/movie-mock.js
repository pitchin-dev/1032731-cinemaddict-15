import dayjs from 'dayjs';
import { getRandomFloat, getRandomInteger } from '../utils/utils.js';
import { STAFF_MIN, STAFF_MAX, TEXT_MIN, TEXT_MAX, YEARS_RANGE } from '../const.js';


const createMovie = () => {
  const verb = ['Afford', 'Agree', 'Arrest', 'Attack', 'Crash', 'Delight', 'Enjoy', 'Fetch', 'Hate', 'Hunt', 'Kiss', 'Manage', 'Murder'];
  const noun = ['Act', 'Action', 'Advice', 'Animal', 'Argument', 'Bird', 'Book', 'Brother', 'Cat', 'Chicken', 'Cigarette', 'Death', 'Device'];
  const createTitle = () => `${verb[getRandomInteger(0, verb.length - 1)]} ${noun[getRandomInteger(0, noun.length - 1)]}`;
  createTitle();

  const posters = [
    './images/posters/made-for-each-other.png',
    './images/posters/popeye-meets-sinbad.png',
    './images/posters/sagebrush-trail.jpg',
    './images/posters/santa-claus-conquers-the-martians.jpg',
    './images/posters/the-dance-of-life.jpg',
    './images/posters/the-great-flamarion.jpg',
    './images/posters/the-man-with-the-golden-arm.jpg',
  ];

  const names = ['John', 'Adam', 'Michael', 'Jack', 'Samuel', 'Robert', 'Mark', 'James', 'William', 'Geoff', 'Benjamin'];
  const surnames = ['Smith', 'Johnson', 'Stephenson', 'Jones', 'Black', 'White', 'Lucas', 'Spielberg', 'Ford', 'Fisher', 'Walker'];
  const createFullName = () => `${names[getRandomInteger(0, names.length - 1)]} ${surnames[getRandomInteger(0, surnames.length - 1)]}`;

  const genres = ['Action', 'Drama', 'Fantasy', 'Sci-fi', 'Comedy', 'Thriller', 'Documental', 'Film-noir', 'Mystery'];

  const createGenresArray = () => {
    const arr = new Array(getRandomInteger(1, 3)).fill(null).map(() => genres[getRandomInteger(0, genres.length - 1)]);
    return arr;
  };

  const createDuration = () => `${getRandomInteger(1, 3)}h ${getRandomInteger(0, 59)}m`;
  const countries = ['USA', 'UK', 'USSR', 'Russia', 'France', 'Germany', 'Spain', 'Portugal', 'Canada', 'Brazil', 'India'];
  const ageLimitations = ['0+', '3+', '6+', '13+', '16+', '18+'];

  const descriptions = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Fusce tristique felis at fermentum pharetra.',
    'Aliquam id orci ut lectus varius viverra.',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
    'Sed sed nisi sed augue convallis suscipit in sed felis.',
    'Aliquam erat volutpat.',
    'Nunc fermentum tortor ac porta dapibus.',
    'In rutrum ac purus sit amet tempus.',
  ];

  const datesArr = [];
  for (let i = 0; i < YEARS_RANGE; i++) {
    datesArr.push(dayjs().subtract(i, 'year').format('DD MMMM YYYY'));
  }
  const releaseDate = datesArr[getRandomInteger(0, datesArr.length - 1)];
  const year = dayjs(releaseDate).format('YYYY');

  const emotions = ['smile', 'sleeping', 'puke', 'angry'];

  const createNamesList = (min, max) => {
    const arr = new Array(getRandomInteger(min, max)).fill(null).map(() => createFullName());
    const list = arr.join(', ');
    return list;
  };

  const createText = (min, max) => {
    const arr = new Array(getRandomInteger(min, max)).fill(null).map(() => descriptions[getRandomInteger(0, descriptions.length - 1)]);
    const list = arr.join(' ');
    return list;
  };

  const createComment = () => ({
    text: createText(TEXT_MIN, TEXT_MAX),
    emotion: emotions[getRandomInteger(0, emotions.length - 1)],
    author: createFullName(),
    date: dayjs().format('YYYY/MM/DD HH:mm'),
  });

  const createCommentSection = () => {
    const commentsArr = new Array(getRandomInteger(0, 5)).fill(null).map(() => createComment());
    return commentsArr;
  };

  return {
    title: createTitle(),
    originalTitle: createTitle(),
    poster: posters[getRandomInteger(0, posters.length - 1)],
    rating: getRandomFloat(1, 9),
    genre: createGenresArray(),
    duration: createDuration(),
    country: countries[getRandomInteger(0, countries.length - 1)],
    director: createFullName(),
    screenwriters: createNamesList(STAFF_MIN, STAFF_MAX),
    actors: createNamesList(STAFF_MIN, STAFF_MAX),
    releaseDate,
    year,
    ageLimitation: ageLimitations[getRandomInteger(0, ageLimitations.length - 1)],
    description: createText(TEXT_MIN, TEXT_MAX),
    isInWatchlist: Boolean(getRandomInteger(0, 1)),
    isWatched: Boolean(getRandomInteger(0, 1)),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    comments: createCommentSection(),
  };
};

export {createMovie};
