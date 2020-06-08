import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  Dimensions,
  StatusBar,
  TouchableOpacity
} from 'react-native';
import firebase from 'firebase';

import { Button } from 'react-native-elements';

import { Container, Header, Body, Content, List, ListItem, Icon } from 'native-base';

import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Like from './Like';

const SCREEN_WIDTH = Dimensions.get('window').width;

const IMAGE_SIZE = SCREEN_WIDTH - 80;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_name: null,
      email: null,
      name: null,
      aßge: null,
      weight: null,
      height: null,
      user_data: null,
      gender: null,
    }
  }

  componentDidMount() {
    let user_email = firebase.auth().currentUser.email;

  }

  render() {
    return (
      <Container style={styles.container}>
        <Header style={{ backgroundColor: "#1fa518" }}>
          <Body style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 15, color: "white" }}>
              설정</Text>
          </Body>
        </Header>
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <ScrollView style={{ flex: 1 }}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Image
                source={require("../../assets/user.png")}
                style={{ width: 200, height: 200 }}
              />
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                marginTop: 20,
                marginHorizontal: 40,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  flex: 1,
                  fontSize: 26,
                  color: 'black',
                  textAlign: 'center'
                }}
              >
                {/* {this.state.name} */}
                  tester
                </Text>
            </View>
            <View
              style={{
                flex: 1,
                marginTop: 20,
                width: SCREEN_WIDTH - 80,
                marginLeft: 40,
              }}
            >
            </View>
            <Content>
              <List>
                <ListItem >
                  <Icon name="ios-heart" style={{ color: '#F57C00', paddingRight: 10, paddingBottom: 23 }} />
                  <TouchableOpacity>
                    <Text style={{ fontSize: 17 }}
                      onPress={() => {
                        this.props.navigation.navigate('Like');
                      }}>선호도</Text>
                    <Text style={{ fontSize: 15, color: 'grey', paddingTop: 5 }} note>한식</Text>
                  </TouchableOpacity>
                </ListItem>
                <ListItem >
                  <Body>
                    <Text style={{ fontSize: 17 }}>나이</Text>
                    <Text style={{ fontSize: 15, color: 'grey', paddingTop: 5 }} note>28</Text>
                  </Body>
                </ListItem>
                <ListItem>
                  <Body>
                    <Text style={{ fontSize: 17 }}>성별</Text>
                    <Text style={{ fontSize: 15, color: 'grey', paddingTop: 5 }} note>Male</Text>
                  </Body>
                </ListItem>
                <ListItem>
                  <Body>
                    <Text style={{ fontSize: 17 }}>키</Text>
                    <Text style={{ fontSize: 15, color: 'grey', paddingTop: 5 }} note>175</Text>
                  </Body>
                </ListItem>
                <ListItem>
                  <Body>
                    <Text style={{ fontSize: 17 }}>몸무게</Text>
                    <Text style={{ fontSize: 15, color: 'grey', paddingTop: 5 }} note>68</Text>
                  </Body>
                </ListItem>
              </List>
            </Content>
            <Button
              containerStyle={{ marginVertical: 20 }}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                paddingRight: 10,
                paddingLeft: 10
              }}
              buttonStyle={{
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 30,
                backgroundColor: '#F57C00'
              }}
              title="로그아웃"
              titleStyle={{
                fontSize: 20,
                color: 'white',
                textAlign: 'center',
              }}
              onPress={() => {
                firebase.auth().signOut();
                console.log('로그아웃');
                this.props.navigation.navigate('Login');
              }}
              activeOpacity={0.5}
            />
          </ScrollView>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    height: 10,
  },
  navBar: {
    height: 60,
    width: SCREEN_WIDTH,
    justifyContent: 'center',
    alignContent: 'center',
  },
  nameHeader: {
    color: 'white',
    fontSize: 22,
    textAlign: 'center',
  },
  infoTypeLabel: {
    fontSize: 15,
    textAlign: 'right',
    color: 'black',
    paddingBottom: 10,
  },
  infoAnswerLabel: {
    fontSize: 15,
    color: 'green',
    paddingBottom: 10,
  }
})

const main = createStackNavigator({
  //이동할 페이지들 리스트 
  Like: { screen: Like },
  Setting: {
    screen: App, navigationOptions: ({ navigation }) => ({
      header: null
    })
  },
}, {
  headerMode: "none",
  initialRouteName: 'Setting',
  navigationOptions: ({
    headerVisible: false
  })
},
);


export default createAppContainer(main);