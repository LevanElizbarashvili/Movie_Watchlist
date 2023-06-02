import Homescreen from "./Homescreen";
import Watchlist from "./Watchlist";
import { createContext, useState } from "react";
import ReactSwitch from "react-switch";

export const ThemeContext = createContext(null);

export default function App() {
  const [showHomeScreen, setShowHomeScreen] = useState(true);
  const [theme, setTheme] = useState("dark");

  function toggleTheme() {
    setTheme((prev) => (prev == "dark" ? "light" : "dark"));
  }

  function handleClick() {
    setShowHomeScreen(!showHomeScreen);
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="app" id={theme}>
        <header className="head-nav">
          <h1>Find your film</h1>
          <div className="switch-container">
            <label>{theme === "dark" ? "Light Mode" : "Dark Mode"}</label>
            <ReactSwitch
              className="switch"
              onChange={toggleTheme}
              checked={theme === "dark"}
            />
            <button className="rout-btn" id="FavList" onClick={handleClick}>
              {showHomeScreen ? "My Watchlist" : "Search for movies"}
            </button>
          </div>
        </header>
        {showHomeScreen ? <Homescreen /> : <Watchlist />}
      </div>
    </ThemeContext.Provider>
  );
}
