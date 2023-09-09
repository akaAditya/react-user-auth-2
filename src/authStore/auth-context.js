import React from "react";

const AuthContext = React.createContext({
  token: "",
  localId : '',
  profile : '',
  email: '',
  loggedIn: false,
  Login: (token) => {},
  Logout : ()=>{},
  emailStore : (email)=>{},
  LocalID : (localId)=>{},
  ProfileData : (profile)=>{},
});

export default AuthContext;
