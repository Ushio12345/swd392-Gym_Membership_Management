import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/home/Home";
import ROUTE_PATH from "../constant/route/route";
import Auth from "../pages/auth/Auth";
import NotFound from "../pages/not-found/Not-Found";
import MainLayout from "../layout/Layout";
import GymPackagePage from "../pages/gym-package/page"
import BowlingPackagePage from  "../pages/bowling-package/page";
import PackagePlan from "../pages/package-plan/page"

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: ROUTE_PATH.HOME,
        element: <Home />,
      },
      {
        path: "/gym-package",
        element: <GymPackagePage />      
      },
      {
        path: "/bowling-package",
        element: <BowlingPackagePage />   
      },
      {
        path: "/package-plan",
        element: <PackagePlan />   
      }
    ]
  },

  {
    path: ROUTE_PATH.AUTH,
    element: <Auth />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

const MainRoutes = () => {
  return <RouterProvider router={router} />;
};
export default MainRoutes;
