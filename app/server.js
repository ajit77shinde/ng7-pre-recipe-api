const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const multer = require('multer');
// create express app
const app = express();
app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads')
    },
    filename: function(req, file, cb){
        console.log(file)
        cb(null, file.originalname)
    }
})

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});

// Require Notes routes
require('./routes/note.routes')(app);
//Require Recipe routes
require('./routes/recipe.routes')(app);
// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});