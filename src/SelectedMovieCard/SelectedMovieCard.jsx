import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import "./selectedMovieCard.css";

const SelectedMovieCard = ({ movie, handleMovieCancel }) => {
  function formatDate(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  }
  return (
    <>
      <div className="content">
        <div className="backgroundImg">
          <img
            src={`https://image.tmdb.org/t/p/w300/${movie.backdrop_path}`}
            alt={movie.title}
          />
          <div className="gradient"></div>
        </div>
        <div className="flexContent">
          <img
            src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
            alt={movie.title}
          />
          <div className="flexInfo">
            <div className="mediaType">{movie.media_type}</div>
            <h2>{movie.title}</h2>
            <p>{movie.overview}</p>
            <div className="releaseDate">
              Released {formatDate(movie.release_date)}
            </div>
            <div
              className="vote"
              style={{
                borderColor: `hsl(${(movie.vote_average * 10).toFixed(
                  0
                )}, 100%, 50%)`,
              }}
            >
              {(movie.vote_average * 10).toFixed(0)}%
            </div>
          </div>
          <div className="flexInfoClose" onClick={() => handleMovieCancel()}>
            <FontAwesomeIcon icon={faXmark} />
          </div>
        </div>
      </div>
    </>
  );
};
export default SelectedMovieCard;
