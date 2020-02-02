import React, {Component} from 'react';
import 'react-native-gesture-handler';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';

import HomeScreen from './src/screens/HomeScreen';
import ContactScreen from './src/screens/ContactScreen';
import InfoScreen from './src/screens/InfoScreen';
import SideMenu from './src/components/SideMenu';

const DrawerNavigator = createDrawerNavigator({
  Home: HomeScreen,
  Contact: ContactScreen,
  Info: InfoScreen,
}, {
  contentComponent: SideMenu,
});

const AppContainer = createAppContainer(DrawerNavigator);

export default class App extends Component {
  render() {
    return (
      <AppContainer />
    );
  }
}