var sqlite3 = require('sqlite3').verbose();


// var db = new sqlite3.Database('test.db');

class SQLiteDatabase {

    constructor(name) {
        this.name = name;
        this.db = new sqlite3.Database(name);
    }
    

    getAllStudentNames(res) {
        this.db.all("SELECT name FROM students", (err, rows) => {
            console.log(rows);
            // res.send(rows[0]['name'])
            // for row in rows {}
            var resp_string = "";
            rows.forEach((row) => {
                resp_string = resp_string + row['name'] + ' ';
            })
            res.send(resp_string)
        })
    }

    close() {
        this.db.close();
    }
}

// export default {SQLiteDatabase}
module.exports = {SQLiteDatabase}