import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import ROUTE_PATH from "../constant/route/route";
import Auth from "../pages/auth/Auth";
import NotFound from "../pages/not-found/Not-Found";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTE_PATH.HOME} element={<Home />} />
      <Route path={ROUTE_PATH.AUTH} element={<Auth />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default MainRoutes;
