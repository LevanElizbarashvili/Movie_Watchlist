import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import { Link } from "react-router-dom";
import { getDocs } from "firebase/firestore";
import { watchlistCollectionRef } from "../utils/firebase";

export default function Watchlist() {
  const [watchlistMovies, setWatchlistMovies] = useState([]);
  const [watchlistIds, setWatchlistIds] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  function handleRemoveFromWatchlist(imdbID) {
    setWatchlistMovies((prev) =>
      prev.filter((movie) => movie.imdbID !== imdbID)
    );
  }

  async function getWatchlistIds() {
    try {
      const data = await getDocs(watchlistCollectionRef);
      setWatchlistIds(data.docs.map((doc) => ({ ...doc.data() })));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getWatchlistIds();
  }, []);

  useEffect(() => {
    async function getWatchList() {
      try {
        setisLoading(true);
        if (watchlistIds.length > 0) {
          for (const id of watchlistIds) {
            const response = await fetch(
              `https://www.omdbapi.com/?i=${id.imdbID}&apikey=a46e0fe4`
            );
            const data = await response.json();
            setWatchlistMovies((prev) => [...prev, data]);
          }
        }
        setisLoading(false);
      } catch (error) {
        console.error(error);
        setWatchlistMovies([]);
      }
    }
    getWatchList();
  }, [watchlistIds]);

  return (
    <div>
      <div>
        <div className="text-center m-2 h-screen">
          <div id="list">
            {isLoading ? (
              <p className="text-center m-6 h-screen text-bold-700">
                Loading...
              </p>
            ) : watchlistIds.length === 0 ? (
              <div className="text-lg mt-24 h-screen">
                <p>Your watchlist is empty</p>
                <Link to="/"> ➕ Let’s add some movies!</Link>
              </div>
            ) : (
              watchlistMovies.map((movData) => (
                <MovieCard
                  key={movData.id}
                  {...movData}
                  isWatchlist={true}
                  removeFromWatchlist={handleRemoveFromWatchlist}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
