import React, {useState} from 'react';
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom';


import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SaveIcon from '@material-ui/icons/Save';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

// import pour changer le format de la date
import moment from "moment";



const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 450,
    

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


 
  console.log("---------props de EventCard venant de HomeScreen",props);
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

  // en attente car retourData ne sert pas encore
  const retourData = await dataToBackend.json()
  console.log("----------retourData du backend",retourData);
   
}




// fonction si dans MyEventScreen je delete un event
const deleteMyEventCreated = async () => {
  console.log("---------props.event._id venant de HomeScreen",props.event._id);


  const resultDelete = await fetch ('/events/deleteEvent',{
  method:'DELETE',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: `idEvent=${props.event._id}`
  })
  const retourDeleteEvent = await resultDelete.json()
  console.log("-----------retourDeleteEvent",retourDeleteEvent);





}
// fonction si dans EventsSavedScreen j'annule ma participation à un event
const cancelParticipation = async () => {


  const resultUpdateCancel = await fetch ('/events/updateToCancelParticipant',{
  method:'PUT',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: `_id=${props.userInfo._id}&_idEvent=${props.event._id}`
  })
  const retourResultUpdateCancel = await resultUpdateCancel.json()
  console.log("-----------retourResultUpdateCancel",retourResultUpdateCancel);

}




// conversion des dates et heures venant du backend grace au module moment pour l'affichage
let formatDate = moment(props.event.date).format('MMMM Do YYYY')
      
let formatHour = moment(props.event.date).format('h:mm a')
    










const [toMyEvent, setToMyEvent] = useState(false);

if (toMyEvent===true){
  return <Redirect to='/EventsSavedScreen'/>
}
  
  

  return (
    
    <Card className={classes.root}>
      <CardHeader
      
        avatar={
          <WbSunnyIcon aria-label="recipe" className={classes.avatar}>
            
          </WbSunnyIcon>
        }

        action={
          props.parent==="HomePage" ?
          <IconButton onClick={()=> {addParticipantsSubmit();setToMyEvent(true)}} aria-label="settings">
            <SaveIcon />
          </IconButton>
        
        : props.parent==="deleteEvent" ? 
          <IconButton onClick={()=> {deleteMyEventCreated();setToMyEvent(true)}} aria-label="settings">
            <DeleteForeverIcon/>
          </IconButton>

        : props.parent==="cancelParticipation" ? 
        <IconButton onClick={()=> {cancelParticipation();setToMyEvent(true)}} aria-label="settings">
            Cancelar
        </IconButton>

        : <IconButton onClick={()=> {addParticipantsSubmit();setToMyEvent(true)}} aria-label="settings">
            test
          </IconButton>
        }
        
        title={props.event.name}
        // subheader="September 14, 2016"
        subheader={formatDate}
      />
      <CardMedia
        className={classes.media}
        image = {props.event.image[0]}
        
        // image = 'https://images.unsplash.com/photo-1590850093323-ccc35c610511?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1934&q=80'
        // image = 'https://123cartes.com/wp-content/uploads/2016/05/carte-joyeux-anniversaire-confettis.jpg'
        title="image card"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          Descripciõn del evento : {props.event.description}
          
        </Typography>
        
        <Typography variant="body2" color="textSecondary" component="p">
        Ciudad del evento : {props.event.city}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
         El evento empezara a las : {formatHour}
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
        <Typography paragraph> Hora del evento : {formatHour}</Typography>

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
