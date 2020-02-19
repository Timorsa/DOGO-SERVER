const mongoose = require('mongoose');

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}`;


const options = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
};


mongoose
  .connect(url, options)
  .then(db => console.log(`Server: connected to :  ${db.connection.name}`))
  .catch(err => console.error('Server: connection error: ', err));

const connection = mongoose.connection;
