const createMovieStatsTemplate = (movies) => (
  `<section class="footer__statistics">
    <p>${movies.length} movies inside</p>
  </section>`
);

export {createMovieStatsTemplate};
