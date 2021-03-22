import React, {useState} from 'react';
import {connect} from 'react-redux'


import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SaveIcon from '@material-ui/icons/Save';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import { Redirect } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    color: red[500],
  },
}));







function EventCard(props) {


 
  console.log("---------props de EventCard",props);
  // console.log("---------props.event.name de card",props.event.name);


  // composant material ui
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };




// fonction permettant de mettre à jour event car inscription d'un nouveau user
const addParticipantsSubmit = async () => {
    
  const dataToBackend = await fetch ('/events/updateParticipantsEvent',{
    method:'PUT',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: `_id=${props.userInfo._id}&_idEvent=${props.event._id}`
  })

  const retourData = await dataToBackend.json()
  console.log("----------retourData du backend",retourData);
  
  
}


  const [toMyEvent, setToMyEvent] = useState(false);
  if (toMyEvent==true){
    return <Redirect to='/MyEventScreen'/>
  }
  
  










  

  return (
    
    <Card className={classes.root}>
      <CardHeader
      
        avatar={
          <WbSunnyIcon aria-label="recipe" className={classes.avatar}>
            
          </WbSunnyIcon>
        }
        action={
          <IconButton onClick={()=> {addParticipantsSubmit();setToMyEvent(true)}} aria-label="settings">
            <SaveIcon />
          </IconButton>
        }
        
        title={props.event.name}
        subheader="September 14, 2016"
      />
      <CardMedia
        className={classes.media}
        image="../reactapp/public/logo192.png"
        title="image card"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          Descripciõn del evento : {props.event.description}-----
          This impressive paella is a perfect party dish and a fun meal to cook together with your
          guests. Add 1 cup of frozen peas along with the mussels, if you like.
        </Typography>
        
        <Typography variant="body2" color="textSecondary" component="p">
        Ciudad del evento : {props.event.city}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
         El evento empesara a las : {props.event.hour}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <Typography variant="body2" color="textSecondary" component="p">
          {props.event.maxUser} pers max
          </Typography>
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        > mas detalles
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Description:</Typography>
          <Typography>
          {props.event.description}
          Set aside off of the heat to let rest for 10 minutes, and then serve.
          
          </Typography>
          
          <Typography paragraph> </Typography>
          <Typography paragraph>Direcciõn del evento : </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
         {props.event.address}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.event.city}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
         {props.event.postalCode}
        </Typography>
        <Typography paragraph> </Typography>
        <Typography paragraph> Hora del evento : {props.event.hour}</Typography>

        <Typography variant="body2" color="textSecondary" component="p">
         
        </Typography>
          <Typography paragraph>Contacto del evento:</Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Persona a contactar : {props.event.contactName}         
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Correo electronico : {props.event.contactEmail}         
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  )
             
}

function mapStateToProps(state) {
  return {userInfo:state.userInfo}
}

export default connect(
  mapStateToProps,
  null 
)(EventCard);
