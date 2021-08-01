const createSortTemplate = ([sortedByDefault, sortedByDate, sortedByRating]) => (
  `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active">${sortedByDefault.label}</a></li>
    <li><a href="#" class="sort__button">${sortedByDate.label}</a></li>
    <li><a href="#" class="sort__button">${sortedByRating.label}</a></li>
  </ul>`
);

export {createSortTemplate};
