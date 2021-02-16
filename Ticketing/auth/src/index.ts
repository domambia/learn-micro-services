/** @format */
import express, { json, Request, Response } from 'express';
import mongoose from 'mongoose';
import 'express-async-errors';
import {
  currentUserRouter,
  signInRouter,
  signOutRouter,
  signUpRouter,
} from './routes';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors';

const app = express();

// MIDDLEWARE
app.use(json());

// ROUTES

app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);
app.use(currentUserRouter);

// Not FOUND ERROR Routes
app.all('*', () => {
  throw new NotFoundError();
});
app.use(errorHandler);

const start = async () => {
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
