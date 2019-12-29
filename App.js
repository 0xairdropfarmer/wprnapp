import React, {Component} from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from './src/screens/Home';
import Categories from './src/screens/Categories';
import Setting from './src/screens/Setting';
import Bookmark from './src/screens/Bookmark';
import SinglePost from './src/screens/SinglePost';
import CategorieList from './src/screens/CategorieList';
import Contact from './src/screens/Contact';
const DashboardTabNavigator = createBottomTabNavigator(
  {
    HomePage: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: () => <Ionicons name="md-home" size={30} />,
      },
    },

    Categories: {
      screen: Categories,
      navigationOptions: {
        tabBarLabel: 'Categories',
        tabBarIcon: () => <Ionicons name="md-apps" size={30} />,
      },
    },
    Bookmark: {
      screen: Bookmark,
      navigationOptions: {
        tabBarLabel: 'BookMark',
        tabBarIcon: () => <Ionicons name="ios-bookmark" size={30} />,
      },
    },

    Setting: {
      screen: Setting,
      navigationOptions: {
        tabBarLabel: 'Setting',
        tabBarIcon: () => <Ionicons name="md-settings" size={30} />,
      },
    },
  },
  {
    navigationOptions: ({navigation}) => {
      const {routeName} = navigation.state.routes[navigation.state.index];
      return {
        headerTitle: routeName,
      };
    },
  },
);

const StackNavigator = createStackNavigator({
  DashboardTabNavigator: DashboardTabNavigator,
  SinglePost:SinglePost,
  CategorieList : CategorieList,
  Contact:Contact
});

export default createAppContainer(StackNavigator);
