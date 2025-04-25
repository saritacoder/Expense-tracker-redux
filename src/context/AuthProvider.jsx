"use client"

import { useState } from "react"
import AuthContext from "./AuthContext"

const AuthProvider = (props) => {
  // Initialized the token from localStorage
  const [token, setToken] = useState(() => localStorage.getItem("idToken"))

  const userIsLoggedIn = !!token // true if token is not null or not empty string but false if it is null or empty string

  const loginHandler = (token) => {
    console.log("User logged in with token: ", token) // for debugging purposes
    setToken(token) // update the token state to the particular token passed to this function
    localStorage.setItem("idToken", token) // stores the token in local storage so that on refresh of page it can be accessed
  }

  const logoutHandler = () => {
    console.log("User logged out") // for debugging purposes
    setToken(null) // cleared token that is set token to null to logout
    localStorage.removeItem("idToken") // Cleared the idToken from localStorage
    localStorage.removeItem("userEmail") // Also clear stored credentials on logout
    localStorage.removeItem("userPassword") // Also clear stored credentials on logout
  }

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  }

  return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}

export default AuthProvider
