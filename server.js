const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const passport = require('passport')

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts')

const keys = require('./config/keys');

const app = express();

// body parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// connect to mongoDb database through mongoose
mongoose
    .connect(keys.mongoURI)
    .then(() => console.log('mongoose connected'))
    .catch(err => console.log(err))

// initialize passport
app.use(passport.initialize())

// passport config
require('./config/passport')(passport)

// use routes
app.use('/api/users', users);
app.use('/api/profile', profile)
app.use('/api/posts', posts)

// port to 5000 on development 
const port = process.env.PORT || 5000;

app.listen(port, () => console.log('running on 5000'));