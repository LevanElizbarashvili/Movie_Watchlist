import Homescreen from "./pages/Homescreen";
import Watchlist from "./pages/Watchlist";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";

export default function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Homescreen />}></Route>
            <Route path="/watchlist" element={<Watchlist />}></Route>
            <Route path="/login" element={<Login />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
