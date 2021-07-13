var sqlite3 = require('sqlite3').verbose();

class Data {

    constructor() {
        this.studentNames = null;
    }

    setNames(names) {
        // console.log("setting names");
        // console.log(names);
        this.studentNames = names;
        // console.log(this.studentNames)
    }

    setData(err, rows) {
        // console.log(rows)
        // console.log(687)
        this.studentNames = rows
    }
}

class SQLiteDatabase {

    constructor(name) {
        this.name = name;
        this.db = new sqlite3.Database(name);
    }
    

    getAllStudentNames(data) {
        // var data = new Data();/
        // this.db.all("SELECT name FROM students", (err, rows) => {
        //     console.log(rows);
        //     // data.studentNames = rows;
        //     data.setNames(rows);
        //     // console.log(data.studentNames);
        // })
        // const result = this.db.all("SELECT name FROM students", []);
        // console.log(result.rows)
        // return data.studentNames;
    }

    close() {
        this.db.close();
    }
}

d = new SQLiteDatabase("test.db");
data = new Data();
d.getAllStudentNames(data)
// const run = async () => {
//     await d.getAllStudentNames(data);
//     // return data.studentNames
//     return 687;
//     // console.log(254, data.studentNames);
// }

// run().then(res => {
//     console.log(res);
// })

