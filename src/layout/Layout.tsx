import { Outlet } from "react-router-dom";
import Header from "../components/common/header/Header";
import Footer from "../components/common/footer/Footer";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="fixed top-0 left-0 w-full z-50 p-5 bg-white shadow">
        <Header />
      </header>

      <main className="flex-1 w-full py-20 justify-center items-center">
        <Outlet />
      </main>
      {/* Footer */}
      <footer
        id="contact"
        className="bg-gray-900 border-t-2 border-borderlight text-text-primary py-16"
      >
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;
