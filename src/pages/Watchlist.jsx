import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import { Link } from "react-router-dom";
import { getDocs, query, where } from "firebase/firestore";
import { auth, watchlistCollectionRef } from "../utils/firebase";

export default function Watchlist() {
  const [watchlistMovies, setWatchlistMovies] = useState([]);
  const [watchlistIds, setWatchlistIds] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  function handleRemoveFromWatchlist(imdbID) {
    setWatchlistMovies((prev) =>
      prev.filter((movie) => movie.imdbID !== imdbID)
    );
  }

  async function getWatchlistIds() {
    try {
      const watchlistSnapshot = await getDocs(
        query(
          watchlistCollectionRef,
          where("userId", "==", auth.currentUser.uid)
        )
      );
      const watchlistIds = watchlistSnapshot.docs.map((doc) => doc.data());
      setWatchlistIds(watchlistIds);
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
        setIsFirstLoad(false);
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
        <div className="text-center m-2 min-h-screen">
          <div id="list">
            {!isFirstLoad && isLoading ? (
              <p className="text-center m-6 h-screen text-bold-700">
                Loading...
              </p>
            ) : !isFirstLoad && watchlistIds.length === 0 ? (
              <div className="text-lg mt-24 h-screen  dark:text-gray-400 text-gray-600">
                <p>Your watchlist is empty</p>
                <Link to="/"> ➕ Let’s add some movies!</Link>
              </div>
            ) : (
              watchlistMovies.map((movData) => (
                <div key={movData.imdbID}>
                  <MovieCard
                    {...movData}
                    isWatchlist={true}
                    removeFromWatchlist={handleRemoveFromWatchlist}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
