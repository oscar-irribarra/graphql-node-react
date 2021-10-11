const bcrypt = require('bcryptjs');

const Event = require('../../models/event');
const User = require('../../models/user');

const events = async (eventIds) => {
    try {
        const events = await Event.find({ _id: { $in: eventIds } });

        return events.map((event) => {
            return {
                ...event._doc,
                date: new Date(event._doc.date).toISOString(),
                creator: user.bind(this, event.creator)
            };
        });
    } catch (err) {
        throw err;
    }
};

const user = async (userId) => {
    try {
        const user = await User.findById(userId);
        return {
            ...user._doc,
            createdEvents: events.bind(this, user.createdEvents)
        };
    } catch (err) {
        throw err;
    }
};

module.exports = {
    events: async () => {
        try {
            const events = await Event.find().populate('creator');

            return events.map((event) => {
                return {
                    ...event._doc,
                    date: new Date(event._doc.date).toISOString(),
                    creator: user.bind(this, event.creator)
                };
            });
        } catch (err) {
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
            const result = await event.save();

            const createdEvent = {
                ...result._doc,
                date: new Date(event._doc.date).toISOString(),
                creator: user.bind(this, result._doc.creator)
            };

            const currentUser = await User.findById('6163914dbb0d51a3cc494770');
            if (!currentUser) {
                throw new Error('User not found');
            }

            currentUser.createdEvents.push(event);
            await currentUser.save();

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

            const result = await user.save();
            result.password = null;
            return result;
        } catch (err) {
            throw err;
        }
    }
};
