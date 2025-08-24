import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../layout/Layout";
import ROUTE_PATH from "../constant/route/route";
import Loading from "../components/common/loading/Loading";
import PackagePlanDetail from "../pages/package-plan-detail/PackagePlanDetailPage";
import AllPackagePage from "../pages/all-package/AllPackagePage";

const Home = lazy(() => import("../pages/home/Home"));
const Auth = lazy(() => import("../pages/auth/Auth"));
const NotFound = lazy(() => import("../pages/not-found/Not-Found"));

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: ROUTE_PATH.HOME, element: <Home /> },
      { path: ROUTE_PATH.PACKAGE_PLAN_DETAIL, element: <PackagePlanDetail /> },
      { path: ROUTE_PATH.ALL_PACKAGE, element: <AllPackagePage /> },
    ],
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
