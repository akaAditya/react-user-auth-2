import React from "react";

const AuthContext = React.createContext({
  token: "",
  localId : '',
  profile : '',
  loggedIn: false,
  Login: (token) => {},
  LocalID : (localId)=>{},
  ProfileData : (profile)=>{},
});

export default AuthContext;
