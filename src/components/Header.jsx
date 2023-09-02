import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle, FaSearch, FaBookmark } from "react-icons/fa";
import { GiFilmProjector } from "react-icons/gi";
import { MdMenuOpen } from "react-icons/md";
import { CgDarkMode } from "react-icons/cg";

export default function Header() {
  const [theme, setTheme] = useState("dark");
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  function handleThemeSwitch() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  return (
    <header className="bg-indigo-500 text-white dark:text-gray-900">
      <nav className="p-6">
        <button
          className="float-right mr-4 md:hidden"
          onClick={() => setIsNavExpanded(!isNavExpanded)}
        >
          {" "}
          <MdMenuOpen className="text-3xl text-center" />{" "}
        </button>
        <div className="flex justify-between">
          <div className="text-2xl font-extrabold flex items-center gap-4">
            <GiFilmProjector />
            MovieTrackr
          </div>
          <div
            className={`md:flex gap-4 items-center justify-center ${
              isNavExpanded ? "" : "hidden"
            }`}
          >
            <Link
              className="text-sm flex items-center gap-2 hover:bg-indigo-400 translate-x-2 p-2 hover:rounded-md"
              to="/"
            >
              <FaSearch /> Search
            </Link>
            <Link
              className="text-sm flex items-center gap-2 hover:bg-indigo-400 translate-x-2 p-2 hover:rounded-md"
              to="/watchlist"
            >
              <FaBookmark />
              Watchlist
            </Link>
            <button
              className="text-sm flex items-center gap-2 hover:bg-indigo-400 translate-x-2 p-2 hover:rounded-md"
              onClick={handleThemeSwitch}
            >
              <CgDarkMode />
              {theme === "dark" ? "Light" : "Dark"}
            </button>
            <Link
              className="text-sm flex items-center gap-2 hover:bg-indigo-400 translate-x-2 p-2 hover:rounded-md"
              to="/login"
            >
              <FaUserCircle /> Login
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
