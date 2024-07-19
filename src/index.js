import React, { Suspense } from "react";
// import ReactDOM from "react-dom";
import { createRoot } from 'react-dom/client';
import "./assets/scss/style.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { HashRouter } from "react-router-dom";
import Loader from "./layouts/loader/Loader";
import { UserProvider } from "./context/UserContext";
import { DebugProvider } from "./context/DebugContext";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { APIProvider } from "./context/APIContext";
const queryClient = new QueryClient();


const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <QueryClientProvider client={queryClient}>
  <Suspense fallback={<Loader />}>
    <HashRouter>
      
        <DebugProvider>
          <APIProvider>
            <UserProvider>

              <App />

            </UserProvider>
          </APIProvider>

        </DebugProvider>
      

    </HashRouter>
  </Suspense>
  </QueryClientProvider>
  ,

  // document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
