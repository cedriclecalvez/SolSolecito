import React, {useState,useEffect}from 'react';

import Header from './Components/Header';
import EventCard from './Components/EventCard'; 

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';





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
            
            <Typography style={{display:"flex",justifyContent:"center",marginTop:50}} component="h1" variant="h3">
                Bienvenidos a Sol Solecito
            </Typography>
            {/* <h1 >Bienvenidos a Sol Solecito</h1> */}
            <div style={{display:"flex",justifyContent:"center"}}>
                <h2>Elige el evento que te gusta y reservalo !</h2>
            </div>

            <div>
                {eventList.map((event,i)=>{
                                
                console.log("---------props de event dans homeScreen",event);

                    return <Container component="main" maxWidth="md" >
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
        </div>   
    )
};

export default HomeScreen;