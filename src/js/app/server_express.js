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
  console.log(req.body);
})

app.get('/users/all', (req, res) => {
  console.log(req);
  database.getAllUsers(res);
})

app.post('/users/create', (req, res) => {
  var name = req.body['name'];
  var number = req.body['number'];
  var drink = req.body['drink'];
  console.log(req.body);
  database.createNewUser(name, number, drink, res);
})

app.get('/users/:id', (req, res) => {
  var id = req.params['id'];
  database.getUser(id, res);
})

app.get('/view/:id', (req, res) =>  {
  var id = req.params['id'];
  database.viewUser(id, res);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})

app.use(function (req, res) {
  res.status(404).send("Sorry can't find that!");
})