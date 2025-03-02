import { Route, Switch, Redirect } from 'react-router-dom';

import { useSelector } from 'react-redux';

import Header from './components/Header/Header';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ExpensesPage from './pages/ExpensesPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  const loggedIn = useSelector((state) => state.authState.loggedIn);

  return (
    <>
      <Header />
      <Switch>
        <Route path="/" exact>
          <Redirect to="/profile" />
        </Route>

        <Route path="/profile">
          {loggedIn ? <ProfilePage /> : <Redirect to="/login" />}
        </Route>

        <Route path="/expenses">
          {loggedIn ? <ExpensesPage /> : <Redirect to="/login" />}
        </Route>

        <Route path="/login">
          {!loggedIn ? <LoginPage /> : <Redirect to="/profile" />}
        </Route>

        <Route path="/signup">
          {!loggedIn ? <SignUpPage /> : <Redirect to="/profile" />}
        </Route>

        <Route path="/forgot-password">
          {!loggedIn ? <ForgotPasswordPage /> : <Redirect to="/profile" />}
        </Route>

        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </>
  );
}
