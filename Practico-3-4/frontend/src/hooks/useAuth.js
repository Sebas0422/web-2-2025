import { useMemo } from "react";
import {jwtDecode} from "jwt-decode";

export function useAuth() {
  const token = localStorage.getItem("token");  

  const permissions = useMemo(() => {
    if (!token) return [];
    try {
      const payload = jwtDecode(token);
      return payload.permissions || [];
    } catch {
      return [];
    }
  }, [token]);

  return {
    isAuthenticated: !!token,
    permissions,
  };
}