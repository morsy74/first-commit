const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const logger = require('./config/logger');
const express = require('express');
require('express-async-errors');
const app = express();

// if (!config.get('jwtPrivateKey')){
//   console.error('FATAL ERROR: jwtPrivateKey is not defined.');
//   process.exit(1);
// }

mongoose.connect('mongodb://localhost/vidly', 
{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
  .then(() => console.log('Connected to MongoDB..'))
  .catch(err => console.log('Error connected to MongoDB..',err));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'failed',
    message: 'Page not found!'
  })
})

const port = process.env.PORT || 4000;
app.listen(port, () => logger.info(`Listening on port ${port}...`));