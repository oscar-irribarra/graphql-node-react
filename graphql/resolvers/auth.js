const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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
    },
    login: async ({ email, password }) => {
        if (!email || !password) {
            throw new Error('Password or User are incorrect!');
        }

        const user = await User.findOne({ email });

        if (!user) {
            throw new Error('Password or User are incorrect!');
        }

        const isEqual = await bcrypt.compare(password, user.password);

        if (!isEqual) {
            throw new Error('Password or User are incorrect!');
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1h' }
        );

        return {
            userId: user.id,
            token,
            tokenExpiration: 1
        };
    }
};
