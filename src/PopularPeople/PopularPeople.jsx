import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import "./popularPeople.css";

const apiKey = "b4c8656d224730057cefeb55c48ee29b";

function formatDate(dateString) {
  // Parse the date string into a Date object
  var date = new Date(dateString);

  // Format the date into a more readable format (e.g., "June 15, 1999")
  var options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

function returnLastParagraph(text) {
  const paragraphs = text.split("\n\n");

  return paragraphs[paragraphs.length - 1];
}

const PopularPeople = React.memo(({ popularPerson }) => {
  const [selectedKnownForMovie, setSelectedKnownForMovie] = useState("");
  const [personInfo, setPersonInfo] = useState([]);

  useEffect(() => {
    const getPopularPeopleInfo = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/person/${popularPerson.id}?api_key=${apiKey}&language=en-US`
      );
      const data = await res.json();
      if (data) {
        setPersonInfo(data);
      } else {
        setPersonInfo([]);
      }
    };
    if (popularPerson.id !== undefined) {
      getPopularPeopleInfo();
    }
  }, [popularPerson]);

  const handleNameClick = () => {
    setSelectedKnownForMovie(personInfo);
  };

  const handleKnownForMovieClick = (movie) => {
    setSelectedKnownForMovie(movie);
  };

  useEffect(() => {
    if (personInfo.id) {
      setSelectedKnownForMovie(personInfo);
    }
  }, [personInfo]);

  let imgSrc = "";
  if (popularPerson && popularPerson.profile_path) {
    imgSrc = `https://image.tmdb.org/t/p/w300/${popularPerson.profile_path}`;
  } else {
    imgSrc =
      "https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie.jpg";
  }

  return (
    <>
      <div className="containerPopularPeople">
        {/* <img src={imgSrc} alt={popularPerson && popularPerson.name} /> */}
        <div
          className="peopleItem"
          style={{
            backgroundImage: `url(${imgSrc})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
          }}
        ></div>
        <div className="peopleItem">
          <div className="flexContentPeople">
            <div className="contentItem">
              <div
                className={`jmeno ${
                  selectedKnownForMovie.gender ? "active" : ""
                }`}
                onClick={() => handleNameClick()}
              >
                {popularPerson && popularPerson.name}
              </div>
              {popularPerson &&
                popularPerson.known_for &&
                popularPerson.known_for.map((movie) => {
                  const isActive =
                    (selectedKnownForMovie.original_title !== undefined &&
                      movie.original_title ===
                        selectedKnownForMovie.original_title) ||
                    (selectedKnownForMovie.original_name !== undefined &&
                      movie.original_name ===
                        selectedKnownForMovie.original_name);
                  return (
                    <div
                      key={movie.id}
                      onClick={() => handleKnownForMovieClick(movie)}
                      className={`movieButton ${isActive ? "active" : ""}`}
                    >
                      {movie.original_title || movie.original_name}
                    </div>
                  );
                })}
            </div>
            <div
              className="contentItem"
              style={{
                backgroundImage: `linear-gradient(to top, rgba(22, 66, 91, 1), rgba(22, 66, 91, 0.8), rgba(22, 66, 91, 0.8), rgba(22, 66, 91, 1)),url(https://image.tmdb.org/t/p/w300/${selectedKnownForMovie.backdrop_path})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {selectedKnownForMovie.gender ? (
                <div className="personContainer">
                  {/* <p>{selectedKnownForMovie.biography}</p> */}
                  <div>{formatDate(selectedKnownForMovie.birthday)}</div>
                  <div>{selectedKnownForMovie.place_of_birth}</div>
                  <div>
                    {returnLastParagraph(selectedKnownForMovie.biography)}
                  </div>
                </div>
              ) : (
                <>
                  <h3 className="selectedKnownForMovieTitle">
                    {selectedKnownForMovie.original_title
                      ? selectedKnownForMovie.original_title
                      : selectedKnownForMovie.original_name}
                  </h3>
                  <p className="selectedKnownForMovieOverview">
                    {selectedKnownForMovie.overview}
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default PopularPeople;
