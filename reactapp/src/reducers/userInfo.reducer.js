export default function (userInfo={},action) {
    
    if (action.type==="infoUser") {
        console.log('---------- infoUser from reducer from SignUp',action.user);
        return action.user;
    } else{
        return userInfo; // userInfo ojet vide
    }
}