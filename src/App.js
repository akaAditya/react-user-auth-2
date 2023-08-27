import React, { useContext } from 'react';
import Navbar from './components/navbar/Navbar';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/home/Home';
import AuthContext from './authStore/auth-context';
import UserAuth from './components/signUp/UserAuth';
import Profile from './components/profile/Profile';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';


function App() {
  const authContext = useContext(AuthContext);
  return (
    <React.Fragment>
    <Router>
      <Navbar />
    <Switch>
      <Route path='/auth'>
        {!authContext.loggedIn && <UserAuth />}
        {authContext.loggedIn && <Home />}
        {!authContext.loggedIn && <Redirect to='/auth'/>}
      </Route>
      <Route path='/'>
        <Home />
      </Route>
      <Route path='/profile'>
        <Profile />
      </Route>
    </Switch>
    </Router>

    </React.Fragment>
  );
}

export default App;
