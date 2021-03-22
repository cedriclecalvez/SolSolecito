import React, {useState,useEffect}from 'react';
import {connect} from 'react-redux';


import Header from './Components/Header';
import EventCard from './Components/EventCard'; 

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';





function MyEventScreen(props){

    console.log("----------props",props);
    console.log("----------props.userInfo.token",props.userInfo.token);
    console.log("----------props.userInfo._id",props.userInfo._id);


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

    console.log("-----------allMyEvents from backend",myEventList);









    return(
        <div>
            <Header/>

            <Typography style={{display:"flex",justifyContent:"center",marginTop:50}} component="h1" variant="h3">
            Tus eventos creados
            </Typography>
            {/* <h1  component="h1" variant="h2">Tus eventos creados</h1> */}
            <div style={{display:"flex",justifyContent:"center"}}>
                <h2 >Aqui puedes modificar o cancelar !</h2>
            </div>
            
            <div>
                {myEventList.map((event,i)=>{
                                
                console.log("---------props de event dans myEventScreen",event);

                    return <Container component="main" maxWidth="md" justify="flex-center">
                                <Grid container spacing={3} style={{marginTop:20}}>
                                    <Grid item xs={12} md={6}>
                                        <EventCard
                                            key={i}
                                            event={event}
                                        />                            
                                    </Grid>
                                
                                </Grid>
                            </Container>
                })}
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