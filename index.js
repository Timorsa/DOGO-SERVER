require('dotenv').config();
const path = require('path');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./src/db/dbConnection');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

// Routes
const petRouter = require('./src/routes/pet');
const userRouter = require('./src/routes/user');
const feedRouter = require('./src/routes/feed');
const eventRouter = require('./src/routes/event');
const authRouter = require('./src/routes/auth');
const treatmentRouter = require('./src/routes/treatment');

app.use('/pet', petRouter);
app.use('/user', userRouter);
app.use('/feed', feedRouter);
app.use('/event', eventRouter);
app.use('/auth', authRouter);
app.use('/treatment', treatmentRouter);

app.use((req, res, next) => {
  let err = new Error('Not Found !!');
  err.status = 404;
  next(err);
});

const errorHandler = require('./src/handlers/error');
app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(`Server: server is ready for requests on : ${PORT}`);
});
