import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import Card from './Components/Card'; 



function HomeScreen(){

    return(
        <div>
            <h1>ca a marché</h1>
            <h2>hello Homescreen</h2>
            <Card/>   
        </div>
               
        
        
    )
};

export default HomeScreen;