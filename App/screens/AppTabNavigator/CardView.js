// import React from 'react';
// import { TouchableOpacity,Dimensions,StyleSheet, Text, View, Image } from 'react-native';
// import { Card, CardItem, Thumbnail, Body, Left, Right, Button, Icon } from 'native-base';
// import MapView, {Marker} from 'react-native-maps';
// import Dialog from 'react-native-dialog';

// export default class CardView extends React.Component{
//   constructor(props) {
//     super(props);
//     this.state = {
//       image: null,
//       food: null,
//       dialog: false,
//       resNum: null,
//       store_name: null,
//       latitude_:35.89346514,
//       longitude_:128.6220269,
//     }
//   }

//   get_position() {
//     const formData = new FormData();
//     formData.append('store_id',this.state.resNum);
//     fetch(`http://ec2-52-72-52-75.compute-1.amazonaws.com/get_store_data`,{
//       method:'POST',
//       body: formData
//     }).then(res => res.json()).then(
//       res=>{
//         if(res.length==0) {
//         } else {
//           var gps=String(res[0].store_gps).split(',')
//           this.setState({
//             store_name: res[0].store_name,
//             latitude_: gps[1],
//             longitude_: gps[0]
//           })
//         }
//       })
//       .catch(err => console.error(err));
//   }

//   handleDelete() {
//     this.setState({
//       dialog: false,
//     })
//   }
//     render(){
//         const {data} = this.props;
//         return(
//             <Card>
//             <CardItem>
//               <Left>
//                 <Body style={{marginLeft:60}}>
//                   <Text>{data[0]}</Text>
//                 </Body>
//               </Left>
//               <Right>
//               <Body>
//                   <Text>{data[1]}</Text>
//                 </Body>
//               </Right>
//             </CardItem>
//             <CardItem cardBody>
//               <TouchableOpacity
//               style={{ flex: 1 }} 
//               onPress={()=>{
//               this.setState({
//                 dialog: true
//               });
//               this.get_position();                  
//               this.setState({
//                 resNum:data[4]
//               });
//               }}>
//               <Image 
//                 source={{ uri: data[2] }} 
//                 style={{height:200, width:200}}
//                 />
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={{flex: 1 }} 
//                   onPress={()=>{      
//                   this.setState({
//                     dialog: true
//                   });
//                   this.get_position();

//                   this.setState({
//                   resNum: data[5],
//                 });
//                 }}>
//                 <Image
//                   style={{height:200, width:200}}
//                   source={{ uri: data[3] }} 
//                 />
//               </TouchableOpacity>
//             </CardItem>
//             <CardItem style={{ height:45 }}>
//               <Left>

//                 <Button transparent>
//                   <Icon name='ios-send' style={{ color:'black' }}/>
//                 </Button>
//               </Left>
//             </CardItem>
//             <CardItem>
//               <Text>
//                   가격: a + b / testtesttesttesttesttesttesttesttesttestesttest
//                 </Text> 
//               </CardItem>
//               <Dialog.Container visible={this.state.dialog}>
//               <Dialog.Title>{this.state.store_name}</Dialog.Title>
//                 <View style={{justifyContent:'center',flexDirection:'row'}}>
//                    <MapView 

//                     initialRegion={{
//                       latitude: 35.89346514,
//                       longitude: 128.6220269,
//                       latitudeDelta: 0.0922,
//                       longitudeDelta: 0.0421,
//                     }}
//                     style={styles.mapStyle}>
//                       <Marker
//                         coordinate={{
//                           latitude: this.state.latitude_, longitude: this.state.longitude_}}
//                         title={this.state.store_name}
//                         description="주소"
//                       />

//                     </MapView>
//                 </View> 

//                 <Dialog.Button style={{textAlign:'center',height:30}} label="공유" onPress={()=>this.setState({
//                   resNum: data[4]
//                 }).bind(this)} />
//                <Dialog.Button style={{textAlign:'center',height:30}} label="Cancel" onPress={this.handleDelete.bind(this)} />

//               </Dialog.Container>
//             </Card>
//         )
//     }
// }

// const styles = StyleSheet.create({
//     CardContainer: {
//         elevation: 5,
//         borderRadius: 4,
//         borderWidth: 0.5,
//         borderColor: '#d6d7da',
//         margin: 20,
//         elevation: 5
//     },  
//     mapStyle: {
//       width: 400,
//       height: 400,
//     },
//     CardTitle: {
//         width: '100%',
//         fontWeight: 'bold',
//         fontSize: 20,
//         padding: 3
//     },
//     CardContent: {
//         width: '100%',
//         fontSize: 12,
//         padding: 3
//     },
// });

