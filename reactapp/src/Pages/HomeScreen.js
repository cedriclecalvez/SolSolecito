import React, {useState,useEffect}from 'react';

import Header from './Components/Header';
import EventCard from './Components/EventCard'; 

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';







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

                    return <Box display="flex" flexWrap="wrap" justifyContent="center" alignContent="center">
                                <Grid style={{marginBottom:50}}>
                                    <EventCard style={{marginBottom:50}}
                                        key={i}
                                        event={event}
                                        parent="HomePage"
                                    />    
                                </Grid> 
                            </Box>                 
                })}
            </div>


        </div>   
    )
};

export default HomeScreen;