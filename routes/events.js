var express = require('express');
var router = express.Router();
const eventModel = require('../models/event');
const userModel = require('../models/user');









// route pour créer un évènement
router.post('/createEvent', async function(req, res, next){
    console.log("-----------req.body createEvent",req.body);


    var error = [];
    let result=false;
    let saveEvent;
    var userInfo = await userModel.findOne({token:req.body.token});
    console.log("---------userInfo pour createEvent",userInfo)
    
    // conditions de remplissage
    if (req.body.name==''
        ||req.body.type==''
        ||req.body.description==''        
        ||req.body.address==''
        ||req.body.city==''
        ||req.body.postalcode==''
        ||req.body.maxUser==''
        ||req.body.ageChildren==''
        ||req.body.numbRegisteredUsers==''
    ){
        error.push('champs vides')
    }

    // enregistrement de event en BDD si
    if(error.length==0){

        const newEvent = new eventModel({
            participants:[req.body.participants],
            contactName: req.body.contactName, 
            contactEmail: req.body.contactEmail, 
            name: req.body.name,
            type: req.body.type,
            description: req.body.description,
            // images:[],
            // state: req.body.state,
            date: req.body.date,
            address: req.body.address,
            city: req.body.city,
            postalCode: req.body.postalcode,
            maxUser: req.body.maxUser,
            ageChildren: req.body.ageChildren,
            numbRegisteredUsers: req.body.numbRegisteredUsers,
            isVisible:true,
            dateCreatedEvent: new Date()
        });
        saveEvent = await newEvent.save();
        console.log("---------saveEvent dans BDD",saveEvent);

        if(saveEvent){
            result=true;
        };
    };

res.json({saveEvent,result});

});










// route pour changer des infos d'un évènement
router.put('/updateEvent', async function(req,res,next){
    console.log("-----------req.body route updateEvent",req.body);


    var eventUpdated = await eventModel.findOneAndUpdate(
        {_id:req.body.idEvent},
        {contactName: req.body.contactName, 
        contactEmail: req.body.contactEmail, 
        name: req.body.name,
        type: req.body.type,
        description: req.body.description,
        // images:[],
        state: req.body.state,
        // date: req.body.date,
        hour: req.body.hour,
        address: req.body.address,
        city: req.body.city,
        postalCode: req.body.postalcode,
        maxUser: req.body.maxUser,
        ageChildren: req.body.ageChildren,
        numbRegisteredUsers: req.body.numbRegisteredUsers,
        isVisible:true,
        dateCreatedEvent: new Date()
        })

    // pour renvoyer le nouveau évènement a partir de la BDD; pas obligatoire
    var newEvent = await eventModel.findOne({_id:req.body.idEvent});
    console.log("-----------newEvent",newEvent);

      
res.json({newEvent})

});











// route pour suuprimer un évènement de la base de données
// autre solution : passer le isvisible a false
router.delete('/deleteEvent', async function(req, res, next){
    console.log("---------req.body route delete",req.body);

    let resultDelete = false;
    var deletedEvent = await eventModel.deleteOne({_id:req.body.idEvent})

    deletedEvent.length==null ? resultDelete=true : resultDelete=false;
    
    console.log("---------resultDelete",resultDelete);
res.json({resultDelete})    
})









// renoyer tous les events
router.get('/getAllEvents', async function(req, res, next){

    console.log("---------req.query route getAllEvents",req.query);
    const allEvents = await eventModel.find()

res.json({allEvents})
})











// route permettant de récupérer tous les events du premier participant
router.post('/getMyEvents', async function(req, res, next) {

    const idUser= req.body._id
    console.log("---------idUser",idUser);


    const eventsResult =  await eventModel.find({participants : idUser})
    console.log("-----------eventsResult",eventsResult);
    
    const myEventCreated =[]
    for(var i=0; i<eventsResult.length; i++){
        if (eventsResult[i].participants.length>0 && eventsResult[i].participants[0]==idUser){
            myEventCreated.push(eventsResult[i])
        }
    }
    console.log("------------myEventCreated route getMyEvents",myEventCreated);


    res.json({myEventCreated})
})










// put pour ajouter un nouveau participant a un event
router.put('/updateParticipantsEvent', async function(req,res,next){

    let newTaleau = [];
    let error = [];
    let result = false;

    const idUser= req.body._id
        // console.log("---------idUser pour ajouter un participant",idUser);
    
    const idEvent= req.body._idEvent
        // console.log("---------idEvent pour ajouter un participant",idEvent);

    const dataEventTarget =  await eventModel.findOne({_id : idEvent });
        // console.log("---------dataEventTarget info de event ciblé",dataEventTarget);
    const arrayParticipants=dataEventTarget.participants
        // console.log("---------arrayParticipants tableau de participants initial",arrayParticipants);

    newTaleau = arrayParticipants.concat(idUser)
        // console.log("---------newTaleau nouveau tableau avec le nouveau idUser",newTaleau);

    if(newTaleau.length!=null){
        var newParticipantEvent = await eventModel.findOneAndUpdate(
                {_id:idEvent},
                {participants: newTaleau})
            console.log("---------newParticipantEvent verifier le tableau",newParticipantEvent);
        result = true
    
        } else {
        error.push("tableau vide, pas de new participant")
    }

     res.json({newParticipantEvent,result,error})

})









// route pour avoir tous mes events sauvés ou je me suis inscrit avec les miens
router.post('/allMyEventsSaved', async function(req, res, next) {
    // console.log("---------req.body route allMyEventsSaved",req.body);
    
    const idUser = req.body._id

    const allEventsSaved = await eventModel.find({participants:idUser}) 
    console.log("--------------allEventsSaved",allEventsSaved);


    res.json({allEventsSaved});
  
  });


module.exports = router;











// route pour me désinscrire à un event; donc update
router.put('/updateToCancelParticipant' , async function (req,res,next){
    console.log("----------updateToCancelParticipant req.body",req.body);

    let newTableau =[]

    const dataEventTarget =  await eventModel.findOne({_id : req.body._idEvent });
    // console.log("---------dataEventTarget info de event ciblé",dataEventTarget);
    const arrayParticipants=dataEventTarget.participants

    newTableau = arrayParticipants.filter(id=>id!==req.body._idEvent)
    console.log("-----------newTableau cancelparticipant", newTableau);



    var eventUpdated = await eventModel.findOneAndUpdate(
       {_id:req.body._idEvent},
       {participants: newTaleau})

       res.json({eventUpdated})

});
