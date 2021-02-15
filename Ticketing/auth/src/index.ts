/** @format */
import express, { json, Request, Response } from 'express';
import {
  currentUserRouter,
  signInRouter,
  signOutRouter,
  signUpRouter,
} from './routes';
import { errorHandler } from './middlewares/error-handler';

const app = express();

// MIDDLEWARE
app.use(json());

// ROUTES

app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);
app.use(currentUserRouter);

app.use(errorHandler);

// RUNNING APP
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`auth-srv running on port ${PORT} !!!!!`);
});
