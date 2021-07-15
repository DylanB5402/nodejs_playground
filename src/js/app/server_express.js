const express = require('express');
const user_database = require('./user_database');
const session = require('express-session');


const app = express();
const port = 3000;

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static('public'));
app.use(session({secret: 'secret',
                  resave: true,
                  saveUninitialized: true
}));

var database = new user_database.UserDatabase('users.db');

app.get('/', (req, res) => {
  // res.send('GET request received!');
  // console.log(req.body);
})

/**
 * Returns a page with all users in the database upon receiving a get request
 */
app.get('/users/all', (req, res) => {
  // console.log(req);
  if (req.session.loggedin) {
     res.send("Hello World");
  } else {
    database.getAllUsers(res);
  }
})

/**
 * Tries to create a new user in the database upon receiving a post request
 */
app.post('/users/create', (req, res) => {
  var name = req.body['name'];
  var number = req.body['number'];
  var drink = req.body['drink'];
  // console.log(req.body);
  database.createNewUser(name, number, drink, res);
})

/**
 * Returns a single user's information in json format based on their id 
 */
app.get('/users/:id', (req, res) => {
  var id = req.params['id'];
  database.getUser(id, res);
})

/**
 * Return a single user's information in html format using the template engine
 */
app.get('/view/:id', (req, res) =>  {
  var id = req.params['id'];
  database.viewUser(id, res);
})

app.post('/signup/new', (req, res) => {
  var username = req.body['username'];
  var password = req.body['password'];
  database.createLogin(username, password, res);
})

app.post('/login', (req, res) => {
  var username = req.body['username'];
  var password = req.body['password'];
  database.login(username, password, req, res);
})

app.get('/home', (req, res) => {
  if (req.session.loggedin) {
    res.send(req.session.username + " is logged in");
  } else {
    res.send("please log in");
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})

// 404, page can't be found
app.use(function (req, res) {
  res.status(404).send("Sorry can't find that!");
})