import React, { Suspense } from "react";
// import ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client';
import "./assets/scss/style.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, HashRouter } from "react-router-dom";
import Loader from "./layouts/loader/Loader";
import { UserProvider, useUser } from "./components/context/UserContext";
import { DebugProvider } from "./components/context/DebugContext";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { APIProvider } from "./components/context/APIContext";
import { ErrorProvider } from './components/context/ErrorContext';
import ErrorBoundary from './errors/ErrorBoundary';
import { LoginModalProvider } from './components/auth/LoginModalContext';
import LoginModal from './components/auth/LoginModal';
import { NodeProvider } from "./components/context/NodeContext";

import { NotificationProvider } from './components/context/NotificationContext.js';
import NotificationContainer from './components/notifications/NotificationContainer.js';
const queryClient = new QueryClient();
const {refreshUserContext} = useUser;


const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <QueryClientProvider client={queryClient}>
  <Suspense fallback={<Loader />}>
  <ErrorProvider>
  <ErrorBoundary>
    
    <BrowserRouter>
      
        <DebugProvider>
          <APIProvider>
            <UserProvider>
              <NotificationProvider>
              {refreshUserContext}
              <LoginModalProvider>
      {/* Your other app components */}
      <LoginModal />
      <NotificationContainer/>
      <App />
      
      
    </LoginModalProvider>
              
    </NotificationProvider>
            </UserProvider>
          </APIProvider>

        </DebugProvider>
      

    </BrowserRouter>
    </ErrorBoundary>
    </ErrorProvider>
  </Suspense>
  </QueryClientProvider>
  ,

  // document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
