import { useState } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useLocalStorage } from './hooks/useLocalStorage';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Beats from './pages/Beats';
import BeatDetail from './pages/BeatDetail';
import Financeiro from './pages/Financeiro';
import Clientes from './pages/Clientes';
import Licencas from './pages/Licencas';
import RedesSociais from './pages/RedesSociais';
import Colaboracoes from './pages/Colaboracoes';
import Configuracoes from './pages/Configuracoes';
import { Menu } from 'lucide-react';
import BottomNav from './components/BottomNav';

export default function App() {
  const { data, updateEntity, isLoading } = useLocalStorage('deepbeat_v1');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => setIsAuthenticated(false);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  if (!isAuthenticated && location.pathname !== '/login') {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="app-container">
      {isAuthenticated && <Sidebar onLogout={handleLogout} isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />}
      
      <main className={isAuthenticated ? "main-content" : ""} style={{ 
        width: isAuthenticated ? 'auto' : '100vw', 
        marginLeft: '0'
      }}>
        {isAuthenticated && (
          <>
            <button 
              onClick={toggleSidebar}
              className="btn btn-secondary desktop-menu-btn"
              style={{ 
                position: 'fixed', 
                top: '1rem', 
                left: '1rem', 
                zIndex: 90, 
                padding: '0.5rem',
                backgroundColor: 'var(--card)',
                border: '1px solid var(--border)'
              }}
            >
              <Menu size={24} />
            </button>
            <div className="mobile-bottom-nav">
              <BottomNav toggleSidebar={toggleSidebar} />
            </div>
          </>
        )}
        <div className="page-wrapper">
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} data={data} />} />
            <Route path="/dashboard" element={<Dashboard data={data} isLoading={isLoading} />} />
            <Route path="/beats" element={<Beats data={data} updateEntity={updateEntity} />} />
            <Route path="/beats/:id" element={<BeatDetail data={data} updateEntity={updateEntity} />} />
            <Route path="/financeiro" element={<Financeiro data={data} updateEntity={updateEntity} />} />
            <Route path="/clientes" element={<Clientes data={data} updateEntity={updateEntity} />} />
            <Route path="/licencas" element={<Licencas data={data} updateEntity={updateEntity} />} />
            <Route path="/redes-sociais" element={<RedesSociais data={data} updateEntity={updateEntity} />} />
            <Route path="/colaboracoes" element={<Colaboracoes data={data} updateEntity={updateEntity} />} />
            <Route path="/configuracoes" element={<Configuracoes data={data} updateEntity={updateEntity} />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
