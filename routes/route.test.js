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


  
// test mauvaise inscription
test("NOKsignin", async (done) => {
  await request(app).post("/users/signIn")
    .send({ 'email':'jest@ggmail.com','password':'testjest'})
    .expect(200)
    .expect({
      login: false,
      user: null,
      error: [ "email n'existe pas ou incorrect" ]
    })
  
  done()
  });





// test dans le cas d'une suppression d'un evenement
test("deleteOk", async (done) => {
  await request(app).delete("/events/deleteEvent")
    .expect(200)
    .expect({ resultDelete: true })
  
  done()
});






// test si un champs est null lors de la creation d'un event
test("NoCreateEvent", async (done) => {
  await request(app).post("/events/createEvent")
    .send({ "name": "a" ,'type':'a','description':'','address':''})
    .expect(200)
    .expect({ result: false})
  
  done()
});

