var sqlite3 = require('sqlite3').verbose();
var template_engine = require('./template_engine');

class UserDatabase {

    constructor(name) {
        this.name = name;
        this.db = new sqlite3.Database(name);
        this.initDatabase();
        this.temp_engine = new template_engine.TemplateEngine();
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

    getUser(id, http_response) {
        this.db.get(`SELECT * FROM users WHERE id = ${id};`, (err, row) => {
            var response_string = JSON.stringify(row, null, 2);
            // console.log(response_string);
            if (response_string != undefined) {
                http_response.send(response_string);
            } else {
                http_response.send(`User with id ${id} not found`);
            }
        })
    }

    viewUser(id, http_response) {
        this.db.get(`SELECT * FROM users WHERE id = ${id};`, (err, row) => {
            if (row != undefined) {
                var name = row['name'];
                var number = row['number'];
                var drink = row['drink'];
                http_response.send(this.temp_engine.getUser(id, name, number, drink));
            } else {
                http_response.send(`User with id ${id} not found`);
            }
        })
    }

    close() {
        this.db.close();
    }
}

module.exports = {UserDatabase}