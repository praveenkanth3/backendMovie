// module.exports = function (app) {
// var userList = require('../controllers/userListController');

// //missed parentesis
// app.route('/users')
//         .get(userList.list_all_user)
//             .post(userList.create_user);

// };

const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//get
router.get('/',async (req, res) => {
    // res.send('hello');
    const users = await loadCollections('usersEntry');
    res.send(await users.find({}).toArray());
})

router.post('/' , async (req,res) => {
    const users= await loadCollections('usersEntry');
    await users.insertOne({
        loginId: req.body.loginId,
        mobile: req.body.mobile,
        gender: req.body.gender,
        password: req.body.password,
    });
    res.status(201).send();
})

router.get('/updatetickets', async(req,res) => {
    const tickets= await loadCollections('bookedtickets');
    res.send(await tickets.find({}).toArray());

});

router.post('/updatetickets', async (req, res) => {
    console.log(req.body);
    const tickets= await loadCollections('bookedtickets');
    const existingRecord = await tickets?.findOne({ name: req.body.name });
    if(existingRecord) {
        const newdata = {male: req.body.male, female:req.body.female}
        await tickets.updateOne({ name: req.body.name }, { $set: {'bookedTickets.male': req.body.bookedTickets.male || [], 'bookedTickets.female': req.body.bookedTickets.female || []} });
        res.json({ message: 'Record updated successfully' });
    } else {
        await tickets.insertOne({
            name: req.body.name,
            bookedTickets: {
                male: req.body.bookedTickets.male || [],
                female: req.body.bookedTickets.female || []
            }
        });
        res.json({ message: 'Record inserted successfully' });
    }
});

async function loadCollections (collection) {
    try{ 
        const client = await mongodb.MongoClient.connect('mongodb+srv://juprav8:praveenkanth3@cluster0.y4i4wlw.mongodb.net/',{ useNewUrlParser: true, useUnifiedTopology: true });
        const database = client.db('users');
        console.log('MongoDB connection successful');
        return database.collection(collection);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
  }
}
module.exports = router;