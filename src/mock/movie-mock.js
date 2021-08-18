import {nanoid} from 'nanoid';
import dayjs from 'dayjs';
import { getRandomFloat, getRandomInteger } from '../utils/utils.js';
import { STAFF_MIN, STAFF_MAX, TEXT_MIN, TEXT_MAX, YEARS_RANGE, POSTERS, VERB, NOUN, NAMES, SURNAMES, GENRES, COUNTRIES, AGE_LIMITATIONS, DESCRIPTIONS, EMOTIONS } from '../const.js';

const datesArr = [];
for (let i = 0; i < YEARS_RANGE; i++) {
  datesArr.push(dayjs().subtract(i, 'year').format('DD MMMM YYYY'));
}

const createMovie = () => {
  const createTitle = () => `${VERB[getRandomInteger(0, VERB.length - 1)]} ${NOUN[getRandomInteger(0, NOUN.length - 1)]}`;

  const createFullName = () => `${NAMES[getRandomInteger(0, NAMES.length - 1)]} ${SURNAMES[getRandomInteger(0, SURNAMES.length - 1)]}`;

  const createGenresArray = () => {
    const arr = new Array(getRandomInteger(1, 3)).fill(null).map(() => GENRES[getRandomInteger(0, GENRES.length - 1)]);
    return arr;
  };

  const createDuration = () => `${getRandomInteger(1, 3)}h ${getRandomInteger(0, 59)}m`;
  const releaseDate = datesArr[getRandomInteger(0, datesArr.length - 1)];
  const year = dayjs(releaseDate).format('YYYY');

  const createNamesList = (min, max) => {
    const arr = new Array(getRandomInteger(min, max)).fill(null).map(() => createFullName());
    const list = arr.join(', ');
    return list;
  };

  const createText = (min, max) => {
    const arr = new Array(getRandomInteger(min, max)).fill(null).map(() => DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)]);
    const list = arr.join(' ');
    return list;
  };

  const createComment = () => ({
    text: createText(TEXT_MIN, TEXT_MAX),
    emotion: EMOTIONS[getRandomInteger(0, EMOTIONS.length - 1)],
    author: createFullName(),
    date: dayjs().format('YYYY/MM/DD HH:mm'),
  });

  const createCommentSection = () => {
    const commentsArr = new Array(getRandomInteger(0, 5)).fill(null).map(() => createComment());
    return commentsArr;
  };

  return {
    id: nanoid(),
    title: createTitle(),
    originalTitle: createTitle(),
    poster: POSTERS[getRandomInteger(0, POSTERS.length - 1)],
    rating: getRandomFloat(1, 9),
    genre: createGenresArray(),
    duration: createDuration(),
    country: COUNTRIES[getRandomInteger(0, COUNTRIES.length - 1)],
    director: createFullName(),
    screenwriters: createNamesList(STAFF_MIN, STAFF_MAX),
    actors: createNamesList(STAFF_MIN, STAFF_MAX),
    releaseDate,
    year,
    ageLimitation: AGE_LIMITATIONS[getRandomInteger(0, AGE_LIMITATIONS.length - 1)],
    description: createText(TEXT_MIN, TEXT_MAX),
    isInWatchlist: Boolean(getRandomInteger(0, 1)),
    isWatched: Boolean(getRandomInteger(0, 1)),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    comments: createCommentSection(),
  };
};

export {createMovie};
