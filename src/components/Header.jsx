import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaUserCircle, FaSearch, FaBookmark } from "react-icons/fa";
import { CgDarkMode } from "react-icons/cg";

export default function Header() {
  const [theme, setTheme] = useState("light");

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
    <header className="flex justify-center">
      <nav className="flex justify-between items-center p-4">
        <div className="flex gap-4 items-center justify-center">
          <Link className="text-sm flex items-center gap-2" to="/">
            <FaSearch /> Search
          </Link>
          <Link className="text-sm flex items-center gap-2" to="/watchlist">
            <FaBookmark />
            Watchlist
          </Link>
          <button
            className="text-sm flex items-center gap-2"
            onClick={handleThemeSwitch}
          >
            <CgDarkMode />
            {theme === "dark" ? "LightMode" : "DarkMode"}
          </button>
          <Link className="text-sm flex items-center gap-2" to="/login">
            <FaUserCircle /> Login
          </Link>
        </div>
      </nav>
    </header>
  );
}
