var express = require('express');
var router = express.Router();

const userModel = require('../models/user');
const bcrypt = require('bcrypt');
var uid2 = require('uid2');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// post signUp inscription
router.post('/signUp',async function(req, res, next){

  console.log("---------req.body signUp",req.body)

  var result = false;
  var saveUser;
  var token = null;
  var error = [];
  var userExist= await userModel.findOne({email:req.body.email})

  // conditions pour créer un nouveau utilisateur
  if(userExist!=null){
    error.push('email existe déjà')
  }

  if(req.body.alias==''
  ||req.body.nationality==''
  ||req.body.lastname==''
  ||req.body.firstname==''
  ||req.body.email==''
  ||req.body.password==''){
    error.push('champs vides')
  }

  // création d'un nouveau utlisateur
  if (error.length == 0){
    const cost = 10;
    const hash = bcrypt.hashSync(req.body.password, cost);
    const newUser = new userModel ({
      alias: req.body.alias,
      nationality: req.body.nationality,
      lastName: req.body.lastname,
      firstName: req.body.firstname,
      email: req.body.email,
      password: hash,
      token: uid2(32),
    });
    saveUser = await newUser.save()
    console.log("--------saveUser",saveUser)

    if(saveUser){
      result=true
      token=saveUser.token
    }
  }
res.json({saveUser,result,token,error})

});

// post signIn se logger
router.post('/signIn',async function(req, res, next){

  console.log("------------req.body signIn",req.body);
  var error = [];
  var login = false;

  if (req.body.email==""||req.body.password==""){
    error.push("champs vides")
  }

  if (error.length==0){

    var user= await userModel.findOne({email:req.body.email});

    var password= req.body.password;
    
    // comparaison des passwords si user existe
    if (user){
      var token=user.token;
      if (bcrypt.compareSync(password, user.password)) {

        login=true
        console.log("--------user signIn",user);
      } else{
        login=false
        error.push("password incorrect")
      }
    } else{
      error.push("email n'existe pas ou incorrect")
      console.log("-----------------email n'existe pas ou incorrect")
    }
  }

res.json({login,user,token,error})
});

router.put('/updateOneUser', async function(req,res,next){
  console.log("--------req.body",req.body);

  var userToUpdate = await userModel.updateOne(
    {token:req.body.token},
    {alias: req.body.alias,
      nationality: req.body.nationality,
      lastName: req.body.lastname,
      lastFirst: req.body.firstname,
      email: req.body.email}
  );

  console.log("--------userToUpdate",userToUpdate);
  res.json({userToUpdate})
});

module.exports = router;
