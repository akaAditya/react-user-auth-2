import React from "react";

const AuthContext = React.createContext({
  token: "",
  localId : '',
  profile : '',
  loggedIn: false,
  Login: (token) => {},
  Logout : ()=>{},
  LocalID : (localId)=>{},
  ProfileData : (profile)=>{},
});

export default AuthContext;
