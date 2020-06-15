import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import HomeTab from '../screens/AppTabNavigator/HomeTab';
import List from '../screens/AppTabNavigator/List';
import Setting from '../screens/AppTabNavigator/Setting';
import Calendar from '../screens/AppTabNavigator/Calendar';
import Camera from '../screens/AppTabNavigator/Camera';
import { Icon } from "native-base";

const AppTabNavigator = createMaterialTopTabNavigator({
  HomeTab:
    { screen: HomeTab },
  Camera:
  {
    screen: Camera,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (<Icon name='camera' style={{ color: tintColor }}></Icon>)
    }
  },
  List:
  {
    screen: List,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (<Icon name='ios-list' style={{ color: tintColor }}></Icon>)
    }
  },
  Calendar:
  {
    screen: Calendar,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (<Icon name='calendar' style={{ color: tintColor }}></Icon>)
    }
  },
  Setting: {
    screen: Setting,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (<Icon name='person' style={{ color: tintColor }}></Icon>)
    }
  },
}, {
  animationEnabled: true,
  swipeEnabled: true,
  tabBarPosition: "bottom",
  tabBarOptions: {
    style: {
      ...Platform.select({
        ios: {
          backgroundColor: 'white',
        },
        android: {
          backgroundColor: 'white',
        }
      })
    },
    iconStyle: { height: 30 },
    activeTintColor: '#1fa518',
    inactiveTintColor: '#d1cece',
    upperCaseLabel: false,
    showLabel: false,
    showIcon: true,
  }
});

const AppNavigation = createStackNavigator(
  {
    TabNavigator: {
      screen: AppTabNavigator,
    }
  },
  {
    headerMode: "none"
  }
);

export default AppNavigation;
