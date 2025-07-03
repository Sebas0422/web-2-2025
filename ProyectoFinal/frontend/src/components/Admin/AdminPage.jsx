import { useEffect, useState } from 'react';
import { SidebarWithToggle } from '../../utilities/SidebarMenu';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

export const AdminPage = () => {
  const [selectedMenu, setSelectedMenu] = useState('');
  const [titleContent, setTitleContent] = useState('Selecciona una opción');
  const location = useLocation();
  const navigate = useNavigate();

  const opcionMenu = ['pokemons', 'users', 'items', 'moves'];

  useEffect(() => {
    const current = location.pathname.split('/')[2];
    setSelectedMenu(current || '');
    switch (current) {
      case 'pokemons':
        setTitleContent('Gestión de Pokemons');
        break;
      case 'users':
        setTitleContent('Gestión de Usuarios');
        break;
      case 'items':
        setTitleContent('Configuración de Items');
        break;
      case 'moves':
        setTitleContent('Configuración de Movimientos');
        break;
      default:
        setTitleContent('Selecciona una opción');
    }
  }, [location.pathname]);

  const handleMenuClick = (menu) => {
    navigate(`/admin/${menu}`);
  };

  return (
    <SidebarWithToggle
      selectedMenu={selectedMenu}
      setSelectedMenu={handleMenuClick}
      opcionMenu={opcionMenu}
      titleContent={titleContent}
      opcionRender={() => <Outlet />}
    />
  );
};
