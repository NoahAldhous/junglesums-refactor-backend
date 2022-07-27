import express from 'express';
import path from 'path';

import __dirname  from './dirname.js';
import cookieParser  from 'cookie-parser';
import cors  from 'cors';
import logger  from 'morgan';
import bodyParser from "body-parser";

// // CHANGE - default info
import usersRouter  from './routes/users.js';

const app = express();

// test route
app.get("/",function (req, res) {
  res.json({ message: "Hello from the root path!" });
});


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// CHANGE - default info
app.use('/users', usersRouter);

app.use(function (req, res, next) {
  res.status(404).json({message: "We couldn't find what you were looking for 😞"})
})

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).json(err)
})


export default app;
