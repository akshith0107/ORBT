import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Topbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useAuth() || {};

  // Fix 1.4: Use actual user initials
  const initials = user?.name 
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)
    : '??';

  return (
    <header className="topbar">
      <div style={{ flex: 1 }}>
        {/* Fix 1.3: Controlled input */}
        <input 
          type="text" 
          placeholder="Search metrics..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            color: 'var(--text-primary)',
            padding: '6px 12px',
            borderRadius: 'var(--radius-sm)',
            width: '240px',
            fontSize: '0.875rem',
            outline: 'none'
          }}
        />
      </div>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        {/* Fix 1.5: Disabled settings button with tooltip */}
        <button 
          title="Settings are not yet implemented"
          disabled
          style={{ 
            background: 'none', 
            border: 'none', 
            color: 'var(--text-secondary)', 
            cursor: 'not-allowed',
            opacity: 0.5
          }}
        >
          <Settings size={20} />
        </button>
        <div style={{ 
          width: '32px', 
          height: '32px', 
          borderRadius: '50%', 
          backgroundColor: 'var(--accent-purple)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          fontSize: '0.875rem', 
          fontWeight: 'bold',
          color: 'white'
        }}>
          {initials}
        </div>
      </div>
    </header>
  );
}
