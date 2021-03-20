export default function (eventInfo={},action) {
    
    if (action.type==="infoEvent") {
        console.log('---------- infoEvent from reducer createEvent',action.event);
        return action.event;
    } else{
        return eventInfo; // eventInfo objet vide
    }
}