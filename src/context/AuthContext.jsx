/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';

const AuthContext = createContext({
  idToken: null,
  loggedIn: false,
  login: () => {},
  logout: () => {},
});

export default AuthContext;

export function AuthContextProvider({ children }) {
  const [idToken, setIdToken] = useState(localStorage.getItem('idToken'));

  const loggedIn = !!idToken;

  function handleLogin(idToken) {
    setIdToken(idToken);
    localStorage.setItem('idToken', idToken);
  }

  function handleLogout() {
    setIdToken(null);
    localStorage.removeItem('idToken');
  }

  const authCtxValue = {
    idToken: idToken,
    loggedIn: loggedIn,
    login: handleLogin,
    logout: handleLogout,
  };

  return (
    <AuthContext.Provider value={authCtxValue}>{children}</AuthContext.Provider>
  );
}
