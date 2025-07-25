import { useState } from 'react';

function ChartCard({ title, description, actions, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="chart-card">
      <div className="chart-card-header">
        <h3>{title}</h3>
        <div className="chart-card-actions">
          {actions}
          <button
            type="button"
            className="chart-toggle-btn"
            title={open ? 'Hide Chart' : 'Show Chart'}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? 'Hide' : 'Show'}
          </button>
        </div>
      </div>
      {description && <p className="chart-desc">{description}</p>}
      {open && <div className="chart-wrapper">{children}</div>}
    </div>
  );
}

export default ChartCard;
