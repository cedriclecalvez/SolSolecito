import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';


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
export default function SignInScreen() {

  const classes = useStyles();

  // useState Hook d'état
  const [userExist,setUserExist] = useState (false);
  const [signInEmail,setSignInEmail] = useState ("");
  const [signInPassword,setSignInPassword] = useState ("");

  console.log("----------------signInEmail",signInEmail);
  console.log("----------------signInPassword",signInPassword);


  const handleSubmitSignIn = async () => {

    const checkDataExist = await fetch('/users/signIn',{
      method:'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `email=${signInEmail}&password=${signInPassword}`
    })

    const dataUser = await checkDataExist.json()
    console.log("--------- réception du backend dataUser",dataUser);


    // changement d'état userExist
    if(dataUser.login==true){
      setUserExist(true)
    } else {
      console.log("-----------setUserExist est resté a false",setUserExist);

    }
  }

  // condition pour entrer dans l'application
  if(userExist){
    return <Redirect to='/HomeScreen'/>
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
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo electronico"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e)=> setSignInEmail(e.target.value)}

          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e)=> setSignInPassword(e.target.value)}
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
              <Link href="/SignUpScreen" variant="body2">
                {"No tienes una cuenta? Registrate"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      
    </Container>
  );
}