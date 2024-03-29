/** @format */

import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY not defined');
  }
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('Connected to database');
  } catch (err) {
    console.log(`Auth DB error connection - ${err}`);
  }
  // RUNNING APP
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`auth-srv running on port ${PORT} !!!!!`);
  });
};

start();
