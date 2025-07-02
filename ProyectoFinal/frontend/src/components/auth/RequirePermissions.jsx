import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export function RequirePermissions({ children, permissions = [], verifiedAllPermissions = false }) {
  const { isAuthenticated, permissions: userPermissions, loading } = useAuth();

  // Espera a que la verificación de autenticación termine
  if (loading) return <p>Cargando...</p>; // También podrías mostrar <p>Cargando...</p>

  // Si no está autenticado, redirige al login
  if (!isAuthenticated) return <Navigate to="/login" />;

  // Verificación de permisos
  if (verifiedAllPermissions) {
    const hasAll = permissions.every((p) => userPermissions.includes(p));
    if (!hasAll) return <Navigate to="/unauthorized" />;
  } else {
    const hasAny = permissions.some((p) => userPermissions.includes(p));
    if (!hasAny) return <Navigate to="/unauthorized" />;
  }

  return children;
}
