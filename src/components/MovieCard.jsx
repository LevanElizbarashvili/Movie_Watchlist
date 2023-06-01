import { useState } from "react";
import altImg from "../assets/noimage.jpg";
import PropTypes from "prop-types";
let watchlistArr = [];

export default function MovieCard(props) {
  const [isWatchlist, setIsWatchlist] = useState(props.isWatchlist);

  MovieCard.propTypes = {
    Title: PropTypes.string.isRequired,
    Poster: PropTypes.string.isRequired,
    Runtime: PropTypes.string.isRequired,
    Genre: PropTypes.string.isRequired,
    imdbRating: PropTypes.string.isRequired,
    imdbID: PropTypes.string.isRequired,
    Plot: PropTypes.string.isRequired,
    isWatchlist: PropTypes.bool.isRequired,
    removeFromWatchlist: PropTypes.func.isRequired,
  };

  function addToWatchlist(id) {
    watchlistArr.push(id);
    localStorage.setItem("watchlistArr", JSON.stringify(watchlistArr));
  }

  function removeFromWatchlist(id) {
    props.removeFromWatchlist(id);
    const index = watchlistArr.indexOf(id);
    if (index > -1) {
      watchlistArr.splice(index, 1);
    }
    localStorage.setItem("watchlistArr", JSON.stringify(watchlistArr));
    setIsWatchlist(false);
  }

  const poster = props.Poster === "N/A" ? altImg : props.Poster;
  return (
    <div className="list">
      <img src={poster} alt="img"></img>
      <div className="movie-data">
        <div className="titleRating">
          <h1>{props.Title}</h1>
          <p>⭐ {props.imdbRating}</p>
        </div>
        <div className="movieDetails">
          <p>{props.Runtime}</p>
          <p>{props.Genre}</p>
          {isWatchlist ? (
            <button
              id="removebtn"
              className="add-btn"
              onClick={() => removeFromWatchlist(props.imdbID)}
            >
              {" "}
              - Remove
            </button>
          ) : (
            <button
              id="addbtn"
              className="add-btn"
              onClick={(e) => {
                e.target.style.backgroundColor = "green";
                e.target.textContent = "✔";
                addToWatchlist(props.imdbID);
              }}
            >
              {" "}
              + Watchlist
            </button>
          )}
        </div>
        <p className="plot">{props.Plot}</p>
      </div>
    </div>
  );
}
