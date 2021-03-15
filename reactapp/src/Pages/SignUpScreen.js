import React, {useState} from 'react';



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
  const [nacionalitySignUp,setNacionalitySignUp]= useState("");
  const [firstNameSignUp,setFirstNameSignUp]= useState("");
  const [lastNameSignUp,setLastNameSignUp]= useState("");
  const [passwordSignUp,setPasswordSignUp]= useState("");
  const [emailSignUp,setEmailSignUp]= useState("");
  




  // fonction pour passer les infos au backend
  const handleSubmitSignUp = async () => {
    const dataToBackend = await fetch ('/users/SignUp',{
      method:'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: `alias=${aliasSignUp}&nationality=${nacionalitySignUp}&firstname=${firstNameSignUp}&lastname=${lastNameSignUp}&email=${emailSignUp}&password=${passwordSignUp}`
    })

    const retourData = await dataToBackend.json()
    console.log("----------retourData du backend",retourData);
  }


  
  // vider les champs après inscription
  function cleanInputs() {
    setAliasSignUp("");
    setNacionalitySignUp("");
    setFirstNameSignUp("");
    setLastNameSignUp("");
    setPasswordSignUp("");
    setEmailSignUp("");
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
                autoComplete="fname"
                name="alias"
                variant="outlined"
                required
                fullWidth
                id="alias"
                label="Alias"
                autoFocus
                onChange={(e)=> setAliasSignUp(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="nationality"
                variant="outlined"
                required
                fullWidth
                id="nationality"
                label="Nacionalidad"
                autoFocus
                onChange={(e)=> setNacionalitySignUp(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Nombre"
                autoFocus
                onChange={(e)=> setFirstNameSignUp(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Apellido"
                name="lastName"
                autoComplete="lname"
                onChange={(e)=> setLastNameSignUp(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Correo electronico"
                name="email"
                autoComplete="email"
                onChange={(e)=> setEmailSignUp(e.target.value)}

              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e)=> setPasswordSignUp(e.target.value)}

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
            onClick={()=> {handleSubmitSignUp();cleanInputs()}}
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