var mongoose = require ('mongoose');

var eventSchema = mongoose.Schema({
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    contactName: String, 
    contactEmail: String, 
    name: String,
    type: String,
    description: String,
    image: String,
    eventState: String,
    date: Date,
    hour: Number,
    address: String,
    city: String,
    postalCode: Number,
    maxUser: Number,
    isVisible:Boolean
   });

var eventModel=mongoose.model ('event',eventSchema)

module.exports=eventModel;