import React, {useState} from 'react';
import {Redirect,Link} from 'react-router-dom';
import {connect} from 'react-redux';



import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));






// formulaire pour se logger
function SignInScreen(props) {

  

  const classes = useStyles();

  // useState Hook d'état
  const [userExist,setUserExist] = useState (false);
  const [signInEmail,setSignInEmail] = useState ("");
  const [signInPassword,setSignInPassword] = useState ("");
  const [errorEmail,setErrorEmail] = useState (false);
  const [errorPassword,setErrorPassword] = useState (false);
  
  
  const [toSignUp,setToSignUp] = useState (false);
  

  console.log("----------------signInEmail",signInEmail);
  console.log("----------------signInPassword",signInPassword);

  // fonction sur le clic
  const handleSubmitSignIn = async () => {

    // condition pour changer le style des inputs si error
    if(signInEmail==="") {setErrorEmail(true)};
    if(signInPassword==="") {setErrorPassword(true)};
    
      
    
    // envoie des données au backend pour vérification
    const checkDataExist = await fetch('/users/signIn',{
      method:'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `email=${signInEmail}&password=${signInPassword}`
    })

    const dataUser = await checkDataExist.json()
    console.log("--------- réception du backend dataUser",dataUser);



    // changement d'état userExist
    if(dataUser.login===true){
      setUserExist(true)

      props.onSubmitUserInfo(dataUser.user)
      console.log("--------------dataUser.user",dataUser.user);

    } else {
      console.log("-----------setUserExist est resté a false",setUserExist);

    }
  }

  // condition pour entrer dans l'application
  if(userExist){
    return <Redirect to='/HomeScreen'/>
  }
  
  // permet de rediriger vers signUp
  if(toSignUp){
    setTimeout(()=>{setToSignUp(false)}, 300)
    return <Redirect to='/SignUpScreen'/>
  }







  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
      <Typography component="h1" variant="h2">
          Sol Solecito
        </Typography>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Iniciar sesiòn
        </Typography>


        <form className={classes.form} noValidate>
          <TextField
            error={errorEmail} // si il y a une erreur, error = error
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id={!errorEmail ? "email" : "outlined-error"}
            label={!errorEmail ? "Correo electronico" : "error"} 
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e)=> {setErrorEmail(false) ; setSignInEmail(e.target.value)}}
          />

          <TextField
            error={errorPassword} // si il y a une erreur, error = error
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label={!errorPassword ? "Contraseña" : "error"} 
            type="password"
            id={!errorPassword ? "password" : "outlined-error"}
            autoComplete="current-password"
            onChange={(e)=> {setErrorPassword(false); setSignInPassword(e.target.value)}}
          />

          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
          label="Seguir conectado"
          />

          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={()=> handleSubmitSignIn()}
          >

            Iniciar sesiòn

          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">

                Contraseña olvidada?

              </Link>
            </Grid>
            <Grid item>
              <Link  onClick={()=>setToSignUp(true)}  variant="body2">
                {"No tienes una cuenta? Registrate"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      
    </Container>
  );
}


function mapDispatchToProps(dispatch) {
  return {
    onSubmitUserInfo: function (user) {
      dispatch({ type: 'infoUser', user: user })
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(SignInScreen);
