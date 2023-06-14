import { Link } from "react-router-dom";
import ReactSwitch from "react-switch";
import { useContext } from "react";
import { ThemeContext } from "./Layout";

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
            />
          </div>
          <Link className="rout-btn" to="/">
            Search
          </Link>
          <Link className="rout-btn" to="/watchlist">
            Watchlist
          </Link>
        </div>
      </nav>
    </header>
  );
}
