import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../auth/useAuth";
import { ROLE_HOME } from "./roleHome";

const PublicRoute = () => {
  const { user, loading } = useAuth();

  if (loading) return null; // or spinner

  if (user) {
    return <Navigate to={ROLE_HOME[user.role]} replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
