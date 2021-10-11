require('dotenv').config();
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');

const app = express();

app.use(express.json());

app.use(
    '/graphql',
    graphqlHTTP({
        schema: graphQlSchema,
        rootValue: graphQlResolvers,
        graphiql: true
    })
);

mongoose
    .connect(
        `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.axare.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`
    )
    .then(
        app.listen(3000, () => {
            console.log('escuchando puerto 3000..');
        })
    )
    .catch((err) => {
        console.log(err);
    });
