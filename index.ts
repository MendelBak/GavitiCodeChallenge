import express from 'express';
import mongoose from 'mongoose';

// Internal
// import { uri } from '../backend/config/dbConsts';
// import keys from './config/keys';
import cookieSession from 'cookie-session';
import cors from 'cors';

import passport from 'passport';
import transactionRoute from './api/routes/transaction.route';

module.exports.mongoose = mongoose;

const app = express();
const PORT = 3000;

app.use(cors());

app.all('/*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});

// parse application/json
app.use(express.json());

// app.use(
//   cookieSession({
// milliseconds of a day
// maxAge: 30 * 24 * 60 * 60 * 1000,
// keys: [keys.session.cookieKey],
//   })
// );

app.use(passport.initialize());
app.use(passport.session());

// Defines the routes used.
app.use('/transaction', transactionRoute);

app.listen(PORT, () => {
  try {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);

    mongoose.connect(
      'mongodb://localhost:27017/',
      {
        dbName: 'gaviti_transaction_db',
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      (err) =>
        err
          ? console.log('Error connecting to mongoDB', err)
          : console.log('Connected to database')
    );

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  } catch (err) {
    console.log('error starting the application ', err);
  }
});

export default app;
