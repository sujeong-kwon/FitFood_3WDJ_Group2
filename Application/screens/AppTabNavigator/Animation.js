import React, { Component } from 'react';
import { Image, View, Animated, StyleSheet, ImageBackground, TouchableOpacity, Text, ScrollView } from 'react-native';
import pacman from '../../assets/pacman.gif';
import CountDown from 'react-native-countdown-component';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uri: null,
      value: new Animated.Value(0),
      white1: new Animated.Value(0),
      white2: new Animated.Value(0),
      white3: new Animated.Value(0),
      white4: new Animated.Value(0),
      white5: new Animated.Value(0),

    };
  }
  componentDidMount() {
    Animated.timing(
      this.state.value, {
      toValue: 17,
      duration: 10000,
      delay: 0,
      useNativeDriver: true
    }).start()

    Animated.timing(
      this.state.white1, {
      toValue: 1,
      duration: 2400,
      useNativeDriver: true
    }
    ).start()
    Animated.timing(
      this.state.white2, {
      toValue: 5,
      duration: 4165,
      useNativeDriver: true
    }
    ).start()

    Animated.timing(
      this.state.white3, {
      toValue: 9,
      duration: 5900,
      useNativeDriver: true
    }
    ).start()
    Animated.timing(
      this.state.white4, {
      toValue: 13,
      duration: 7370,
      useNativeDriver: true
    }
    ).start()

    Animated.timing(
      this.state.white5, {
      toValue: 17,
      duration: 10100,
      useNativeDriver: true
    }
    ).start()
  }

  componentWillMount() {

    this.x = this.state.value.interpolate({
      inputRange: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
      outputRange: [0, 310, 310, 310, 310, 0, 0, 0, 0, 310, 310, 310, 310, 0, 0, 0, 0, 310],
    });

    this.y = this.state.value.interpolate({
      inputRange: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
      outputRange: [0, 0, 0, 100, 100, 100, 100, 200, 200, 200, 200, 300, 300, 300, 300, 400, 400, 400]
    });

    this.rotate = this.state.value.interpolate({
      inputRange: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
      outputRange: ['0deg', '0deg', '90deg', '90deg', '180deg', '180deg', '90deg', '90deg', '0deg', '0deg', '90deg', '90deg', '180deg', '180deg', '90deg', '90deg', '0deg', '0deg'],
    });

    this.x1 = this.state.white1.interpolate({
      inputRange: [0, 1],
      outputRange: [-450, 0]
    })

    // 
    this.x2 = this.state.white2.interpolate({
      inputRange: [0, 1, 2, 3, 4, 5],
      outputRange: [450, 450, 450, 450, 450, 0]
    })

    this.y2 = this.state.white2.interpolate({
      inputRange: [0, 1, 2, 3, 4, 5],
      outputRange: [100, 100, 100, 100, 100, 100]
    })

    //
    this.x3 = this.state.white3.interpolate({
      inputRange: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      outputRange: [-500, -500, -500, -500, -500, -500, -500, -500, -500, 0]
    })

    this.y3 = this.state.white3.interpolate({
      inputRange: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      outputRange: [200, 200, 200, 200, 200, 200, 200, 200, 200, 200]
    })

    this.x4 = this.state.white4.interpolate({
      inputRange: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      outputRange: [450, 450, 450, 450, 450, 450, 450, 450, 450, 450, 450, 450, 450, 0]
    })

    this.y4 = this.state.white4.interpolate({
      inputRange: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      outputRange: [300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300]
    })
    this.x5 = this.state.white5.interpolate({
      inputRange: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
      outputRange: [-500, -500, -500, -500, -500, -500, -500, -500, -500, -500, -500, -500, -500, -500, -500, -500, -500, 0]
    })

    this.y5 = this.state.white5.interpolate({
      inputRange: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
      outputRange: [400, 400, 400, 400, 400, 400, 400, 400, 400, 400, 400, 400, 400, 400, 400, 400, 400, 400]
    })
  }

  _getStyle() {
    return {
      width: 100, height: 100,
      transform: [
        { translateX: this.x },
        { translateY: this.y },
        { rotate: this.rotate }
      ]
    }
  }

  _getWhite1() {
    return {
      transform: [
        { translateX: this.x1 }
      ]
    }
  }

  _getWhite2() {
    return {
      transform: [
        { translateX: this.x2 },
        { translateY: this.y2 }
      ]
    }
  }
  _getWhite3() {
    return {
      transform: [
        { translateX: this.x3 },
        { translateY: this.y3 }
      ]
    }
  }
  _getWhite4() {
    return {
      transform: [
        { translateX: this.x4 },
        { translateY: this.y4 }
      ]
    }
  }


  _getWhite5() {
    return {
      transform: [
        { translateX: this.x5 },
        { translateY: this.y5 }
      ]
    }
  }

  eat_end() {
    this.props.navigation.navigate('sendPage');
    fetch(`http://ec2-52-72-52-75.compute-1.amazonaws.com/end`, {
      method: 'GET'
    }).then(res => res.text()).then(res => console.log(res));
  }

  render() {
    const animatedStyle = { opacity: this.state.back_Animation };

    return (
      <View>
        <View style={styles.MainContainer}>
          <Animated.View>
            <Image source={{ uri: this.props.navigation.getParam('data') }} style={{ width: 380, height: 480 }} />
          </Animated.View>
        </View>

        <Animated.View style={this._getWhite1()}>
          <View style={{ position: 'absolute', backgroundColor: '#ffffff', width: 500, height: 100 }} />
        </Animated.View>
        <Animated.View style={this._getWhite2()}>
          <View style={{ position: 'absolute', backgroundColor: '#ffffff', width: 500, height: 100 }} />
        </Animated.View>
        <Animated.View style={this._getWhite3()}>
          <View style={{ position: 'absolute', backgroundColor: '#ffffff', width: 500, height: 100 }} />
        </Animated.View>
        <Animated.View style={this._getWhite4()}>
          <View style={{ position: 'absolute', backgroundColor: '#ffffff', width: 500, height: 100 }} />
        </Animated.View>
        <Animated.View style={this._getWhite5()}>
          <View style={{ position: 'absolute', backgroundColor: '#ffffff', width: 500, height: 100 }} />
        </Animated.View>

        <Animated.Image source={pacman} style={this._getStyle()} />
        <View style={{ alignItems: "center", flexDirection: 'row' }}>
          <CountDown
            style={{ marginTop: 420, paddingLeft: 20 }}
            until={15}
            onFinish={() => {
              this.props.navigation.navigate('sendPage');
              fetch(`http://ec2-52-72-52-75.compute-1.amazonaws.com/end`, {
                method: 'GET'
              }).then(res => res.text()).then(res => console.log(res));
            }}
            size={25}
          />
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('sendPage');
              fetch(`http://ec2-52-72-52-75.compute-1.amazonaws.com/end`, {
                method: 'GET'
              }).then(res => res.text()).then(res => console.log(res));
            }}
            style={style.button}>
            <Text style={style.text}>식사 종료</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

});

const style = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: 17,
    textAlign: 'center'
  },
  button: {
    marginTop: 400,
    //width: 300,
    //height: 48,
    backgroundColor: '#F57C00',
    //justifyContent: 'center',
    //borderRadius: 30,
    width: 110,
    height: 55,
    justifyContent: 'center',
    borderRadius: 10,
    marginLeft: 10
  }
});
