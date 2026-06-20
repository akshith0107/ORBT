import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, Calendar as CalendarIcon, BrainCircuit, Activity, Target } from 'lucide-react';

export default function Sidebar() {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Habits', path: '/habits', icon: Target },
    { name: 'Tasks', path: '/tasks', icon: CheckSquare },
    { name: 'Calendar', path: '/calendar', icon: CalendarIcon },
    { name: 'AI Coach', path: '/ai-coach', icon: BrainCircuit },
    { name: 'Analytics', path: '/analytics', icon: Activity },
  ];

  return (
    <aside className="sidebar">
      <div style={{ padding: 'var(--spacing-lg)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'white' }}>
          <BrainCircuit size={24} color="var(--accent-purple)" />
          <span style={{ fontWeight: '600', fontSize: '1.125rem' }}>HabitEngine AI</span>
        </div>
      </div>
      <nav style={{ padding: 'var(--spacing-md) 0', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === '/'} // Fix 1.1: Dashboard NavLink Always Active
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '8px 20px',
              color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
              textDecoration: 'none',
              fontSize: '0.875rem',
              fontWeight: isActive ? '500' : '400',
              borderLeft: isActive ? '3px solid var(--accent-purple)' : '3px solid transparent',
              backgroundColor: isActive ? 'rgba(255,255,255,0.03)' : 'transparent'
            })}
          >
            <item.icon size={18} />
            {item.name}
          </NavLink>
        ))}
      </nav>
      <div style={{ marginTop: 'auto', padding: 'var(--spacing-lg)' }}>
        {/* Fix 1.6: Upgrade to Pro Button - added title and disabled styling */}
        <button 
          className="btn btn-primary" 
          style={{ width: '100%', display: 'flex', gap: '8px', opacity: 0.5, cursor: 'not-allowed' }}
          title="Upgrading to Pro is not yet available"
          disabled
        >
          <span>Upgrade to Pro</span>
        </button>
      </div>
    </aside>
  );
}
