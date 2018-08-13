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
  state = {
    position: null,
    mapRegion: null,
    lastLat: null,
    lastLong: null,
  }
  componentDidMount() {
    this.watchID = navigator.geolocation.watchPosition((position) => {
      
      let region = {
        latitude:       position.coords.latitude,
        longitude:      position.coords.longitude,
        latitudeDelta:  0.00922*1.5,
        longitudeDelta: 0.00421*1.5
      } 
      this.onRegionChange(region, region.latitude, region.longitude);
    });
  }
  onRegionChange(region, lastLat, lastLong) {
    this.setState({
      mapRegion: region,
      lastLat: lastLat || this.state.lastLat,
      lastLong: lastLong || this.state.lastLong
    });
  }
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }
  render() {     
    return (
      <View style={styles.container}>
        <MapView
          style={{ alignSelf: 'stretch', height: '100%', width: '100%'  }}
          region={this.state.mapRegion}
          showsUserLocation={true}
          followUserLocation={true}
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
          {this.props.data.loading ? null : this.props.data.stations.map((station, index) => {
            const coords = {
              latitude: station.gps.latitude,
              longitude: station.gps.longitude,
            };
            return (
              <MapView.Circle
                key = { index }
                center = { coords }
                radius = { 1000 }
                strokeWidth = { 1 }
                strokeColor = { '#1a66ff' }
                fillColor = { 'rgba(230,238,255,0.5)' }
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