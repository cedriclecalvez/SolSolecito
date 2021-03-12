var app = require("../app")
var request = require("supertest")

// test si un champs est null
test("WrongsignUp", async (done) => {

    await request(app).post("/users/signUp")
      .send({ "firstName": "a" ,'lastName':'a','email':'','password':'a'})
      .expect(200)
      .expect({ result: false, token: null, error: [ 'champs vides' ] })
    
    done()
});
  
// // test mauvaise inscription
// test("NOKsignin", async (done) => {
//   await request(app).post("/users/sign-in")
//     .send({ 'email':'jest@ggmail.com','password':'testjest'})
//     .expect(200)
//     .expect({ login: false,user: null,error:['email incorrect'] })
  
//   done()
//   })




test("deleteOk", async (done) => {

  await request(app).delete("/events/deleteEvent")
    .expect(200)
    .expect({ resultDelete: true })
  
  done()
});
