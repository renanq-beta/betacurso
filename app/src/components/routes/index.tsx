import React from 'react';
import {
  BrowserRouter as Router, Route, Switch, Redirect, RouteProps,
} from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import useStorage from '../../helpers/useStorage';
import DashboardPage from '../../pages/dashboard';
import LoginPage from '../../pages/login';
import Signup from '../../pages/signup';
import { UserProvider } from '../userProvider';

import apolloClient from '../../helpers/apolloClient';
import CreateCourse from '../../pages/createCourse';

const PublicRoute: React.FC<RouteProps> = (props: RouteProps) => (<Route {...props} />);

const PrivateRoute: React.FC<RouteProps> = (props: RouteProps) => {
  const [tokenCredentials] = useStorage('token_credentials');
  if (!tokenCredentials) {
    return <Redirect to="/login" />;
  }
  const { token, type: typeToken } = JSON.parse(tokenCredentials);
  return (
    <UserProvider token={token} type={typeToken}>
      <Route {...props} />
    </UserProvider>
  );
};

const Routes: React.FC = () => {
  const [tokenCredentials] = useStorage('token_credentials');
  return (
    <ApolloProvider client={apolloClient(tokenCredentials)}>
      <Router>
        <Switch>
          <PrivateRoute path="/create" exact component={CreateCourse} />
          <PrivateRoute path="/" exact component={DashboardPage} />
          <PublicRoute path="/login" exact component={LoginPage} />
          <PublicRoute path="/signup" exact component={Signup} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
};

export default Routes;
