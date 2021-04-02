import React, {useState,useEffect}from 'react';
import {connect} from 'react-redux';


import Header from './Components/Header';
import EventCard from './Components/EventCard'; 

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';





function MyEventScreen(props){

    // console.log("----------props",props);
    // console.log("----------props.userInfo.token",props.userInfo.token);
    // console.log("----------props.userInfo._id",props.userInfo._id);


    const [myEventList,setMyEventList] = useState ([]);
    
    // useEffect avec fonction reprenant tous mes events
   
    useEffect(() => {

        const findEvents = async () => {
            // envoie des données event vers le backend
            const dataToBackend = await fetch ('/events/getMyEvents',{
                method:'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                body: `_id=${props.userInfo._id}`
            })
        
            const retourData = await dataToBackend.json()
            console.log("----------retourData du backend",retourData);
            
            setMyEventList(retourData.myEventCreated);
        }

    findEvents()
    },[])

    // console.log("-----------allMyEvents from backend",myEventList);









    return(
        <div>
            <Header/>

            <Typography style={{display:"flex",justifyContent:"center",marginTop:50}} component="h1" variant="h3">
            Tus eventos creados
            </Typography>
            
            <div style={{display:"flex",justifyContent:"center"}}>
                <h2 >Aqui puedes modificar o cancelar !</h2>
            </div>
            
            <div>
                <Grid container item style={{display:"flex", flexDirection:"row", justifyContent:"center"}}>
                    {myEventList.map((event,i)=>{                   
                    console.log("---------props de event dans myEventScreen",event);

                        return  <Grid key={i} xs={12} sm={6} md={4} lg={3} xl={3} style={{marginBottom:50, marginRight:20}}>                                   
                                    <EventCard style={{marginBottom:50}}
                                                key={i}
                                                event={event}
                                                parent="deleteEvent"
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
  )(MyEventScreen);