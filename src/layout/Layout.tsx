import { Outlet } from "react-router-dom";
import Header from "../components/common/header/Header";

const MainLayout = () => {
  return (
    <div className="flex flex-col items-center">
      <header className="fixed top-0 left-0 w-full z-50 p-5 bg-white shadow">
        <Header />
      </header>
      <main className="">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
