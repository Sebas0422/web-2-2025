import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { LogOut, User, LayoutGrid } from 'lucide-react';
import { useEffect } from 'react';

export const ProfileMenu = () => {
  const { logout, getUserProfile, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (loading) return; // Esperar a que se cargue el estado de autenticación
      try {
        const userProfile = await getUserProfile();
        setUser(userProfile);
      } catch (error) {
        console.error('Error al obtener el perfil del usuario:', error);
      }
    };
    fetchUserProfile();
  }, [getUserProfile, loading]);

  const isAdmin = user?.permissions?.includes('admin');
  const isOnAdminPage = location.pathname.startsWith('/admin');

  const handleToggle = () => setOpen(!open);
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleNavigateToUser = () => navigate('/');
  const handleNavigateToAdmin = () => navigate('/admin');

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={handleToggle}
        className="flex items-center space-x-2 px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
      >
        <User className="w-5 h-5 text-gray-600" />
        <span className="text-sm text-gray-700">{user?.name || 'Usuario'}</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1">
            {isAdmin && (
              <button
                onClick={isOnAdminPage ? handleNavigateToUser : handleNavigateToAdmin}
                className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 flex items-center gap-2"
              >
                <LayoutGrid className="w-4 h-4" />
                {isOnAdminPage ? 'Ir al menú de usuario' : 'Ir al panel admin'}
              </button>
            )}

            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-gray-100 flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Cerrar sesión
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
