import React from "react";
// import MovieItem from "../MovieItem/MovieItem";

const MovieItem = ({ movie, genres, handleClick, usage }) => {
  let imgSrc = "";
  if (movie.poster_path) {
    imgSrc = `https://image.tmdb.org/t/p/w300/${movie.poster_path}`;
  } else {
    imgSrc =
      "https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie.jpg";
  }
  let movieGenres = "";
  for (const movieGenre of movie.genre_ids) {
    for (const genreFromList of genres) {
      if (movieGenre === genreFromList.id) {
        movieGenres = movieGenres + genreFromList.name + "; ";
      }
    }
  }

  let bgColor = usage == "trend" ? "#16425b" : "#427d9d";
  return (
    <div
      className="movieItem"
      onClick={() => handleClick(movie)}
      style={{
        backgroundColor: { bgColor },
      }}
    >
      <div className="info">
        {/* <span className="year">{movie.release_date}</span>
        <span className="type">{movieGenres}</span> */}
      </div>
      <img src={imgSrc} alt={movie.original_title} />
      <div className="title">{movie.original_title}</div>
    </div>
  );
};

export default MovieItem;
