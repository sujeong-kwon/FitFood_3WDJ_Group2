import React from 'react';
import { StatusBar, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Eaten from '../../assets/databases/Eaten';
import firebase from 'firebase';

const style = StyleSheet.create({
    text: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center'
    },
    button: {
        marginTop: 20,
        width: 250,
        height: 50,
        backgroundColor: '#F57C00',
        justifyContent: 'center',
        borderRadius: 30
    }
});

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            blob: null,
            uri: null,
            data: null,
            nutri: []
        }
    }

    componentDidMount() {
        this.setState({
            data: this.props.navigation.getParam('data'),
            uri: this.props.navigation.getParam('uri')
        });
    }

    async uploadPhoto() {

        const formData = new FormData();

        const formData_ = new FormData();
        // navigator.geolocation.getCurrentPosition(position=>{
        //     console.log(position);
        //     formData.append('latitude',position.coords.latitude);
        //     formData.append('longitude',position.coords.longitude);
        //     fetch(`http://ec2-52-72-52-75.compute-1.amazonaws.com/get_store_id`,{ method: 'POST',body:formData})
        //     .then(res=>res.text())
        //     .then(res=>console.log(res));
        // },
        //   error => {
        //     this.setState({
        //       error:error
        //     })
        // }); 

        formData_.append('resNum', 84);
        formData_.append('img', this.state.data);
        fetch(`http://localhost:5000/test`, { method: 'POST', body: formData_ })
            .then((res) => res.text())
            .then(res => {
                const eatenData = new FormData();
                eatenData.append('store_name', 84);
                eatenData.append('user_email', firebase.auth().currentUser.email);
                eatenData.append('food_name', '콩나물국밥');
                fetch(`http://ec2-52-72-52-75.compute-1.amazonaws.com/app_eaten`, { method: 'POST', body: eatenData })
                    .then((res) => res.text())
                    .then(res => {
                        console.log(res);
                    })
                    .catch((e) => console.log(e));
                alert("먹은 음식이", res, " 맞나요?");

                this.update_calendar(res);

                this.props.navigation.navigate('HomeTab', { "food_name": res });
            })
            .catch((e) => console.log(e))
    }

    update_calendar(food) {
        const user_email = firebase.auth().currentUser.email;
        const props = {
            food_name: food,
            user_email
        };
    }

    render() {
        return (
            <View style={{ alignItems: "center" }}>
                <StatusBar hidden />
                <Image style={{ marginTop: 50, width: 330, height: 330 }} source={{ uri: this.props.navigation.getParam('uri') }}></Image>
                <TouchableOpacity
                    style={style.button}
                    onPress={this.uploadPhoto.bind(this)}>
                    <Text style={style.text}>이미지 전송</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        console.log(this.state.data);
                    }}
                    style={style.button}>
                    <Text style={style.text} onPress={() => {
                        this.props.navigation.navigate('Camera');
                    }}>다시 고르기</Text>
                </TouchableOpacity>
                <TouchableOpacity

                    style={style.button}>
                    <Text style={style.text} onPress={() => {
                        this.props.navigation.navigate('animation', { 'data': this.state.uri });
                    }}>애니메이션 시작</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default App;