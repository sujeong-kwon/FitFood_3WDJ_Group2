// import React from 'react';
// import { StyleSheet, Button,StatusBar, Text, View,TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native'
// import * as Permissions from 'expo-permissions';
// import * as MediaLibrary from 'expo-media-library';
// import { Camera } from 'expo-camera';
// import styled, { withTheme } from 'styled-components';
// import { MaterialIcons } from '@expo/vector-icons';
// import sendPage from './sendPage';
// import { createStackNavigator } from 'react-navigation-stack';
// import { createAppContainer } from 'react-navigation';
// import * as ImagePicker from 'expo-image-picker';
// import animation from './Animation';
// const {width, height} = Dimensions.get("window");
// const ALBUM_NAME = "FoodCam";

// class App extends React.Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       screen: 1,
//       hasPermission: null,
//       img:null,
//       cameraType: Camera.Constants.Type.front,
//       data: null
//     };
//     this.cameraRef = React.createRef();
//   }
//   takePhoto = async () => {
//     try {
//       let {uri,base64} = await this.cameraRef.current.takePictureAsync({
//         quality: 1,
//         base64: true
//       })

//       if (uri) {
//         this.savePhoto(uri)
//         this.setState({
//           img: uri,
//           data: base64
//         })
//       }
//     } catch (error) {
//       alert(error)
  
//       this.setState({
//         smileDetected: false,
//       })
//     }
//     this.props.navigation.navigate('sendPage',{"uri":this.state.img,"data":this.state.data});
//     console.log(this.state.img);
//     console.log(this.state.data);
//   };

//   savePhoto = async uri => {
//     try {
//       const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
  
//       if (status === 'granted') {
//         const asset = await MediaLibrary.createAssetAsync(uri)
//         let album = await MediaLibrary.getAlbumAsync(ALBUM_NAME)
  
//         if (album === null) {
//           album = await MediaLibrary.createAlbumAsync(ALBUM_NAME, asset)
//         } else {
//           await MediaLibrary.addAssetsToAlbumAsync([asset], album.id)
//         }
//         setTimeout(
//           () =>
//             this.setState({
//               smileDetected: false,
//             }),
//           2000
//         )
//       } else {
//         this.setState({ hasPermission: false })
//       }
//     } catch (error) {
//       console.log(error)
//     }
//   };

//   componentDidMount = async () => {
//     const { status } = await Permissions.askAsync(Permissions.CAMERA);
//     if(status==='granted') {
//       this.setState({hasPermission: true});
//     } else {
//       this.setState({hasPermission: false});
//     }
//   }

//   _pickImage = async () => { 
//     const {status_roll} = await Permissions.askAsync(Permissions.CAMERA_ROLL); 
//     let result = await ImagePicker.launchImageLibraryAsync({ 
//       mediaTypes: ImagePicker.MediaTypeOptions.All, 
//       allowsEditing: true, 
//       base64: true
//     }); 
//     if (!result.cancelled) { 
//       this.setState({ img: result.uri, data: result.base64}); 

//     } 
//     this.props.navigation.navigate('sendPage',{"uri":this.state.img,"data":this.state.data});
//   };

//   switchCameraType = () => {
//     const { cameraType } = this.state
  
//     if (cameraType === Camera.Constants.Type.front) {
//       this.setState({
//         cameraType: Camera.Constants.Type.back,
//       })
//     } else {
//       this.setState({
//         cameraType: Camera.Constants.Type.front,
//       })
//     }
//   }

//   render() {
//     const CenterView = styled.View`
//       flex: 1;
//       align-items: center;
//       justify-content: center;
//     `;

//     const Text = styled.Text`
//       color: white;
//       font-size: 22px;
//     `;


//     const { hasPermission, cameraType } = this.state;
//     if(this.state.screen===1) {
//       if (hasPermission === true) {
//         return <CenterView  style={{ backgroundColor: 'rgba(47,44,60,1)'}}>
//           <StatusBar hidden />
//           <Camera
//             ref={this.cameraRef}
//             style={{
//               width: width-40,
//               height: 550,
//               borderRadius: 10,
//               overflow: 'hidden'
//             }}
//             type={this.state.cameraType}
//           />
//           <View style={{
//             flexDirection: 'row',
//             marginLeft:70
//           }}>
//             <TouchableOpacity onPress={this.switchCameraType} style={{flex:1,marginTop: 20}}>
//               <MaterialIcons
//                 color="white"
//                 name={
//                   this.state.cameraType === Camera.Constants.Type.front
//                     ? 'camera-rear'
//                     : 'camera-front'
//                 }
//                 size={44}
//               />
//             </TouchableOpacity>
//             <TouchableOpacity onPress={this.takePhoto} style={{flex:1,marginTop: 20}}>
//               <MaterialIcons
//                 name={'camera'}
//                 size={44}
//                 color="white"
//               />
//             </TouchableOpacity>
//             <TouchableOpacity onPress={this._pickImage} style={{flex:1,marginTop: 20}}>
//               <MaterialIcons
//                 color="white"
//                 name={'insert-photo'}
//                 size={44}
//               />
//             </TouchableOpacity>
//           </View>
            
//         </CenterView>
//       } else if (hasPermission === false) {
//           return <CenterView><Text>Don't have Permission for this App.</Text></CenterView>;
//       } else {
//           return <ActivityIndicator color="white" size={1}/>;
//       }
//     } else {
//       return <sendPage></sendPage>;
//     }
//   }
// }

