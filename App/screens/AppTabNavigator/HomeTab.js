import React from 'react';
import {Button,Dimensions,Platform,StyleSheet,Text,View,Image, ScrollView} from 'react-native';
import {Icon} from 'native-base';
import * as SQLite from 'expo-sqlite';
import firebase from 'firebase';
import {Notifications} from 'expo';
import {
    StackedBarChart
  } from "react-native-chart-kit";
import { ProgressCircle} from 'react-native-svg-charts'
import Eaten from '../../assets/databases/Eaten';

class HomeTab extends React.Component
{

    constructor(props) {
        super(props);
        this.state={
            count:null,
            fontsLoaded: false,
            eaten_food:'',
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
            nut:[[],[],[],[],[],[]],
            nut_2:[[],[],[],[]],
            kcal: []
        }
    };

    async componentDidMount() {
        const { navigation } = this.props;
        navigation.addListener('didFocus', () => {
            this.setState({
                nut:[[],[],[],[],[],[]],
                nut_2:[[],[],[],[]],
                kcal: []
            })
            var year = 2020;

            var date;
            var month;
    
            if(new Date().getMonth()+1 < 10) 
                month='0' + (new Date().getMonth()+1);
            else 
                month= new Date().getMonth()+1;
            
    
            if(new Date().getDate()<10) 
                date='0' + (new Date().getDate());
            else 
                date=new Date().getDate();
            
    
            const selected_day = ''+year+'-'+month+'-'+date;
    
            const formData = new FormData();
            formData.append('user_email',firebase.auth().currentUser.email);
            formData.append('date',selected_day);
            fetch(`http://ec2-52-72-52-75.compute-1.amazonaws.com/eaten_data`,{
                method:'POST',
                body:formData
            }).then(res=>res.json())
            .then(
                res=>{
                    if(res.nutrients_list.length==0) {
                        this.setState({
                            count:0
                        })
                    } else {
                        if(res.user_gender=='M')
                        {
                            for (let i = 0; i <res.nutrients_list.length; i++){
    
                                if(i==0) {
                                    this.state.nut[1].push(0);
                                    this.state.nut[3].push(0);
                                    this.state.nut[5].push(0); 
                                    this.state.nut[1].push(0);
                                    this.state.nut[3].push(0);
                                    this.state.nut[5].push(0); 
                                    this.state.nut[1].push(0);
                                    this.state.nut[3].push(0);
                                    this.state.nut[5].push(0);

                                    this.state.nut[1].push(300);
                                    this.state.nut[3].push(3500);
                                    this.state.nut[5].push(1500);

                                    this.state.nut_2[2].push(0);
                                    this.state.nut_2[2].push(0);
                                    this.state.nut_2[2].push(0);
                                    this.state.nut_2[2].push(65);
                                }
              
                                this.state.nut[0].push(res.nutrients_list[i][0].nutrient_cholesterol);
                                this.state.nut[2].push(res.nutrients_list[i][0].nutrient_kamium);
                                this.state.nut[4].push(res.nutrients_list[i][0].nutrient_salt);
    
                                this.state.nut_2[0].push(res.nutrients_list[i][0].nutrient_carbohydrate);
                                this.state.nut_2[1].push(res.nutrients_list[i][0].nutrient_protein);
                                this.state.nut_2[3].push(res.nutrients_list[i][0].nutrient_fat);
    
                                this.state.kcal.push(res.nutrients_list[i][0].nutrient_carbohydrate*4);
                                this.state.kcal.push(res.nutrients_list[i][0].nutrient_fat*9);
                                this.state.kcal.push(res.nutrients_list[i][0].nutrient_protein*4);
                            }
                        } else {
                            for (let i = 0; i <res.nutrients_list.length; i++){
    
                                if(i==0) {
                                    this.state.nut[1].push(300);
                                    this.state.nut[3].push(3500);
                                    this.state.nut[5].push(1500);
    
                                    this.state.nut_2[2].push(55);
                                }
              
                                this.state.nut[0].push(res.nutrients_list[i][0].nutrient_cholesterol);
                                this.state.nut[2].push(res.nutrients_list[i][0].nutrient_kamium);
                                this.state.nut[4].push(res.nutrients_list[i][0].nutrient_salt);
    
                                this.state.nut_2[0].push(res.nutrients_list[i][0].nutrient_carbohydrate);
                                this.state.nut_2[1].push(res.nutrients_list[i][0].nutrient_protein);
                                this.state.nut_2[3].push(res.nutrients_list[i][0].nutrient_fat);
    
                                this.state.kcal.push(res.nutrients_list[i][0].nutrient_carbohydrate*4);
                                this.state.kcal.push(res.nutrients_list[i][0].nutrient_fat*9);
                                this.state.kcal.push(res.nutrients_list[i][0].nutrient_protein*4);
                            }
    
                        }
                        this.setState({
                            count:res.nutrients_list.length
                        });
                    }     
                })
                .catch(error=>console.error(error)); 
        });  
        
        // 이 스크린에 focus 가 맞춰지면 무조건 안의 함수가 실행됨
        navigator.geolocation.getCurrentPosition(position=>{
            console.log(position);
          },
          error => {
            this.setState({
              error:error
            })
        }); 
        
    }

    static navigationOptions = {
        tabBarIcon: ({tintColor})=>(<Icon name='ios-home' style={{color:tintColor}}></Icon>),
    };

    render() {
        
            if (this.state.count==0) {
                return (
                    <View>
                        <Text style={{ marginLeft:13,fontSize:40}}>사진을 찍고 {"\n"}건강한 식사 시작하세요 </Text>
                        <Image style={{ marginTop:70, width: 415, height: 200}} source={require('./main2_1.png')}></Image>
                        <Image style={{ marginTop:100, width: 415, height: 200}} source={require('./main2_2.png')}></Image>
                    </View>
                )
            } else {
                return(
                    <ScrollView>
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
                            barColors: ['#a4b0be','#1cc910','#eff3ff','#A57064'],
                        }}
                        width={Dimensions.get('window').width+170}
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
                        />
    
                        <StackedBarChart
                        data={{
                            labels: [
                                '탄수화물',
                                '단백질',
                                '권장',
                                '지방',
                                ],
                            data: this.state.nut_2,
                            barColors: ['#f2ccff','#ecb3ff','#e699ff','#A57064'],
                        }}
                        width={Dimensions.get('window').width + 170}
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
                        />
                        <ProgressCircle
                            style={ { height: 200 } }
                            progress={ this.state.kcal.reduce((a,b)=>a+b,0)/2400 }
                            progressColor={'rgb(134, 65, 244)'}
                            startAngle={ -Math.PI * 0.8 }
                            endAngle={ Math.PI * 0.8 }
                        />
                        <Text> 권장 칼로리 : 2000 / 섭취 칼로리 : {this.state.kcal.reduce((a,b)=>a+b,0)}</Text>
                    </ScrollView>
                );
            } 
        } 
    }


const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
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
