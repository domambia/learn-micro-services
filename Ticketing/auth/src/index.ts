/** @format */
import express, { json, Request, Response } from 'express';
import {
  currentUserRouter,
  signInRouter,
  signOutRouter,
  signUpRouter,
} from './routes';

const app = express();

// MIDDLEWARE
app.use(json());

// ROUTES

app.use(signInRouter);
app.use(signOutRouter);
app.use(signUpRouter);
app.use(currentUserRouter);

// RUNNING APP
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`auth-srv running on port ${PORT} !!!!!`);
});
