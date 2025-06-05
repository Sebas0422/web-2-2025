import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/auth/Login';
import './index.css';
import { RequireUserAdminPermission } from './components/auth/RequireAdminUser';
import { AdminPage } from './components/AdminPage';
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path='/unauthorized' element={<h1 className='text-2xl text-red-500'>Unauthorized</h1>} />
        <Route   
          path="/admin"
          element={
            <RequireUserAdminPermission>
              <AdminPage />
            </RequireUserAdminPermission>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
