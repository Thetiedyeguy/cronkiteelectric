// client/src/components/ErrorBanner.jsx
import React from 'react';
import styles from './ErrorBanner.module.css';

const ErrorBanner = ({ message, onRetry, label = 'Warning' }) => {
  return (
    <div className={styles.banner} role="alert">
      <div className={styles.content}>
        <span className={styles.icon} role="img" aria-label={label}>⚠️</span>
        <span className={styles.message}>{message}</span>
      </div>
      {onRetry && (
        <button className={styles.retryButton} onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorBanner;