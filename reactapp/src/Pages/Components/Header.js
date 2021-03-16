import React, {useState} from 'react';


import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import HomeIcon from '@material-ui/icons/Home';

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
        {h5: {fontStyle: 'italic', fontFamily:'Roboto'}}     
})






// composant Header
export default function Header() {
    const classes = useStyles();

    // button menu 
    const [anchorEl, setAnchorEl] = useState(null);

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

                    <Typography variant="h5" className={classes.title}>
                        <WbSunnyIcon />
                        <span> </span>
                        Sol Solecito
                    </Typography>
                    <Button color="inherit">Creacion de evento</Button>
                    <div>
                        <Button  aria-controls="simple-menu" aria-haspopup="true" color="inherit" onClick={handleClick}>
                         Mi perfil <HomeIcon/>
                        </Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>Mi perfil</MenuItem>
                            <MenuItem onClick={handleClose}>Mis eventos</MenuItem>
                            <MenuItem onClick={handleClose}>Otros eventos</MenuItem>
                            <MenuItem onClick={handleClose}>Desconectarse</MenuItem>
                        </Menu>
                    </div>
                    

                    
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    </div>
    );
    }