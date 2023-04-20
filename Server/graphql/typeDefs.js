const {gql} = require('apollo-server');

module.exports = gql`
    type Message {
    text: String
    createdBy:String
    }

    type Query {
        message(id: ID!): Message
    }

    input MessageInput {
    text: String
    username: String
    }

    type Mutation {
        createMessage(messageInput: MessageInput) : Message!
    }

    type Subscription {
        messageCreated: Message
    }
`

// module.exports = typeDefs