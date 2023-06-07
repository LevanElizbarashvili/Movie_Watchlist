import Homescreen from "./pages/Homescreen";
import Watchlist from "./pages/Watchlist";
import { createContext, useState } from "react";
import ReactSwitch from "react-switch";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

export const ThemeContext = createContext(null);

export default function App() {
  const [theme, setTheme] = useState("dark");

  function toggleTheme() {
    setTheme((prev) => (prev == "dark" ? "light" : "dark"));
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="app" id={theme}>
        <BrowserRouter>
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
          <Routes>
            <Route path="/" element={<Homescreen />}></Route>
            <Route path="/" element={<Homescreen />}></Route>
            <Route path="/watchlist" element={<Watchlist />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeContext.Provider>
  );
}
