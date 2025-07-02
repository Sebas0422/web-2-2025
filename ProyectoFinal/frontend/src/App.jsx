import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { AppRouter } from './AppRouter';
import { PokedexContextProvider } from './components/context/PokedexProvider';

function App() {
  return (
    <PokedexContextProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </PokedexContextProvider>
  );
}

export default App;
