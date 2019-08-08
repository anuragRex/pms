const { ApolloServer, gql } = require('apollo-server');

const db = {
    socials : [
        { id : '1', associations : ['some value', 'some more value'], selfEvaluation: 'value1', productServices : 'value2', competitor : 'value3', partnerships : 'value4'},
        { id : '2', associations : ['value', 'more value'], selfEvaluation: 'value1', productServices : 'value2', competitor : 'value3', partnerships : 'value4'},
        { id : '3', associations : ['some value1', 'some more value1'], selfEvaluation: 'value1', productServices : 'value2', competitor : 'value3', partnerships : 'value4'},
    ]
}

const typeDefs = gql`
    type Query {
        getAllSocialData : [Social!]!
        getSocialData(id : ID!) : Social
    }
    type Social {
        id : ID!
        associations : [String!]!
        selfEvaluation : String
        productServices : String
        competitor : String
        partnerships : String
    }
    type Mutation {
        addSocialData(id : ID!, associations : [String!]!, selfEvaluation : String, productServices : String, competitor : String, partnerships : String) : Social
    }
`;

const resolvers = {
    Query : {
        getAllSocialData : () => db.socials,
        getSocialData : (parent, { id }) => db.socials.find(el => el.id === id)
    },
    Mutation : {
        addSocialData : (parent, args) => {
            const data = {
                id : args.id,
                associations : args.associations,
                selfEvaluation : args.selfEvaluation,
                productServices : args.productServices,
                competitor : args.competitor,
                partnerships : args.partnerships
            }
            db.socials.push(data);
            return data;
        }
    }
};

// spinning up a server
const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.listen()
    .then(({ url }) => console.log(url))
    .catch(ex => console.log(ex));