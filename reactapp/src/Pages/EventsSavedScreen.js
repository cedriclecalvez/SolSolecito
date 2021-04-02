import React, {useState,useEffect}from 'react';
import {connect} from 'react-redux'

import Header from './Components/Header';
import EventCard from './Components/EventCard'; 


import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';





function EventsSavedScreen(props){

    const [eventList,setEventList] = useState ([]);
    
    // useEffect avec fonction reprenant tous mes events sauvés
    useEffect(() => {

        const findEvents = async () => {


            // envoie des données event vers le backend
            const dataToBackend = await fetch ('/events/allMyEventsSaved',{
                method:'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                body: `_id=${props.userInfo._id}`
            })
        
            const retourData = await dataToBackend.json()
            // console.log("----------retourData du backend updated",retourData);
            
            setEventList(retourData.allEventsSaved);
        }

    findEvents()
    },[])

    console.log("-----------from backend allEventsSaved",eventList);








    return(
        <div>
            <Header/>
            
            <Typography style={{display:"flex",justifyContent:"center",marginTop:50}} component="h1" variant="h3">
                Tus eventos registrados
            </Typography>
            
            <div style={{display:"flex",justifyContent:"center"}}>
                <h2>Aqui puedes ver todos tus eventos donde vas a ir !</h2>
            </div>

            <div>
                <Grid container item style={{display:"flex", flexDirection:"row", justifyContent:"center"}}>
                    {eventList.map((event,i)=>{              
                    // console.log("---------props de event dans EventsSavedScreen",event);

                        return  <Grid key={i} xs={12} sm={6} md={4} lg={3} xl={3} style={{marginBottom:50, marginRight:20}}>
                                    <EventCard style={{marginBottom:50}}
                                            key={i}
                                            event={event}
                                            parent="cancelParticipation"
                                    />                            
                                </Grid>
                                    
                                    
                    })}
                </Grid>
            </div>             
        </div>   
    )
};




function mapStateToProps(state) {
    return {userInfo:state.userInfo}
}

  export default connect(
    mapStateToProps,
    null 
  )(EventsSavedScreen);