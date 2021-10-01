//import GraphQL
import gql from "graphql-tag";

//export queries for GraphQL
export const GET_ME  = gql`
    {
        me {
            _id
            username
            email
            bookCount
            savedBooks {
                bookId
                authors
                title
                description
                image
                link
            }
        }
    }
`;