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
        ||req.body.hour==''
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
            participants:[userInfo._id],
            contactName: req.body.contactName, 
            contactEmail: req.body.contactEmail, 
            name: req.body.name,
            type: req.body.type,
            description: req.body.description,
            // images:[],
            // state: req.body.state,
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

module.exports = router;
