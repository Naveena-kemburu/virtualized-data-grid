import React from 'react';
import './LoadingSpinner.css';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="loading-container" role="status" aria-live="polite">
      <div className="spinner" aria-hidden="true"></div>
      <p className="loading-text">Loading data...</p>
    </div>
  );
};
