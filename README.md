Basic Web App requirements

- Set up a database which holds users

    - User

        - id (auto populated)
        - name
        - number
        - favorite drink

-  Use post requests to add new users

    - Body data:
        - "name" : string
        
        - "number" : float

        - "drink" : string
    
    - Response:
        - "success" : true/false

- Navigate to /users/:id to access a web page with all that user's data 

    - show an error page if the user doesn't exist

- Navigate to /users/all to see all user data

- (stretch) use Pug to create html pages showing the user's data