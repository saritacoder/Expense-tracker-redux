import React from 'react'
import {createContext} from 'react';

const AuthContext = createContext({
token:'',
isLoggedIn:false,
login:(token)=>{},
logout:()=>{}
}) 

export const AuthProvider = (props) => {
const [token,setToken]=useState(()=>localStorage.getItem('idToken'));

const userIsLoggedIn = !!token ; // true if token is not null or not empty string but false if it is null or empty string

const loginHandler = (token)=>{
    console.log('user logged in', token);
    setToken(token);
    localStorage.setItem('idToken', token); // stores the token in local storage so that on refresh of page it can be accessed

}
const logoutHandler =()=>{
    console.log('user logged out');
    setToken(null);
    localStorage.removeItem('idToken');
}

const contextValue={
    token:token,
    isLoggedIn:userIsLoggedIn,
    login:loginHandler,
    logout:logoutHandler,
}

return(
    <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
)
}



export default AuthContext
