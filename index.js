// Dependencies
let express = require('express');
let apiRoutes = require("./api-routes");
let mongoose = require('mongoose');
let cors = require("cors");
let bodyParser = require('body-parser');
require('dotenv').config();

// Setup server port
const port = process.env.PORT || 8080;

// Initialize the app
let app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());

const MongoClient = require('mongodb').MongoClient;
const uri = process.env.DB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  client.close();
});

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;

if (!db) {
	console.log("Error connecting to db");
} else { 
	console.log("Db connected succesfully");
}

// Use Api routes in the App
app.use('/api', apiRoutes)
// Send message for default URL
app.get('/', (req, res) => res.send('Are you a cyclist or something?'));
// Launch app to listen to specified port
app.listen(port, function () {
     console.log("Running on port " + port);
});