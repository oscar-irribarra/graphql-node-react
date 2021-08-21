const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

const events = [];

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

        input EventInput {
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        type RootQuery {
            events: [Event!]!
        }

        type RootMutation {
            createEvent(eventInput: EventInput): Event
        }

        schema {
            query: RootQuery 
            mutation: RootMutation
        }
    `),
    rootValue: {
      events: () => {
        return events;
      },
      createEvent: (args) => {
        const event = { ...args };
        event.date = new Date().toString();
        event._id = Math.random().toString();

        events.push(event);
        return event;
      }
    },
    graphiql: true
  })
);

app.listen(3000, () => {
  console.log('escuchando puerto 3000..');
});