// const main = createStackNavigator({ 
//   //이동할 페이지들 리스트 
//   sendPage: { screen: sendPage}, 
//   animation: {
//     screen:animation
//   },
//   Camera: { screen: App,navigationOptions:({navigation})=>({
//     header:null
//   })}, 
// }, {
//   headerMode:"none", 
//   initialRouteName:'Camera',
//   navigationOptions:({
//     headerVisible:false
//   })
//   }, 
// );

// export default createAppContainer(main);
import React from 'react';
import { StyleSheet, Button,StatusBar, Text, View,TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native'
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import { Camera } from 'expo-camera';
import styled, { withTheme } from 'styled-components';
import { MaterialIcons } from '@expo/vector-icons';
import sendPage from './sendPage';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import * as ImagePicker from 'expo-image-picker';
import animation from './Animation';
const {width, height} = Dimensions.get("window");
const ALBUM_NAME = "FoodCam";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      screen: 1,
      hasPermission: null,
      img:null,
      cameraType: Camera.Constants.Type.front,
      data: null
    };
    this.cameraRef = React.createRef();
  }
  takePhoto = async () => {
    try {
      let {uri,base64} = await this.cameraRef.current.takePictureAsync({
        quality: 1,
        base64: true
      })

      if (uri) {
        this.savePhoto(uri)
        this.setState({
          img: uri,
          data: base64
        })
      }
    } catch (error) {
      alert(error)
    }
    this.props.navigation.navigate('sendPage',{"uri":this.state.img,"data":this.state.data});
    console.log(this.state.img);
    console.log(this.state.data);
  };

  savePhoto = async uri => {
    try {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
  
      if (status === 'granted') {
        const asset = await MediaLibrary.createAssetAsync(uri)
        let album = await MediaLibrary.getAlbumAsync(ALBUM_NAME)
  
        if (album === null) {
          album = await MediaLibrary.createAlbumAsync(ALBUM_NAME, asset)
        } else {
          await MediaLibrary.addAssetsToAlbumAsync([asset], album.id)
        }
        setTimeout(
          () =>
            this.setState({
              smileDetected: false,
            }),
          2000
        )
      } else {
        this.setState({ hasPermission: false })
      }
    } catch (error) {
      console.log(error)
    }
  };

  componentDidMount = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if(status==='granted') {
      this.setState({hasPermission: true});
    } else {
      this.setState({hasPermission: false});
    }
  }

  _pickImage = async () => { 
    const {status_roll} = await Permissions.askAsync(Permissions.CAMERA_ROLL); 
    let result = await ImagePicker.launchImageLibraryAsync({ 
      mediaTypes: ImagePicker.MediaTypeOptions.All, 
      allowsEditing: true, 
      base64: true
    }); 
    if (!result.cancelled) { 
      this.setState({ img: result.uri, data: result.base64}); 

    } 
    this.props.navigation.navigate('sendPage',{"uri":this.state.img,"data":this.state.data});
  };

  switchCameraType = () => {
    const { cameraType } = this.state
  
    if (cameraType === Camera.Constants.Type.front) {
      this.setState({
        cameraType: Camera.Constants.Type.back,
      })
    } else {
      this.setState({
        cameraType: Camera.Constants.Type.front,
      })
    }
  }

  render() {
    const CenterView = styled.View`
      flex: 1;
      align-items: center;
      justify-content: center;
    `;

    const Text = styled.Text`
      color: white;
      font-size: 22px;
    `;


    const { hasPermission, cameraType } = this.state;
    if(this.state.screen===1) {
      if (hasPermission === true) {
        return <CenterView  style={{ backgroundColor: 'rgba(47,44,60,1)'}}>
          <StatusBar hidden />
          <Camera
            ref={this.cameraRef}
            style={{
              width: width-40,
              height: 550,
              borderRadius: 10,
              overflow: 'hidden'
            }}
            type={this.state.cameraType}
          />
          <View style={{
            flexDirection: 'row',
            marginLeft:70
          }}>
            <TouchableOpacity onPress={this.switchCameraType} style={{flex:1,marginTop: 20}}>
              <MaterialIcons
                color="white"
                name={
                  this.state.cameraType === Camera.Constants.Type.front
                    ? 'camera-rear'
                    : 'camera-front'
                }
                size={44}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.takePhoto} style={{flex:1,marginTop: 20}}>
              <MaterialIcons
                name={'camera'}
                size={44}
                color="white"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={this._pickImage} style={{flex:1,marginTop: 20}}>
              <MaterialIcons
                color="white"
                name={'insert-photo'}
                size={44}
              />
            </TouchableOpacity>
          </View>
            
        </CenterView>
      } else if (hasPermission === false) {
          return <CenterView><Text>Don't have Permission for this App.</Text></CenterView>;
      } else {
          return <ActivityIndicator color="white" size={1}/>;
      }
    } else {
      return <sendPage></sendPage>;
    }
  }
}

const main = createStackNavigator({ 
  //이동할 페이지들 리스트 
  sendPage: { screen: sendPage}, 
  animation: {
    screen:animation
  },
  Camera: { screen: App,navigationOptions:({navigation})=>({
    header:null
  })}, 
}, {
  headerMode:"none", 
  initialRouteName:'Camera',
  navigationOptions:({
    headerVisible:false
  })
  }, 
);

export default createAppContainer(main);
