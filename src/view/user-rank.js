const createUserRankTemplate = (movies) => {
  const watchedCount = movies.filter((movie) => movie.isWatched).length;
  let rank;
  if (watchedCount === 0) {
    rank = '';
  } else if (watchedCount >= 1 && watchedCount <= 10) {
    rank = 'Novice';
  } else if (watchedCount >= 11 && watchedCount <= 20) {
    rank = 'Fan';
  } else if (watchedCount > 21) {
    rank = 'Movie Buff';
  }

  return (
    `<section class="header__profile profile">
        <p class="profile__rating">${rank}</p>
        <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export {createUserRankTemplate};
