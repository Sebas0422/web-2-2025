import { useState, useEffect } from 'react';
import { SidebarWithToggle } from '../../utilities/SidebarMenu';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

export const UserPage = () => {
  const [selectedMenu, setSelectedMenu] = useState('');
  const [titleContent, setTitleContent] = useState('Selecciona una opción');
  const location = useLocation();
  const navigate = useNavigate();

  const opcionMenu = ['teams'];

  useEffect(() => {
    const current = location.pathname.split('/')[1];
    setSelectedMenu(current || '');
    console.log('Current path:', current);
    switch (current) {
      case 'teams':
        setTitleContent('Gestión de Teams');
        break;
      default:
        setTitleContent('Selecciona una opción');
    }
  }, [location.pathname]);

  const handleMenuClick = (menu) => {
    navigate(`/${menu}`);
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
