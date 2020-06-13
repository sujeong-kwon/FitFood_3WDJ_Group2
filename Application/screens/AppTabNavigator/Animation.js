// import React, { Component } from 'react';
// import { Image, View, Animated, StyleSheet, ImageBackground } from 'react-native';
// import pacman from '../../assets/pacman.gif';
// import { Easing } from 'react-native-reanimated';
// import CountDown from 'react-native-countdown-component';

// export default class App extends Component {
//     constructor(props){
//       super(props);
//       this.state = {
//         uri:null,
//         positions: [
//           new Animated.ValueXY(0,{x:0,y:0}),
//         ]
//       };
//     }

//     componentDidMount(){
//       this.setState({
//         uri: this.props.navigation.getParam('data')
//       });

//       console.log(this.props.navigation.getParam('data'));

//         Animated.parallel([
//           Animated.timing(this.state.positions[0],{
//           toValue : {x:310, y:0},
//           duration : 1000,
//           delay : 0 })
//         ]).start(()=>
//         Animated.timing(this.state.positions[0],{
//           toValue : {x:310, y:100},
//           duration : 1000,
//           delay : 0}
//         ).start(()=>{
//           Animated.timing(this.state.positions[0],{
//             toValue : {x:0, y:100},
//             duration : 1000,
//             delay : 0}
//           ).start(()=>{
//             Animated.timing(this.state.positions[0],{
//               toValue : {x:0, y:200},
//               duration : 1000,
//               delay : 0}
//             ).start(()=>{
//               Animated.timing(this.state.positions[0],{
//                 toValue : {x:310, y:200},
//                 duration : 1000,
//                 delay : 0}
//               ).start(()=>{
//                 Animated.timing(this.state.positions[0],{
//                   toValue : {x:310, y:300},
//                   duration : 1000,
//                   delay : 0}
//                 ).start(()=>{
//                   Animated.timing(this.state.positions[0],{
//                     toValue : {x:0, y:300},
//                     duration : 1000,
//                     delay : 0}
//                   ).start(()=>{
//                     Animated.timing(this.state.positions[0],{
//                       toValue : {x:0, y:400},
//                       duration : 1000,
//                       delay : 0}
//                     ).start(()=>{
//                       Animated.timing(this.state.positions[0],{
//                         toValue : {x:310, y:400},
//                         duration : 1000,
//                         delay : 0}
//                       ).start()
//                     })
//                   })
//                 })
//               })
//             })
//           })
//         })
//       );
//     }

//     _getStyle(position){
//       return {
//         width: 100, height: 100,
//         transform:[
//           {translateX:position.x},{translateY:position.y}
//         ]
//       }
//     }

//     render() {
//       return (
//         <View>
//           <ImageBackground
//           style={{width:415,height:500}}
//           source={{uri:this.props.navigation.getParam('data')}}>
//           {
//             this.state.positions.map((position, index) => {
//               return (
//                 <Animated.View style={[this._getStyle(position)]} key={index}>

//                     <Image source={pacman} style={{width: 100, height: 100 }} />

//                 </Animated.View>
//               )
//             })
//           }
//           </ImageBackground>
//           <CountDown
//             style={{marginTop:20}}
//             until={10}
//             onFinish={() => {
//               alert('식사 끝');
//               this.props.navigation.navigate('sendPage')}}
//             onPress={() => alert('hello')}
//             size={40}
//           />
//         </View>
//       );
//     }
//   }

import React, { Component } from 'react';
import { Image, View, Animated, StyleSheet, ImageBackground } from 'react-native';
import pacman from '../../assets/pacman.gif';
import { Easing } from 'react-native-reanimated';
import CountDown from 'react-native-countdown-component';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uri: null,
      positions: [
        new Animated.ValueXY(0, { x: 0, y: 0 }),
      ]
    };
  }

  componentDidMount() {
    this.setState({
      uri: this.props.navigation.getParam('data')
    });

    console.log(this.props.navigation.getParam('data'));

    Animated.parallel([
      Animated.timing(this.state.positions[0], {
        toValue: { x: 310, y: 0 },
        duration: 1000,
        delay: 0
      })
    ]).start(() =>
      Animated.timing(this.state.positions[0], {
        toValue: { x: 310, y: 100 },
        duration: 1000,
        delay: 0
      }
      ).start(() => {
        Animated.timing(this.state.positions[0], {
          toValue: { x: 0, y: 100 },
          duration: 1000,
          delay: 0
        }
        ).start(() => {
          Animated.timing(this.state.positions[0], {
            toValue: { x: 0, y: 200 },
            duration: 1000,
            delay: 0
          }
          ).start(() => {
            Animated.timing(this.state.positions[0], {
              toValue: { x: 310, y: 200 },
              duration: 1000,
              delay: 0
            }
            ).start(() => {
              Animated.timing(this.state.positions[0], {
                toValue: { x: 310, y: 300 },
                duration: 1000,
                delay: 0
              }
              ).start(() => {
                Animated.timing(this.state.positions[0], {
                  toValue: { x: 0, y: 300 },
                  duration: 1000,
                  delay: 0
                }
                ).start(() => {
                  Animated.timing(this.state.positions[0], {
                    toValue: { x: 0, y: 400 },
                    duration: 1000,
                    delay: 0
                  }
                  ).start(() => {
                    Animated.timing(this.state.positions[0], {
                      toValue: { x: 310, y: 400 },
                      duration: 1000,
                      delay: 0
                    }
                    ).start()
                  })
                })
              })
            })
          })
        })
      })
    );
  }

  _getStyle(position) {
    return {
      width: 100, height: 100,
      transform: [
        { translateX: position.x }, { translateY: position.y }
      ]
    }
  }

  render() {
    return (
      <View>
        <ImageBackground
          style={{ width: 415, height: 500 }}
          source={{ uri: this.props.navigation.getParam('data') }}>
          {
            this.state.positions.map((position, index) => {
              return (
                <Animated.View style={[this._getStyle(position)]} key={index}>

                  <Image source={pacman} style={{ width: 100, height: 100 }} />

                </Animated.View>
              )
            })
          }
        </ImageBackground>
        <CountDown
          style={{ marginTop: 20 }}
          until={10}
          onFinish={() => {
            alert('식사 끝');
            this.props.navigation.navigate('sendPage')
          }}
          onPress={() => alert('hello')}
          size={30}
        />
      </View>
    );
  }
}