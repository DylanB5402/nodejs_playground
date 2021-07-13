// import express, { json, urlencoded } from 'express';
// import {SQLiteDatabase } from './sqlite_callbacks'

const express = require('express')
const sqlite_callbacks = require('./sqlite_callbacks')

const app = express()
const port = 3000

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
var database = new sqlite_callbacks.SQLiteDatabase('test.db')

app.get('/', (req, res) => {
  res.send('GET request received!')
  
})

app.get('/students', (req, res) => {
  // res.send('GET request received!')
  database.getAllStudentNames(res);
})

app.post('/', (req, res) => {
    console.log(req.body)
    // console.log(req.body['687'])
    resp = ""
    option = req.body['option']
    if (option == "one") {
        resp = "taco"
    } else if (option == "two") {
        resp = "potato"
    }
    res.send(resp)
    res.sendF
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
})