import React, {useState} from 'react';
import { Redirect } from 'react-router-dom';



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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));




// pour s'inscrire
export default function SignUp() {
  const classes = useStyles();


  // initialisation des états
  const [aliasSignUp,setAliasSignUp]= useState("");
  const [errorAlias,setErrorAlias]= useState(false);
  const [nacionalitySignUp,setNacionalitySignUp]= useState("");
  const [errorNationality,setErrorNationality]= useState(false);
  const [firstNameSignUp,setFirstNameSignUp]= useState("");
  const [errorFirstName,setErrorFirstName]= useState(false);
  const [lastNameSignUp,setLastNameSignUp]= useState("");
  const [errorLastName,setErrorLastName]= useState(false);
  const [passwordSignUp,setPasswordSignUp]= useState("");
  const [errorPassword,setErrorPassword]= useState(false);
  const [emailSignUp,setEmailSignUp]= useState("");
  const [errorEmail,setErrorEmail]= useState(false);
  const [responseBddOk,setResponseBddOk]= useState(false);


  




  // fonction pour passer les infos au backend
  const handleSubmitSignUp = async () => {

    // condition pour changer le style des inputs
    if(aliasSignUp===""){setErrorAlias(true)}
    if(nacionalitySignUp===""){setErrorNationality(true)}
    if(firstNameSignUp===""){setErrorFirstName(true)}
    if(lastNameSignUp===""){setErrorLastName(true)}
    if(passwordSignUp===""){setErrorPassword(true)}
    if(emailSignUp===""){setErrorEmail(true)}

  

    // envoie des données user vers le backend
    const dataToBackend = await fetch ('/users/SignUp',{
      method:'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `alias=${aliasSignUp}&nationality=${nacionalitySignUp}&firstname=${firstNameSignUp}&lastname=${lastNameSignUp}&email=${emailSignUp}&password=${passwordSignUp}`
    })

    const retourData = await dataToBackend.json()
    console.log("----------retourData du backend",retourData);
    
    setResponseBddOk(retourData.result);

    
  }
  if(responseBddOk===true){
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
          Te invitamos a registrarte
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                error={errorAlias} // si il y a une erreur, error = error
                autoComplete="fname"
                name="alias"
                variant="outlined"
                required
                fullWidth
                label={!errorAlias ? "Alias" : "error"}
                id={!errorAlias ? "alias" : "outlined-error"}
                autoFocus
                onChange={(e)=> {setErrorAlias(false) ; setAliasSignUp(e.target.value)}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={errorNationality} // si il y a une erreur, error = error
                autoComplete="fname"
                name="nationality"
                variant="outlined"
                required
                fullWidth
                label={!errorNationality ? "Nacionalidad" : "error"}
                id={!errorNationality ? "nationality" : "outlined-error"}
                autoFocus
                onChange={(e)=> {setErrorNationality(false) ; setNacionalitySignUp(e.target.value)}}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={errorFirstName} // si il y a une erreur, error = error
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                label={!errorFirstName ? "Nombre" : "error"}
                id={!errorFirstName ? "firstName" : "outlined-error"}
                autoFocus
                onChange={(e)=> {setErrorFirstName(false) ; setFirstNameSignUp(e.target.value)}}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={errorLastName} // si il y a une erreur, error = error
                variant="outlined"
                required
                fullWidth
                label={!errorLastName ? "Apellido" : "error"}
                id={!errorLastName ? "lastName" : "outlined-error"}
                name="lastName"
                autoComplete="lname"
                onChange={(e)=> {setErrorLastName(false) ; setLastNameSignUp(e.target.value)}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={errorEmail} // si il y a une erreur, error = error
                variant="outlined"
                required
                fullWidth
                label={!errorEmail ? "Correo electronico" : "error"}
                id={!errorEmail ? "email" : "outlined-error"}
                name="email"
                autoComplete="email"
                onChange={(e)=> {setErrorEmail(false) ;setEmailSignUp(e.target.value)}}

              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={errorPassword} // si il y a une erreur, error = error
                variant="outlined"
                required
                fullWidth
                name="password"
                label={!errorPassword ? "Contraseña" : "error"}
                id={!errorPassword ? "password" : "outlined-error"}
                type="password"
                autoComplete="current-password"
                onChange={(e)=> {setErrorPassword(false) ;setPasswordSignUp(e.target.value)}}

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
            Registrarme
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Ya tienes una cuenta? Iniciar sesiòn

              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}