import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../layout/Layout";
<<<<<<< HEAD
import ROUTE_PATH from "../constant/route/route";
import Loading from "../components/common/loading/Loading";
import PackagePlanDetail from "../pages/package-plan-detail/PackagePlanDetailPage";
import AllPackagePage from "../pages/all-package/AllPackagePage";

const Home = lazy(() => import("../pages/home/Home"));
const Auth = lazy(() => import("../pages/auth/Auth"));
const NotFound = lazy(() => import("../pages/not-found/Not-Found"));
=======
import GymPackagePage from "../pages/gym-package/page"
import BowlingPackagePage from  "../pages/bowling-package/page";
import PackagePlan from "../pages/package-plan/page"
import ManagePackage from "../pages/manage-package/page"
>>>>>>> origin/yen-thao

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
<<<<<<< HEAD
      { path: ROUTE_PATH.HOME, element: <Home /> },
      { path: ROUTE_PATH.PACKAGE_PLAN_DETAIL, element: <PackagePlanDetail /> },
      { path: ROUTE_PATH.ALL_PACKAGE, element: <AllPackagePage /> },
    ],
=======
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
      },
      {
        path: "/manage-package",
        element: <ManagePackage />   
      }
    ]
>>>>>>> origin/yen-thao
  },
  { path: ROUTE_PATH.AUTH, element: <Auth /> },
  { path: "*", element: <NotFound /> },
]);

export default function MainRoutes() {
  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
