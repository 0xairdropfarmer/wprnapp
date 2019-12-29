import React, {useContext} from 'react';
import {ThemeContext} from './ThemeManager';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import Home from '../screens/Home';
import Categories from '../screens/Categories';
import Setting from '../screens/Setting';
import SinglePost from '../screens/SinglePost';
import CategorieList from '../screens/CategorieList';
import Contact from '../screens/Contact';
import Bookmark from '../screens/Bookmark';
import NetworkStatus from './NetworkStatus';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  Provider as PaperProvider,
  DarkTheme,
  DefaultTheme,
} from 'react-native-paper';
const DashboardTabNavigator = createBottomTabNavigator(
  {
    HomePage: {
      screen: Home,
      navigationOptions: ({theme}) => {
        const color = theme == 'light' ? 'black' : 'white';
        return {
          tabBarLabel: 'Home',
          tabBarIcon: () => <Ionicons name="md-home" color={color} size={30} />,
        };
      },
    },

    Categories: {
      screen: Categories,
      navigationOptions: ({theme}) => {
        const color = theme == 'light' ? 'black' : 'white';
        return {
          tabBarLabel: 'Categories',
          tabBarIcon: () => (
            <Ionicons name="md-apps" color={color} size={30} />
          ),
        };
      },
    },
    Bookmark: {
      screen: Bookmark,
      navigationOptions: ({theme}) => {
        const color = theme == 'light' ? 'black' : 'white';
        return {
          tabBarLabel: 'Post',
          tabBarIcon: () => (
            <Ionicons name="ios-bookmark" color={color} size={30} />
          ),
        };
      },
    },

    Setting: {
      screen: Setting,
      navigationOptions: ({theme}) => {
        const color = theme == 'light' ? 'black' : 'white';
        return {
          tabBarLabel: 'Setting',
          tabBarIcon: () => (
            <Ionicons name="md-settings" color={color} size={30} />
          ),
        };
      },
    },
  },
  {
    navigationOptions: ({navigation}) => {
      const {routeName} = navigation.state.routes[navigation.state.index];

      return {
        headerTitle: routeName,
        headerRight: <NetworkStatus />,
      };
    },
  },
);

const StackNavigator = createStackNavigator({
  DashboardTabNavigator: DashboardTabNavigator,
  SinglePost: {
    screen: SinglePost
},
  CategorieList: CategorieList,
  Contact: Contact,
});
const Navigation = createAppContainer(StackNavigator);
export default () => {
  let {theme} = useContext(ThemeContext);
  let paper_theme = theme ? DarkTheme : DefaultTheme;
  let nav_theme = theme ? 'dark' : 'light';

  return (
    <PaperProvider theme={paper_theme}>
      <Navigation theme={nav_theme} />
    </PaperProvider>
  );
};
