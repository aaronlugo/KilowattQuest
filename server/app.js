const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// allow cross-origin-requests
app.use(cors());

mongoose.connect(
  'mongodb://kwquest:ILbalm%231727@ds153841.mlab.com:53841/kwquest',
  { useNewUrlParser: true });
mongoose.connection.once('open', () => {
  console.log('Connected to database.');
});

// bind express with graphql
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {
    console.log('now listening for requests on port 4000');
});