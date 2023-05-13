/* eslint-disable react/prop-types */

import altImg from "../assets/noimage.jpg";

export default function MovieCard(props) {
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
          <button id="addbtn" className="add-btn" data-id={props.imdbID}>
            {" "}
            + Watchlist
          </button>
        </div>
        <p className="plot">{props.Plot}</p>
      </div>
    </div>
  );
}
