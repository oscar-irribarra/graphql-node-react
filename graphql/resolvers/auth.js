const bcrypt = require('bcryptjs');

const User = require('../../models/user');

module.exports = {
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
