import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { useEffect } from 'react';
import { useDebug } from './DebugContext';
import { useAPI } from "./APIContext";
import { useGlobalError } from '../context/ErrorContext';
import useError from '../../hooks/useError';
import {LogoutNotification, LoginProgressNotification, LoginSuccessNotification} from '../notifications/auth/AuthNotifications'
import { useNotification } from './NotificationContext';
const UserContext = createContext();

const UserProvider = ({ children }) => {
  const { debug } = useDebug();
  const { globalError, setError: setGlobalError } = useGlobalError();
  const { APIObj } = useAPI();
  const {addNotification, updateNotification} = useNotification();
  const {handleError} = useError()

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [status, setStatus] = useState(() => {
    return localStorage.getItem('userStatus') === 'true';
  });
  const [isAdmin, setIsAdmin] = useState(false);

  const refreshUserContext = useCallback(async (force = false) => {
    const currentTime = Date.now();
    const lastRefreshTime = parseInt(localStorage.getItem('lastUserRefresh') || '0');
    const refreshInterval = 5 * 60 * 1000; // 5 minutes

    if (force || currentTime - lastRefreshTime > refreshInterval) {
      debug('refreshing user context');
      let notif = null;
      try {
        const response = await APIObj.get('/api/auth/verify');
        notif=addNotification(LoginProgressNotification)
        if (response.status === 200) {
          setUser(response.data);
          setStatus(true);
          localStorage.setItem('user', JSON.stringify(response.data));
          localStorage.setItem('userStatus', 'true');
          localStorage.setItem('lastUserRefresh', currentTime.toString());
          updateNotification(notif, LoginSuccessNotification)
        }
      } catch (error) {
        handleError(error)
        logout();
      }
    } else {
      debug('skipping user context refresh');
    }
  }, [APIObj, debug]);

  const login = useCallback((userData) => {
    setUser(userData);
    setStatus(true);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('userStatus', 'true');
    localStorage.setItem('lastUserRefresh', Date.now().toString());
  }, []);
 

  const logout = useCallback(async () => {
    if(status){
      debug('Logging Out')
      try {
        const response = await APIObj.post('/api/auth/logout');
        if (response.status === 200) {
          setUser(null);
          setStatus(false);
          setIsAdmin(false);
          localStorage.removeItem('user');
          localStorage.removeItem('userStatus');
          localStorage.removeItem('lastUserRefresh');
          addNotification(LogoutNotification)
        }
      } catch (error) {
        handleError(error)
      } finally {

      }
    }
  }, [APIObj, debug, status]);

  useEffect(() => {
    if (status) {
      refreshUserContext();
    }
  }, []); // Only run on mount if the user is logged in

  useEffect(() => {
    if (user?.role === 'ADMIN' && status) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [user, status]);

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