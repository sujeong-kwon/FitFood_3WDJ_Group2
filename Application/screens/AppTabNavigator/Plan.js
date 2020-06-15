import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Card, CardItem, Icon, Body, Right, Button } from 'native-base';
import Dialog from 'react-native-dialog';
import MapView, { Marker } from 'react-native-maps';

export default class Plan extends React.Component {
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

    return (
      <Card style={styles.card}>
        <CardItem style={styles.carditem}>
          <Body style={{ marginLeft: 10, flexDirection: 'row' }}>
            <Image
              source={{ uri: 'https://placeimg.com/100/100/animal' }}
              style={{ height: 110, width: 110 }}
            />
            <Text style={styles.foodtext}>메뉴이름</Text>
          </Body>
          <Right style={{ marginTop: 90 }}>
            {/* 가게일 경우 */}
            <Icon name='ios-navigate' style={{ color: 'grey' }} onPress={() => {
              this.setState({
                dialog: true
              });
            }} />
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
            {/* 레시피일 경우 */}
            {/* <Icon name='md-paper' style={{ color: 'grey' }} onPress={() => {
              this.setState({
                dialog: true
              });
            }} />
            <Dialog.Container visible={this.state.dialog}>
              <Dialog.Title style={{ textAlign: 'center', fontWeight: 'bold' }}>레시피이름</Dialog.Title>
              <View style={{ justifyContent: 'center' }}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <View style={{ justifyContent: 'center', marginBottom: 20 }} >
                    <Text style={{ fontWeight: 'bold', color: '#1fa518' }}>영양소</Text>
                    <Text>
                      중량(1인분) : 1000 / 열량 : 1000 / 탄수화물 : 1000 /
                      단백질 : 1000 / 칼로리 : 1000 / 지방 : 1000 / 나트륨: 1000
                  </Text>
                  </View>
                </View>
                <View style={{ justifyContent: 'center', marginBottom: 10 }}>
                  <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}>레시피</Text>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <View style={{ justifyContent: 'center', marginBottom: 20 }} >
                    <Text style={{ fontWeight: 'bold', color: '#1fa518' }}>재료</Text>
                    <Text>
                      돼지고기(안심, 100g, 쌀(200g), 도라지(30g), 애호박(1/2개), 양파(30g),
                      홍고추(1개), 미나리(20g), 오이(50g), 청포묵(20g), 쌈무(20g)
                </Text>
                  </View>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <View style={{ justifyContent: 'center', marginBottom: 20 }} >
                    <Text style={{ fontWeight: 'bold', color: '#1fa518', textAlign: 'left' }}>만드는 방법</Text>
                    <Image
                      source={{ uri: 'https://placeimg.com/100/100/animal' }}
                      style={{ height: 200, width: 350 }}
                    />
                  </View>
                </View>
              </View>
              <Dialog.Button style={{ textAlign: 'center', height: 40, color: "black" }} label="취소" onPress={this.handleDelete.bind(this)} />

            </Dialog.Container> */}
          </Right>
        </CardItem>
      </Card >

    )
  }
}

const styles = StyleSheet.create({
  daytext: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: 350,
    // backgroundColor: '#e77f67'
    backgroundColor: 'white'
  },
  carditem: {
    //backgroundColor: '#F8EFBA',
    backgroundColor: 'white'
  },
  itemtext: {
    color: 'grey',
    fontWeight: 'bold',
    fontSize: 16,
    paddingLeft: 20
  },
  foodtext: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    paddingLeft: 40,
    paddingTop: 45
  },
  mapStyle: {
    width: 300,
    height: 300,
  }
});
