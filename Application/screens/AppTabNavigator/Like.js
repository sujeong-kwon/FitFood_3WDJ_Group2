import React, { Component } from 'react';
import { Button, StyleSheet, Text, View, ScrollView, Dimensions, TextInput, Platform, TouchableOpacity, Image } from 'react-native';
import { Container, Header, Body, Right, Left, Icon } from 'native-base';
import { Path } from 'react-native-svg'
import { LineChart, XAxis, AreaChart, Grid, YAxis } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import firebase from 'firebase';

class Like extends React.Component {

    constructor() {
        super();

        this.state = {
            Car_Data: [],
            Pro_Data: [],
            Fat_Data: [],
            minutes: null,
            seconds: null
        }
    }

    async componentDidMount() {

        let Car_Data = [];
        let Pro_Data = [];
        let Fat_Data = [];

        const formData1 = new FormData();
        formData1.append('user_email', firebase.auth().currentUser.email);
        formData1.append('date', '2020-06-24');

        fetch(`http://ec2-52-72-52-75.compute-1.amazonaws.com/eaten_data`, {
            method: 'POST',
            body: formData1
        }).then(res => res.json()).then(res => {
            let car_sum = 0;
            let pro_sum = 0;
            let fat_sum = 0;
            let time_sum = 0;
            for (let i = 0; i < res.time.length; i++) {
                if (res.time[i] == '종료시간 없음') {
                    time_sum += 900
                } else {
                    time_sum += res.time[i]
                }
            }
            for (let i = 0; i < res.nutrients_list.length; i++) {
                car_sum += Math.round(res.nutrients_list[i][0].nutrient_carbohydrate)
                pro_sum += Math.round(res.nutrients_list[i][0].nutrient_protein)
                fat_sum += Math.round(res.nutrients_list[i][0].nutrient_fat)
            }

            let Car_Per = Math.round((car_sum / (car_sum + pro_sum + fat_sum)) * 100);
            let Pro_Per = Math.round((pro_sum / (car_sum + pro_sum + fat_sum)) * 100);
            let Fat_Per = Math.round((fat_sum / (car_sum + pro_sum + fat_sum)) * 100);

            Car_Data.push({ value: Car_Per, date: 6.24 });
            Pro_Data.push({ value: Pro_Per, date: 6.24 });
            Fat_Data.push({ value: Fat_Per, date: 6.24 });
            //2
            const formData2 = new FormData();
            formData2.append('user_email', firebase.auth().currentUser.email);
            formData2.append('date', '2020-06-25');

            fetch(`http://ec2-52-72-52-75.compute-1.amazonaws.com/eaten_data`, {
                method: 'POST',
                body: formData2
            }).then(res => res.json()).then(res => {

                let car_sum = 0;
                let pro_sum = 0;
                let fat_sum = 0;
                for (let i = 0; i < res.nutrients_list.length; i++) {
                    car_sum += Math.round(res.nutrients_list[i][0].nutrient_carbohydrate)
                    pro_sum += Math.round(res.nutrients_list[i][0].nutrient_protein)
                    fat_sum += Math.round(res.nutrients_list[i][0].nutrient_fat)
                }

                let Car_Per = Math.round((car_sum / (car_sum + pro_sum + fat_sum)) * 100);
                let Pro_Per = Math.round((pro_sum / (car_sum + pro_sum + fat_sum)) * 100);
                let Fat_Per = Math.round((fat_sum / (car_sum + pro_sum + fat_sum)) * 100);

                Car_Data.push({ value: Car_Per, date: 6.25 });
                Pro_Data.push({ value: Pro_Per, date: 6.25 });
                Fat_Data.push({ value: Fat_Per, date: 6.25 });

                //3
                const formData3 = new FormData();
                formData3.append('user_email', firebase.auth().currentUser.email);
                formData3.append('date', '2020-06-26');

                fetch(`http://ec2-52-72-52-75.compute-1.amazonaws.com/eaten_data`, {
                    method: 'POST',
                    body: formData3
                }).then(res => res.json()).then(res => {

                    let car_sum = 0;
                    let pro_sum = 0;
                    let fat_sum = 0;
                    for (let i = 0; i < res.nutrients_list.length; i++) {
                        car_sum += Math.round(res.nutrients_list[i][0].nutrient_carbohydrate)
                        pro_sum += Math.round(res.nutrients_list[i][0].nutrient_protein)
                        fat_sum += Math.round(res.nutrients_list[i][0].nutrient_fat)
                    }

                    let Car_Per = Math.round((car_sum / (car_sum + pro_sum + fat_sum)) * 100);
                    let Pro_Per = Math.round((pro_sum / (car_sum + pro_sum + fat_sum)) * 100);
                    let Fat_Per = Math.round((fat_sum / (car_sum + pro_sum + fat_sum)) * 100);

                    Car_Data.push({ value: Car_Per, date: 6.26 });
                    Pro_Data.push({ value: Pro_Per, date: 6.26 });
                    Fat_Data.push({ value: Fat_Per, date: 6.26 });

                    // 4
                    const formData4 = new FormData();
                    formData4.append('user_email', firebase.auth().currentUser.email);
                    formData4.append('date', '2020-06-27');

                    fetch(`http://ec2-52-72-52-75.compute-1.amazonaws.com/eaten_data`, {
                        method: 'POST',
                        body: formData4
                    }).then(res => res.json()).then(res => {

                        let car_sum = 0;
                        let pro_sum = 0;
                        let fat_sum = 0;
                        for (let i = 0; i < res.nutrients_list.length; i++) {
                            car_sum += Math.round(res.nutrients_list[i][0].nutrient_carbohydrate)
                            pro_sum += Math.round(res.nutrients_list[i][0].nutrient_protein)
                            fat_sum += Math.round(res.nutrients_list[i][0].nutrient_fat)
                        }

                        let Car_Per = Math.round((car_sum / (car_sum + pro_sum + fat_sum)) * 100);
                        let Pro_Per = Math.round((pro_sum / (car_sum + pro_sum + fat_sum)) * 100);
                        let Fat_Per = Math.round((fat_sum / (car_sum + pro_sum + fat_sum)) * 100);

                        Car_Data.push({ value: Car_Per, date: 6.27 });
                        Pro_Data.push({ value: Pro_Per, date: 6.27 });
                        Fat_Data.push({ value: Fat_Per, date: 6.27 });

                        // 5
                        const formData5 = new FormData();
                        formData5.append('user_email', firebase.auth().currentUser.email);
                        formData5.append('date', '2020-06-28');

                        fetch(`http://ec2-52-72-52-75.compute-1.amazonaws.com/eaten_data`, {
                            method: 'POST',
                            body: formData5
                        }).then(res => res.json()).then(res => {
                            let car_sum = 0;
                            let pro_sum = 0;
                            let fat_sum = 0;
                            for (let i = 0; i < res.nutrients_list.length; i++) {
                                car_sum += Math.round(res.nutrients_list[i][0].nutrient_carbohydrate)
                                pro_sum += Math.round(res.nutrients_list[i][0].nutrient_protein)
                                fat_sum += Math.round(res.nutrients_list[i][0].nutrient_fat)
                            }

                            let Car_Per = Math.round((car_sum / (car_sum + pro_sum + fat_sum)) * 100);
                            let Pro_Per = Math.round((pro_sum / (car_sum + pro_sum + fat_sum)) * 100);
                            let Fat_Per = Math.round((fat_sum / (car_sum + pro_sum + fat_sum)) * 100);

                            Car_Data.push({ value: Car_Per, date: 6.28 });
                            Pro_Data.push({ value: Pro_Per, date: 6.28 });
                            Fat_Data.push({ value: Fat_Per, date: 6.28 });

                            //6
                            const formData6 = new FormData();
                            formData6.append('user_email', firebase.auth().currentUser.email);
                            formData6.append('date', '2020-06-29');

                            fetch(`http://ec2-52-72-52-75.compute-1.amazonaws.com/eaten_data`, {
                                method: 'POST',
                                body: formData6
                            }).then(res => res.json()).then(res => {
                                let car_sum = 0;
                                let pro_sum = 0;
                                let fat_sum = 0;
                                for (let i = 0; i < res.nutrients_list.length; i++) {
                                    car_sum += Math.round(res.nutrients_list[i][0].nutrient_carbohydrate)
                                    pro_sum += Math.round(res.nutrients_list[i][0].nutrient_protein)
                                    fat_sum += Math.round(res.nutrients_list[i][0].nutrient_fat)
                                }

                                let Car_Per = Math.round((car_sum / (car_sum + pro_sum + fat_sum)) * 100);
                                let Pro_Per = Math.round((pro_sum / (car_sum + pro_sum + fat_sum)) * 100);
                                let Fat_Per = Math.round((fat_sum / (car_sum + pro_sum + fat_sum)) * 100);

                                Car_Data.push({ value: Car_Per, date: '6.29' });
                                Pro_Data.push({ value: Pro_Per, date: '6.29' });
                                Fat_Data.push({ value: Fat_Per, date: '6.29' });
                                //7
                                const formData7 = new FormData();
                                formData7.append('user_email', firebase.auth().currentUser.email);
                                formData7.append('date', '2020-06-30');

                                fetch(`http://ec2-52-72-52-75.compute-1.amazonaws.com/eaten_data`, {
                                    method: 'POST',
                                    body: formData7
                                }).then(res => res.json()).then(res => {
                                    let car_sum = 0;
                                    let pro_sum = 0;
                                    let fat_sum = 0;
                                    for (let i = 0; i < res.nutrients_list.length; i++) {
                                        car_sum += Math.round(res.nutrients_list[i][0].nutrient_carbohydrate)
                                        pro_sum += Math.round(res.nutrients_list[i][0].nutrient_protein)
                                        fat_sum += Math.round(res.nutrients_list[i][0].nutrient_fat)
                                    }

                                    let Car_Per = Math.round((car_sum / (car_sum + pro_sum + fat_sum)) * 100);
                                    let Pro_Per = Math.round((pro_sum / (car_sum + pro_sum + fat_sum)) * 100);
                                    let Fat_Per = Math.round((fat_sum / (car_sum + pro_sum + fat_sum)) * 100);

                                    Car_Data.push({ value: Car_Per, date: '6.30' });
                                    Pro_Data.push({ value: Pro_Per, date: '6.30' });
                                    Fat_Data.push({ value: Fat_Per, date: '6.30' });

                                    let seconds = (Math.round(time_sum / 3)) % 60;
                                    let minutes = (Math.round(time_sum / 3) - seconds) / 60;
                                    this.setState({
                                        Car_Data,
                                        Pro_Data,
                                        Fat_Data,
                                        minutes,
                                        seconds
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    }


    render() {
        const axesSvg = { fontSize: 10, fill: 'grey' };
        const verticalContentInset = { top: 10, bottom: 10 }
        const xAxisHeight = 10

        const Line1 = ({ line }) => (
            <Path
                key={'line'}
                d={line}
                stroke={'#FF6E6E'}
                fill={'none'}
            />
        )
        const Line2 = ({ line }) => (
            <Path
                key={'line'}
                d={line}
                stroke={'#0A6EFF'}
                fill={'none'}
            />
        )
        const Line3 = ({ line }) => (
            <Path
                key={'line'}
                d={line}
                stroke={'rgb(197, 108, 240)'}
                fill={'none'}
            />
        )
        return (
            <Container style={style.container}>
                <Header style={{ backgroundColor: "#1fa518" }}>
                    <Left>
                        <Icon name='md-arrow-back' style={{ color: 'white', paddingLeft: 10 }} onPress={() => {
                            this.props.navigation.navigate('Setting');
                        }}></Icon>
                    </Left>
                    <Body style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 17, color: "white", fontWeight: 'bold' }}>
                            주간 리포트</Text>
                    </Body>
                    <Right>
                    </Right>
                </Header>
                <ScrollView style={{ backgroundColor: "#ecf0f1" }}>
                    <View>
                        <View style={{ flex: 1, backgroundColor: "white", marginTop: 30, marginLeft: 10, marginRight: 10 }}>
                            <Text style={{ fontSize: 20, color: "black", marginTop: 15, marginBottom: 10, marginLeft: 10, fontWeight: "bold", textAlign: 'center' }}>2020/06/24 ~ 2020/06/30</Text>
                            <Text style={{ fontSize: 12, color: "grey", marginBottom: 5, marginLeft: 10 }}>당일 기준 1주일간의 탄단지 권장 범위 초과, 미만 리포트를 확인해보세요</Text>
                            <Text style={{ fontSize: 10, color: "#1fa518", marginBottom: 15, marginLeft: 10 }}>*이 데이터는 추천식단에 반영됩니다</Text>
                        </View>
                        <View style={{ flex: 1, backgroundColor: "white", marginTop: 20, marginLeft: 10, marginRight: 10 }}>
                            <Text style={{ fontWeight: 'bold', marginLeft: 13, fontSize: 17, paddingTop: 20, paddingBottom: 5, color: 'black' }}>평균 식사시간</Text>
                            <Text style={{ fontSize: 10, color: "grey", marginBottom: 15, marginLeft: 15 }}>*당일 기준 1주일간의 평균 식사시간도 함께 확인해보세요</Text>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ marginTop: 20, marginBottom: 20, fontWeight: "bold", textAlign: 'center', color: "#1fa518", fontSize: 16 }}>{this.state.minutes}</Text>
                                <Text style={{ marginTop: 20, marginBottom: 20, fontWeight: "bold", textAlign: 'center', fontSize: 16 }}> 분</Text>
                                <Text style={{ marginTop: 20, marginBottom: 20, marginLeft: 5, fontWeight: "bold", textAlign: 'center', color: "#1fa518", fontSize: 16 }}>{this.state.seconds}</Text>
                                <Text style={{ marginTop: 20, marginBottom: 20, fontWeight: "bold", textAlign: 'center', fontSize: 16 }}> 초</Text>
                            </View>
                        </View>
                        <View style={{ flex: 1, backgroundColor: "white", marginTop: 30, marginLeft: 5, marginRight: 5 }}>
                            <Text style={{ fontWeight: 'bold', marginLeft: 13, fontSize: 17, paddingTop: 20, paddingBottom: 5, color: 'black' }}>탄수화물(%)</Text>
                            <View style={{ height: 200, padding: 10, flexDirection: 'row' }}>
                                <YAxis
                                    data={this.state.Car_Data}
                                    style={{ marginBottom: xAxisHeight }}
                                    contentInset={verticalContentInset}
                                    svg={axesSvg}
                                    yAccessor={({ item }) => item.value}
                                />
                                <View style={{ flex: 1, marginLeft: 10 }}>
                                    <AreaChart
                                        start={55}
                                        style={{ flex: 1 }}
                                        data={this.state.Car_Data}
                                        contentInset={verticalContentInset}
                                        curve={shape.curveNatural}
                                        svg={{ fill: 'rgb(255, 110, 110, 0.4)' }}
                                        yAccessor={({ item }) => item.value}
                                        xAccessor={({ item }) => item.date}
                                    >
                                        <Grid />
                                        <Line1 />
                                    </AreaChart>
                                    <XAxis
                                        style={{ marginHorizontal: -10, height: xAxisHeight }}
                                        data={this.state.Car_Data}
                                        formatLabel={(value, index) => value}
                                        contentInset={{ left: 10, right: 10 }}
                                        svg={axesSvg}
                                        xAccessor={({ item }) => item.date}
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={{ flex: 1, backgroundColor: "white", marginTop: 30, marginLeft: 5, marginRight: 5 }}>
                            <Text style={{ fontWeight: 'bold', marginLeft: 13, fontSize: 17, paddingTop: 20, paddingBottom: 5, color: 'black' }}>단백질(%)</Text>
                            <View style={{ height: 200, padding: 10, flexDirection: 'row' }}>
                                <YAxis
                                    data={this.state.Pro_Data}
                                    style={{ marginBottom: xAxisHeight }}
                                    contentInset={verticalContentInset}
                                    svg={axesSvg}
                                    yAccessor={({ item }) => item.value}
                                />
                                <View style={{ flex: 1, marginLeft: 10 }}>
                                    <AreaChart
                                        start={20}
                                        style={{ flex: 1 }}
                                        data={this.state.Pro_Data}
                                        contentInset={verticalContentInset}
                                        curve={shape.curveNatural}
                                        svg={{ fill: 'rgb(10, 110, 255, 0.4)' }}
                                        yAccessor={({ item }) => item.value}
                                        xAccessor={({ item }) => item.date}
                                    >
                                        <Grid />
                                        <Line2 />
                                    </AreaChart>
                                    <XAxis
                                        style={{ marginHorizontal: -10, height: xAxisHeight }}
                                        data={this.state.Pro_Data}
                                        formatLabel={(value, index) => value}
                                        contentInset={{ left: 10, right: 10 }}
                                        svg={axesSvg}
                                        xAccessor={({ item }) => item.date}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={{ flex: 1, backgroundColor: "white", marginTop: 30, marginLeft: 5, marginRight: 5, marginBottom: 10 }}>
                            <Text style={{ fontWeight: 'bold', marginLeft: 13, fontSize: 17, paddingTop: 20, paddingBottom: 5, color: 'black' }}>지방(%)</Text>
                            <View style={{ height: 200, padding: 10, flexDirection: 'row' }}>
                                <YAxis
                                    data={this.state.Fat_Data}
                                    style={{ marginBottom: xAxisHeight }}
                                    contentInset={verticalContentInset}
                                    svg={axesSvg}
                                    yAccessor={({ item }) => item.value}
                                />
                                <View style={{ flex: 1, marginLeft: 10 }}>
                                    <AreaChart
                                        start={15}
                                        style={{ flex: 1 }}
                                        data={this.state.Fat_Data}
                                        contentInset={verticalContentInset}
                                        curve={shape.curveNatural}
                                        svg={{ fill: 'rgb(197, 108, 240, 0.4)' }}
                                        yAccessor={({ item }) => item.value}
                                        xAccessor={({ item }) => item.date}
                                    >
                                        <Grid />
                                        <Line3 />
                                    </AreaChart>
                                    <XAxis
                                        style={{ marginHorizontal: -10, height: xAxisHeight }}
                                        data={this.state.Fat_Data}
                                        formatLabel={(value, index) => value}
                                        contentInset={{ left: 10, right: 10 }}
                                        svg={axesSvg}
                                        xAccessor={({ item }) => item.date}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </Container >
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default Like;