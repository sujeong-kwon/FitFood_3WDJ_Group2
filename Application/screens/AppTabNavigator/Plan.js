import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Card, CardItem, Icon, Body, Right } from 'native-base';
import { Button, Rating } from 'react-native-elements'
import Dialog from 'react-native-dialog';
import MapView, { Marker } from 'react-native-maps';
import firebase from 'firebase';

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
      store_dialog: false,
      recipe_dialog: false,
      address: null,
      material: null,
      recipe: null,
    }
  }
  send_server() {
    const formData = new FormData();
    formData.append('food_name', this.state.food);
    formData.append('user_email', firebase.auth().currentUser.email);
    console.log(formData);
    fetch(`http://ec2-52-72-52-75.compute-1.amazonaws.com/app_eaten`, { method: 'POST', body: formData })
      .then(res => res.text()).then(res => {
        console.log(res);
      });
    alert('등록 성공');
    this.setState({
      recipe_dialog: false
    })
  }

  get_position(id) {
    console.log(id)
    if (id > 0) {
      fetch(`http://34.64.243.44:5000/store/` + id, {
        method: 'GET',
      }).then(res => res.json()).then(
        res => {
          this.setState({
            title: res.recommend[0].store_name,
            latitude_: Number(res.recommend[0].gps_r),
            longitude_: Number(res.recommend[0].gps_l),
            address: res.recommend[0].recommend_address,
            store_id: id
          })
        })
        .catch(err => console.error(err));
    } else {
      let id_ = Math.abs(Number(id));
      fetch(`http://34.64.243.44:5000/recipe/` + id_, {
        method: 'GET',
      }).then(res => res.json()).then(
        res => {
          this.setState({
            food: res.footrecommend[0].foot_name,
            recipe: res.footrecommend[0].foot_recipe,
            material: res.footrecommend[0].material
          })
        })
        .catch(err => console.error(err));
    }
  }

  handleDelete() {
    this.setState({
      recipe_dialog: false,
      store_dialog: false
    })
  }

  render() {
    const { data } = this.props;

    return (
      <Card style={styles.card}>
        <CardItem style={styles.carditem}>
          <Body style={{ marginLeft: 10, flexDirection: 'row' }}>
            <Image
              source={{ uri: data[2] }}
              style={{ height: 110, width: 110 }}
            />
            <Text style={styles.foodtext}>{data[1]}</Text>
          </Body>
          <Right style={{ paddingTop: 4 }}>
            {/* 가게일 경우 */}
            <Icon name='ios-arrow-dropright' style={{ color: 'grey' }} onPress={() => {
              if (data[0] > 0) {
                this.setState({
                  store_dialog: true
                });
                this.get_position(data[0])
              } else {
                this.setState({
                  recipe_dialog: true
                });
                this.get_position(data[0])
              }
            }} />
            <Dialog.Container visible={this.state.store_dialog}>
              <Dialog.Title style={{ textAlign: 'center', fontWeight: 'bold' }}>{this.state.title}</Dialog.Title>
              <View style={{ justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ justifyContent: 'center', marginBottom: 20 }} >
                    <View style={{ padding: 15 }}>
                      <Image
                        source={{ uri: data[2] }}
                        style={{ height: 130, width: 130 }}
                      />
                    </View>
                  </View>
                  <View style={{ justifyContent: 'center', marginLeft: 10 }} >
                    <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>{data[1]}</Text>
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
                    title={this.state.title}
                    description={this.state.address}
                  />

                </MapView>
              </View>
              <Button
                title="취소"
                titleStyle={{
                  fontSize: 13,
                  color: 'white',
                  textAlign: 'center',
                }}
                onPress={this.handleDelete.bind(this)}
                buttonStyle={{
                  height: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 30,
                  backgroundColor: '#1fa518'
                }}
                containerStyle={{ marginVertical: 7 }}
              />
            </Dialog.Container>

            <Dialog.Container visible={this.state.recipe_dialog}>
              <Dialog.Title style={{ textAlign: 'center', fontWeight: 'bold' }}>{this.state.food}</Dialog.Title>
              <View>

                <View style={{ marginBottom: 20 }}>
                  <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16, color: '#1fa518', marginBottom: 5 }}>재료</Text>
                  <View>
                    <Text>
                      {this.state.material}
                    </Text>
                  </View>
                </View>
                <View style={{ justifyContent: 'center', marginBottom: 10 }}>
                  <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16, color: '#1fa518', marginBottom: 5 }}>만드는 방법</Text>
                  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text>
                      {this.state.recipe}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{ margin: 5 }}>
                <Text style={{ fontSize: 10, color: "red", marginBottom: 3, marginLeft: 10 }}>*레시피대로 드셨다면 확인버튼을 눌러주세요</Text>
                <Button
                  title="확인"
                  titleStyle={{
                    fontSize: 13,
                    color: 'white',
                    textAlign: 'center',
                  }}
                  onPress={this.send_server.bind(this)}
                  buttonStyle={{
                    height: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 30,
                    backgroundColor: '#1fa518'
                  }}
                  containerStyle={{ marginVertical: 3 }}
                />
              </View>
              <Button
                title="취소"
                titleStyle={{
                  fontSize: 13,
                  color: 'white',
                  textAlign: 'center',
                }}
                onPress={this.handleDelete.bind(this)}
                buttonStyle={{
                  height: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 30,
                  backgroundColor: '#1fa518'
                }}
                containerStyle={{ marginVertical: 3 }}
              />
            </Dialog.Container>
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
