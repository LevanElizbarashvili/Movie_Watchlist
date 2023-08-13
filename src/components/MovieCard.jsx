import { useState } from "react";
import altImg from "../assets/noimage.jpg";
import PropTypes from "prop-types";
let watchlistArr = [];

export default function MovieCard(props) {
  const [isWatchlist] = useState(props.isWatchlist);

  MovieCard.propTypes = {
    Title: PropTypes.string.isRequired,
    Poster: PropTypes.string.isRequired,
    Runtime: PropTypes.string.isRequired,
    Genre: PropTypes.string.isRequired,
    imdbRating: PropTypes.string.isRequired,
    imdbID: PropTypes.string.isRequired,
    Plot: PropTypes.string.isRequired,
    isWatchlist: PropTypes.bool.isRequired,
    removeFromWatchlist: PropTypes.any.isRequired,
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
  }

  const poster = props.Poster === "N/A" ? altImg : props.Poster;
  return (
    <div className="flex m-4 border-b-1 border-gray-500 sm:w-[70%] sm:m-auto sm:p-2 lg:w-[50%] ">
      <img src={poster} alt="img" className="w-1/4 h-full rounded-lg"></img>
      <div className="w-3/4 flex flex-col justify-end items-start ml-2 font-medium md:ml-4">
        <div className="flex items-center justify-between w-full h-1/3 md:text-lg">
          <h1 className="text-md">{props.Title}</h1>
          <p className="text-sm">⭐ {props.imdbRating}</p>
        </div>
        <div className="flex justify-between items-center w-full text-xs lg:text-sm lg:font-normal h-1/3">
          <p>{props.Runtime}</p>
          <p>{props.Genre}</p>
          {isWatchlist ? (
            <button
              id="removebtn"
              className="border-2 border-gray-500 rounded-md p-1.5"
              onClick={() => removeFromWatchlist(props.imdbID)}
            >
              - Remove
            </button>
          ) : (
            <div className="">
              <button
                id="addbtn"
                className="border-2 border-gray-500 rounded-md p-1.5"
                onClick={(e) => {
                  e.target.parentNode.innerHTML = "✔";
                  addToWatchlist(props.imdbID);
                }}
              >
                + Watchlist
              </button>
            </div>
          )}
        </div>
        <p className="text-xs text-start h-2/3 lg:text-sm lg:font-normal">
          {props.Plot}
        </p>
      </div>
    </div>
  );
}
