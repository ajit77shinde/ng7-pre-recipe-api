// const express = require('express');
// const bodyParser = require('body-parser');

// const product = require('./routes/product.route');//import routes for product
// const note = require('./routes/note.routes');
// // initialize our express app
// const app = express();

// //consfiguration database
// const dbConfig = require('./config/database.config');
// const mongoose = require('mongoose');

// mongoose.Promise = global.Promise;

// // Connecting to database
// mongoose.connect(dbConfig.url, {
//     useNewUrlParser: true
// }).then(()=> {
//     console.log("Successfully connected to the database");
// }).catch(err =>{
//     console.log('Could not connect to the database. Exiting now....', err);
//     process.exit();
// })
// app.use('/products',product);
// let port = 5000;

// app.listen(port, () => {
//     console.log('Server is up and running on port numner ' + port);
// });