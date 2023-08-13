import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import { Link } from "react-router-dom";

export default function Watchlist() {
  const [watchlistMovies, setWatchlistMovies] = useState([]);
  const [watchlistIds, setWatchlistIds] = useState([]);

  function handleRemoveFromWatchlist(imdbID) {
    setWatchlistMovies((prev) =>
      prev.filter((movie) => movie.imdbID !== imdbID)
    );
  }

  useEffect(() => {
    setWatchlistIds(JSON.parse(localStorage.getItem("watchlistArr")));
  }, []);

  useEffect(() => {
    if (watchlistIds.length > 0) {
      watchlistIds.map((id) => {
        fetch(`https://www.omdbapi.com/?i=${id}&apikey=a46e0fe4`)
          .then((Response) => Response.json())
          .then((data) => {
            setWatchlistMovies((prev) => [...prev, data]);
          });
      });
    }
  }, [watchlistIds]);

  return (
    <div>
      <div>
        <div className="text-center h-screen">
          <div id="list">
            {watchlistMovies.length > 0 ? (
              watchlistMovies.map((movData) => (
                <MovieCard
                  key={movData.id}
                  {...movData}
                  isWatchlist={true}
                  removeFromWatchlist={handleRemoveFromWatchlist}
                />
              ))
            ) : (
              <div className="text-lg mt-24">
                <p>Your watchlist is empty</p>
                <Link to="/"> ➕ Let’s add some movies!</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
