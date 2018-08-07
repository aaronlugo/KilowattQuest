import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Constants, MapView } from 'expo';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

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

class StationsMap extends Component {
  render() {      
    return (
        <View style={styles.container}>
          <MapView
            style={{ alignSelf: 'stretch', height: '100%', width: '100%'  }}
            region={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
          >
            {this.props.data.loading ? null : this.props.data.stations.map((station, index) => {
                const coords = {
                latitude: station.gps.latitude,
                longitude: station.gps.longitude,
                };
                const metadata = `Status: ${station.status}`;

                return (
                <MapView.Marker
                    key={index}
                    coordinate={coords}
                    title={station.name}
                    description={metadata}
                />
                );
            })}
          </MapView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
});

export default graphql(getStationsQuery)(StationsMap);