// // import React from 'react';
// // import { TouchableOpacity,Dimensions,StyleSheet, Text, View, Image } from 'react-native';
// // import { Card, CardItem, Thumbnail, Body, Left, Right, Button, Icon } from 'native-base';
// // import MapView, {Marker} from 'react-native-maps';
// // import Dialog from 'react-native-dialog';
// // import Store from './Store';

// // export default class CardView extends React.Component{
// //   constructor(props) {
// //     super(props);
// //     this.state = {
// //       image: null,
// //       food: null,
// //       dialog: false,
// //       resNum: null,
// //       store_name: null,
// //       latitude_:35.89346514,
// //       longitude_:128.6220269,
// //     }
// //   }

// //   go_store (data) {
// //     const {navigation} = this.p
// //     console.log(data);
// //     this.props.navigation.navigate('Store');
// //   }

// //   get_position() {
// //     const formData = new FormData();
// //     formData.append('store_id',this.state.resNum);
// //     fetch(`http://ec2-52-72-52-75.compute-1.amazonaws.com/get_store_data`,{
// //       method:'POST',
// //       body: formData
// //     }).then(res => res.json()).then(
// //       res=>{
// //         if(res.length==0) {
// //         } else {
// //           var gps=String(res[0].store_gps).split(',')
// //           this.setState({
// //             store_name: res[0].store_name,
// //             latitude_: gps[1],
// //             longitude_: gps[0]
// //           })
// //         }
// //       })
// //       .catch(err => console.error(err));
// //   }

// //   handleDelete() {
// //     this.setState({
// //       dialog: false,
// //     })
// //   }
// //     render(){
// //         const {data} = this.props;
// //         return(
// //             <Card>
// //             <CardItem>
// //               <Left>
// //                 <Body style={{marginLeft:60}}>
// //                   <Text>{data[0]}</Text>
// //                 </Body>
// //               </Left>
// //               <Right>
// //               <Body>
// //                   <Text>{data[1]}</Text>
// //                 </Body>
// //               </Right>
// //             </CardItem>
// //             <CardItem cardBody>
// //               <TouchableOpacity
// //               style={{ flex: 1 }} 
// //               onPress={()=>{
// //                 this.go_store(data[4])
// //               }}>
// //               <Image 
// //                 source={{ uri: data[2] }} 
// //                 style={{height:200, width:200}}
// //                 />
// //               </TouchableOpacity>
// //               <TouchableOpacity
// //                 style={{flex: 1 }} 
// //                 onPress={()=>{
// //                   this.go_store(data[5])
// //                   }}>
// //                 <Image
// //                   style={{height:200, width:200}}
// //                   source={{ uri: data[3] }} 
// //                 />
// //               </TouchableOpacity>
// //             </CardItem>
// //             <CardItem style={{ height:45 }}>
// //               <Left>

// //                 <Button transparent>
// //                   <Icon name='ios-send' style={{ color:'black' }}/>
// //                 </Button>
// //               </Left>
// //             </CardItem>
// //             <CardItem>
// //               <Text>
// //                   가격: a + b / testtesttesttesttesttesttesttesttesttestesttest
// //                 </Text> 
// //               </CardItem>
// //               <Dialog.Container visible={this.state.dialog}>
// //               <Dialog.Title>{this.state.store_name}</Dialog.Title>
// //                 <View style={{justifyContent:'center',flexDirection:'row'}}>
// //                    <MapView 

// //                     initialRegion={{
// //                       latitude: 35.89346514,
// //                       longitude: 128.6220269,
// //                       latitudeDelta: 0.0922,
// //                       longitudeDelta: 0.0421,
// //                     }}
// //                     style={styles.mapStyle}>
// //                       <Marker
// //                         coordinate={{
// //                           latitude: this.state.latitude_, longitude: this.state.longitude_}}
// //                         title={this.state.store_name}
// //                         description="주소"
// //                       />

// //                     </MapView>
// //                 </View> 

// //                 <Dialog.Button style={{textAlign:'center',height:30}} label="공유" onPress={()=>this.setState({
// //                   resNum: data[4]
// //                 }).bind(this)} />
// //                <Dialog.Button style={{textAlign:'center',height:30}} label="Cancel" onPress={this.handleDelete.bind(this)} />

// //               </Dialog.Container>
// //             </Card>
// //         )
// //     }
// // }

// // const styles = StyleSheet.create({
// //     CardContainer: {
// //         elevation: 5,
// //         borderRadius: 4,
// //         borderWidth: 0.5,
// //         borderColor: '#d6d7da',
// //         margin: 20,
// //         elevation: 5
// //     },  
// //     mapStyle: {
// //       width: 400,
// //       height: 400,
// //     },
// //     CardTitle: {
// //         width: '100%',
// //         fontWeight: 'bold',
// //         fontSize: 20,
// //         padding: 3
// //     },
// //     CardContent: {
// //         width: '100%',
// //         fontSize: 12,
// //         padding: 3
// //     },
// // });

