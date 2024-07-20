import React, { createContext, useContext, useState, useCallback } from 'react';
import { logError } from '../errors/errorLogger';

const ErrorContext = createContext();

export function ErrorProvider({ children }) {
  const [globalError, setGlobalError] = useState(null);

  const setError = useCallback((error, info = {}) => {
    setGlobalError(error);
    logError('Global Error Context', error, info);
  }, []);

  const clearError = useCallback(() => {
    setGlobalError(null);
  }, []);

  return (
    <ErrorContext.Provider value={{ globalError, setError, clearError }}>
      {children}
    </ErrorContext.Provider>
  );
}

export function useGlobalError() {
  return useContext(ErrorContext);
}