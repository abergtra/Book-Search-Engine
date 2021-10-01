//require connections to models, auth, and apollo
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

//resolvers
const resolvers = {
    //Query resolver object
    Query: {
        me: async (parent, args, context) => {
            if(context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                .select('-__v -password')
                return userData;
            }
            throw new AuthenticationError('Not Logged In.');
        }
    },
    //mutation resolver object
    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email});
            const correctPW = await user.isCorrectPassword(password);
            const token = signToken(user);

            if (!user) {
                throw new AuthenticationError('Incorrect user credentials');
            }
            if (!correctPW) {
                throw new AuthenticationError('Incorrect password credentials');
            }

            return { token, user };
        },
        addUser: async (parent, args) => {

        },
        saveBook: async (parent, { input }, context) => {

        },
        removeBook: async (parent, args, context) => {

        },
    }
}

//export resolvers
module.exports = resolvers