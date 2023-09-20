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

  function handleNavOff() {
    setIsNavExpanded(false);
  }

  function handlenavOn() {
    setIsNavExpanded(true);
  }

  function handleNavAndTheme() {
    handleThemeSwitch();
    setIsNavExpanded(false);
  }

  return (
    <header className="bg-indigo-500 text-white dark:text-gray-900">
      <nav className="p-6">
        <button className="float-right mr-4 md:hidden" onClick={handlenavOn}>
          <MdMenuOpen className="text-3xl text-center" />
        </button>
        <div className="flex justify-between">
          <Link
            className="text-2xl font-extrabold flex items-center gap-4"
            to="/"
          >
            <GiFilmProjector />
            MovieTrackr
          </Link>
          <div
            id="nav"
            className={`md:flex gap-4${
              isNavExpanded
                ? "visible block w-[51%] fixed h-[100%] top-0 left-0 pt-8 pl-4 bg-white text-gray-900 dark:text-gray-300 dark:bg-[#121212] z-30"
                : "invisible  hidden"
            }`}
          >
            <Link
              className="text-base flex items-center gap-2 hover:bg-indigo-600 duration-150 p-2 m-2 hover:rounded-md hover:m-3"
              to="/"
              onClick={handleNavOff}
            >
              <FaSearch /> Search
            </Link>
            <Link
              className="text-base flex items-center gap-2 hover:bg-indigo-600 duration-150 p-2 m-2 hover:rounded-md hover:m-3"
              to="/watchlist"
              onClick={handleNavOff}
            >
              <FaBookmark />
              Watchlist
            </Link>
            <Link
              className="text-base flex items-center gap-2 hover:bg-indigo-600 duration-150 p-2 m-2 hover:rounded-md hover:m-3"
              to="/login"
              onClick={handleNavOff}
            >
              <FaUserCircle /> Profile
            </Link>
            <button
              className="text-base flex items-center gap-2 hover:bg-indigo-600 duration-150 p-2 m-2 hover:rounded-md hover:m-3"
              onClick={handleNavAndTheme}
            >
              <CgDarkMode />
              {theme === "dark" ? "Light" : "Dark"}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
