import React from 'react';
import { Sparkles, BrainCircuit, Activity, RefreshCw, Plus } from 'lucide-react';

export default function AICoach() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-lg)', height: '100%' }}>
      {/* Main Analysis Area */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 className="text-xl font-semibold">Systems Architecture</h1>
            <p className="text-sm text-secondary" style={{ marginTop: '4px' }}>Optimizing your workflows for sustained output.</p>
          </div>
          <button className="btn btn-primary" style={{ display: 'flex', gap: '8px' }}>
            <Plus size={16} /> New System
          </button>
        </div>

        <div className="card" style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-lg)' }}>
            <h2 className="text-base font-medium" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BrainCircuit size={18} color="var(--accent-purple-light)" /> AI Task Decomposition
            </h2>
            <button className="btn btn-outline" style={{ padding: '4px 8px', fontSize: '0.75rem', display: 'flex', gap: '4px' }}>
              <RefreshCw size={12} /> Regenerate
            </button>
          </div>
          
          <div style={{ padding: 'var(--spacing-md)', backgroundColor: 'var(--bg-app)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', marginBottom: 'var(--spacing-md)' }}>
            <div className="font-semibold text-lg" style={{ marginBottom: '8px' }}>Build All-New Tracker</div>
            <p className="text-sm text-secondary">Break down complex goals into actionable micro-steps.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)', padding: 'var(--spacing-xl)', alignItems: 'center', color: 'var(--text-secondary)' }}>
             Select a task to generate AI micro-steps.
          </div>
        </div>
      </div>

      {/* Side Panel */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
        <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
           <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'rgba(124, 58, 237, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--spacing-md)' }}>
              <BrainCircuit size={32} color="var(--accent-purple)" />
           </div>
           <h2 className="text-lg font-semibold">Coach Vector</h2>
           <p className="text-sm text-secondary mt-2">More activity needed to analyze workload and burnout risk.</p>
           
           <div style={{ width: '100%', marginTop: 'var(--spacing-lg)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
              <div style={{ backgroundColor: 'var(--bg-app)', padding: 'var(--spacing-md)', borderRadius: 'var(--radius-sm)' }}>
                <div className="text-xs text-secondary mb-1">Efficiency Factor</div>
                <div className="text-xl font-semibold">0.00</div>
              </div>
              <div style={{ backgroundColor: 'var(--bg-app)', padding: 'var(--spacing-md)', borderRadius: 'var(--radius-sm)' }}>
                <div className="text-xs text-secondary mb-1">Burnout Risk</div>
                <div className="text-xl font-semibold text-secondary">Unknown</div>
              </div>
           </div>
        </div>

        <div className="card">
          <h2 className="text-base font-medium mb-4" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={16} color="var(--accent-purple-light)" /> Smart Rescheduling
          </h2>
          <p className="text-sm text-secondary mb-4">
            No pending tasks need rescheduling at this time.
          </p>
        </div>
      </div>
    </div>
  );
}
