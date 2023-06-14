import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useState } from "react";
import { createContext } from "react";

export const ThemeContext = createContext(null);

export default function Layout() {
  const [theme, setTheme] = useState("dark");

  function toggleTheme() {
    setTheme((prev) => (prev == "dark" ? "light" : "dark"));
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="site-wrapper" value={{ theme, toggleTheme }}>
        <Header />
        <main id={theme}>
          <Outlet />
        </main>
        <Footer />
      </div>
    </ThemeContext.Provider>
  );
}
