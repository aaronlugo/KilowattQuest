import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View } from 'react-native';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import Loading from './loading';

const getStationsQuery = gql`
  {
    stations {
      id
      name
      status
      gps {
        latitude
        longitude
      }
    }
  }
`

class StationsList extends Component {
  render() {
    return (
      <View style={styles.container}>
        <FlatList
        data={this.props.data.stations}
        renderItem={({item}) => <Text style={styles.item}>{item.name}</Text>}
        keyExtractor={item => item.id}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})

export default graphql(getStationsQuery)(StationsList);