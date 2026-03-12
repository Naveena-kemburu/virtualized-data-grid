import React from 'react';
import { useDataStore } from '../../store/dataStore';
import './StatsBar.css';

export const StatsBar: React.FC = React.memo(() => {
  const { rawData, displayData } = useDataStore();

  return (
    <div className="stats-bar" role="status" aria-live="polite">
      <div className="stat-item">
        <span className="stat-label">Total Items:</span>
        <span className="stat-value">{rawData.length.toLocaleString()}</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">Filtered Items:</span>
        <span className="stat-value">{displayData.length.toLocaleString()}</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">Performance:</span>
        <span className="stat-value stat-success">Optimized</span>
      </div>
    </div>
  );
});

StatsBar.displayName = 'StatsBar';
