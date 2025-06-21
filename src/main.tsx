

// src/main.tsx


import React, { StrictMode, useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AppRoutes from './routes/AppRoutes';
import { store, type RootState } from './app/store';
import { logout } from './features/auth/authSlice';
import { isTokenExpired } from './utils/tokenHelper';
import { createRoot } from "react-dom/client"
import ErrorBoundary from './components/ErrorBoundry';
import { BrowserRouter } from 'react-router-dom';

// ⛑️ Wrap this logic in a separate component inside Provider
const AuthWatcher = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    const interval = setInterval(() => {
      if (token && isTokenExpired(token)) {
        dispatch(logout());

        import('react-toastify').then(({ toast }) =>
          toast.info('Session expired. Please login again.')
        );

      }
    }, 5000);

    return () => clearInterval(interval);
  }, [token, dispatch]);

  return null;
};





createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ErrorBoundary>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
      <AuthWatcher />
      <ToastContainer />
    </ErrorBoundary>
  </Provider>
)