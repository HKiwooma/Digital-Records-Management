const mongoose = require('mongoose')
const Register = require('../models/registrationModel')

//create test suite
describe('registration model test', () => {

    //set up: runs before any test; in ths case to create our testdb(beforeAll is test setup)
    beforeAll(async () => {
        try {
            //wait for the process before doing any
            await mongoose.connect("mongodb://localhost:27017/police-db", { useNewUrlParser: true, useUnifiedTopology: true })
            //before doing anything first empty the database
            await Register.deleteMany({})
        } catch (err) {
            console.log("database error" + err)
        }
    })
    test('should be able to save', async () => {
        //saving firstname manually to model
        const register = new Register({ 'officerID': '' })
        await register.save()
        //find what is in the db
        const items = await Register.find({})
        //asserting that the item i have saved is in the db
        expect(items.length).toBe(1)
    })
    afterEach(async () => {
       try {
           await Register.deleteMany({})
        } catch (err) {
          console.log("database error " + err)
        }
})
})
    
