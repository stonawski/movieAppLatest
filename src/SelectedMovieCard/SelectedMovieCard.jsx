import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const SelectedMovieCard = ({ movie, handleMovieCancel }) => {
  return (
    <>
      <div
        className="flexInfo"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(22, 66, 91, 1), rgba(22, 66, 91, 0.8), rgba(22, 66, 91, 0.8), rgba(22, 66, 91, 1)), url(https://image.tmdb.org/t/p/w300${movie.backdrop_path})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <img
          src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="flexInfoItem">
          <div className="mediaType">{movie.media_type}</div>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <div className="vote">{(movie.vote_average * 10).toFixed(0)}%</div>
          <div className="releaseDate">{movie.release_date}</div>
        </div>
        <div className="flexInfoClose" onClick={() => handleMovieCancel()}>
          <FontAwesomeIcon icon={faXmark} />
        </div>
      </div>
    </>
  );
};
export default SelectedMovieCard;
