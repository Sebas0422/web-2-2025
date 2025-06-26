import { useMemo } from "react";
import {jwtDecode} from "jwt-decode";
import { login, logout } from "../services/authService";

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

  const loginUser = (user) => {
    login(user)
      .then(response => {
        console.log('Inicio de sesión exitoso:', response);
        localStorage.setItem('token', response.token);
      })
  }

  const logoutUser = () => {
    logout()
      .then(() => {
        console.log('Sesión cerrada exitosamente');
        localStorage.removeItem('token');
      })
  }

  return {
    isAuthenticated: !!token,
    permissions,
    login: loginUser,
    logout: logoutUser,
  };
}