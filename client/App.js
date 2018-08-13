import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Constants, MapView } from 'expo';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

//Components
import StationsList from './components/stationsList';
import StationsMap from './components/stationsMap';
import Loading from './components/loading';

// ApolloClient setup.

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <StationsMap />
     </ApolloProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
});
