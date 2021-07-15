var sqlite3 = require('sqlite3').verbose();
var template_engine = require('./template_engine');

class UserDatabase {

    constructor(name) {
        this.name = name;
        this.db = new sqlite3.Database(name);
        this.initDatabase();
        this.initLoginDatabase();
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

    initLoginDatabase() {
        this.db.run("CREATE TABLE IF NOT EXISTS logins (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT);", (err) => {
            if (err != undefined) {
                console.log(err);
            }
        });
    }

    encryptPassword(password) {
        // insert encryption here
        return password;
    }

    decryptPassword(password) {
        // insert decryption here
        return password;
    }

    createLogin(username, password, http_response) {
        // console.log(username);
        this.db.get(`SELECT * FROM logins WHERE username = ${username};`, (err, row) => {
            if (row != undefined) {
                http_response.send("invalid username, please try again");
            } else {
                this.db.run(`INSERT INTO logins (username, password) VALUES ("${username}", "${password}");`, (err) => {
                    if (err != undefined) {
                        console.log(err);
                        http_response.send("database insertion failed, please try again");
                    } else {
                        http_response.send("New Account Created");
                    }
                })
            }
        })
    }

    login(username, password, http_request, http_response) {
        this.db.get(`SELECT * FROM logins WHERE username = "${username}";`, (err, row) => {
            if (err != undefined) {
                console.log(err);
            } else {
                if (row == undefined) {
                    http_response.send("username does not exist");
                } else {
                    if (password == row["password"]) {
                        // http_response.send("Logged in! Welcome " + username);
                        http_request.session.loggedin = true;
                        http_request.session.username = username;
                        http_response.redirect("/home");
                    } else {
                        http_response.send("incorrect password");
                    }
                }
            }
        })
    }


    close() {
        this.db.close();
    }
}

module.exports = {UserDatabase}