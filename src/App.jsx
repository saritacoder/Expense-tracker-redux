import React, { useContext, Suspense } from 'react';
import './App.css';
import Header from './components/header/Header';
import { Navigate, Route, Routes } from 'react-router-dom';
import AuthContext from './context/AuthContext';

// Lazy loading components for code splitting
const Signup = React.lazy(() => import('./components/login/SignUp'));
const Profile = React.lazy(() => import('./components/profile/Profile'));
const ForgotPassword = React.lazy(() => import('./components/forgotPassword/ForgotPassword'));
const Expenses = React.lazy(() => import('./components/expenses/Expenses'));

const App = () => {
  const authCtx = useContext(AuthContext);

  return (
    <div>
      <Header>
        {/* Suspense provides a fallback while the lazy-loaded components are being fetched */}
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Signup />} />
            <Route path="/login" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Protecting routes from direct access if the user is not logged in */}
            <Route
              path="/profile"
              element={authCtx.isLoggedIn ? <Profile /> : <Navigate to="/login" />}
            />
            <Route
              path="/expense"
              element={authCtx.isLoggedIn ? <Expenses /> : <Navigate to="/login" />}
            />
          </Routes>
        </Suspense>
      </Header>
    </div>
  );
};

export default App;