import React from 'react';
import { TouchableOpacity, Dimensions, StyleSheet, Text, View, Image } from 'react-native';
import { Card, CardItem, Thumbnail, Body, Left, Right, Button, Icon } from 'native-base';
import MapView, { Marker } from 'react-native-maps';
import Dialog from 'react-native-dialog';

export default class CardView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      food: null,
      dialog: false,
      resNum: null,
      store_name: null,
      latitude_: 35.89346514,
      longitude_: 128.6220269,
    }
  }

  get_position() {
    const formData = new FormData();
    formData.append('store_id', this.state.resNum);
    fetch(`http://ec2-52-72-52-75.compute-1.amazonaws.com/get_store_data`, {
      method: 'POST',
      body: formData
    }).then(res => res.json()).then(
      res => {
        if (res.length == 0) {
        } else {
          var gps = String(res[0].store_gps).split(',')
          this.setState({
            store_name: res[0].store_name,
            latitude_: gps[1],
            longitude_: gps[0]
          })
        }
      })
      .catch(err => console.error(err));
  }

  handleDelete() {
    this.setState({
      dialog: false,
    })
  }
  render() {
    const { data } = this.props;
    return (
      <Card>
        {/* 아침 먹었을 경우 카드뷰 */}
        <CardItem cardBody>
          <Body style={{ marginLeft: 10, marginTop: 10 }}>
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => {
                this.setState({
                  dialog: true
                });
                this.get_position();
              }}>
              <Image
                source={{ uri: 'https://placeimg.com/100/100/animal' }}
                style={{ height: 180, width: 180 }}
              />
            </TouchableOpacity>
          </Body>
          <Body style={{ marginLeft: 10, marginTop: 10 }}>
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => {
                this.setState({
                  dialog: true
                });
                this.get_position();
              }}>
              <Image
                source={{ uri: 'https://placeimg.com/100/100/animal' }}
                style={{ height: 180, width: 180 }}
              />
            </TouchableOpacity>
          </Body>
        </CardItem>
        <CardItem>
          <Left>
            <Body style={{ marginLeft: 60 }}>
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>점심</Text>
            </Body>
          </Left>
          <Right>
            <Body>
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>저녁</Text>
            </Body>
          </Right>
        </CardItem>
        <CardItem style={{ flexDirection: 'row' }}>
          <Text style={{ fontSize: 25, fontWeight: "bold", color: "red", marginRight: 5 }}>+</Text>
          <Text style={{ marginRight: 10 }}>30</Text>
          <Text style={{ fontSize: 25, fontWeight: "bold", color: "blue", marginRight: 5 }}>-</Text>
          <Text>20</Text>
        </CardItem>
        {/* 가게 다이얼로그 */}
        <Dialog.Container visible={this.state.dialog}>
          <Dialog.Title style={{ textAlign: 'center', fontWeight: 'bold' }}>가게이름</Dialog.Title>
          <View style={{ justifyContent: 'center' }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ justifyContent: 'center', marginBottom: 20 }} >
                <Image
                  source={{ uri: 'https://placeimg.com/100/100/animal' }}
                  style={{ height: 130, width: 130 }}
                />
              </View>
              <View style={{ justifyContent: 'center', marginLeft: 20 }} >
                <Text>메뉴이름 : 콩나물국밥</Text>
                <Text>가격 : 8000원</Text>
              </View>
            </View>
            <View style={{ justifyContent: 'center', marginBottom: 10 }}>
              <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>가게 위치</Text>
            </View>
            <MapView

              initialRegion={{
                latitude: 35.89346514,
                longitude: 128.6220269,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              style={styles.mapStyle}>
              <Marker
                coordinate={{
                  latitude: this.state.latitude_, longitude: this.state.longitude_
                }}
                title="가게이름"
                description="주소"
              />

            </MapView>
          </View>
          <Dialog.Button style={{ textAlign: 'center', height: 40, color: "black" }} label="취소" onPress={this.handleDelete.bind(this)} />

        </Dialog.Container>
      </Card>
    )
  }
}

const styles = StyleSheet.create({
  CardContainer: {
    elevation: 5,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    margin: 20,
    elevation: 5
  },
  mapStyle: {
    width: 300,
    height: 300,
  },
  CardTitle: {
    width: '100%',
    fontWeight: 'bold',
    fontSize: 20,
    padding: 3
  },
  CardContent: {
    width: '100%',
    fontSize: 12,
    padding: 3
  },
});