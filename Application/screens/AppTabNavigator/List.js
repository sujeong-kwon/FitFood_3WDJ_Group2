import React from 'react';
import { StyleSheet, Text, View, ScrollView, Alert, Image, TouchableOpacity } from 'react-native';
import { Container, Content, Icon, Button, Header, Body, Left, Right } from 'native-base'; //
import { keyframes } from 'styled-components';
import CardView from './CardView';
import CardView2 from './CardView2';
import { AppLoading } from 'expo';
import Dialog from 'react-native-dialog';
import firebase from 'firebase';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

class List extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            recommand_: [],
            loaded: 0,
            dialogVisible: false,
            breakfast: null,
            value: null,
            lunch: true,
            dinner: true
        };
        this.setInputState = this.setInputState.bind(this);
    }

    componentDidMount() {
    }

    setInputState(event) {
        this.setState({ recommand_: event });
    }

    load_list() {
        fetch(`http://ec2-52-72-52-75.compute-1.amazonaws.com/food`, { method: 'GET' })
            .then((res) => res.json())
            .then(res => {
                console.log(res);
            })
            .catch((e) => console.log(e))
    }

    showAlertYes() {
        this.setState({
            dialogVisible: true,
        })
    }

    showAlertNo() {
        this.setState({
            loaded: 2
        })
    }

    handleCancel = () => {
        console.log(this.state.breakfast);
        this.setState({
            dialogVisible: false,
            loaded: 1
        });
        const rowData = [];
        const formData = new FormData();
        formData.append('food', this.state.breakfast);
        fetch(`http://127.0.0.1:5000/test2`, { method: 'POST', body: formData })
            .then((res) => res.json())
            .then(res => {
                console.log(res);
                res.map(value => {
                    rowData.push([value.lunch, value.dinner, value.lunch_img, value.dinner_img, value.resNum_lunch, value.resNum_dinner]);
                })
                this.setState({
                    recommand_: rowData
                })
                this.send_Eaten_Food_to_Server();
            })
            .catch((e) => console.log(e));

    };

    handleDelete = () => {
        // The user has pressed the "Delete" button, so here you can do your own logic.
        // …Your logic
        this.setState({ dialogVisible: false });
    };


    send_Eaten_Food_to_Server() {
        const formData = new FormData();
        formData.append('user_email', firebase.auth().currentUser.email);
        formData.append('food_name', this.state.breakfast);
        formData.append('store_name', 107);
        fetch(`http://ec2-52-72-52-75.compute-1.amazonaws.com/app_eaten`, { method: 'POST', body: formData })
            .then((res) => res.text())
            .then(res => {
                console.log(res);
            })
            .catch((e) => console.log(e));
    }

    render() {
        if (this.state.loaded == 0) {
            return (
                <View style={style.qcontainer}>
                    <Text style={{ fontSize: 45, color: 'white', paddingTop: 210 }} >아침은 드셨나요?</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Button style={style.button}><Text style={style.textO} onPress={this.showAlertYes.bind(this)}>네</Text></Button>
                        {/* 네 눌렀을 경우 다이얼로그 */}
                        <Dialog.Container visible={this.state.dialogVisible}>
                            <Dialog.Title>아침으로 무엇을 드셨나요?</Dialog.Title>
                            <Dialog.Input onChangeText={(value) => {
                                this.setState({
                                    breakfast: value
                                })
                            }} />
                            <View style={{ marginLeft: 10 }}>
                                <Text style={{ fontSize: 15, marginBottom: 5 }}>점심은 어떻게 드실건가요?</Text>
                                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                    <TouchableOpacity
                                        style={styles.radioCircle}
                                        onPress={() => {
                                            this.setState({
                                                lunch: true
                                            })
                                        }}>
                                        {this.state.lunch
                                            ? <View style={styles.selectedRb} />
                                            : null}
                                    </TouchableOpacity>
                                    <Text style={styles.radioText}>가게</Text>
                                    <TouchableOpacity
                                        style={styles.radioCircle}
                                        onPress={() => {
                                            this.setState({
                                                lunch: false
                                            })
                                        }}>
                                        {this.state.lunch
                                            ? null
                                            : <View style={styles.selectedRb} />}
                                    </TouchableOpacity>
                                    <Text style={styles.radioText}>레시피</Text>
                                </View>
                                <Text style={{ fontSize: 15, marginBottom: 5, marginTop: 10 }}>저녁은 어떻게 드실건가요?</Text>
                                <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                                    <TouchableOpacity
                                        style={styles.radioCircle}
                                        onPress={() => {
                                            this.setState({
                                                dinner: true
                                            })
                                        }}>
                                        {this.state.dinner
                                            ? <View style={styles.selectedRb} />
                                            : null}
                                    </TouchableOpacity>
                                    <Text style={styles.radioText}>가게</Text>
                                    <TouchableOpacity
                                        style={styles.radioCircle}
                                        onPress={() => {
                                            this.setState({
                                                dinner: false
                                            })
                                        }}>
                                        {this.state.dinner
                                            ? null
                                            : <View style={styles.selectedRb} />}
                                    </TouchableOpacity>
                                    <Text style={styles.radioText}>레시피</Text>
                                </View>
                            </View>
                            <Dialog.Button label="확인" onPress={this.handleCancel} />
                            <Dialog.Button label="취소" onPress={this.handleDelete} />
                        </Dialog.Container>
                        <Button style={style.button}><Text style={style.textX} onPress={this.showAlertNo.bind(this)}>아니오</Text></Button>
                        {/* 아니요 눌렀을 경우 다이얼로그 */}
                        {/* <Dialog.Container visible={this.state.dialogVisible}>
                            <View style={{ marginLeft: 10 }}>
                                <Text style={{ fontWeight: "700", fontSize: 15, marginBottom: 5 }}>아침</Text>
                                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                    <TouchableOpacity
                                        style={styles.radioCircle}
                                        onPress={() => {
                                        }}>
                                        {<View style={styles.selectedRb} />}
                                    </TouchableOpacity>
                                    <Text style={styles.radioText}>가게</Text>
                                    <TouchableOpacity
                                        style={styles.radioCircle}
                                        onPress={() => {
                                        }}>
                                        {<View style={styles.selectedRb} />}
                                    </TouchableOpacity>
                                    <Text style={styles.radioText}>레시피</Text>
                                </View>
                                <Text style={{ fontWeight: "700", fontSize: 15, marginBottom: 5 }}>점심</Text>
                                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                    <TouchableOpacity
                                        style={styles.radioCircle}
                                        onPress={() => {
                                        }}>
                                        {<View style={styles.selectedRb} />}
                                    </TouchableOpacity>
                                    <Text style={styles.radioText}>가게</Text>
                                    <TouchableOpacity
                                        style={styles.radioCircle}
                                        onPress={() => {
                                        }}>
                                        {<View style={styles.selectedRb} />}
                                    </TouchableOpacity>
                                    <Text style={styles.radioText}>레시피</Text>
                                </View>
                                <Text style={{ fontWeight: "700", fontSize: 15, marginBottom: 5 }}>저녁</Text>
                                <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                                    <TouchableOpacity
                                        style={styles.radioCircle}
                                        onPress={() => {
                                        }}>
                                        {<View style={styles.selectedRb} />}
                                    </TouchableOpacity>
                                    <Text style={styles.radioText}>가게</Text>
                                    <TouchableOpacity
                                        style={styles.radioCircle}
                                        onPress={() => {
                                        }}>
                                        {<View style={styles.selectedRb} />}
                                    </TouchableOpacity>
                                    <Text style={styles.radioText}>레시피</Text>
                                </View>
                            </View>
                            <Dialog.Button label="확인" onPress={this.handleCancel} />
                            <Dialog.Button label="취소" onPress={this.handleDelete} />
                        </Dialog.Container> */}
                    </View>
                    <View style={{ paddingTop: 20, paddingRight: 150 }}>
                        <Image
                            style={{ width: 250, height: 250 }}
                            source={require('./list.png')} />
                    </View>
                </View>
            );
        } else if (this.state.loaded == 1) {
            return (
                <View style={style.container}>
                    <Container style={style.container}>
                        <Header style={{ backgroundColor: "#1fa518" }}>
                            <Left>
                            </Left>
                            <Body style={{ marginLeft: 115 }}>
                                <Text style={{ fontSize: 17, color: "white", fontWeight: 'bold' }}>
                                    추천식단</Text>
                            </Body>
                            <Right>
                            </Right>
                        </Header>
                        <Content style={{ backgroundColor: 'white' }}>
                            <Text style={{ fontSize: 20, color: "black", marginTop: 15, marginBottom: 3, marginLeft: 10, fontWeight: "bold" }}>오늘의 추천식단</Text>
                            <Text style={{ color: "grey", marginBottom: 15, marginLeft: 10 }}>균형잡힌 영양소를 기반으로 한 맞춤 식단을 확인해보세요</Text>
                            {/* {
                                this.state.recommand_.map((value, index) => <CardView data={value} key={index} />)
                            } */}
                            <CardView />
                        </Content>
                    </Container>
                </View>
            );
        } else {
            return (
                <View style={style.container}>
                    <Container style={style.container}>
                        <Header style={{ backgroundColor: "#1fa518" }}>
                            <Left>
                            </Left>
                            <Body style={{ marginLeft: 115 }}>
                                <Text style={{ fontSize: 17, color: "white", fontWeight: 'bold' }}>
                                    추천식단</Text>
                            </Body>
                            <Right>
                            </Right>
                        </Header>
                        <Content style={{ backgroundColor: 'white' }}>
                            <Text style={{ fontSize: 20, color: "black", marginTop: 15, marginBottom: 3, marginLeft: 10, fontWeight: "bold" }}>오늘의 추천식단</Text>
                            <Text style={{ color: "grey", marginBottom: 15, marginLeft: 10 }}>균형잡힌 영양소를 기반으로 한 맞춤 식단을 확인해보세요</Text>
                            <CardView2 />
                            <CardView2 />
                            <CardView2 />
                        </Content>
                    </Container>
                </View>
            )
        }

    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center'
    },
    qcontainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#1fa518"
    },
    textO: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
    },
    textX: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
    },
    button: {
        marginTop: 20,
        marginLeft: 3,
        marginRight: 3,
        width: 100,
        height: 50,
        backgroundColor: '#F57C00',
        justifyContent: 'center',
        borderRadius: 30
    },
    food: {
        marginTop: 20,
        height: 200,
        backgroundColor: '#F57C00'
    }
});

const styles = StyleSheet.create({
    radioText: {
        marginRight: 10,
        marginLeft: 3,
        fontSize: 14,
        color: '#000',
        //fontWeight: '700'
    },
    radioCircle: {
        height: 17,
        width: 17,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: '#1fa518',
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedRb: {
        width: 7,
        height: 7,
        borderRadius: 50,
        backgroundColor: '#1fa518',
    }
});

export default List;