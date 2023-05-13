import Homescreen from "./Homescreen";
import Watchlist from "./Watchlist";
import { useState } from "react";

export default function App() {
  const [showHomeScreen, setShowHomeScreen] = useState(true);

  function handleClick() {
    setShowHomeScreen(!showHomeScreen);
  }

  return (
    <div>
      <header className="head-nav">
        <h1>Find your film</h1>
        <button className="switch" id="FavList" onClick={handleClick}>
          {showHomeScreen ? "My Watchlist" : "Search for movies"}
        </button>
      </header>
      {showHomeScreen ? <Homescreen /> : <Watchlist />}
    </div>
  );
}
