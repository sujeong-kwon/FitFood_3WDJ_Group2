import React from 'react';
import { TouchableOpacity, Dimensions, StyleSheet, Text, View, Image } from 'react-native';
import { Card, CardItem, Thumbnail, Body, Left, Right } from 'native-base';
import MapView, { Marker } from 'react-native-maps';
import Dialog from 'react-native-dialog';
import { Icon, Button, Rating } from 'react-native-elements'
import firebase from 'firebase'

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
      title: null,
      address: null,
      buttonColor: '#979797',
      recipe_dialog: false,
      store_dialog: false,
      store_id: null,
      recipe: [],
      material: null
    }
  }

  change_color() {
    if (this.state.buttonColor == '#ff002b') {
      this.setState({ buttonColor: '#979797' }) // grey
    }
    else {
      this.setState({ buttonColor: '#ff002b' }) // red
    }
  }

  onButtonPress = (data) => {

    var postData = {
      lunch_id: data[0],
      lunch_name: data[2],
      lunch_image: data[1],
      dinner_id: data[3],
      dinner_name: data[5],
      dinner_image: data[4]
    };

    var year = 2020;

    var month = new Date().getMonth();
    var day = new Date().getDate();

    const selected_day = '' + year + month + day;
    var newPostKey = firebase.database().ref().child('eaten').push().key;
    var updates = {};
    updates['/eaten/' + selected_day] = postData;
    var result = firebase.database().ref().update(updates);
    alert('찜 등록 완료!!')
  }

  get_position(id) {
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

  send_server() {
    const formData = new FormData();
    formData.append('food_name', this.state.food);
    formData.append('user_email', firebase.auth().currentUser.email);
    console.log(formData);
    fetch(`http://ec2-52-72-52-75.compute-1.amazonaws.com/app_eaten`, { method: 'POST', body: formData })
      .then(res => res.text()).then(res => {
        console.log(res);
      });
    alert('등록 완료');
    this.setState({
      recipe_dialog: false
    })
  }

  render() {
    const { data } = this.props;
    const { rating } = this.props;

    return (
      <Card style={{ marginLeft: 20, marginRight: 20 }}>
        <CardItem cardBody>
          <Body style={{ marginLeft: 20, marginTop: 10 }}>
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => {
                if (Number(data[0]) > 0) {
                  this.setState({
                    store_dialog: true,
                    food: data[2],
                    image: data[1]
                  });
                } else {
                  this.setState({
                    recipe_dialog: true,
                    image: data[1]
                  })
                }
                this.get_position(data[0]);
              }}>
              <Image
                source={{ uri: data[1] }}
                style={{ height: 150, width: 150 }}
              />
            </TouchableOpacity>
            <View style={{ marginTop: 5 }}>
              <Text style={{ fontSize: 14, fontWeight: "bold" }}>{data[2]}</Text>
            </View>
          </Body>

          <Body style={{ marginLeft: 10, marginTop: 10 }}>
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => {
                if (Number(data[3]) > 0) {
                  this.setState({
                    store_dialog: true,
                    food: data[5],
                    image: data[4]
                  });
                } else {
                  this.setState({
                    recipe_dialog: true,
                    image: data[4]
                  })
                }
                this.get_position(data[3]);
              }}>
              <Image
                source={{ uri: data[4] }}
                style={{ height: 150, width: 150 }}
              />
            </TouchableOpacity>
            <View style={{ marginTop: 5 }}>
              <Text style={{ fontSize: 14, fontWeight: "bold" }}>{data[5]}</Text>
            </View>
          </Body>
        </CardItem>
        <CardItem style={{ flexDirection: 'row' }}>

          <Icon
            raised
            name='heart'
            type='font-awesome'
            color={this.state.buttonColor}
            onPress={() => {
              this.change_color();
              this.onButtonPress(data)
            }}
            size={13}
            containerStyle={{ paddingLeft: 270 }}
          />
        </CardItem>
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
            <View style={{ marginBottom: 10 }}>
              <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 16, color: '#1fa518', marginBottom: 5 }}>만드는 방법</Text>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                {this.state.recipe.map((value, index) => <Text>{value}</Text>)}
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

        <Dialog.Container visible={this.state.store_dialog}>
          <Dialog.Title style={{ textAlign: 'center', fontWeight: 'bold' }}>{this.state.title}</Dialog.Title>
          <View style={{ justifyContent: 'center' }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ justifyContent: 'center', marginBottom: 20 }} >
                <View style={{ padding: 15 }}>
                  <Image
                    source={{ uri: this.state.image }}
                    style={{ height: 130, width: 130 }}
                  />
                </View>

              </View>
              <View style={{ justifyContent: 'center', marginLeft: 10 }} >
                <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>{this.state.food}</Text>
                <Rating imageSize={17} readonly startingValue={rating} style={styles.rating} />
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