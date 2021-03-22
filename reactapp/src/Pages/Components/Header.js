import React, {useState} from 'react';
import { Redirect } from 'react-router-dom';


import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import PersonIcon from '@material-ui/icons/Person';

import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  
  title: {
    flexGrow: 5,
    width: 10
  },
}));

const theme = createMuiTheme({
    typography: 
        {h5: {fontStyle: 'italic', fontFamily:'Roboto', fontWeight:20},button: {fontStyle: 'italic', fontFamily:'Roboto'}}     
})






// composant Header
export default function Header() {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState(null);

    const [toProfil, setToProfil] = useState(false);
    const [toCreateEvent, setToCreateEvent] = useState(false);
    const [toMyEvent, setToMyEvent] = useState(false);
    const [toOtherEvent, setToOtherEvent] = useState(false);
    const [toSignIn, setToSignIn] = useState(false);
    const [toHomeScreen, setToHomeScreen] = useState(false);
    
    
   

   
    if (toHomeScreen===true){
        return <Redirect to='/HomeScreen'/>
    }
    if (toCreateEvent===true){
        return <Redirect to='/CreateEvent'/>
    }
    if (toProfil===true){
        return <Redirect to='/ProfilScreen'/>
    }
    if (toMyEvent===true){
        return <Redirect to='/MyEventScreen'/>
    }
    if (toOtherEvent===true){
        return <Redirect to='/MyOtherEventScreen'/>
    }
    if (toSignIn===true){
        return <Redirect to='/'/>
    }


 // button menu 
 const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    };
    //pour fermer au clic
    const handleClose = () => {
    setAnchorEl(null);
    };


    return (
        <div className={classes.root}>
            <ThemeProvider theme={theme}>
                <AppBar position="static">
                    <Toolbar>
                        <Grid container spacing={3}>
                            < Grid item xs={4}>
                                {/* <Typography variant="h5" className={classes.title}>
                                    <WbSunnyIcon />
                                    <span> </span>
                                    Sol Solecito
                                </Typography> */}
                                 
                                <Button variant="h5" color="inherit" onClick={(e)=>{setToHomeScreen(true)}}>
                                    <WbSunnyIcon />
                                    Sol Solecito
                                </Button>
                            </Grid>

                            <Grid item xs={4} >
                                <Button color="inherit" fontStyle='italic' fontFamily='Roboto' onClick={(e)=>{setToCreateEvent(true)}} >Creacion de evento</Button>
                            </Grid>

                            <Grid item xs={2}>
                                <div display ="flex">
                                    <Button  aria-controls="simple-menu" aria-haspopup="true" color="inherit" onClick={handleClick}>
                                        <PersonIcon/>Mi cuenta 
                                    </Button>
                                    <Menu
                                        id="simple-menu"
                                        anchorEl={anchorEl}
                                        keepMounted
                                        open={Boolean(anchorEl)}
                                        onClose={handleClose}
                                    >
                                        <MenuItem onClick={(e)=>{setToProfil(true);handleClose()}}>Mi perfil</MenuItem>
                                        <MenuItem onClick={(e)=>{setToMyEvent(true);handleClose()}}>Mis eventos</MenuItem>
                                        <MenuItem onClick={(e)=>{setToOtherEvent(true);handleClose()}}>Otros eventos</MenuItem>
                                    </Menu>
                                </div>
                            </Grid>

                            <Grid item xs={2}  >
                                <Button color="inherit" onClick={(e)=>{setToSignIn(true)}}>Desconectar</Button>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
            </ThemeProvider>
        </div>
    );
    }