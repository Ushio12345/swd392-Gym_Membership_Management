import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../lib/context/authContext";
import Loading from "../components/common/loading/Loading";
import { toast } from "react-toastify";

export default function StaffRoute() {
  const { token, user, loading } = useAuth();

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (!token || !user) {
    console.log("No token or user, redirecting to /auth");
    return <Navigate to="/auth" replace />;
  }

  if (!user.role || user.role !== "STAFF") {
    console.log("User role is not STAFF, redirecting to /auth");

    return <Navigate to="/*" replace />;
  }

  return <Outlet />;
}
