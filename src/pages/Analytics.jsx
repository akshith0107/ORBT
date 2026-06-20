import React from 'react';
import { Trophy, Flame, Target, Activity, BarChart2 } from 'lucide-react';

export default function Analytics() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)' }}>
      <div>
        <h1 className="text-xl font-semibold" style={{ marginBottom: '4px' }}>Productivity Intelligence</h1>
        <p className="text-sm text-secondary">Advanced metrics, workload analysis, and life equilibrium.</p>
      </div>

      {/* TOP KPI CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--spacing-md)' }}>
        {[
          { label: 'Productivity Score', value: '0%', icon: Trophy, color: 'var(--status-success)' },
          { label: 'Burnout Risk', value: 'Unknown', icon: Flame, color: 'var(--status-warning)' },
          { label: 'Task Completion', value: '0%', icon: Target, color: 'var(--status-info)' },
          { label: 'Habit Consistency', value: 'None', icon: Activity, color: 'var(--accent-purple)' }
        ].map((kpi, i) => (
          <div key={i} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <kpi.icon size={16} color={kpi.color} />
              <div className="text-sm text-secondary font-medium">{kpi.label}</div>
            </div>
            <div className="text-2xl font-bold">{kpi.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-xl)' }}>
        
        {/* Productivity Trends (Moved from Dashboard) */}
        <div className="card" style={{ height: '360px', display: 'flex', flexDirection: 'column' }}>
          <h2 className="text-base font-semibold mb-4">Productivity Trends</h2>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', border: '1px dashed var(--border-subtle)', borderRadius: 'var(--radius-sm)' }}>
             Complete tasks and habits to unlock trend charts.
          </div>
        </div>

        {/* Life Equilibrium Radar (Moved from Dashboard) */}
        <div className="card" style={{ height: '360px', display: 'flex', flexDirection: 'column' }}>
          <h2 className="text-base font-semibold mb-4">Life Equilibrium</h2>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', border: '1px dashed var(--border-subtle)', borderRadius: 'var(--radius-sm)' }}>
             More activity required to generate equilibrium analysis.
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--spacing-xl)' }}>
        
        {/* Category Analytics & Performance Charts */}
        <div className="card" style={{ height: '300px', display: 'flex', flexDirection: 'column' }}>
          <h2 className="text-base font-semibold mb-4">Category Analytics</h2>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
             No category data available.
          </div>
        </div>

        {/* Burnout Analysis & Global Insights */}
        <div className="card" style={{ height: '300px', display: 'flex', flexDirection: 'column' }}>
           <h2 className="text-base font-semibold mb-4">Burnout Analysis</h2>
           <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
             Workload is stable. Track more tasks for AI analysis.
           </div>
        </div>

        {/* Monthly Reports */}
        <div className="card" style={{ height: '300px', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-card-hover)', border: '1px solid var(--border-subtle)' }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
             <BarChart2 size={18} color="var(--accent-purple-light)" />
             <h2 className="text-base font-semibold">Monthly Reports</h2>
           </div>
           <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
              Report generation locked until end of month.
           </div>
        </div>
      </div>
    </div>
  );
}
