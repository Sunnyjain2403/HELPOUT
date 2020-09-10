const express = require('express')
const app = express()
const mongoose = require('mongoose')
const session = require('express-session')
const path = require('path')



//routes
const main = require('./routes/main')


const { static } = require('express')
//const admin=require('./routes/admin')

//connect to db
const url = process.env.MONGO_URL
mongoose.connect(url, { useNewUrlParser: true }, () => {
  console.log('connect')
})

//set viewengine
app.set('view engine', 'ejs')

//bod-parser
app.use(express.json())
app.use(express.urlencoded())

//session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

//routing
const public = path.join(__dirname, '/public')
app.use('/public', express.static(public))
app.use(express.static('public'))

app.use('/', main)
app.use(function (req, res, next) {
  if (req.session.username == null) {
    res.redirect('/login');
  } else {
    res.redirect('/tweets')
  }
});




//listening to port
const port = process.env.PORT || 3000
app.listen(port)