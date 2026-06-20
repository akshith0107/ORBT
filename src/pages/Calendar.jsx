import React from 'react';
import { CalendarDays, Activity, RefreshCcw } from 'lucide-react';

export default function Calendar() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)' }}>
      <div>
        <h1 className="text-xl font-semibold" style={{ marginBottom: '4px' }}>Schedule Intelligence</h1>
        <p className="text-sm text-secondary">AI-optimized daily planning and workload distribution.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-xl)' }}>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)' }}>
          {/* Calendar Interface */}
          <div className="card" style={{ height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px' }}>
             <CalendarDays size={48} color="var(--border-focus)" />
             <div className="text-secondary font-medium">Calendar Interface Module</div>
          </div>
          
          {/* Scheduled Tasks & Habits */}
          <div className="card">
             <h2 className="text-base font-semibold mb-4">Scheduled Tasks & Habits</h2>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
               <div className="text-sm text-secondary text-center" style={{ padding: 'var(--spacing-lg)' }}>
                 No scheduled tasks or habits found.
               </div>
             </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)' }}>
          {/* Workload Forecast */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Activity size={18} color="var(--status-info)" />
              <h2 className="text-base font-semibold">Workload Forecast</h2>
            </div>
            <div className="text-sm text-secondary" style={{ padding: 'var(--spacing-md) 0', textAlign: 'center' }}>
               No planned hours. Create tasks to forecast workload.
            </div>
          </div>

          {/* Missed Task Recovery */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '12px', border: '1px solid var(--status-warning)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <RefreshCcw size={18} color="var(--status-warning)" />
              <h2 className="text-base font-semibold text-status-warning">Missed Task Recovery</h2>
            </div>
            <p className="text-sm text-secondary leading-relaxed" style={{ textAlign: 'center', padding: 'var(--spacing-md) 0' }}>
               You are completely caught up! No tasks need recovery.
            </p>
          </div>

          {/* AI Recommended Time Blocks */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
             <h2 className="text-base font-semibold">AI Recommended Time Blocks</h2>
             <div className="text-sm text-secondary" style={{ textAlign: 'center', padding: 'var(--spacing-md) 0' }}>
               AI scheduling disabled. Track more activity to unlock recommendations.
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}
