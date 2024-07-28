// PathContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PathContext = createContext();

export const PathProvider = ({ children }) => {
  const [lastPath, setLastPath] = useState('/');
  const location = useLocation();

  useEffect(() => {
    setLastPath(location.pathname);
  }, [location]);

  return (
    <PathContext.Provider value={{ lastPath, setLastPath }}>
      {children}
    </PathContext.Provider>
  );
};

export const usePath = () => useContext(PathContext);