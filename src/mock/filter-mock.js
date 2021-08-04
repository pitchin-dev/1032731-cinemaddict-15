const buttons = {
  byDefault: 'Sort by default',
  byDate: 'Sort by date',
  byRating: 'Sort by rating',
};

const sortByDefault = (data) => data.slice(0);
const sortByDate = (data) => data.slice(0).sort((a, b) => b.year - a.year);
const sortByRating = (data) => data.slice(0).sort((a, b) => b.rating - a.rating);

const filmsMostCommented = (data) => data.slice(0).sort((a, b) => b.comments.length - a.comments.length).slice(0, 2);
const filmsTopRated = (data) => data.slice(0).sort((a, b) => b.rating - a.rating).slice(0, 2);

export { buttons, sortByDefault, sortByDate, sortByRating, filmsMostCommented, filmsTopRated };
