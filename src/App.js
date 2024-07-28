import React from 'react';
import { useRoutes } from "react-router-dom";
import ThemeRoutes from "./routes/Router";
import { LoginModalProvider } from './components/auth/LoginModalContext';
import LoginModal from './components/auth/LoginModal';

const App = () => {
  const routing = useRoutes(ThemeRoutes);
  return <div className="dark">{routing}</div>;
};

export default App;
