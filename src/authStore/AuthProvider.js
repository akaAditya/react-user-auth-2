import React, { useState } from 'react'
import AuthContext from './auth-context'

const AuthProvider = (props) => {
    const defaultTokenVal = localStorage.getItem('token')
    const [token, setToken] = useState(defaultTokenVal);
    const [profileData, setProfileData] = useState('');
    const [localId, setLocalId] = useState('');
    
    const isLoggedIn = !!token;

    
    const loginHandler = (token) =>{
        setToken(token);
        localStorage.setItem('token', token)
    }

    const profileDatahandler = (data)=>{
      setProfileData(data)
    }

    const localIdHandler = (localId)=>{
      setLocalId(localId)
    }
    const authContext = {
        token : token,
        profile: profileData,
        localId : localId,
        loggedIn : isLoggedIn,
        Login : loginHandler,
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