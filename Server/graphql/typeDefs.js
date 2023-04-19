const {gql} = require('apollo-server');

const typeDefs = gql`
    type Message {
    text: String
    createdBy:String
    }
    type Query {
        
    }
    type MessageInput {
    text: String
    username: String
    }
    type Mutation {
    createdMessage(messageInput: MessageInput) : Message!
    }

    type Subscription {
        messageCreated: Message
    }
`

module.exports = typeDefs