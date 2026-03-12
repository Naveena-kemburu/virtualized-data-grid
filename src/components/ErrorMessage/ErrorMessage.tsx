import React from 'react';
import './ErrorMessage.css';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="error-container" role="alert" aria-live="assertive">
      <div className="error-icon" aria-hidden="true">⚠️</div>
      <h3 className="error-title">Error</h3>
      <p className="error-message">{message}</p>
      {onRetry && (
        <button className="retry-button" onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  );
};
