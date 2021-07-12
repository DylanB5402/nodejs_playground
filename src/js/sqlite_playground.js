var sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database('test.db');

// db.serialize( () => {
//     db.run("INSERT INTO students (name, num) VALUES (\"Cheese\", 19)")
// })

db.serialize( () => {
    db.all("SELECT name FROM students", (err, rows) => {
        console.log(rows);
        for (i = 0; i < rows.length; i++) {
            console.log(rows[i]['name'])
        }
    })
})
db.close()