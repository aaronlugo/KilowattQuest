import React from 'react';
import { Button, Image, Text, View, SafeAreaView, StatusBar, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { createStackNavigator, createBottomTabNavigator, BottomTabBar } from 'react-navigation';
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

// export default class App extends Component {
//   render() {
//     return (
//       <ApolloProvider client={client}>
//         <StationsMap />
//      </ApolloProvider>
//     );
//   }
// }



const isAndroid = Platform.OS === 'android';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paragraph: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});

class LogoTitle extends React.Component {
  render() {
    return (
      <Image
        source={require('./logo.png')}
        style={{ width: 75, height: 35 }}
      />
    );
  }
}

class MapScreen extends React.Component {
    static navigationOptions = {
    headerTitle: <LogoTitle />,
    headerStyle: {
      backgroundColor: '#cec0c0',
    },
    headerTintColor: '#fff',
  };

  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('light-content');
      isAndroid && StatusBar.setBackgroundColor('#6a51ae');
    });
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  render() {
    return (
        <ApolloProvider client={client}>
          <StatusBar
            barStyle="light-content"
            backgroundColor="#6a51ae"
          />
          <StationsMap />
        </ApolloProvider>
    );
  }
}

class ListScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 'Stations List',
    headerTitleStyle: {
      color: '#e44b43',
    },
    headerStyle: {
      backgroundColor: '#cec0c0',
    },
    headerTintColor: '#fff'
  };

  componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', () => {
      StatusBar.setBarStyle('light-content');
      isAndroid && StatusBar.setBackgroundColor('#6a51ae');
    });
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  render() {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: '#ecf0f1' }]}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#6a51ae"
        />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ApolloProvider client={client}>
          <StationsList />
        </ApolloProvider>
        </View>
      </SafeAreaView>
    );
  }
}



const MapStack = createStackNavigator({
  Map: { screen: MapScreen },
});

const ListStack = createStackNavigator({
  List: { screen: ListScreen },
});


export default createBottomTabNavigator(
  {
    Map: { screen: MapStack },
    List: { screen: ListStack },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Map') {
          iconName = `ios-map${focused ? '' : '-outline'}`;
        } else if (routeName === 'List') {
          iconName = `ios-list${focused ? '' : '-outline'}`;
        }

        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarComponent: BottomTabBar,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: '#222f3a',
      inactiveTintColor: 'gray',
    },
    animationEnabled: false,
    swipeEnabled: false,
  }
);