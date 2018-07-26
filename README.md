# KilowattQuest
This is the project for the entire Kilowatt Quest application, including app client, admin client,
server and database.

## Modules
KWQ consists of four subdirectories, each of which contains a different subproject.  

### Client
This is the mobile application client, the main product.
- React Native - Cross platform mobile development in JavaScript
- Apollo(Client) - Implementation of GraphQL Client
- GraphQL - Middleware layer for database queries
### Server
This is the application server that serves up data from the internet.
- Node.js - Server-side JavaScript engine and server
- Express - Lightweight application server
- Apollo(Server) - Implementation of GraphQL API
- Mongoose - MongoDB Schema plugin
### Admin
This is an administrative server that will be built later.
- React JS - Web User Interface framework for building reactive web sites.
- Apollo (Client) - Implementation of GraphQL client.
### Database
This is the database server. It may or may not be instantiated on our own servers.
- MongoDB - Currently hosted on MLab for develpment.


Each subdirectory is a separate application with it's own set of libraries and server entry point.   

# Running
Each application has its own port.  For convenience in developing, I use nodemon to automatically reload the server when editing files. 

    $ nodemon app
    [nodemon] 1.18.3
    [nodemon] to restart at any time, enter `rs`
    [nodemon] watching: *.*
    [nodemon] starting `node app.js`
    (node:47820) DeprecationWarning: current URL string parser is deprecated, and will be removed in a future version. To use the new parser, pass option { useNewUrlParser: true } to MongoClient.connect.
    now listening for requests on port 4000
    Connected to database.

