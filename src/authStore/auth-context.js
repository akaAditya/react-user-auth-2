import React from "react";

const AuthContext = React.createContext({
  token: "",
  loggedIn: false,
  Login: (token) => {},
});

export default AuthContext;
