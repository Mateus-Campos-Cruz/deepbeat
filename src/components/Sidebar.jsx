import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Music, DollarSign, Users, FileCheck, Share2, Handshake, Settings, LogOut, Disc, X } from 'lucide-react';

export default function Sidebar({ onLogout, isOpen, toggleSidebar }) {
  const links = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/beats', icon: Music, label: 'Beats' },
    { to: '/financeiro', icon: DollarSign, label: 'Financeiro' },
    { to: '/clientes', icon: Users, label: 'Clientes' },
    { to: '/licencas', icon: FileCheck, label: 'Licenças' },
    { to: '/redes-sociais', icon: Share2, label: 'Redes Sociais' },
    { to: '/colaboracoes', icon: Handshake, label: 'Colaborações' },
    { to: '/configuracoes', icon: Settings, label: 'Configurações' },
  ];

  return (
    <>
      {isOpen && (
        <div 
          style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 95 }}
          onClick={toggleSidebar}
        />
      )}
      <aside style={{
        width: '240px',
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        backgroundColor: 'var(--surface)',
        borderRight: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        padding: '1.5rem 0',
        zIndex: 100,
        transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.3s ease'
      }}>
      <div style={{ padding: '0 1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'var(--purple)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Disc size={20} color="white" />
        </div>
        <h2 style={{ fontSize: '1.25rem', margin: 0, letterSpacing: '1px' }}>DEEP BEAT</h2>
      </div>

      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1.5rem',
              color: isActive ? 'white' : 'var(--muted)',
              background: isActive ? 'linear-gradient(90deg, rgba(124,58,237,0.2), transparent)' : 'transparent',
              borderLeft: isActive ? '3px solid var(--green)' : '3px solid transparent',
              transition: 'all 0.2s',
              textDecoration: 'none',
              fontWeight: isActive ? 600 : 400
            })}
          >
            <Icon size={20} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border)' }}>
        <button className="btn btn-secondary" style={{ width: '100%', justifyContent: 'flex-start' }} onClick={onLogout}>
          <LogOut size={18} />
          Sair
        </button>
      </div>
    </aside>
    </>
  );
}
