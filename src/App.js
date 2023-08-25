import React, { useContext } from 'react';
import Navbar from './components/navbar/Navbar';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/home/Home';
import AuthContext from './authStore/auth-context';
import UserAuth from './components/signUp/UserAuth';


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
      </Route>
      <Route path='/home'>
        <Home />
      </Route>
    </Switch>
    </Router>

    </React.Fragment>
  );
}

export default App;
