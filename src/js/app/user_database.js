var sqlite3 = require('sqlite3').verbose();

class UserDatabase {

    constructor(name) {
        this.name = name;
        this.db = new sqlite3.Database(name);
        this.initDatabase()
    }

    initDatabase() {
        this.db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, number REAL, drink TEXT);", (res, err) => {
            if (err != undefined) {
                console.log(err);
            }
        });
    }

    createNewUser(name, number, drink, res) {
        this.db.run("INSERT INTO users (name, number, drink) VALUES", (res, err) => {

        })
    }

    getAllUsers(res) {
        
    }


    // getAllStudentNames(res) {
    //     this.db.all("SELECT name FROM students", (err, rows) => {
    //         console.log(rows);
    //         var resp_string = "";
    //         rows.forEach((row) => {
    //             resp_string = resp_string + row['name'] + ' ';
    //         })
    //         res.send(resp_string)
    //     })
    // }

    close() {
        this.db.close();
    }
}

module.exports = {UserDatabase}