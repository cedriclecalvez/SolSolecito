import React, {useState,useEffect}from 'react';

import Header from './Components/Header';
import EventCard from './Components/EventCard'; 

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
           
            <div style={{display:"flex",justifyContent:"center"}}>
                <h2>Elige el evento que te gusta y reservalo !</h2>
            </div>

            <div >
                <Grid container item style={{display:"flex", flexDirection:"row", justifyContent:"center"}}>
                    {eventList.map((event,i)=>{            
                    console.log("---------props de event dans homeScreen",event);

                        return  <Grid key={i} xs={12} sm={6} md={4} lg={3} xl={3} style={{marginBottom:50, marginRight:20}}>
                                    <EventCard style={{marginBottom:50}}
                                        key={i}
                                        event={event}
                                        parent="HomePage"
                                    />    
                                </Grid> 
                                
                                            
                    })}
                </Grid>
            </div>

            

        </div>   
    )
};

export default HomeScreen;