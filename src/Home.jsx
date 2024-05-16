import { useState, useEffect, useRef } from "react";
import Switch from "react-switch";
import { Link } from "react-router-dom";

import "./App.css";

import MovieItem from "./MovieItem/MovieItem";
import SelectedMovieCard from "./SelectedMovieCard/SelectedMovieCard";
import PopularPeople from "./PopularPeople/PopularPeople";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

const apiKey = "b4c8656d224730057cefeb55c48ee29b";
const testJSON = '{"movies": ["Spiderman", "Superman"]}';

const parse = JSON.parse(testJSON);
console.log(parse);

// const movie = {
//   "adult": false,
//   "backdrop_path": "/yyFc8Iclt2jxPmLztbP617xXllT.jpg",
//   "id": 787699,
//   "title": "Wonka",
//   "original_language": "en",
//   "original_title": "Wonka",
//   "overview": "Willy Wonka – chock-full of ideas and determined to change the world one delectable bite at a time – is proof that the best things in life begin with a dream, and if you’re lucky enough to meet Willy Wonka, anything is possible.",
//   "poster_path": "/qhb1qOilapbapxWQn9jtRCMwXJF.jpg",
//   "media_type": "movie",
//   "genre_ids": [
//     35,
//     10751,
//     14
//   ],
//   "popularity": 1545.789,
//   "release_date": "2023-12-06",
//   "video": false,
//   "vote_average": 7.212,
//   "vote_count": 1993
// }

function getUser() {
  let user = localStorage.getItem("user");
  if (user) {
    user = JSON.parse(user);
  } else {
    user = null;
  }
  return user;
}

