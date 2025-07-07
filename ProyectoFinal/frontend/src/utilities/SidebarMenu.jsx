import { useEffect, useRef, useState } from 'react';
import { Menu } from 'lucide-react';
import { ProfileMenu } from '../components/User/ProfileMenu';

export const SidebarWithToggle = ({
  selectedMenu,
  setSelectedMenu,
  opcionRender,
  opcionMenu,
  titleContent,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    };

    if (sidebarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarOpen]);

  return (
    <div className="flex h-screen overflow-hidden">
      <aside
        ref={sidebarRef}
        className={`transition-all duration-300 bg-gray-800 text-white space-y-2 p-4 ${
          sidebarOpen ? 'w-64' : 'w-0 p-0 overflow-hidden'
        }`}
      >
        {sidebarOpen && (
          <>
            <h2 className="text-xl font-bold mb-4">Menú Principal</h2>
            <ul className="space-y-2">
              {opcionMenu.map((item) => (
                <li
                  key={item}
                  className={`cursor-pointer p-2 rounded hover:bg-gray-700 ${
                    selectedMenu === item ? 'bg-gray-700' : ''
                  }`}
                  onClick={() => setSelectedMenu(item)}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </li>
              ))}
            </ul>
          </>
        )}
      </aside>

      <main className="flex-1 bg-gray-100 p-6 relative overflow-auto">
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="absolute top-4 left-4 z-10 text-gray-800"
          >
            <Menu className="w-6 h-6" />
          </button>
        )}

        <div className="flex justify-between items-center mb-6 mt-4">
          <h1 className="text-2xl font-bold">{titleContent}</h1>
          <ProfileMenu />
        </div>

        <div className="bg-white p-4 rounded shadow">{opcionRender()}</div>
      </main>
    </div>
  );
};
