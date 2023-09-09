import React, { useContext } from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/home/Home";
import AuthContext from "./authStore/auth-context";
import UserAuth from "./components/signUp/UserAuth";
import Profile from "./components/profile/Profile";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import Homepage from "./components/home/Homepage";
import Expenses from "./components/expenses/Expenses";

function App() {
  const authContext = useContext(AuthContext);
  return (
    <React.Fragment>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/expense">
            {authContext.loggedIn && <Expenses />}
            {!authContext.loggedIn && <Redirect to="/auth" />}
          </Route>
          <Route path="/home">
            {authContext.loggedIn && <Home />}
            {!authContext.loggedIn && <Redirect to="/auth" />}
          </Route>
          <Route path="/auth">
            {!authContext.loggedIn && <UserAuth />}
            {authContext.loggedIn && <p>You are successfully logged in</p>}
          </Route>

          <Route path="/profile">
            {authContext.loggedIn && <Profile />}
            {!authContext.loggedIn && <Redirect to="/auth" />}
          </Route>

          <Route path="/">
            <Homepage />
          </Route>
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
