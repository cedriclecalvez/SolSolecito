import React, {useState,useEffect}from 'react';

import Header from './Components/Header';
import EventCard from './Components/EventCard'; 

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';




function HomeScreen(){


 // useEffect avec fonction reprenant tous les events
 const [eventList,setEventList] = useState ([]);
//  const [enventLoaded,setEnventLoaded] = useState (false);


 useEffect(() => {
   const findEvents = async () => {
     const data = await fetch(`/events/getAllEvents`)
     const body = await data.json()
     setEventList(body.allEvents);
   }
   findEvents()
},[])

console.log("-----------eventList from backend",eventList);

// if (eventList.length!=0){
//  setEnventLoaded(true)
//  } else{console.log("eventList est vide")}
 







    return(
        <div>
            <Header/>
            <h1>Bienvenidos a Sol Solecito</h1>
            <h2>Elige el evento que te gusta y reservalo !</h2>
            <Container component="main" maxWidth="md" justify="flex-center">
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        {eventList.map((event,i)=>{
                            
                            console.log("---------props de event dans homeScreen",event);

                            <EventCard
                                key={i}
                                event={event}
                                />
                            // if (enventLoaded===true){
                                // } else {
                                //     console.log("error");
                                // }
                            
                        } )}
                        
                    </Grid>
                    {/* <Grid item xs={12} sm={6}>
                        <EventCard/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <EventCard/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <EventCard/>
                    </Grid> */}
                </Grid>
            </Container>
        </div>
               
        
        
    )
};

export default HomeScreen;