const express = require('express')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const { application } = require('express');
const user = require('./routes/user').router
const generateData = require('./routes/generate').router
const getGenerateUSer = require('./routes/generate').router

require('dotenv').config()



const app = express()
app.use(bodyParser.json());


// app.use(function(req, res, next) {
//   res.header("X-Frame-Options", "*");
//   next();
// });

app.use(cors({ origin: '*' }));

// adding course
// checkng server

// const corsOptions = {
//   origin: process.env.FRONTEND_URL,
//   credentials: true,            //access-control-allow-credentials:true
//   optionSuccessStatus: 200
// }
// app.use(cors());





//test api  at /api/user/text
app.use("/api/user", user);

app.use('/api/user', generateData)
app.use('./app/user', getGenerateUSer)


//to test nodejs app

app.get('/', (req, res) => {
  res.send('Hello Backend is running');
})

app.post('/api/forgot-password', (req, res) => {
  const { email } = req.body;

  // Perform necessary validation and logic to initiate the password reset process
  // For example, you could generate a password reset token and send it to the user's email

  // Return a success response
  res.json({ message: 'Password reset initiated' });
});



//db config
const mongoURL = process.env.MONGODB_URL



// const port = 5000;
const PORT = process.env.PORT || 5000;

mongoose.set("strictQuery", true);

mongoose.connect(mongoURL, {
  useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
}).catch((err) => {
  console.log(err.message + "000 errrrror")
})


app.listen(PORT, () => {
  console.log(`listening at port ${PORT}`, 'mongodb connected')
})

module.exports = app







