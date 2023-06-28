import { Link } from "react-router-dom";
import ReactSwitch from "react-switch";
import { useContext } from "react";
import { ThemeContext } from "./Layout";
import { FaUserCircle, FaSearch, FaClipboardCheck } from "react-icons/fa";

export default function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header>
      <nav>
        <Link className="title" to="/">
          Find Your film
        </Link>
        <div className="router-links">
          <div className="switch-container">
            <label>{theme === "dark" ? "🌙" : "☀️"}</label>
            <ReactSwitch
              className="switch"
              onChange={toggleTheme}
              checked={theme === "dark"}
              width={40}
              height={20}
            />
          </div>
          <Link className="rout-btn" to="/">
            <FaSearch /> Search
          </Link>
          <Link className="rout-btn" to="/watchlist">
            <FaClipboardCheck />
            Watchlist
          </Link>
          <Link className="rout-btn" to="/login">
            <FaUserCircle /> Login
          </Link>
        </div>
      </nav>
    </header>
  );
}
