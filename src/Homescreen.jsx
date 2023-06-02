import { useState, useEffect } from "react";
import MovieCard from "./components/MovieCard";
let movieArr = [];

export default function Homescreen() {
  const [movies, setMovies] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function searchMovie() {
      let keyWord = searchInput.trim();
      setMovies([]);
      movieArr = [];

      if (keyWord) {
        await fetch(
          `https://www.omdbapi.com/?s=${keyWord}&page=${currentPage}&apikey=a46e0fe4`
        )
          .then((res) => res.json())
          .then((arr) => {
            for (let i = 0; i < arr.Search.length; i++) {
              movieArr.push(arr.Search[i].imdbID);
            }
          });

        movieArr.map((id) => {
          fetch(`https://www.omdbapi.com/?i=${id}&apikey=a46e0fe4`)
            .then((Response) => Response.json())
            .then((data) => {
              setMovies((prev) => [...prev, data]);
              window.localStorage.setItem("movies", JSON.stringify(data));
            });
        });
      }
    }
    searchMovie();
  }, [searchInput, currentPage]);

  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  const debouncedSetSearchInput = debounce(setSearchInput, 300);

  return (
    <div className="base">
      <div>
        <div className="main">
          <form>
            <input
              id="search"
              type="text"
              placeholder="Search for a movie"
              name="search"
              onChange={function (e) {
                debouncedSetSearchInput(e.target.value);
              }}
            ></input>
          </form>
          <div id="list">
            {movies.length > 0 ? (
              movies.map((movData) => (
                <MovieCard key={movData.id} {...movData} isWatchlist={false} />
              ))
            ) : (
              <p className="favs">Start exploring</p>
            )}
          </div>
          {movies.length > 0 ? (
            <div className="pager">
              <button
                className="pagebtn"
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous page
              </button>
              <button
                className="pagebtn"
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

//FIXME
// fix search results not to dissapear
