import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NavMenuBar } from './pages/shared/NavMenuBar';
import AppRoutes from './routes/AppRoutes';

const App = () => {
  return (
    <BrowserRouter>
      <NavMenuBar />
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
