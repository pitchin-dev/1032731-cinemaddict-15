const createSortTemplate = ({byDefault, byDate, byRating}) => (
  `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active">${byDefault}</a></li>
    <li><a href="#" class="sort__button">${byDate}</a></li>
    <li><a href="#" class="sort__button">${byRating}</a></li>
  </ul>`
);

export {createSortTemplate};
