import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export function RequireUserAdminPermission({ children }) {
  const { isAuthenticated, permissions } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" />;
  if (!permissions.includes("admin")) return <Navigate to="/unauthorized" />;

  return children;
}