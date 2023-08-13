import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";

export default function Homescreen() {
  const [movies, setMovies] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function searchMovie() {
      setIsLoading(true);

      try {
        let firstSearch = localStorage.getItem("searchValue");
        let keyWord = firstSearch ? firstSearch : searchInput.trim();

        if (keyWord) {
          const response = await fetch(
            `https://www.omdbapi.com/?s=${keyWord}&page=${currentPage}&apikey=a46e0fe4`
          );
          const data = await response.json();

          let movieIds = [];
          if (data.Search) {
            movieIds = data.Search.map((movie) => movie.imdbID);
          }
          const movieDataPromises = movieIds.map((id) =>
            fetch(`https://www.omdbapi.com/?i=${id}&apikey=a46e0fe4`).then(
              (response) => response.json()
            )
          );

          const movieData = await Promise.all(movieDataPromises);
          setMovies(movieData);
        }
      } catch (error) {
        console.error("Error searching movies:", error);
      }

      setIsLoading(false);
    }

    searchMovie();
    window.scrollTo(0, 0);
  }, [searchInput, currentPage]);

  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  window.onunload = function () {
    localStorage.removeItem("searchValue");
    return "";
  };

  const debouncedSetSearchInput = debounce(setSearchInput, 300);

  return (
    <div>
      <div>
        <div>
          <form className="text-center m-4">
            <input
              id="search"
              className="rounded text-center text-base text-gray-500 capitalize 
              border-2 border-gray-500 p-2 dark:bg-[#121212] dark:text-gray-300"
              type="text"
              placeholder="Search for a movie"
              name="search"
              onChange={function (e) {
                debouncedSetSearchInput(e.target.value);
                localStorage.setItem(
                  "searchValue",
                  JSON.stringify(e.target.value)
                );
              }}
            ></input>
          </form>
          <div id="list">
            {isLoading ? (
              <p>Loading...</p>
            ) : movies.length > 0 ? (
              movies.map((movData) => (
                <MovieCard key={movData.id} {...movData} isWatchlist={false} />
              ))
            ) : (
              <p className="text-center m-4 h-screen text-bold-700">
                Start exploring
              </p>
            )}
          </div>
          {movies.length > 0 ? (
            <div className="flex justify-center gap-3 my-4">
              <button
                className="border-2 border-gray-500 rounded-md p-4"
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Prev page
              </button>
              <button
                className="border-2 border-gray-500 rounded-md p-4"
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next page
              </button>
            </div>
          ) : (
            <p></p>
          )}
        </div>
      </div>
    </div>
  );
}
