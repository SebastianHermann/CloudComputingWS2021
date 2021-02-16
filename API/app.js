const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

app.use(cors());
app.use(bodyParser.json());

//IMPORT Routes
const notesRoute = require('./routes/notes');

app.use('/notes', notesRoute);

//ROUTES
app.get('/', (req, res) => {
  res.send('TODO-API');
});

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
  console.log('Connection to MongoDB successful!');
});

//HOW do we start listening to the server
app.listen(3001);
