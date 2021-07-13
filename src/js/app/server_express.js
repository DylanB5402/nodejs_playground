const express = require('express');
const user_database = require('./user_database');

const app = express();
const port = 3000;

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

var database = new user_database.UserDatabase('users.db');

app.get('/', (req, res) => {
  res.send('GET request received!');
})

app.get('/users/all', (req, res) => {
  // res.send("taco");
  database.getAllUsers(res);
})

app.post('/users/create', (req, res) => {
  var name = req.body['name'];
  var number = req.body['number'];
  var drink = req.body['drink'];
  database.createNewUser(name, number, drink, res);
})

app.get('/users/:id', (req, res) => {
  // res.send(req.params['id']);
  // database.getAllUsers(res);
})



// app.get('/students', (req, res) => {
//   database.getAllStudentNames(res);
// })


// app.post('/', (req, res) => {
//     console.log(req.body)
//     resp = ""
//     option = req.body['option']
//     if (option == "one") {
//         resp = "taco"
//     } else if (option == "two") {
//         resp = "potato"
//     }
//     res.send(resp)
// })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
})