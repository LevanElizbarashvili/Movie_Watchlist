import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="dark:bg-[#121212] dark:text-gray-300">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
