const Message = require('../Models/message.js');
const { PubSub} = require('graphql-subscriptions');

const pubSub = new PubSub();

module.exports = {
    Query: {
        message: (_, {id}) => Message.findById(id)
    },
    Mutation: {
        async createMessage(_, {messageInput: {text, username}}) {
            const newMessage = new Message({
                text: text,
                createdBy: username
            });
            const res = await newMessage.save();

            pubSub.publish('MESSAGE_CREATED', {
                messageCreated: {
                    text: text,
                    createdBy: username
                }
            });

            return {
                id: res.id,
                ...res._doc
            };
        }
    },
    Subscription: {
        messageCreated: {
            subscribe: () => pubSub.asyncIterator('MESSAGE_CREATED')
        }
    }
}

// module.exports = resolvers