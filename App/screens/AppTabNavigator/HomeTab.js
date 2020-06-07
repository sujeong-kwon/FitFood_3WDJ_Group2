import React from 'react';
import { Button, Dimensions, Platform, StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { Container, Content, Icon, Thumbnail, Header, Left, Right, Body } from 'native-base';
import * as SQLite from 'expo-sqlite';
import firebase from 'firebase';
import { Notifications } from 'expo';
import {
    StackedBarChart, PieChart
} from "react-native-chart-kit";
import { ProgressCircle } from 'react-native-svg-charts'
import Eaten from '../../assets/databases/Eaten';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';

class HomeTab extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            count: null,
            fontsLoaded: false,
            eaten_food: '',
            Carbohydrate: 0,
            Cholesterol: 0,
            Kamium: 0,
            calorie: 0,
            fat: 0,
            name: "제육뚝불",
            price: 0,
            protein: 0,
            salt: 0,
            render: true,
            nut: [[50, 60, 70], [100], [70], [300], [80], [140]],
            nut_2: [[60, 80, 100], [120, 20, 30], [100, 40, 20], [80]],
            kcal: [1000],
            day: {},
            list: null
        }
    };

    async componentDidMount() {
        const { navigation } = this.props;
        // navigation.addListener('didFocus', () => {
        //     this.setState({
        //         nut:[[],[],[],[],[],[]],
        //         nut_2:[[],[],[],[]],
        //         kcal: []
        //     })
        //     var year = 2020;

        //     var date;
        //     var month;

        //     if(new Date().getMonth()+1 < 10) 
        //         month='0' + (new Date().getMonth()+1);
        //     else 
        //         month= new Date().getMonth()+1;


        //     if(new Date().getDate()<10) 
        //         date='0' + (new Date().getDate());
        //     else 
        //         date=new Date().getDate();


        //     const selected_day = ''+year+'-'+month+'-'+date;

        //     const formData = new FormData();
        //     formData.append('user_email','tester@tester.com');
        //     formData.append('date',selected_day);
        //     fetch(`http://ec2-52-72-52-75.compute-1.amazonaws.com/eaten_data`,{
        //         method:'POST',
        //         body:formData
        //     }).then(res=>res.json())
        //     .then(
        //         res=>{
        //             if(res.nutrients_list.length==0) {
        //                 this.setState({
        //                     count:0
        //                 })
        //             } else {
        //                 if(res.user_gender=='M')
        //                 {
        //                     for (let i = 0; i <res.nutrients_list.length; i++){

        //                         if(i==0) {
        //                             this.state.nut[1].push(0);
        //                             this.state.nut[3].push(0);
        //                             this.state.nut[5].push(0); 
        //                             this.state.nut[1].push(0);
        //                             this.state.nut[3].push(0);
        //                             this.state.nut[5].push(0); 
        //                             this.state.nut[1].push(0);
        //                             this.state.nut[3].push(0);
        //                             this.state.nut[5].push(0);

        //                             this.state.nut[1].push(300);
        //                             this.state.nut[3].push(3500);
        //                             this.state.nut[5].push(1500);

        //                             this.state.nut_2[2].push(0);
        //                             this.state.nut_2[2].push(0);
        //                             this.state.nut_2[2].push(0);
        //                             this.state.nut_2[2].push(65);
        //                         }

        //                         this.state.nut[0].push(res.nutrients_list[i][0].nutrient_cholesterol);
        //                         this.state.nut[2].push(res.nutrients_list[i][0].nutrient_kamium);
        //                         this.state.nut[4].push(res.nutrients_list[i][0].nutrient_salt);

        //                         this.state.nut_2[0].push(res.nutrients_list[i][0].nutrient_carbohydrate);
        //                         this.state.nut_2[1].push(res.nutrients_list[i][0].nutrient_protein);
        //                         this.state.nut_2[3].push(res.nutrients_list[i][0].nutrient_fat);

        //                         this.state.kcal.push(res.nutrients_list[i][0].nutrient_carbohydrate*4);
        //                         this.state.kcal.push(res.nutrients_list[i][0].nutrient_fat*9);
        //                         this.state.kcal.push(res.nutrients_list[i][0].nutrient_protein*4);
        //                     }
        //                 } else {
        //                     for (let i = 0; i <res.nutrients_list.length; i++){

        //                         if(i==0) {
        //                             this.state.nut[1].push(300);
        //                             this.state.nut[3].push(3500);
        //                             this.state.nut[5].push(1500);

        //                             this.state.nut_2[2].push(55);
        //                         }

        //                         this.state.nut[0].push(res.nutrients_list[i][0].nutrient_cholesterol);
        //                         this.state.nut[2].push(res.nutrients_list[i][0].nutrient_kamium);
        //                         this.state.nut[4].push(res.nutrients_list[i][0].nutrient_salt);

        //                         this.state.nut_2[0].push(res.nutrients_list[i][0].nutrient_carbohydrate);
        //                         this.state.nut_2[1].push(res.nutrients_list[i][0].nutrient_protein);
        //                         this.state.nut_2[3].push(res.nutrients_list[i][0].nutrient_fat);

        //                         this.state.kcal.push(res.nutrients_list[i][0].nutrient_carbohydrate*4);
        //                         this.state.kcal.push(res.nutrients_list[i][0].nutrient_fat*9);
        //                         this.state.kcal.push(res.nutrients_list[i][0].nutrient_protein*4);
        //                     }

        //                 }
        //                 this.setState({
        //                     count:res.nutrients_list.length
        //                 });
        //             }     
        //         })
        //         .catch(error=>console.error(error)); 
        // });  

        // 이 스크린에 focus 가 맞춰지면 무조건 안의 함수가 실행됨
        navigator.geolocation.getCurrentPosition(position => {
            console.log(position);
        },
            error => {
                this.setState({
                    error: error
                })
            });

    }

    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => (<Icon name='ios-home' style={{ color: tintColor }}></Icon>),
    };

    render() {

        if (this.state.count == 0) {
            return (
                <View style={styles.maincontainer}>
                    <Text style={{ marginTop: 50, marginLeft: 30, fontSize: 35, color: 'white' }}>사진을 찍고 {"\n"}건강한 식사를 {"\n"}시작하세요. </Text>
                    <Image
                        style={{ marginTop: 50, width: 415, height: 300 }}
                        source={require('./main1.png')} />
                </View>
            )
        } else {
            return (
                <Container style={styles.container}>
                    <Header style={{ backgroundColor: "#1fa518" }}>
                        <Body style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 15, color: "white" }}>
                                당일 섭취 영양소</Text>
                        </Body>
                    </Header>
                    <ScrollView style={{ backgroundColor: "#E6E6E6" }}>
                        <View style={{ flex: 1, backgroundColor: "white", marginTop: 20, marginLeft: 5, marginRight: 5 }}>
                            <Text style={{ marginLeft: 13, marginTop: 20, fontWeight: "bold", fontSize: 20, color: "black" }}>
                                영양소
                            </Text>
                            <PieChart
                                data={[
                                    {
                                        name: '탄수화물',
                                        ratio: 215,
                                        color: '#FF6E6E',
                                        legendFontColor: '#7F7F7F',
                                        legendFontSize: 15,
                                    },
                                    {
                                        name: '단백질',
                                        ratio: 280,
                                        color: '#0A6EFF',
                                        legendFontColor: '#7F7F7F',
                                        legendFontSize: 15,
                                    },
                                    {
                                        name: '지방',
                                        ratio: 253,
                                        color: '#FFFA82',
                                        legendFontColor: '#7F7F7F',
                                        legendFontSize: 15,
                                    }
                                ]}
                                width={Dimensions.get('window').width - 16}
                                height={220}
                                chartConfig={{
                                    backgroundColor: '#1cc910',
                                    backgroundGradientFrom: '#eff3ff',
                                    backgroundGradientTo: '#efefef',
                                    decimalPlaces: 2,
                                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                    style: {
                                        borderRadius: 16,
                                    },
                                }}
                                style={{
                                    marginVertical: 8,
                                    borderRadius: 16,
                                }}
                                accessor="ratio"
                                backgroundColor="transparent"
                                paddingLeft="15"
                                absolute //for the absolute number remove if you want percentage
                            />
                            <View style={{ flex: 1, flexDirection: 'row', marginTop: 20, alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ width: 20, height: 20, backgroundColor: "#FA5858" }}>
                                    {/* <Text style={{ fontSize: 13, color: "white", textAlign: "center" }}>
                                    아침</Text> */}
                                </View>
                                <Text style={{ fontSize: 13, color: "black", marginRight: 5 }}>
                                    아침</Text>
                                <View style={{ width: 20, height: 20, backgroundColor: "#FFE146" }}>
                                </View>
                                <Text style={{ fontSize: 13, color: "black", marginRight: 5 }}>
                                    점심</Text>
                                <View style={{ width: 20, height: 20, backgroundColor: "#6DD66D" }}>
                                </View>
                                <Text style={{ fontSize: 13, color: "black", marginRight: 5 }}>
                                    저녁</Text>
                            </View>
                            <StackedBarChart
                                data={{
                                    labels: [
                                        '콜레스테롤',
                                        '권장',
                                        '칼륨',
                                        '권장',
                                        '염분',
                                        '권장'
                                    ],
                                    data: this.state.nut,
                                    barColors: ['#FA5858', '#FFE146', '#6DD66D'],
                                }}
                                width={Dimensions.get('window').width + 130}
                                height={220}
                                chartConfig={{
                                    backgroundColor: 'white',
                                    backgroundGradientFrom: 'white',
                                    backgroundGradientTo: 'white',
                                    decimalPlaces: 2,
                                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                    style: {
                                        borderRadius: 16,
                                    },
                                }}
                                style={{
                                    marginVertical: 8,
                                    borderRadius: 30
                                }}
                            />
                        </View>
                        {/* <View style={{ flex: 1, backgroundColor: "white", marginTop: 40, marginLeft: 5, marginRight: 5, marginBottom: 40 }}>
                            <Text style={{ marginLeft: 13, marginTop: 20, fontWeight: "bold", fontSize: 20, color: "black" }}>
                                칼로리
                        </Text>
                        </View> */}
                        <View style={{ flex: 1, backgroundColor: "white", marginTop: 40, marginLeft: 5, marginRight: 5, marginBottom: 5 }}>
                            <Text style={{ marginLeft: 13, marginTop: 20, fontWeight: "bold", fontSize: 20, color: "black" }}>
                                칼로리
                        </Text>
                            <ProgressCircle
                                style={{ height: 200 }}
                                progress={this.state.kcal.reduce((a, b) => a + b, 0) / 2400}
                                progressColor={'#2E2EFE'}
                                startAngle={-Math.PI * 0.8}
                                endAngle={Math.PI * 0.8}
                            />
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ marginTop: 20, marginBottom: 20, fontWeight: "bold", textAlign: 'center', color: '#2E2EFE' }}>{this.state.kcal.reduce((a, b) => a + b, 0)}</Text>
                                <Text style={{ marginTop: 20, marginBottom: 20, fontWeight: "bold", textAlign: 'center' }}>  / 2000kcal</Text>
                            </View>
                        </View>
                    </ScrollView>
                </Container>
            );
        }
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
        // alignItems: 'center',
        // justifyContent: 'center'
    },
    maincontainer: {
        flex: 1,
        backgroundColor: 'green'
        // alignItems: 'center',
        // justifyContent: 'center'
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10
    },
    chartContainer: {
        height: 400,
        borderColor: "#000",
        borderWidth: 1
    }
})

export default HomeTab;
