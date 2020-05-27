import React from "react";
import { StyleSheet,TouchableOpacity } from "react-native";
import { withFirebaseHOC } from "../config/Firebase";
import {createStackNavigator } from 'react-navigation-stack';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import HomeTab from './AppTabNavigator/HomeTab';
import List from './AppTabNavigator/List';
import Setting from './AppTabNavigator/Setting';
import Calendar from './AppTabNavigator/Calendar';
import Camera from './AppTabNavigator/Camera';
import { Icon } from "native-base";

const AppTabNavigator = createMaterialTopTabNavigator({
  HomeTab:
  {screen:HomeTab},
  Camera:
  {
    screen:Camera,
    navigationOptions:{
      tabBarIcon: ({tintColor})=>(<Icon name='camera' style={{color:tintColor}}></Icon>)
    }
  },
  List:
  {screen:List,
    navigationOptions:{
      tabBarIcon: ({tintColor})=>(<Icon name='ios-list' style={{color:tintColor}}></Icon>)
    }},
  Calendar:
  {
    screen:Calendar,
    navigationOptions:{
      tabBarIcon:({tintColor})=>(<Icon name='calendar' style={{color:tintColor}}></Icon>)}
  },
  Setting:{screen:Setting,
    navigationOptions:{
      tabBarIcon:({tintColor})=>(<Icon name='person' style={{color:tintColor}}></Icon>)}},
}, {
  animationEnabled: true,
  swipeEnabled: true,
  tabBarPosition: "bottom",
  tabBarOptions: {
    style: {
      ...Platform.select({
        ios:{
          backgroundColor:'white',
        }
      })
    },
    iconStyle: { height: 60 },
    activeTintColor: '#000',
    inactiveTintColor: '#d1cece',
    upperCaseLabel: false,
    showLabel: false,
    showIcon: true,
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

const Home = createStackNavigator(
  {
      TabNavigator: {
          screen: AppTabNavigator,
          navigationOptions: ({navigation}) => ({
              title: 'FitFood',
          }),
      },
  }
);


export default withFirebaseHOC(Home);