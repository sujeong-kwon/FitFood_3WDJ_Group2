import React , {useState,useCallback} from 'react';
import {StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    ScrollView,
    Dimensions,
    StatusBar,} from 'react-native';
import firebase from 'firebase';

import { Button } from 'react-native-elements';

import { LinearGradient } from '../components/LinearGradient';
import User from '../../assets/databases/User';
import * as SQLite from 'expo-sqlite';

const SCREEN_WIDTH = Dimensions.get('window').width;

const IMAGE_SIZE = SCREEN_WIDTH - 80;

class CustomButton extends React.Component {
    constructor() {
      super();
  
      this.state = {
        selected: false,
        name:null,
        age:null,
        email:null

      };
    }
  
    componentDidMount() {
      const { selected } = this.props;
  
      this.setState({
        selected,
      });

    }
  
    render() {
      const { title } = this.props;
      const { selected } = this.state;
  
      return (
        <Button
          title={title}
          titleStyle={{ fontSize: 15, color: 'white'}}
          buttonStyle={
            selected
              ? {
                  backgroundColor: 'rgba(213, 100, 140, 1)',
                  borderRadius: 100,
                  width: 127,
                }
              : {
                  borderWidth: 1,
                  borderColor: 'white',
                  borderRadius: 30,
                  width: 127,
                  backgroundColor: 'transparent',
                }
          }
          containerStyle={{ marginRight: 10 }}
          onPress={() => this.setState({ selected: !selected })}
        />
      );
    }
  }

const db = SQLite.openDatabase('database.db');

class Setting extends React.Component
{
    constructor(props) {
        super(props);
        this.state={
            user_name: null,
            email:null,
            name:null,
            age:null,
            weight:null,
            height:null,
            user_data:null,
            gender:null
        }
    }


    componentDidMount() {
        const email = firebase.auth().currentUser.email;
        
        db.transaction(tx=>
          tx.executeSql("select * from users where email = ?", [email], (_, { rows }) =>
          {
          this.setState({
            user_data:rows
          })
          this.setState({
            name: this.state.user_data['_array'][0].name,
            email: this.state.user_data['_array'][0].email,
            age: this.state.user_data['_array'][0].age,
            weight: this.state.user_data['_array'][0].weight,
            height: this.state.user_data['_array'][0].height,
            gender: this.state.user_data['_array'][0].gender
          })
        }
      ));
    }

    render() {
        return(
            <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        <View style={{ flex: 1, backgroundColor: 'rgba(47,44,60,1)' }}>
          <View style={styles.statusBar} />
          <ScrollView style={{ flex: 1 }}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Image
                source={{
                  uri:
                    'https://placeimg.com/200/100/animal'
                }}
                style={{
                  width: IMAGE_SIZE,
                  height: IMAGE_SIZE,
                  borderRadius: 10,
                }}
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
                  color: 'white',
                }}
              >
                {this.state.name}
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
            <View style={{ flex: 1, marginTop: 10 }}>
              <Text
                style={{
                  flex: 1,
                  fontSize: 15,
                  color: 'rgba(216, 121, 112, 1)',
                  marginLeft: 40,
                }}
              >
                선호도
              </Text>
              <View style={{ flex: 1, width: SCREEN_WIDTH, marginTop: 10 }}>
                <ScrollView
                  style={{ flex: 1 }}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                >
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'column',
                      height: 60,
                      marginLeft: 40,
                      marginRight: 10,
                    }}
                  >
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                      <CustomButton title="한식" />
                      <CustomButton title="중식" />
                      <CustomButton title="일식" />
                      <CustomButton title="양식" />
                    </View>
                  </View>
                </ScrollView>
              </View>
            </View>
            <View style={{ flex: 1}}>
              <Text
                style={{
                  flex: 1,
                  fontSize: 15,
                  color: 'rgba(216, 121, 112, 1)',
                  marginLeft: 40,
                }}
              >
                INFO
              </Text>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  marginTop: 20,
                  marginHorizontal: 30,
                }}
              >
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.infoTypeLabel}>age</Text>
                    <Text style={styles.infoTypeLabel}>Weight</Text>
                    <Text style={styles.infoTypeLabel}>Height</Text>
                    <Text style={styles.infoTypeLabel}>Sign</Text>
                  </View>
                  <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text style={styles.infoAnswerLabel}>{this.state.age}</Text>
                    <Text style={styles.infoAnswerLabel}>{this.state.weight}kg</Text>
                    <Text style={styles.infoAnswerLabel}>{this.state.height}cm</Text>
                    <Text style={styles.infoAnswerLabel}>Pisces</Text>
                  </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.infoTypeLabel}>Body Type</Text>
                    <Text style={styles.infoTypeLabel}>Diet</Text>
                    <Text style={styles.infoTypeLabel}>Smoke</Text>
                    <Text style={styles.infoTypeLabel}>Drink</Text>
                  </View>
                  <View style={{ flex: 1, marginLeft: 10, marginRight: -20 }}>
                    <Text style={styles.infoAnswerLabel}>Fit</Text>
                    <Text style={styles.infoAnswerLabel}>Vegan</Text>
                    <Text style={styles.infoAnswerLabel}>No</Text>
                    <Text style={styles.infoAnswerLabel}>No</Text>
                  </View>
                </View>
              </View>
            </View>
            <Button
              containerStyle={{ marginVertical: 20 }}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              buttonStyle={{
                height: 55,
                width: SCREEN_WIDTH - 40,
                borderRadius: 30,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              linearGradientProps={{
                colors: ['rgba(214,116,112,1)', 'rgba(233,174,87,1)'],
                start: [1, 0],
                end: [0.2, 0],
              }}
              ViewComponent={LinearGradient}
              title="로그아웃"
              titleStyle={{
                fontSize: 20,
                color: 'white',
                textAlign: 'center',
              }}
              onPress={() =>{firebase.auth().signOut()}}
              activeOpacity={0.5}
            />
          </ScrollView>
        </View>
      </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
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
    color: 'rgba(126,123,138,1)',
    paddingBottom: 10,
    },
    infoAnswerLabel: {
    fontSize: 15,
    color: 'white',
    paddingBottom: 10,
    }
})

export default Setting;