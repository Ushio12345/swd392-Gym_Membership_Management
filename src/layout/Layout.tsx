import { Outlet } from "react-router-dom";
import Header from "../components/common/header/Header";
import Footer from "../components/common/footer/Footer";

const MainLayout = () => {
  return (
    <div className="flex flex-col items-center">
      <header className="fixed top-0 left-0 w-full z-50 p-5 bg-white shadow">
        <Header />
      </header>
      <main className="">
        <Outlet />
      </main>

      <footer id="contact" className="bg-gray-900 text-text-primary py-16">
        {" "}
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;
