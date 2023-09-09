import React, { useState } from 'react'
import AuthContext from './auth-context'

const AuthProvider = (props) => {
    const defaultTokenVal = localStorage.getItem('token')
    const initialEmailLocalStorage = localStorage.getItem('email')
    const [token, setToken] = useState(defaultTokenVal);
    const [profileData, setProfileData] = useState('');
    const [localId, setLocalId] = useState('');
    const [email, setEmail] = useState(initialEmailLocalStorage);

    
    const isLoggedIn = !!token;

    
    const loginHandler = (token) =>{
        setToken(token);
        localStorage.setItem('token', token)
    }
    const logoutHandler = () =>{
      setToken(null)
      localStorage.removeItem('token')
      localStorage.removeItem('email')
  }

    const profileDatahandler = (data)=>{
      setProfileData(data)
    }

    const localIdHandler = (localId)=>{
      setLocalId(localId)
    }

    const emailHandler = (email) => {
      setEmail(email)
      localStorage.setItem('email', email)
  }

    const authContext = {
        token : token,
        profile: profileData,
        localId : localId,
        loggedIn : isLoggedIn,
        email: email,
        emailStore : emailHandler,
        Login : loginHandler,
        Logout : logoutHandler,
        LocalID: localIdHandler,
        ProfileData : profileDatahandler
    }

  return (
    <AuthContext.Provider value={authContext}>
    {props.children}
    </AuthContext.Provider>
  )
}

export default AuthProvider