import React from 'react';
import { Clock, CheckCircle2, AlertCircle, BrainCircuit } from 'lucide-react';

export default function Dashboard() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)' }}>
      <div>
        <h1 className="text-xl font-semibold" style={{ marginBottom: '4px' }}>Dashboard</h1>
        <p className="text-sm text-secondary">What you need to focus on today.</p>
      </div>

      {/* Quick Productivity Overview (KPIs) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--spacing-md)' }}>
        {[
          { label: 'Tasks Due Today', value: '0', trend: 'Focus Required', color: 'var(--status-warning)' },
          { label: 'Today\'s Habits', value: '0', trend: 'Consistency check', color: 'var(--accent-purple)' },
          { label: 'Active Tasks', value: '0', trend: 'In execution', color: 'var(--status-info)' },
          { label: 'Productivity Score', value: '0%', trend: 'No Activity', color: 'var(--status-success)' }
        ].map((metric, i) => (
          <div key={i} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span className="text-sm text-secondary">{metric.label}</span>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
              <span className="text-xl font-semibold">{metric.value}</span>
              <span className="text-xs" style={{ color: metric.color }}>
                {metric.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-xl)' }}>
        
        {/* Execution Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)' }}>
          {/* Today's Tasks */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: 'var(--spacing-md) var(--spacing-lg)', borderBottom: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-app)' }}>
              <h2 className="text-base font-semibold">Today's Tasks</h2>
            </div>
            <div style={{ padding: 'var(--spacing-xl)', textAlign: 'center', color: 'var(--text-secondary)' }}>
               No tasks due today. Enjoy your day!
            </div>
          </div>

          {/* Today's Habits */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: 'var(--spacing-md) var(--spacing-lg)', borderBottom: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-app)' }}>
              <h2 className="text-base font-semibold">Today's Habits</h2>
            </div>
            <div style={{ padding: 'var(--spacing-xl)', textAlign: 'center', color: 'var(--text-secondary)' }}>
               No habits scheduled for today.
            </div>
          </div>
        </div>

        {/* Intelligence Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)' }}>
          {/* AI Recommendations */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BrainCircuit size={18} color="var(--accent-purple-light)" />
              <h2 className="text-base font-semibold">AI Recommendations</h2>
            </div>
            <div style={{ padding: 'var(--spacing-lg)', textAlign: 'center', color: 'var(--text-secondary)', border: '1px dashed var(--border-subtle)', borderRadius: 'var(--radius-sm)' }}>
               Complete tasks and habits to generate actionable daily recommendations.
            </div>
          </div>

          {/* Upcoming Deadlines */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
               <Clock size={18} color="var(--status-warning)" />
               <h2 className="text-base font-semibold">Upcoming Deadlines</h2>
             </div>
             <div style={{ padding: 'var(--spacing-md)', textAlign: 'center', color: 'var(--text-secondary)' }}>
                No upcoming deadlines in the next 7 days.
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}
