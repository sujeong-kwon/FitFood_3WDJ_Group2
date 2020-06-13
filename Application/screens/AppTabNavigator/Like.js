import React, { useState, useCallback } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    ScrollView,
    Dimensions,
    StatusBar,
} from 'react-native';
import firebase from 'firebase';

import { Button } from 'react-native-elements';

import { LinearGradient } from '../components/LinearGradient';

import { Container, Header, Body, Right, Left, Icon } from 'native-base';

const SCREEN_WIDTH = Dimensions.get('window').width;

const IMAGE_SIZE = SCREEN_WIDTH - 80;

class CustomButton extends React.Component {
    constructor() {
        super();

        this.state = {
            selected: false,
            name: null,
            age: null,
            email: null

        };
    }

    componentDidMount() {
        const { selected } = this.props;

        this.setState({
            selected,
        });

    }

    render() {
        const { title } = this.props;
        const { selected } = this.state;

        return (
            <Button
                title={title}
                titleStyle={{ fontSize: 15, color: 'black' }}
                buttonStyle={
                    selected
                        ? {
                            backgroundColor: '#1fa518',
                            borderRadius: 100,
                            width: 200,
                        }
                        : {
                            borderWidth: 2,
                            borderColor: 'grey',
                            borderRadius: 30,
                            width: 200,
                            backgroundColor: 'transparent',
                        }
                }
                containerStyle={{ marginBottom: 15, marginRight: 10 }}
                onPress={() => this.setState({ selected: !selected })}
            />
        );
    }
}

class Like extends React.Component {

    render() {
        return (
            <Container style={style.container}>
                <Header style={{ backgroundColor: "#1fa518" }}>
                    <Left>
                    </Left>
                    <Body style={{ marginLeft: 125 }}>
                        <Text style={{ fontSize: 17, color: "white", fontWeight: 'bold' }}>
                            선호도</Text>
                    </Body>
                    <Right>
                        <Text style={{ fontSize: 17, color: "white", fontWeight: 'bold', paddingRight: 10 }}> 완료
                        </Text>
                    </Right>
                </Header>
                <View style={style.likecontainer}>
                    <View>
                        <Text style={{ fontSize: 20, paddingTop: 150, paddingBottom: 50 }}>
                            어떤 음식을 좋아하시나요?
                        </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <CustomButton title="한식" />
                        <CustomButton title="중식" />
                        <CustomButton title="일식" />
                        <CustomButton title="양식" />
                    </View>
                </View>
            </Container >
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1
    },
    likecontainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
})

export default Like;