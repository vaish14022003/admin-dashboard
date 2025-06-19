

// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import AppRoutes from './routes/AppRoutes';

// const App = () => {
//   return (
//     <>
//       <AppRoutes />
//       <ToastContainer />
//     </>
//   );
// };

// export default App;


// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// import AppRoutes from './routes/AppRoutes';
// import type { RootState } from './app/store';
// import { logout } from './features/auth/authSlice';
// import { isTokenExpired } from './utils/tokenHelper';

// const App = () => {
//   const dispatch = useDispatch();
//   const token = useSelector((state: RootState) => state.auth.token);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (isTokenExpired(token)) {
//         dispatch(logout());
//       }
//     }, 5000); // checks every 5 seconds

//     return () => clearInterval(interval); // cleanup
//   }, [token, dispatch]);

//   return (
//     <>
//       <AppRoutes />
//       <ToastContainer />
//     </>
//   );
// };

// export default App;


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
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [token, dispatch]);

  return null;
};

// const App = () => {
//   return (
//     <Provider store={store}>
//       <AppRoutes />
//       {/* <AuthWatcher />
//       <ToastContainer /> */}
//     </Provider>
//   );
// };

// export default App;



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