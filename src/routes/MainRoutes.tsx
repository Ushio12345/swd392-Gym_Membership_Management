import { Route, Routes } from "react-router-dom";
import AuthLayout from "../layouts/auth/AuthLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Home from "../pages/home/Home";
import ROUTE_PATH from "../constant/route/route";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTE_PATH.HOME} element={<Home />} />
      <Route path={ROUTE_PATH.AUTH} element={<AuthLayout />}>
        {/* <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} /> */}
      </Route>
    </Routes>
  );
};

export default MainRoutes;
