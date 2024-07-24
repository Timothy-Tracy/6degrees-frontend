import React, { Suspense } from "react";
// import ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client';
import "./assets/scss/style.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, HashRouter } from "react-router-dom";
import Loader from "./layouts/loader/Loader";
import { UserProvider, useUser } from "./context/UserContext";
import { DebugProvider } from "./context/DebugContext";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { APIProvider } from "./context/APIContext";
import { ErrorProvider } from './context/ErrorContext';
import ErrorBoundary from './errors/ErrorBoundary';
import { LoginModalProvider } from './components/ui/auth/LoginModalContext';
import LoginModal from './components/ui/auth/LoginModal';
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
              {refreshUserContext}
              <LoginModalProvider>
      {/* Your other app components */}
      <LoginModal />
      <App />
    </LoginModalProvider>
              

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
