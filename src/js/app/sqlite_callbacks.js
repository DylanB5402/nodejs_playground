var sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database('test.db');

db.all("SELECT name FROM students", (err, rows) => {
    console.log(rows);
})
