import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from '@apollo/client';
import { IToken } from '../interfaces/ICredentials';

const linkGraphql = new HttpLink({
  uri: 'http://localhost:3003/gql',
});

export default (token: string) => {
  const tokenToJson: IToken = JSON.parse(token);
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([
      new ApolloLink((operation, forward) => {
        if (token) {
          operation.setContext({
            headers: {
              Authorization: `${tokenToJson.type} ${tokenToJson.token}`,
            },
          });
        }
        return forward(operation);
      }),
      linkGraphql,
    ]),
  });

  return client;
};
