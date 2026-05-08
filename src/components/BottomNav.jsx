import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Music, DollarSign, Menu } from 'lucide-react';

export default function BottomNav({ toggleSidebar }) {
  const links = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Home' },
    { to: '/beats', icon: Music, label: 'Beats' },
    { to: '/financeiro', icon: DollarSign, label: 'Sales' },
  ];

  return (
    <nav className="bottom-nav" style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      width: '100%',
      backgroundColor: 'var(--surface)',
      borderTop: '1px solid var(--border)',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: '0.75rem 0',
      paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))',
      zIndex: 90
    }}>
      {links.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          style={({ isActive }) => ({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.25rem',
            color: isActive ? 'var(--green)' : 'var(--muted)',
            textDecoration: 'none',
            fontSize: '0.75rem',
            fontWeight: isActive ? 600 : 400
          })}
        >
          <Icon size={24} />
          {label}
        </NavLink>
      ))}
      <button 
        onClick={toggleSidebar}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.25rem',
          color: 'var(--muted)',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: '0.75rem'
        }}
      >
        <Menu size={24} />
        Menu
      </button>
    </nav>
  );
}
