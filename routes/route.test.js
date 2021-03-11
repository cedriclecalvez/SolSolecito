var app = require("../app")
var request = require("supertest")

// test si un champs est null
test("Wrongsignup", async (done) => {

    await request(app).post("/users/signUp")
      .send({ "firstName": "a" ,'lastName':'a','email':'','password':'a'})
      .expect(200)
      .expect({ result: false, token: null, error: [ 'champs vides' ] })
    
    done()
});
  