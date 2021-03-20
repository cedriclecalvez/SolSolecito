import React, {useState} from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';

import Header from './Components/Header'



import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import AddIcon from '@material-ui/icons/Add';





// styles
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));













// pour créer un event
function CreateEvent(props) {
  const classes = useStyles();
  console.log("-----------userInfo from store ,props.userInfo",props.userInfo);


  // initialisation des états
  const [contactNameEvent,setContactNameEvent]= useState(props.userInfo.lastName);
  const [errorContactNameEvent,setErrorContactNameEvent]= useState(false);

  const [contactEmailEvent,setContactEmailEvent]= useState(props.userInfo.email);
  const [errorContactEmailEvent,seterrorContactEmailEvent]= useState(false);

  const [nameEvent,setNameEvent]= useState("");
  const [errorNameEvent,setErrorNameEvent]= useState(false);

  const [descriptionEvent,setDescriptionEvent]= useState("");
  const [errorDescriptionEvent,setErrorDescriptionEvent]= useState(false);

  const [typeEvent,setTypeEvent]= useState("");
  const [errorTypeEvent,setErrorTypeEvent]= useState(false);

  const [imageEvent,setImageEvent]= useState([]);
  const [errorImageEvent,setErrorImageEvent]= useState(false);

  const [dateEvent,setDateEvent]= useState(Date);
  const [errorDateEvent,setErrorDateEvent]= useState(false);

  const [hourEvent,setHourEvent]= useState("");
  const [errorHourEvent,setErrorHourEvent]= useState(false);

  const [addressEvent,setAddressEvent]= useState("");
  const [errorAddressEvent,setErrorAddressEvent]= useState(false);

  const [cityEvent,setCityEvent]= useState("");
  const [errorCityEvent,setErrorCityEvent]= useState(false);

  const [postalCodeEvent,setPostalCodeEvent]= useState("");
  const [errorPostalCodeEvent,setErrorPostalCodeEvent]= useState(false);

  const [maxUserEvent,setMaxUserEvent]= useState("");
  const [errorMaxUserEvent,setErrorSetMaxUserEvent]= useState(false);

  const [ageChildrenEvent,setAgeChildrenEvent]= useState("");
  const [errorAgeChildrenEvent,setErrorAgeChildrenEvent]= useState(false);

//   const [numbRegistredUserEvent,setNumbRegistredUserEvent]= useState("");
//   const [errorNumbRegistredUserEvent,setErrorNumbRegistredUserEvent]= useState(false);

  const [responseBddOk,setResponseBddOk]= useState(false);


  // fonction du bouton retour vers HomeScreen
  const [createOtherEvent,setCreateOtherEvent]= useState(false);
  if(createOtherEvent===true){
      return <Redirect to='/CreateEvent'/>
  }




  // fonction pour passer les infos au backend
  const handleSubmitSignUp = async () => {

    // condition pour changer le style des inputs
    if(contactNameEvent===""){setErrorContactNameEvent(true)}
    if(contactEmailEvent===""){seterrorContactEmailEvent(true)}
    if(nameEvent===""){setErrorNameEvent(true)}
    if(descriptionEvent===""){setErrorDescriptionEvent(true)}
    if(typeEvent===""){setErrorTypeEvent(true)}
    if(imageEvent===""){setErrorImageEvent(true)}
    if(dateEvent===""){setErrorDateEvent(true)}
    if(hourEvent===""){setErrorHourEvent(true)}
    if(addressEvent===""){setErrorAddressEvent(true)}
    if(cityEvent===""){setErrorCityEvent(true)}
    if(postalCodeEvent===""){setErrorPostalCodeEvent(true)}
    if(maxUserEvent===""){setErrorSetMaxUserEvent(true)}
    if(ageChildrenEvent===""){setErrorAgeChildrenEvent(true)}
    
    
  

    // envoie des données event vers le backend
    const dataToBackend = await fetch ('/events/CreateEvent',{
      method:'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `participants=${props.userInfo._id}&contactName=${contactNameEvent}&contactEmail=${contactEmailEvent}&name=${nameEvent}&type=${typeEvent}&description=${descriptionEvent}&image=${imageEvent}&date=${dateEvent}&hour=${hourEvent}&address=${addressEvent}&city=${cityEvent}&postalCode=${postalCodeEvent}&maxUser=${maxUserEvent}&ageChildren=${ageChildrenEvent}&token=${props.userInfo.token}`
    })

    const retourData = await dataToBackend.json()
    console.log("----------retourData du backend",retourData);
    
    setResponseBddOk(retourData.result);

    props.onSubmitEvent(retourData.saveEvent)

    
  }
  if(responseBddOk===true){
    return <Redirect to='/HomeScreen'/>
  }


  
  




  return (
    <div>
        <Header/>

        <Container component="main" maxWidth="xs">
            <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h2">
                        Crea tu evento
                    </Typography>
                    <Avatar className={classes.avatar}>
                        <WbSunnyIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Es facil !
                    </Typography>
                    <Typography component="h2">
                        Llena todo el formulario y registralo
                    </Typography>
                    <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                        <TextField
                            error={errorContactNameEvent} // si il y a une erreur, error = error
                            autoComplete="fname"
                            name="contactName"
                            variant="outlined"
                            fullWidth
                            required
                            label={!errorContactNameEvent ? contactNameEvent : "error"}
                            id={!errorContactNameEvent ? "contactName" : "outlined-error"}
                            autoFocus
                            onChange={(e)=> {setErrorContactNameEvent(false) ; setContactNameEvent(e.target.value)}}
                        />
                        </Grid>
                        
                        <Grid item xs={12}>
                        <TextField
                            error={errorContactEmailEvent} // si il y a une erreur, error = error
                            autoComplete="fname"
                            name="contactEmail"
                            variant="outlined"
                            fullWidth
                            required
                            label={!errorContactEmailEvent ? contactEmailEvent : "error"}
                            id={!errorContactEmailEvent ? "contactEmail" : "outlined-error"}
                            autoFocus
                            onChange={(e)=> {seterrorContactEmailEvent(false) ; setContactEmailEvent(e.target.value)}}
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            error={errorNameEvent} // si il y a une erreur, error = error
                            autoComplete="fname"
                            name="name"
                            variant="outlined"
                            fullWidth
                            required
                            label={!errorNameEvent ? "Nombre del evento" : "error"}
                            id={!errorNameEvent ? "nameEvent" : "outlined-error"}
                            autoFocus
                            onChange={(e)=> {setErrorNameEvent(false) ; setNameEvent(e.target.value)}}
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            error={errorDescriptionEvent} // si il y a une erreur, error = error
                            autoComplete="fname"
                            name="description"
                            variant="outlined"
                            fullWidth
                            required
                            label={!errorDescriptionEvent ? "Descripciòn" : "error"}
                            id={!errorDescriptionEvent ? "description" : "outlined-error"}
                            autoFocus
                            onChange={(e)=> {setErrorDescriptionEvent(false) ; setDescriptionEvent(e.target.value)}}
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            error={errorTypeEvent} // si il y a une erreur, error = error
                            autoComplete="fname"
                            name="type"
                            variant="outlined"
                            fullWidth
                            required
                            label={!errorTypeEvent ? "Tipo del evento" : "error"}
                            id={!errorTypeEvent ? "type" : "outlined-error"}
                            autoFocus
                            onChange={(e)=> {setErrorTypeEvent(false) ; setTypeEvent(e.target.value)}}
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            error={errorImageEvent} // si il y a une erreur, error = error
                            autoComplete="fname"
                            name="image"
                            variant="outlined"
                            fullWidth
                            required
                            label={!errorImageEvent ? "Imagen del evento" : "error"}
                            id={!errorImageEvent ? "image" : "outlined-error"}
                            autoFocus
                            onChange={(e)=> {setErrorImageEvent(false) ; setImageEvent(e.target.value)}}
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            error={errorDateEvent} // si il y a une erreur, error = error
                            autoComplete="fname"
                            name="date"
                            variant="outlined"
                            fullWidth
                            required
                            label={!errorDateEvent ? "Fecha del evento" : "error"}
                            id={!errorDateEvent ? "date" : "outlined-error"}
                            autoFocus
                            onChange={(e)=> {setErrorDateEvent(false) ; setDateEvent(e.target.value)}}
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            error={errorHourEvent} // si il y a une erreur, error = error
                            autoComplete="fname"
                            name="hour"
                            variant="outlined"
                            fullWidth
                            required
                            label={!errorHourEvent ? "Hora del evento" : "error"}
                            id={!errorHourEvent ? "hour" : "outlined-error"}
                            autoFocus
                            onChange={(e)=> {setErrorHourEvent(false) ; setHourEvent(e.target.value)}}
                        />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            error={errorAddressEvent} // si il y a une erreur, error = error
                            autoComplete="fname"
                            name="address"
                            variant="outlined"
                            fullWidth
                            required
                            label={!errorAddressEvent ? "Direcciòn del evento" : "error"}
                            id={!errorAddressEvent ? "address" : "outlined-error"}
                            autoFocus
                            onChange={(e)=> {setErrorAddressEvent(false) ; setAddressEvent(e.target.value)}}
                        />
                        </Grid>
                        
                        
                        <Grid item xs={12} sm={6}>
                        <TextField
                            error={errorPostalCodeEvent} // si il y a une erreur, error = error
                            autoComplete="fname"
                            name="postalCode"
                            variant="outlined"
                            fullWidth
                            required
                            label={!errorPostalCodeEvent ? "Codigo postal del evento" : "error"}
                            id={!errorPostalCodeEvent ? "postalCode" : "outlined-error"}
                            autoFocus
                            onChange={(e)=> {setErrorPostalCodeEvent(false) ; setPostalCodeEvent(e.target.value)}}
                        />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                        <TextField
                            error={errorCityEvent} // si il y a une erreur, error = error
                            autoComplete="fname"
                            name="city"
                            variant="outlined"
                            fullWidth
                            required
                            label={!errorCityEvent ? "Ciudad del evento" : "error"}
                            id={!errorCityEvent ? "city" : "outlined-error"}
                            autoFocus
                            onChange={(e)=> {setErrorCityEvent(false) ; setCityEvent(e.target.value)}}
                        />
                        </Grid>


                        <Grid item xs={12} sm={6}>
                        <TextField
                            error={errorMaxUserEvent} // si il y a une erreur, error = error
                            autoComplete="fname"
                            name="maxUser"
                            variant="outlined"
                            fullWidth
                            required
                            label={!errorMaxUserEvent ? "Max personas autorisadas en el evento" : "error"}
                            id={!errorMaxUserEvent ? "maxUser" : "outlined-error"}
                            autoFocus
                            onChange={(e)=> {setErrorSetMaxUserEvent(false) ; setMaxUserEvent(e.target.value)}}
                        />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                        <TextField
                            error={errorAgeChildrenEvent} // si il y a une erreur, error = error
                            autoComplete="fname"
                            name="ageChildren"
                            variant="outlined"
                            fullWidth
                            required
                            label={!errorAgeChildrenEvent ? "Edad de participantes" : "error"}
                            id={!errorAgeChildrenEvent ? "ageChildren" : "outlined-error"}
                            autoFocus
                            onChange={(e)=> {setErrorAgeChildrenEvent(false) ; setAgeChildrenEvent(e.target.value)}}
                        />
                        </Grid>

                        <Grid item xs={12}>
                        <FormControlLabel
                            control={<Checkbox value="allowExtraEmails" color="primary" />}
                            label="I want to receive inspiration, marketing promotions and updates via email."
                        />
                        </Grid>
                    </Grid>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={()=>  handleSubmitSignUp() }
                    >
                        Finalizar la creaciòn del evento
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button  variant="body2" onClick={()=> setCreateOtherEvent(true)}>
                                <AddIcon/> 
                                Quieres crear otro evento? 
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    </div>
  );
}


function mapStateToProps(state) {
    return {userInfo:state.userInfo}
}

function mapDispatchToProps(dispatch) {
    return {
        onSubmitEvent: function(event) {
            dispatch( {type: 'infoEvent', event: event} )
        }
    }
}


  export default connect(
    mapStateToProps,
    mapDispatchToProps 
  )(CreateEvent);