// import modules
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

//create an app from an instance of the express module using app variable
const app = express()

//import the database configuration
// const dbConfig = require('./database.config');

mongoose.Promise = global.Promise

//import the routes.js file
const routes = require('./routes')

require('dotenv').config()

//tell express to use CORS
app.use(cors())

// tell the server to serve content from the folder 'public'
app.use(express.static('public'))

//tell the server to use JSON and routes in routes.js
app.use(express.json())
app.use(routes)


// connecting to the database
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connection to Database - Successful!'))


//connecting to the database
// mongoose.connect(dbConfig.url, {
    // useNewUrlParser: true,
	// useUnifiedTopology: true, 
// }).then(() => {
    // console.log("Successfully connected to the database");    
// }).catch(err => {
    // console.log('Could not connect to the database. Exiting now...', err);
    // process.exit();
// });
//un-used code ---

//listen to a specified port
app.listen(process.env.PORT || 4000, () => {
// app.listen(4000, function() {  //un-used code ---
	console.log("The API is running...")
})