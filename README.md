App (view src/js/app):

Dependencies:

- [Express](https://github.com/expressjs/express)
- [Pug](https://github.com/pugjs/pug)
- [node-sqlite3](https://github.com/mapbox/node-sqlite3)

Files:

- server_express.js:

    - Handles post/get requests
    - app.post(), app.get() methods contain a callback function which processes the data sent by the http request
        - The callback function passes the data in the http request and the response object to the database class

- user_database.js

    - The database class uses SQL to query the database (users.db)
    - Database contains a table called users with 4 columns
        - id (Integer)
        - name (String)
        - number (Float)
        - drink (String)
    - Methods in the database class take data to use with the database and an http response object
        - Information is  used to either query or add to the databse 
        - The response object has to be passed in as an argument because you can't return values from callback functions
        - Response object returns information in the database
            - A template engine can be used to generate html based on information in the database

- template_engine.js

    - Using a template engine allows us to pass in information (such as a user's name, etc) into html 
        - Using Pug as our template engine (other template engines are available)
            - view the templates directory for example pug template files
        - Using a template engine means that html can be written as pug templates instead of writing html as a string inside of a javascript file
    - Pug workflow
        - Design pages using html and css, then convert html to pug using online tools (ex: https://codebeautify.org/html-to-pug-converter)




