import React from 'react';
import { StatusBar, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
            data: null,
            uri: null
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
        navigator.geolocation.getCurrentPosition(position => {
            formData.append('Latitude', position.coords.longitude);
            formData.append('Longitude', position.coords.latitude);
            fetch(`http://ec2-52-72-52-75.compute-1.amazonaws.com/gps`, { method: 'POST', body: formData })
                .then(res => res.json())
                .then(res => {
                    let store_id = res[0].store_id;
                    console.log('가게 id 반환 : ' + store_id);
                    formData_.append('resNum', 34);
                    formData_.append('img', this.state.data);
                    fetch(`http://34.64.243.44:5000/test`, { method: 'POST', body: formData_ })
                        .then((res) => res.text())
                        .then(res => {
                            const eatenData = new FormData();
                            eatenData.append('store_id', 34);
                            eatenData.append('user_email', firebase.auth().currentUser.email);
                            eatenData.append('food_name', res);
                            console.log('food_name : ' + res);
                            // AWS로 한글 데이터 전송 시 한글 인식 실패 POSTMAN으로는 정상 작동
                            fetch(`http://ec2-52-72-52-75.compute-1.amazonaws.com/app_eaten`, { method: 'POST', body: eatenData })
                                .then((res) => res.text())
                                .then(res => {
                                    console.log('저장완료');
                                })
                                .catch((e) => console.log(e));
                            alert('먹은음식이 ' + res + '맞나요?');
                            this.props.navigation.navigate('HomeTab', { "food_name": res });
                        })
                        .catch((e) => console.log(e))
                });
        },
            error => {
                this.setState({
                    error: error
                })
            });


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

// import React from 'react';
// import { StatusBar, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import firebase from 'firebase';

// const style = StyleSheet.create({
//     text: {
//         color: 'white',
//         fontSize: 18,
//         textAlign: 'center'
//     },
//     button: {
//         marginTop: 20,
//         width: 250,
//         height: 50,
//         backgroundColor: '#F57C00',
//         justifyContent: 'center',
//         borderRadius: 30
//     }
// });

// class App extends React.Component {
//     constructor() {
//         super();
//         this.state = {
//             data: null,
//             uri: null
//         }
//     }

//     componentDidMount() {
//         this.setState({
//             data: this.props.navigation.getParam('data'),
//             uri: this.props.navigation.getParam('uri')
//         });
//     }

    // async uploadPhoto() {
    //     const formData = new FormData();
    //     const formData_ = new FormData();
    //     navigator.geolocation.getCurrentPosition(position=>{
    //         // formData.append('Latitude',position.coords.longitude);
    //         // formData.append('Longitude',position.coords.latitude);
    //         // fetch(`http://ec2-52-72-52-75.compute-1.amazonaws.com/gps`,{ method: 'POST',body:formData})
    //         // .then(res=>res.json())
    //         // .then(res=>{
    //         //     //let store_id = res[0].store_id;
    //         //     //console.log('가게 id 반환 : '+store_id);
    //         //     formData_.append('resNum', 29);
    //         //     formData_.append('img', this.state.data);
    //         //     fetch(`http://127.0.0.1:5000/test`, { method: 'POST', body: formData_ })
    //         //         .then((res) => res.text())
    //         //         .then(res => {
    //                     const eatenData = new FormData();
    //                     eatenData.append('store_id', 29);
    //                     eatenData.append('user_email', firebase.auth().currentUser.email);
    //                     // eatenData.append('user_email', 'tester@tester.com');
    //                     eatenData.append('food_name', '우동');
    //                     // AWS로 한글 데이터 전송 시 한글 인식 실패 POSTMAN으로는 정상 작동
    //                     fetch(`http://ec2-52-72-52-75.compute-1.amazonaws.com/app_eaten`, { method: 'POST', body: eatenData })
    //                         .then((res) => JSON.stringify(res))
    //                         .then(res => {
    //                             console.log(res);
    //                         })
    //                         .catch((e) => console.log(e));
    //         //             this.props.navigation.navigate('HomeTab', { "food_name": res });
    //         //         })
    //         //         .catch((e) => console.log(e))
    //         // });
    //     },error => {
    //         this.setState({
    //           error:error
    //         })
    //     }); 
    //  }

//     render() {
//         return (
//             <View style={{ alignItems: "center" }}>
//                 <StatusBar hidden />
//                 <Image style={{ marginTop: 50, width: 330, height: 330 }} source={{ uri: this.props.navigation.getParam('uri') }}></Image>
//                 <TouchableOpacity
//                     style={style.button}
//                     onPress={this.uploadPhoto.bind(this)}>
//                     <Text style={style.text}>이미지 전송</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                     style={style.button}>
//                     <Text style={style.text} onPress={() => {
//                         this.props.navigation.navigate('Camera');
//                     }}>다시 고르기</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity

//                     style={style.button}>
//                     <Text style={style.text} onPress={() => {
//                         this.props.navigation.navigate('animation', { 'data': this.state.uri });
//                     }}>애니메이션 시작</Text>
//                 </TouchableOpacity>
//             </View>
//         );
//     }
// }

// export default App;
