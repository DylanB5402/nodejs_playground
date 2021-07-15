const express = require('express');
const user_database = require('./user_database');


const app = express();
const port = 3000;

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static('public'));

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
  database.getAllUsers(res);
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

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})

// 404, page can't be found
app.use(function (req, res) {
  res.status(404).send("Sorry can't find that!");
})