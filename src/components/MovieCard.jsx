import { useState } from "react";
import altImg from "../assets/noimage.jpg";
import PropTypes from "prop-types";
import { addDoc, deleteDoc, getDocs, query, where } from "firebase/firestore";
import { watchlistCollectionRef } from "../utils/firebase";

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

  async function addToWatchlist(id) {
    await addDoc(watchlistCollectionRef, {
      imdbID: id,
    });
  }

  async function removeFromWatchlist(id) {
    props.removeFromWatchlist(id);
    const moviequery = query(watchlistCollectionRef, where("imdbID", "==", id));
    const querySnapshot = await getDocs(moviequery);
    console.log(querySnapshot);
    querySnapshot.forEach((doc) => {
      deleteDoc(doc.ref);
    });
  }

  const poster = props.Poster === "N/A" ? altImg : props.Poster;
  return (
    <div className="flex m-4 border-b-1 border-gray-500 sm:w-[70%] sm:m-auto sm:p-2 md:w-[60%] lg:w-[45%] min-w-[360px] ">
      <img src={poster} alt="img" className="w-1/4 h-full rounded-lg"></img>
      <div className="w-3/4 flex flex-col ml-2 font-medium md:ml-4 md:justify-around">
        <div className="flex items-center justify-between w-full h-1/3 md:text-lg">
          <h1 className="text-xl 2xl:text-3xl">{props.Title}</h1>
          <p className="text-sm">⭐ {props.imdbRating}</p>
        </div>
        <div className="flex justify-between items-center w-full text-xs 2xl:text-xl h-1/3">
          <p>{props.Runtime}</p>
          <p>{props.Genre}</p>
          {isWatchlist ? (
            <button
              id="removebtn"
              className="border-2 border-red-700 rounded-sm px-2 bg-red-700 text-white"
              onClick={() => removeFromWatchlist(props.imdbID)}
            >
              -
            </button>
          ) : (
            <div className="">
              <button
                id="addbtn"
                className="border-2 border-green-700 rounded-sm px-2 bg-green-700 text-white"
                onClick={(e) => {
                  e.target.parentNode.innerHTML = "✔";
                  addToWatchlist(props.imdbID);
                }}
              >
                +
              </button>
            </div>
          )}
        </div>
        <p className="text-xs text-start w-full h-2/3 2xl:text-base">
          {props.Plot}
        </p>
      </div>
    </div>
  );
}
