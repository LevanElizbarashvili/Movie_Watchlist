import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import { TbMovie } from "react-icons/tb";

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
          <form className="text-center m-2">
            <input
              id="search"
              className="rounded text-center w-[35%] min-w-[300px] text-base text-gray-800 bg-gray-200
               p-4 dark:bg-[#2f3135] dark:text-[#A5A5A5] my-8 placeholder:text-gray-600 dark:placeholder:text-gray-400"
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
              <p className="text-center m-6 h-screen text-bold-700">
                Loading...
              </p>
            ) : movies.length > 0 ? (
              movies.map((movData) => (
                <MovieCard
                  key={movData.imdbID}
                  {...movData}
                  isWatchlist={false}
                />
              ))
            ) : (
              <div className="text-center mt-24 h-screen text-bold-900 text-xl text-gray-600 dark:text-gray-400">
                <TbMovie className="w-[100px] h-auto text-center mx-auto stroke-1.5 opacity-80" />
                <p>Start exploring</p>
              </div>
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
