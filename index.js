let express = require("express");
let bodyParser = require('body-parser');
const mongodb = require('mongodb');
const cors = require('cors');
let app = express();
app.use(bodyParser.json())
app.use(cors());
// let mongoose  = require("mongoose");
// let user = require('./apis/models/userList');
// let { MongoClient } = require("mongodb");
// app.use(bodyParser.urlencoded({ extended: true }))
let routes = require('./apis/routes/userRoutes');
// const connectDb = require("./db");
// connectDb();
app.use('/api/routes',routes)

// route(app)

app.listen(5000,(error) => {
    if(error) {
        console.log('ERoor')
    } else {
        console.log('started....')
    }
});


// let CONNECTION_STRING = 'mongodb+srv://juprav8:praveenkanth3@cluster0.y4i4wlw.mongodb.net/?retryWrites=true&w=majority';
