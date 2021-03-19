import React, {useState,useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// import {connect} from 'react-redux';

import Header from './Components/Header'



import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';



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




// pour s'inscrire
function ProfilScreen(props) {
    const classes = useStyles();
    console.log("----------props" ,props)
    console.log("----------props.userInfo" ,props.userInfo)


  
    // initialisation des états
    const [aliasSignUp,setAliasSignUp]= useState(props.userInfo.alias);
    const [nacionalitySignUp,setNacionalitySignUp]= useState(props.userInfo.nationality);
    const [firstNameSignUp,setFirstNameSignUp]= useState(props.userInfo.firstName);
    const [lastNameSignUp,setLastNameSignUp]= useState(props.userInfo.lastName);
    const [emailSignUp,setEmailSignUp]= useState(props.userInfo.email);

    const [responseBddOk,setResponseBddOk]= useState(false);

    // fonction du bouton retour vers HomeScreen
    const [redirectToHome,setRedirectToHome]= useState(false);
        if(redirectToHome===true){
            return <Redirect to='/HomeScreen'/>
        }




  // fonction pour passer les infos au backend
  const handleSubmitChanges = async () => {

    const dataToBackend = await fetch ('/users/updateOneUser',{
      method:'PUT',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `alias=${aliasSignUp}&nationality=${nacionalitySignUp}&firstname=${firstNameSignUp}&lastname=${lastNameSignUp}&email=${emailSignUp}&token=${props.userInfo.token}`
    })

    const retourData = await dataToBackend.json()
    console.log("----------retourData du backend",retourData);
    
    setResponseBddOk(retourData.result);
    
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
          Tu perfil
        </Typography>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Aqui puedes ver tus informaciõnes personales y modificarles ! 
        </Typography>
        <form className={classes.form} noValidate>
            <Grid container spacing={2}>

                <Grid item xs={12}>
                    <Typography component="h1" variant="h5">
                        Tu alias
                    </Typography>
                    <TextField
                        autoComplete="fname"
                        name="alias"
                        variant="outlined"
                        required
                        fullWidth
                        label={aliasSignUp} 
                        id="alias"
                        autoFocus
                        onChange={(e)=> {setAliasSignUp(e.target.value)}}
                    />
                </Grid>
                
                <Grid item xs={12}>
                    <Typography component="h1" variant="h5">
                        Tu nacionalidad
                    </Typography>
                    <TextField
                        autoComplete="fname"
                        name="nationality"
                        variant="outlined"
                        required
                        fullWidth
                        label={nacionalitySignUp} 
                        id="nationality" 
                        autoFocus
                        onChange={(e)=> { setNacionalitySignUp(e.target.value)}}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Typography component="h1" variant="h5">
                        Tu Nombre
                    </Typography>
                    <TextField
                        autoComplete="fname"
                        name="firstName"
                        variant="outlined"
                        required
                        fullWidth
                        label={firstNameSignUp} 
                        id="firstName"
                        autoFocus
                        onChange={(e)=> { setFirstNameSignUp(e.target.value)}}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography component="h1" variant="h5">
                        Tu Apellido
                    </Typography>
                    <TextField
                        autoComplete="lname"
                        name="lastName"
                        variant="outlined"
                        required
                        fullWidth
                        label={lastNameSignUp}
                        id="lastName"
                        autoFocus
                        onChange={(e)=> {setLastNameSignUp(e.target.value)}}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Typography component="h1" variant="h5">
                        Tu Correo electronico
                    </Typography>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        label={emailSignUp} 
                        id="email" 
                        name="email"
                        autoFocus
                        autoComplete="email"
                        onChange={(e)=> {setEmailSignUp(e.target.value)}}

                />
                </Grid>

             
                {/* <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox value="allowExtraEmails" color="primary" />}
                        label="I want to receive inspiration, marketing promotions and updates via email."
                    />
                </Grid> */}

            </Grid>
            <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={()=>  handleSubmitChanges() }
            >
                Guardar los cambios
            </Button>
            
            <Grid container justify="flex-end">
                <Grid item>
                <Button  variant="body2" onClick={()=> setRedirectToHome(true)}>
                    Volver a la pagina de inicio 
                    <ArrowRightIcon/> 
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
  export default connect(
    mapStateToProps,
    null 
  )(ProfilScreen);
  

