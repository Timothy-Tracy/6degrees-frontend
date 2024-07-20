import React from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './ErrorFallback.js';
import { logError } from './errorLogger.js';

function ErrorBoundary({ children }) {
  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, info) => logError('Error Boundary Catch', error, info)}
    >
      {children}
    </ReactErrorBoundary>
  );
}

export default ErrorBoundary;