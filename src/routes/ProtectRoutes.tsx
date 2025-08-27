import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../lib/context/authContext";

export default function ProtectedRoute() {
  const token = localStorage.getItem("token");
  const { user } = useAuth();
  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
}
