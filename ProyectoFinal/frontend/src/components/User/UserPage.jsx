import { useState, useEffect } from 'react';
import { SidebarWithToggle } from '../Utilities/SidebarMenu';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export const UserPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth();

  const [selectedMenu, setSelectedMenu] = useState('dashboard');
  const opcionMenu = ['dashboard', 'profile', 'settings'];

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      console.log('UserPage: User not authenticated, navigating to login');
      navigate('/login');
    }
  }, [isAuthenticated, loading, navigate]);

  const opcionRender = () => {
    switch (selectedMenu) {
      case 'dashboard':
        return <p>Este es el Dashboard del Usuario</p>;
      case 'profile':
        return <p>Perfil del Usuario</p>;
      case 'settings':
        return <p>Configuración de la Cuenta</p>;
      default:
        return <p>Selecciona una opción</p>;
    }
  };

  if (loading) return <p>Cargando...</p>; // Mostrar algo mientras verifica

  if (!isAuthenticated) return null; // Mientras navega fuera, no mostrar nada

  return (
    <SidebarWithToggle
      selectedMenu={selectedMenu}
      setSelectedMenu={setSelectedMenu}
      opcionRender={opcionRender}
      opcionMenu={opcionMenu}
    />
  );
};
