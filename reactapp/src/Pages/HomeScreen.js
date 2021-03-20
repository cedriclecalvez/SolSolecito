import React, {useState,useEffect}from 'react';

import Header from './Components/Header';
import EventCard from './Components/EventCard'; 

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';




function HomeScreen(){


    const [eventList,setEventList] = useState ([]);
    
    // useEffect avec fonction reprenant tous les events

    useEffect(() => {
    const findEvents = async () => {
        const data = await fetch(`/events/getAllEvents`)
        const body = await data.json()
        setEventList(body.allEvents);
    }
    findEvents()
    },[])

    console.log("-----------eventList from backend",eventList);









    return(
        <div>
            <Header/>
            <h1 >Bienvenidos a Sol Solecito</h1>
            <h2>Elige el evento que te gusta y reservalo !</h2>
            
            {eventList.map((event,i)=>{
                            
            console.log("---------props de event dans homeScreen",event);

                return <Container component="main" maxWidth="md" justify="flex-center">
                            <Grid container spacing={3} style={{marginTop:20}}>
                                <Grid item xs={12} md={6}>
                                    <EventCard
                                        key={i}
                                        event={event}
                                    />                            
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
            })}
                       
                        
        </div>
               
        
        
    )
};

export default HomeScreen;