/* eslint-disable react/prop-types */

import altImg from "../assets/noimage.jpg";
let watchlistArr = [];

export default function MovieCard(props) {
  function addToWatchlist(id) {
    watchlistArr.push(id);
    localStorage.setItem("watchlistArr", JSON.stringify(watchlistArr));
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
          <button
            id="addbtn"
            className="add-btn"
            onClick={(e) => {
              addToWatchlist(props.imdbID);
              e.target.style.backgroundColor = "green";
              e.target.textContent = "✔";
            }}
          >
            {" "}
            + Watchlist
          </button>
        </div>
        <p className="plot">{props.Plot}</p>
      </div>
    </div>
  );
}
