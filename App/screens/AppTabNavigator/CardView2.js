import React from 'react';
import { TouchableOpacity, Dimensions, StyleSheet, Text, View, Image } from 'react-native';
import { Card, CardItem, Thumbnail, Body, Left, Right, Button, Icon } from 'native-base';
import MapView, { Marker } from 'react-native-maps';
import Dialog from 'react-native-dialog';

export default class CardView2 extends React.Component {
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
        {/* 아침 안 먹었을 경우 카드뷰 */}
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
                style={{ height: 120, width: 120 }}
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
                style={{ height: 120, width: 120 }}
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
                style={{ height: 120, width: 120 }}
              />
            </TouchableOpacity>
          </Body>
        </CardItem>
        <CardItem>
          <Body style={{ marginLeft: 35 }}>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>아침</Text>
          </Body>
          <Body style={{ marginLeft: 73 }}>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>점심</Text>
          </Body>
          <Body style={{ marginLeft: 77 }}>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>저녁</Text>
          </Body>
        </CardItem>
        <CardItem style={{ flexDirection: 'row' }}>
          <Text style={{ fontSize: 25, fontWeight: "bold", color: "red", marginRight: 5 }}>+</Text>
          <Text style={{ marginRight: 10 }}>30</Text>
          <Text style={{ fontSize: 25, fontWeight: "bold", color: "blue", marginRight: 5 }}>-</Text>
          <Text>20</Text>
        </CardItem>
        {/* 레시피 다이얼로그 */}
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
                {/* 뭘로 받는지 몰라서 일단 이미지 */}
              </View>
            </View>
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