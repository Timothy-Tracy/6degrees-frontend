// UserContext.js
import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { useEffect } from 'react';
import { useDebug } from './DebugContext';
import { useAPI } from "./APIContext";
import { useGlobalError } from '../context/ErrorContext';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const { debug } = useDebug();
  const { globalError, setError: setGlobalError } = useGlobalError();
  const { APIObj } = useAPI();

  const [user, setUser] = useState(null);
  const [status, setStatus] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const refreshUserContext = useCallback(async () => {
    debug('refreshing user context');
    try {
      const response = await APIObj.get('/api/auth/verify');
      if (response.status === 200) {
        setStatus(true);
        setUser(response.data);
      }
    } catch (error) {
      setGlobalError(error);
      logout();
    }
  }, [APIObj, debug, setGlobalError]);

  const login = useCallback((userData) => {
    setUser(userData);
    setStatus(true);
  }, []);

  const logout = useCallback(async () => {
    
    try {
      const response = await APIObj.post('/api/auth/logout');
      if (response.status === 200) {
        setUser(null);
        setStatus(false);
        setIsAdmin(false);
      }
    } catch (error) {
      setGlobalError(error);
      
    }
    // Note: You might need to call an API endpoint to clear the cookie on the server
  }, []);

  useEffect(() => {
    if (user?.role === 'ADMIN' && status) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [user, status]);

  useEffect(() => {
    refreshUserContext();
  }, []); // Only run on mount

  const value = useMemo(() => ({
    user,
    login,
    logout,
    status,
    isAdmin,
    refreshUserContext
  }), [user, login, logout, status, isAdmin, refreshUserContext]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => useContext(UserContext);

export { UserProvider, useUser };