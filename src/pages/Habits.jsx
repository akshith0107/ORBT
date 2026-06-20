import React, { useState } from 'react';
import { Plus, BrainCircuit, Activity, CalendarDays, TrendingUp } from 'lucide-react';

export default function Habits() {
  const [habits] = useState([]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 className="text-xl font-semibold" style={{ marginBottom: '4px' }}>Habit Intelligence Center</h1>
          <p className="text-sm text-secondary">Monitor consistency, optimize routines, and build long-term systems.</p>
        </div>
        <button className="btn btn-primary" style={{ display: 'flex', gap: '8px' }}>
          <Plus size={16} /> Create Habit
        </button>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--spacing-md)' }}>
        {[
          { label: 'Active Habits', value: '0', color: 'var(--accent-purple)' },
          { label: 'Current Streak', value: '0 Days', color: 'var(--status-success)' },
          { label: 'Habit Completion Rate', value: '0%', color: 'var(--status-info)' },
          { label: 'Consistency Score', value: '0', color: 'var(--status-warning)' }
        ].map((kpi, i) => (
          <div key={i} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span className="text-sm text-secondary">{kpi.label}</span>
            <span className="text-xl font-semibold" style={{ color: kpi.color }}>{kpi.value}</span>
          </div>
        ))}
      </div>

      {/* Consistency Matrix */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CalendarDays size={18} color="var(--accent-purple-light)" />
          <h2 className="text-base font-semibold">Consistency Matrix</h2>
        </div>
        <div style={{ padding: 'var(--spacing-xl)', textAlign: 'center', color: 'var(--text-secondary)', border: '1px dashed var(--border-subtle)', borderRadius: 'var(--radius-sm)' }}>
           No activity logged yet.
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-xl)' }}>
        
        {/* Habit Library & Rankings */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: 'var(--spacing-md) var(--spacing-lg)', borderBottom: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-app)' }}>
            <h2 className="text-base font-semibold">Habit Library</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr', padding: 'var(--spacing-md) var(--spacing-lg)', borderBottom: '1px solid var(--border-subtle)', fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
            <div>Habit</div><div>Category</div><div>Frequency</div><div>Streak</div><div>Success Rate</div><div>Completion %</div>
          </div>
          <div>
            {habits.length === 0 ? (
              <div style={{ padding: 'var(--spacing-xl)', textAlign: 'center', color: 'var(--text-secondary)' }}>
                No habits found. Create your first habit.
              </div>
            ) : null}
          </div>
        </div>

        {/* AI Habit Coach */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)' }}>
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BrainCircuit size={18} color="var(--accent-purple-light)" />
              <h2 className="text-base font-semibold">AI Habit Coach</h2>
            </div>
            <div style={{ padding: 'var(--spacing-lg)', textAlign: 'center', color: 'var(--text-secondary)', backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 'var(--radius-sm)' }}>
               Create habits to enable Coach Analysis.
            </div>
          </div>
          
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <TrendingUp size={18} color="var(--status-info)" />
              <h2 className="text-base font-semibold">Habit Performance</h2>
            </div>
            <div style={{ padding: 'var(--spacing-lg)', textAlign: 'center', color: 'var(--text-secondary)' }}>
               Not enough data.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
