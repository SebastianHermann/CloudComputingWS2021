const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
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

mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log('Database Connected Successfully'))
  .catch((err) => console.log(err));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('/Frontend/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '/Frontend', 'build', 'index.html'));
  });
}

//HOW do we start listening to the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
