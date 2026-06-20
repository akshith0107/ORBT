import React, { useState } from 'react';
import { Plus, BrainCircuit, Sparkles, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';

export default function Tasks() {
  const [tasks] = useState([]);
  const [expandedTaskId, setExpandedTaskId] = useState(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 className="text-xl font-semibold" style={{ marginBottom: '4px' }}>Task Intelligence Center</h1>
          <p className="text-sm text-secondary">AI-powered planning, prioritization, and execution.</p>
        </div>
        <button className="btn btn-primary" style={{ display: 'flex', gap: '8px' }}>
          <Plus size={16} /> Create Task
        </button>
      </div>

      <div className="card" style={{ display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '40px 2fr 1fr 1fr 1fr 1fr 1fr', padding: 'var(--spacing-md) var(--spacing-lg)', borderBottom: '1px solid var(--border-subtle)', fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
          <div></div><div>Task</div><div>Priority</div><div>Difficulty</div><div>Status</div><div>Due Date</div><div>Est. Time</div>
        </div>
        <div>
          {tasks.length === 0 ? (
            <div style={{ padding: 'var(--spacing-xl)', textAlign: 'center', color: 'var(--text-secondary)' }}>
              <div className="text-lg font-semibold mb-2">No tasks created yet.</div>
              <div>Create your first task to initiate AI analysis.</div>
            </div>
          ) : (
            tasks.map((task) => (
              <div key={task.id}>
                {/* ... Task Rows would go here ... */}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Execution Center Panel */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)', backgroundColor: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-focus)' }}>
         <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
           <Sparkles size={20} color="var(--accent-purple-light)" />
           <h2 className="text-lg font-semibold">Execution Center</h2>
         </div>
         
         <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)', padding: 'var(--spacing-xl)', textAlign: 'center', color: 'var(--text-secondary)', backgroundColor: 'var(--bg-app)', borderRadius: 'var(--radius-md)', border: '1px dashed var(--border-subtle)' }}>
            Select a task from the list above to view its AI breakdown, subtasks, and execution plan.
         </div>
      </div>

    </div>
  );
}
