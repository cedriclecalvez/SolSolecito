import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';

import {Provider} from  'react-redux';
import {createStore, combineReducers} from 'redux';
import eventInfo from './reducers/eventInfo.reducer';
import userInfo from './reducers/userInfo.reducer';


import SignInScreen from './Pages/SignInScreen';
import SignUpScreen from './Pages/SignUpScreen';
import HomeScreen from './Pages/HomeScreen';
import CreateEvent from './Pages/CreateEvent';
import EventScreen from './Pages/EventScreen';
import ProfilScreen from './Pages/ProfilScreen';
import MyEventScreen from './Pages/MyEventScreen';
import EventsSavedScreen from './Pages/EventsSavedScreen';

import Footer from './Pages/Components/Footer';



const store = createStore(combineReducers({eventInfo,userInfo}));


function App() {
  return (
    <Provider store={store}>

      <Router>
        
        <Switch>
            <Route path="/" exact component={SignInScreen}/>
            <Route path="/SignUpScreen" exact component={SignUpScreen}/>
            <Route path="/HomeScreen" exact component={HomeScreen}/>
            <Route path="/CreateEvent" exact component={CreateEvent}/>
            <Route path="/EventScreen" exact component={EventScreen}/>
            <Route path="/ProfilScreen" exact component={ProfilScreen}/>
            <Route path="/MyEventScreen" exact component={MyEventScreen}/>
            <Route path="/EventsSavedScreen" exact component={EventsSavedScreen}/>       
        </Switch>

        <Footer/>
        
      </Router>

    </Provider>
  );
}

export default App;