export const Home = () => {
  const [searchValue, setsearchValue] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [genres, setGenres] = useState([]);
  const [trendingTimeZone, setTrendingTimeZone] = useState(true);
  const [trendingMoviesDay, setTrendingMoviesDay] = useState([]);
  const [trendingMoviesWeek, setTrendingMoviesWeek] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularPeople, setPopularPeople] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState("");
  const [popularPerson, setPopularPerson] = useState([]);
  const [user, setUser] = useState(getUser());
  const gridInfoRef = useRef(null);
  const moviesRef = useRef(null);

  const scrollContainerRef = useRef(null);

  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (selectedMovie && gridInfoRef.current) {
      // Calculate the height of the viewport
      const viewportHeight = window.innerHeight;
      // Calculate the height of the gridInfo div
      const gridInfoHeight = gridInfoRef.current.offsetHeight;

      // Calculate the scroll position
      const scrollPosition =
        gridInfoRef.current.offsetTop + gridInfoHeight - viewportHeight;

      // Scroll to the calculated position
      window.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      });
    }
  }, [selectedMovie]);

  useEffect(() => {
    const getGenres = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en`
      );
      const data = await res.json();
      setGenres(data.genres);
    };

    const getTrendingMoviesDay = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}&language=en-US`
      );
      const data = await res.json();
      if (data.results) {
        const trendingDay = data.results.sort((a, b) => {
          return b.popularity - a.popularity;
        });
        setTrendingMoviesDay(trendingDay);
        setTrendingMovies(trendingDay);
      } else {
        setTrendingMoviesDay([]);
      }
    };

    const getTrendingMoviesWeek = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}&language=en-US`
      );
      const data = await res.json();
      if (data.results) {
        const trendingWeek = data.results.sort((a, b) => {
          return b.popularity - a.popularity;
        });

        setTrendingMoviesWeek(trendingWeek);
      } else {
        setTrendingMoviesWeek([]);
      }
    };

    const getPopularPeople = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/person/popular?api_key=${apiKey}&language=en-US`
      );
      const data = await res.json();

      var randomIndex = Math.floor(Math.random() * data.results.length);
      var person = data.results[randomIndex];
      if (person) {
        setPopularPerson(person);
      } else {
        setPopularPerson([]);
      }
    };

    getGenres();
    getTrendingMoviesDay();
    getTrendingMoviesWeek();
    getPopularPeople();
    // setSelectedMovie(movie)
  }, []);

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      const searchMovies = async (page = 1) => {
        let API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${page}`;
        setIsLoading(true);
        if (searchValue !== "") {
          API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchValue}&page=${page}`;
        }
        const res = await fetch(`${API_URL}`);
        const data = await res.json();

        // Check if there are more pages and fetch them recursively
        // if (data.page < data.total_pages) {
        //   await searchMovies(page + 1, searchValue);
        // }

        if (data.results) {
          const moviesData = data.results.sort((a, b) => {
            const dateA = new Date(a.release_date);
            const dateB = new Date(b.release_date);

            return dateB - dateA;
          });

          setMovies(moviesData);
        } else {
          setMovies([]);
        }

        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      };

      searchMovies(1);

      if (searchValue !== "" && moviesRef.current) {
        // Calculate the height of the viewport
        const viewportHeight = window.innerHeight;
        // Calculate the height of the gridInfo div
        const gridInfoHeight = moviesRef.current.offsetHeight;

        // Calculate the scroll position
        const scrollPosition = moviesRef.current.offsetTop;

        // Scroll to the calculated position
        window.scrollTo({
          top: scrollPosition,
          behavior: "smooth",
        });
      }
    }, 1000);

    // Cleanup function to clear the timeout if the user continues typing
    return () => clearTimeout(delaySearch);
  }, [searchValue]);

  useEffect(() => {
    if (trendingTimeZone === true) {
      setTrendingMovies(trendingMoviesDay);
    } else {
      setTrendingMovies(trendingMoviesWeek);
    }
  }, [trendingTimeZone]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: scrollContainerRef.current.scrollLeft - 1550,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: scrollContainerRef.current.scrollLeft + 1550,
        behavior: "smooth",
      });
    }
  };

  const handleChangeOfTimeZone = () => {
    setTrendingTimeZone(!trendingTimeZone);
  };

  const CustomUncheckedIcon = () => (
    <div>
      <span
        style={{
          marginRight: "10px",
          fontSize: "14px",
          fontWeight: "bold",
          color: "#fff",
        }}
      >
        Week
      </span>
    </div>
  );

  const CustomCheckedIcon = () => (
    <div>
      <span
        style={{
          marginLeft: "5px",
          fontSize: "14px",
          fontWeight: "bold",
          color: "#fff",
        }}
      >
        Today
      </span>
    </div>
  );

  const handleMovieItemClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleMovieCancel = () => {
    setSelectedMovie("");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <>
      <div className="grid">
        <div className="loginBar">
          {user ? (
            <div className="userBar">
              <div>{user.username}</div>
              <FontAwesomeIcon
                icon={faBars}
                onClick={handleDropdownToggle}
                className="bars"
              />
              {showDropdown && (
                <div className="dropdownContent">
                  <a href="#">Profile</a>
                  <a href="#" onClick={handleLogout}>
                    Logout
                  </a>
                </div>
              )}
            </div>
          ) : (
            <Link to="/authentication" className="loginBtn">
              Log in
            </Link>
          )}
        </div>
        <div className="gridMain">
          <div className="searchBarContainer">
            <h1>My Movie App</h1>
            <input
              name="searchBar"
              placeholder="Search"
              className="searchBar"
              value={searchValue}
              onChange={(e) => {
                setsearchValue(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="gridTrendingSection">
          <div className="trendingHeader">
            <h2>Trending</h2>
            <div className="trendSwitchSection">
              <Switch
                onChange={handleChangeOfTimeZone}
                checked={trendingTimeZone}
                uncheckedIcon={<CustomUncheckedIcon />}
                checkedIcon={<CustomCheckedIcon />}
                width={80}
                className="trendSwitch"
              />
            </div>
          </div>
          <div className="trendingSection">
            <button className="scrollButton leftButton" onClick={scrollLeft}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <div className="slideTrack">
              <div
                className="scrollableTrendingSection snaps-inline"
                ref={scrollContainerRef}
              >
                {/* Map through all trending movies */}
                {trendingMovies.map((movie) => (
                  <MovieItem
                    key={movie.id}
                    movie={movie}
                    genres={genres}
                    handleClick={handleMovieItemClick}
                    usage={"trend"}
                    user={user}
                  />
                ))}
              </div>
            </div>
            <button className="scrollButton rightButton" onClick={scrollRight}>
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </div>
        {selectedMovie !== "" ? (
          <>
            <div className="gridInfoBGLeft"></div>
            <div ref={gridInfoRef} className="gridInfo">
              <SelectedMovieCard
                movie={selectedMovie}
                handleMovieCancel={handleMovieCancel}
              />
            </div>
            <div className="gridInfoBGRight"></div>
          </>
        ) : null}
        {searchValue !== "" ? (
          <>
            <div className="bgLeftMovieSection"></div>
            <div className="gridMovieSection">
              <div ref={moviesRef} className="flexMovieSection">
                {isLoading ? (
                  <div className="loading-container">
                    <div className="loading-icon"></div>
                  </div>
                ) : movies !== "" ? (
                  movies.map((movie) => (
                    // <MovieItem key={movie.id} movie={movie} genres={genres} />
                    <MovieItem
                      key={movie.id}
                      movie={movie}
                      genres={genres}
                      handleClick={handleMovieItemClick}
                      usage={"mov"}
                    />
                  ))
                ) : (
                  <div>No movies found</div>
                )}
              </div>
            </div>
            <div className="bgRightMovieSection"></div>
          </>
        ) : null}
        <div className="bgLeftPeopleSection"></div>
        <div className="gridPopularPeople">
          <div className="popularPeopleHeader">
            <h2>Popular People</h2>
          </div>
          <PopularPeople popularPerson={popularPerson} />
        </div>
        <div className="bgRightPeopleSection"></div>
        <div className="gridFooter">
          <div className="flexFooter">
            <div className="footerItem">
              <h4>Contact Us</h4>
              <p>Email: contact@yourmovieapp.com</p>
              <p>Phone: 1-800-MOVIE-APP</p>
            </div>
            <div className="footerItem">
              <h4>About Us</h4>
              <p>
                MovieApp is dedicated to providing you with the latest
                information about movies, including reviews, ratings, and
                trailers.
              </p>
            </div>
            <div className="footerItem">
              <h4>Follow Us</h4>
              <div className="socials">
                <a href="#">
                  <FontAwesomeIcon icon={faFacebook} />
                </a>
                <a href="#">
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
                <a href="#">
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a href="#">
                  <FontAwesomeIcon icon={faYoutube} />
                </a>
              </div>
            </div>
          </div>
          <div className="footerInfo">
            <div className="line">
              &copy; 2024 MovieApp. All Rights Reserved.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
