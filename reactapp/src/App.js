import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';

import LoginScreen from './Pages/LoginScreen';
import HomeScreen from './Pages/HomeScreen';
// import CreateEvent from './Pages/CreateEvent';
// import EventScreen from './Pages/EventScreen';
// import ProfilScreen from './Pages/ProfilScreen';
// import MyEventScreen from './Pages/MyEventScreen';
// import MyOtherEventScreen from './Pages/MyOtherEventScreen';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={LoginScreen}/>
        <Route path="/HomeScreen" exact component={HomeScreen}/>
        {/* <Route path="/CreateEvent" exact component={CreateEvent}/>
        <Route path="/EventScreen" exact component={EventScreen}/>
        <Route path="/ProfilScreen" exact component={ProfilScreen}/>
        <Route path="/MyEventScreen" exact component={MyEventScreen}/>
        <Route path="/MyOtherEventScreen" exact component={MyOtherEventScreen}/> */}
      </Switch>
    </Router>
  );
}

export default App;