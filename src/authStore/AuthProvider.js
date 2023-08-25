import React, { useState } from 'react'
import AuthContext from './auth-context'

const AuthProvider = (props) => {
    const defaultTokenVal = localStorage.getItem('token')
    const [token, setToken] = useState(defaultTokenVal);
    const isLoggedIn = !!token;

    
    const loginHandler = (token) =>{
        setToken(token);
        localStorage.setItem('token', token)
    }

    const authContext = {
        token : token,
        loggedIn : isLoggedIn,
        Login : loginHandler
    }

  return (
    <AuthContext.Provider value={authContext}>
    {props.children}
    </AuthContext.Provider>
  )
}

export default AuthProvider