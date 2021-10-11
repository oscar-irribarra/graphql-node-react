require('dotenv').config();
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Event = require('./models/event');
const User = require('./models/user');

const app = express();

app.use(express.json());

app.use(
    '/graphql',
    graphqlHTTP({
        schema: buildSchema(`
        type Event {
            _id: ID!
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        type User {
            _id: ID!
            email: String!
            password: String
        }

        input EventInput {
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        input UserInput {
            email: String!
            password: String!
        }

        type RootQuery {
            events: [Event!]!
        }

        type RootMutation {
            createEvent(eventInput: EventInput): Event
            createUser(userInput: UserInput): User
        }

        schema {
            query: RootQuery 
            mutation: RootMutation
        }
    `),
        rootValue: {
            events: async () => {
                try {
                    return await Event.find();
                } catch (err) {
                    console.log(err);
                    throw err;
                }
            },
            createEvent: async (args) => {
                try {
                    const event = new Event({
                        title: args.eventInput.title,
                        description: args.eventInput.description,
                        price: +args.eventInput.price,
                        date: new Date(args.eventInput.date),
                        creator: '6163914dbb0d51a3cc494770'
                    });
                    const createdEvent = await event.save();

                    const user = await User.findById(
                        '6163914dbb0d51a3cc494770'
                    );
                    if (!user) {
                        throw new Error('User not found');
                    }

                    user.createdEvents.push(event);
                    await user.save();

                    return createdEvent;
                } catch (err) {
                    throw err;
                }
            },
            createUser: async (args) => {
                try {
                    const isEmailExist = await User.findOne({
                        email: args.userInput.email
                    });

                    if (isEmailExist) {
                        throw new Error('User already exist');
                    }

                    const hashedPassword = await bcrypt.hashSync(
                        args.userInput.password,
                        12
                    );

                    const user = new User({
                        email: args.userInput.email,
                        password: hashedPassword
                    });

                    const userReturn = await user.save();
                    userReturn.password = null;
                    return userReturn;
                } catch (err) {
                    throw err;
                }
            }
        },
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
