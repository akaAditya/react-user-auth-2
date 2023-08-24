import React from 'react';
import Navbar from './components/navbar/Navbar';
import { Route, Switch } from 'react-router-dom';
import SignUp from './components/signUp/SignUp';
import Home from './components/home/Home';


function App() {
  return (
    <React.Fragment>
      <Navbar />
    <Switch>
      <Route path='/'>
        <SignUp />
      </Route>
      <Route path='/home'>
        <Home />
      </Route>
    </Switch>

    </React.Fragment>
  );
}

export default App;
