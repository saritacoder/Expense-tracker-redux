import { useState,useContext } from 'react'
import './App.css'
// import Header from './components/header/Header'
import { Navigate, Route, Routes } from 'react-router-dom';
import AuthContext from './context/AuthContext';
import Profile from './components/profile/Profile';
import Header from './components/header/Heade';
import Signup from './components/login/Signup';
import ForgotPassword from './components/forgotpassword/ForgotPassword';

function App() {
const authCtx = useContext(AuthContext);

  return (
    <>
    <Header>
<Routes>
<Route path="/" element={<Signup />} />
<Route path="/login" element={<Signup />} />
<Route path="/forgot-password" element={<ForgotPassword />} />

<Route   path="/profile"  element={authCtx.isLoggedIn ? <Profile /> : <Navigate to="/login" />}      />     
             
           
      
</Routes>
   
 
    </Header>
 
    </>
  )
}

export default App
