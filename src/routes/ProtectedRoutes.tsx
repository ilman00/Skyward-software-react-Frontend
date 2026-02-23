import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../auth/useAuth";
import type { JSX } from "react";
import { ROLE_HOME } from "./roleHome";

interface Props {
  children: JSX.Element;
  roles?: string[];
}

const ProtectedRoute = ({ children, roles }: Props) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return null;

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  console.log("User role:", user.role);

  if (roles && !roles.includes(user.role)) {
    return <Navigate to={ROLE_HOME[user.role]} replace />;
  }

  return children;
};

export default ProtectedRoute;
