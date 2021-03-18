export default function (token=null,action) {
    
    if (action.type==="infoUser") {
        console.log('----------Token from reducer from SignUp',action.token);
        return action.token;
    } else{
        return token; // token null
    }
}