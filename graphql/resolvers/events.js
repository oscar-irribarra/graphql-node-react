const Event = require('../../models/event');
const { dateToString } = require('../../helpers/date');

module.exports = {
    events: async () => {
        try {
            const events = await Event.find().populate('creator');

            return events.map((event) => {
                return transformEvent(event);
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
                date: dateToString(args.eventInput.date),
                creator: '6163914dbb0d51a3cc494770'
            });
            const result = await event.save();

            const createdEvent = transformEvent(result);

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
    }
};
