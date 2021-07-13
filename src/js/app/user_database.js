var sqlite3 = require('sqlite3').verbose();

class UserDatabase {

    constructor(name) {
        this.name = name;
        this.db = new sqlite3.Database(name);
        this.initDatabase()
    }

    initDatabase() {
        this.db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, number REAL, drink TEXT);", (err) => {
            if (err != undefined) {
                console.log(err);
            }
        });
    }

    createNewUser(name, number, drink, http_response) {
        this.db.run(`INSERT INTO users (name, number, drink) VALUES ("${name}", ${number}, "${drink}");`, (err) => {
            if (err != undefined) {
                console.log(err);
                http_response.json({"success" : false});
            } else {
                http_response.json({"success" : true});
            }  
        })
    }

    getAllUsers(http_response) {
        var response_string = "";
        this.db.all("SELECT * FROM users;", (err, rows) => {
            rows.forEach((row) => {
                response_string += "<p>" + JSON.stringify(row, null, 2) + "</p>";
            })
            http_response.send(response_string);
        })
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