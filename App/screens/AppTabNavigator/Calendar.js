// import React from 'react';
// import {Button, StyleSheet,Text,View,ScrollView,Dimensions} from 'react-native';
// import firebase from 'firebase';
// import Eaten from '../../assets/databases/Eaten';
// import * as SQLite from 'expo-sqlite';
// import Dialog from 'react-native-dialog';
// import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
// import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';

// import {
//     BarChart,
//     LineChart,
//     StackedBarChart
//   } from "react-native-chart-kit";

// const screenWidth = Dimensions.get("window").width;


// const db = SQLite.openDatabase('database.db');

// class Calendars extends React.Component
// {
//     constructor(props) {
//         super(props);
//         this.state={
//             day:{},
//             list:null,
//             tableHead: ['음식', '칼로리', '가격','식사 시간'],
//             tableData: [],
//             dialogVisible: false,
//             data1:[1,1,1],
//             data2:[1,1,1],
//             data1_:[1,1,1],
//             data2_:[1,1,1]
//         }
//     }
//     handleCancel = () => {

//     };

//       handleDelete = () => {
//         // The user has pressed the "Delete" button, so here you can do your own logic.
//         // ...Your logic
//         this.setState({ dialogVisible: false });
//       };

//     componentDidMount() {

//     }

//     get_EatenData(day) {
//         this.setState({
//             tableData:[]
//         })
//         const email = firebase.auth().currentUser.email;
//         var year = 2020;
//         const rowData=[];
//         // var date;
//         // var month;

//         // if(new Date().getMonth()+1 < 10) 
//         //     month='0' + (new Date().getMonth()+1);
//         // else 
//         //     month= new Date().getMonth()+1;


//         // if(new Date().getDate()<10) 
//         //     date='0' + (new Date().getDate());
//         // else 
//         //     date=new Date().getDate();


//         // const selected_day = ''+year+'-'+month+'-'+date;


//         const data = new FormData();
//         data.append('user_email','email');
//         data.append('date',day.dateString);
//         fetch('http://ec2-52-72-52-75.compute-1.amazonaws.com/eaten_data',
//         { method: 'POST',body:data}
//         )
//         .then((res)=>res.json())
//         .then(
//             res=>{
//                 var sum_cholesterol = 0;
//                 var sum_kamium = 0;
//                 var sum_salt = 0;

//                 var sum_carbonhydrate = 0;
//                 var sum_protein =0;
//                 var sum_fat =0;

//                 for(let i=0;i<res.nutrients_list.length;i++) {
//                     sum_cholesterol+=res.nutrients_list[i][0].nutrient_cholesterol;
//                     sum_kamium+=res.nutrients_list[i][0].nutrient_kamium;
//                     sum_salt+=res.nutrients_list[i][0].nutrient_salt;

//                     sum_carbonhydrate+=res.nutrients_list[i][0].nutrient_carbohydrate;
//                     sum_protein+=res.nutrients_list[i][0].nutrient_protein;
//                     sum_fat+=res.nutrients_list[i][0].nutrient_fat;
//                 }                
//                 for(let i=0; i<res.food_list.length; i++) {
//                     this.state.tableData.push([
//                         res.food_list[i][0].food_name,
//                         res.nutrients_list[i][0].nutrient_carbohydrate*4+
//                         res.nutrients_list[i][0].nutrient_protein*4+
//                         res.nutrients_list[i][0].nutrient_fat*9,

//                         res.food_list[i][0].food_price,
//                         'food_id : '+res.food_list[i][0].food_id
//                     ])
//                 }

//                 this.setState({
//                     data1: [sum_cholesterol,sum_kamium, sum_salt],
//                     data2: [sum_carbonhydrate,sum_protein,sum_fat]
//                 });
//                 if(res.user_gender=='M') {
//                     this.setState({
//                         data1_:[300,3500,1500],
//                         data2_:[0,65,0]
//                     })
//                 } else {
//                     this.setState({
//                         data1_:[300,3500,1500],
//                         data2_:[0,55,0]
//                     })
//                 }


//             }
//         )
//         .catch(error=>console.error(error))

//     }

//     render() {
//         const state = this.state;
//         const chartConfig = {
//             backgroundGradientFrom: "#1E2923",
//             backgroundGradientFromOpacity: 0,
//             backgroundGradientTo: "#08130D",
//             backgroundGradientToOpacity: 0.1,
//             color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//             strokeWidth: 2, // optional, default 3
//             barPercentage: 0.5,
//             useShadowColorFromDataset: true, // optional
//           };
//           const data1 = { 
//               datasets: [ 
//                   { 
//                       data: this.state.data1, 
//                       color: () => '#3129FF',
//                     }, 
//                     { 
//                         data: this.state.data1_, 
//                         color: () => '#ED7C33' 
//                     } 
//                 ],
//                 labels:['콜레스테롤','칼륨','염분']
//             };
//             const data2 = { 
//                 datasets: [ 
//                     { 
//                         data: this.state.data2, 
//                         color: () => '#3129FF',
//                       }, 
//                       { 
//                           data: this.state.data2_, 
//                           color: () => '#ED7C33' 
//                       } 
//                   ],
//                   labels:['탄수화물','단백질','지방']
//               };
//         return(
//             <View>
//                 <Calendar
//                 // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
//                 minDate={'2012-05-10'}
//                 // Handler which gets executed on day press. Default = undefined
//                 onDayPress={(day) => {
//                     this.setState({
//                         day,
//                         dialogVisible:true
//                     })
//                     this.get_EatenData(day);
//                 }}
//                 // Handler which gets executed on day long press. Default = undefined
//                 onDayLongPress={(day) => {
//                     this.setState({
//                         day
//                     });
//                 }}
//                 // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
//                 monthFormat={'yyyy MM'}
//                 // Handler which gets executed when visible month changes in calendar. Default = undefined
//                 onMonthChange={(month) => {console.log('month changed', month)}}
//                 // Hide month navigation arrows. Default = false
//                 // hideArrows={true}
//                 // Replace default arrows with custom ones (direction can be 'left' or 'right')
//                 // renderArrow={(direction) => (<Arrow/>)}
//                 // Do not show days of other months in month page. Default = false
//                 hideExtraDays={true}
//                 // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
//                 // day from another month that is visible in calendar page. Default = false
//                 disableMonthChange={false}
//                 // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
//                 firstDay={1}
//                 // Hide day names. Default = false
//                 // hideDayNames={true}
//                 // Show week numbers to the left. Default = false
//                 showWeekNumbers={true}
//                 // Handler which gets executed when press arrow icon left. It receive a callback can go back month
//                 onPressArrowLeft={substractMonth => substractMonth()}
//                 // Handler which gets executed when press arrow icon right. It receive a callback can go next month
//                 onPressArrowRight={addMonth => addMonth()}
//                 // Disable left arrow. Default = false
//                 disableArrowLeft={true}
//                 // Disable right arrow. Default = false
//                 disableArrowRight={true}
//                 />
//                 <Dialog.Container visible={this.state.dialogVisible}>
//                     <ScrollView>
//                     <Dialog.Title>{this.state.day ? String(this.state.day.dateString) : null}</Dialog.Title>
//                     <Table borderStyle={{borderWidth: 1}}>
//                         <Row data={state.tableHead} flexArr={[2, 1, 1,2]} style={styles.head} textStyle={styles.text}/>
//                         <TableWrapper style={styles.wrapper}>
//                             <Col data={state.tableTitle} style={styles.title} heightArr={[28,28]} textStyle={styles.text}/>
//                             <Rows data={state.tableData} flexArr={[2, 1, 1,2]} style={styles.row} textStyle={styles.text}/>
//                         </TableWrapper>
//                     </Table>
//                     <Dialog.Description>
//                     <LineChart       
//                         withHorizontalLabels={true}
//                         data={data1}
//                         width={300}
//                         height={256}
//                         verticalLabelRotation={30}
//                         chartConfig={chartConfig}
//                         bezier
//                     />
//                     <LineChart       
//                         withHorizontalLabels={true}
//                         data={data2}
//                         width={300}
//                         height={256}
//                         verticalLabelRotation={30}
//                         chartConfig={chartConfig}
//                         bezier
//                     />
//                     </Dialog.Description>
//                         <Text>파랑 : 실제 섭취량 / 빨강 : 권장 섭취량</Text>
//                     </ScrollView>


//                     <View style={{justifyContent:'center',flexDirection:'row'}}>
//                         <Dialog.Button style={{textAlign:'center',height:30}} label="공유" onPress={this.handleCancel} />
//                         <Dialog.Button style={{textAlign:'center',height:30}} label="Cancel" onPress={this.handleDelete} />
//                     </View>
//                 </Dialog.Container>
//                 <Button title='주간 계획 설정하기'>

//                 </Button>
//             </View>
//         );
//     }
// }
// const styles = StyleSheet.create({
//     container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
//     head: {  height: 40,  backgroundColor: '#f1f8ff'  },
//     wrapper: { flexDirection: 'row' },
//     title: { flex: 1, backgroundColor: '#f6f8fa' },
//     row: {  height: 28  },
//     text: { textAlign: 'center' }
//   });
// export default Calendars;

import React from 'react';
import { Button, StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import firebase from 'firebase';
import Eaten from '../../assets/databases/Eaten';
import * as SQLite from 'expo-sqlite';
import Dialog from 'react-native-dialog';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import { Container, Content, Icon, Thumbnail, Header, Left, Right, Body, Tab, Tabs, TabHeading } from 'native-base';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import CalendarDetail from './CalendarDetail';

import {
    BarChart,
    LineChart,
    StackedBarChart
} from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;


const db = SQLite.openDatabase('database.db');

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            day: {},
            list: null,
            tableHead: ['', '음식', '가격', '식사 시간'],
            tableTitle: ['아침', '점심', '저녁'],
            tableData: [1, 2, 4, 5],
            detailPage: false,
            data1: [1, 1, 1],
            data2: [1, 1, 1],
            data1_: [1, 1, 1],
            data2_: [1, 1, 1],            
        }
    }

    componentDidMount() {

    }

    get_EatenData(day) {
        this.setState({
            tableData: []
        })
        const data = new FormData();
        data.append('user_email',firebase.auth().currentUser.email);
        data.append('date', day.dateString);
        fetch('http://ec2-52-72-52-75.compute-1.amazonaws.com/eaten_data',
            { method: 'POST', body: data }
        )
            .then((res) => res.json())
            .then(
                res => {
                    var sum_cholesterol = 0;
                    var sum_kamium = 0;
                    var sum_salt = 0;

                    var sum_carbonhydrate = 0;
                    var sum_protein = 0;
                    var sum_fat = 0;

                    for (let i = 0; i < res.nutrients_list.length; i++) {
                        sum_cholesterol += res.nutrients_list[i][0].nutrient_cholesterol;
                        sum_kamium += res.nutrients_list[i][0].nutrient_kamium;
                        sum_salt += res.nutrients_list[i][0].nutrient_salt;

                        sum_carbonhydrate += res.nutrients_list[i][0].nutrient_carbohydrate;
                        sum_protein += res.nutrients_list[i][0].nutrient_protein;
                        sum_fat += res.nutrients_list[i][0].nutrient_fat;
                    }
                    for (let i = 0; i < res.food_list.length; i++) {
                        this.state.tableData.push([
                            res.food_list[i][0].food_name,
                            res.nutrients_list[i][0].nutrient_carbohydrate * 4 +
                            res.nutrients_list[i][0].nutrient_protein * 4 +
                            res.nutrients_list[i][0].nutrient_fat * 9,

                            res.food_list[i][0].food_price,
                            'food_id : ' + res.food_list[i][0].food_id
                        ])
                    }

                    this.setState({
                        data1: [sum_cholesterol, sum_kamium, sum_salt],
                        data2: [sum_carbonhydrate, sum_protein, sum_fat]
                    });
                    if (res.user_gender == 'M') {
                        this.setState({
                            data1_: [300, 3500, 1500],
                            data2_: [0, 65, 0]
                        })
                    } else {
                        this.setState({
                            data1_: [300, 3500, 1500],
                            data2_: [0, 55, 0],

                        })
                    }
                }
            )
            .catch(error => console.error(error))

    }

    render() {
        if(!this.state.detailPage) {
            return (
                <Container style={styles.container}>
                    <Header style={{ backgroundColor: "#1fa518" }}>
                        <Body style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 15, color: "white" }}>
                                리포트</Text>
                        </Body>
                    </Header>
                    <Tabs>
                        <Tab heading={<TabHeading style={{ backgroundColor: '#1fa518' }}>
                            <Text style={{ color: '#ffffff' }}>캘린더</Text>
                        </TabHeading>} >
                            <View style={{ marginTop: 80 }}>
                                <Calendar
                                    // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                                    minDate={'2012-05-10'}
                                    // Handler which gets executed on day press. Default = undefined
                                    onDayPress={(day) => {
                                        this.get_EatenData(day);
                                        this.setState({
                                            day,
                                            detailPage: true
                                            // dialogVisible: true
                                        })
                                    }}
                                    // Handler which gets executed on day long press. Default = undefined
                                    onDayLongPress={(day) => {
                                        this.setState({
                                            day
                                        });
                                    }}
                                    // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                                    monthFormat={'yyyy MM'}
                                    // Handler which gets executed when visible month changes in calendar. Default = undefined
                                    onMonthChange={(month) => { console.log('month changed', month) }}
                                    // Hide month navigation arrows. Default = false
                                    // hideArrows={true}
                                    // Replace default arrows with custom ones (direction can be 'left' or 'right')
                                    // renderArrow={(direction) => (<Arrow/>)}
                                    // Do not show days of other months in month page. Default = false
                                    hideExtraDays={true}
                                    // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
                                    // day from another month that is visible in calendar page. Default = false
                                    disableMonthChange={false}
                                    // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                                    firstDay={1}
                                    // Hide day names. Default = false
                                    // hideDayNames={true}
                                    // Show week numbers to the left. Default = false
                                    showWeekNumbers={true}
                                    // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                                    onPressArrowLeft={substractMonth => substractMonth()}
                                    // Handler which gets executed when press arrow icon right. It receive a callback can go next month
                                    onPressArrowRight={addMonth => addMonth()}
                                    // Disable left arrow. Default = false
                                    disableArrowLeft={true}
                                    // Disable right arrow. Default = false
                                    disableArrowRight={true}
                                />
                            </View>
                        </Tab>
                        <Tab heading={<TabHeading style={{ backgroundColor: '#1fa518' }}>
                            <Text style={{ color: '#ffffff' }}>주간 계획 설정</Text>
                        </TabHeading>}>
                            <Text>주간 계획 설정 탭</Text>
                        </Tab>
                    </Tabs>
                </Container>
            );
        } else {
            const state = this.state;

            return (
                <Container style={styles.container}>
                    <Header style={{ backgroundColor: "#1fa518" }}>
                        <Body style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 15, color: "white" }}>
                                캘린더상세</Text>
                        </Body>
                    </Header>
                    <ScrollView>
                        <View style={styles.viewcontainer}>
                            <Text style={{ fontSize: 20, paddingTop: 30, paddingBottom: 30 }}>2020/06/05</Text>
                            <View style={styles.tablecontainer}>
                                <Table>
                                    <Row data={state.tableHead} flexArr={[1, 2, 1, 1]} style={styles.head} textStyle={styles.text} />
                                    <TableWrapper style={styles.wrapper}>
                                        <Col data={state.tableTitle} style={styles.title} heightArr={[28, 28]} textStyle={styles.text} />
                                        <Rows data={state.tableData} flexArr={[2, 1, 1]} style={styles.row} textStyle={styles.text} />
                                    </TableWrapper>
                                </Table>
                            </View>
                            <Text style={{ fontSize: 16, paddingTop: 10, paddingBottom: 20, paddingRight: 250 }}>총 식비 : 30000원</Text>
                            <View style={{ flex: 1, flexDirection: 'row', marginTop: 10, alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ width: 20, height: 20, backgroundColor: "#FF4646", marginLeft: 15 }}>
                                </View>
                                <Text style={{ fontSize: 13, color: "black", marginRight: 5 }}>
                                    실제섭취량</Text>
                                <View style={{ width: 20, height: 20, backgroundColor: "#1478CD" }}>
                                </View>
                                <Text style={{ fontSize: 13, color: "black", marginRight: 5 }}>
                                    권장섭취량</Text>
                            </View>
                            <LineChart
                                data={{
                                    labels: [
                                        '칼로리',
                                        '탄수화물',
                                        '단백질',
                                        '지방',
                                        '콜레스트롤',
                                        '칼륨',
                                        '염분'
                                    ],
                                    datasets: [
                                        {
                                            data: [20, 45, 28, 80, 99, 43, 40],
                                            //strokeWidth: 2,
                                            color: () => '#FF4646'
                                        },
                                        {
                                            data: [25, 35, 38, 40, 59, 63, 30],
                                            color: () => '#1478CD'
                                        }
                                    ],
                                }}
                                width={Dimensions.get('window').width - 16} // from react-native
                                height={220}
                                //yAxisLabel={'Rs'}
                                chartConfig={{
                                    backgroundGradientFrom: "#1E2923",
                                    backgroundGradientFromOpacity: 0,
                                    backgroundGradientTo: "#08130D",
                                    backgroundGradientToOpacity: 0.1,
                                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                    strokeWidth: 2, // optional, default 3
                                    barPercentage: 0.5,
                                    useShadowColorFromDataset: true, // optional
                                }}
                                bezier
                                style={{
                                    marginVertical: 8,
                                    borderRadius: 16,
                                }}
                            />
                        </View>
                    </ScrollView>
                </Container >
            );
        }
        
    }
}
const styles = StyleSheet.create({
    container: { flex: 1, },
    head: { height: 40, backgroundColor: '#FFDBC1' },
    wrapper: { flexDirection: 'row' },
    title: { flex: 1, backgroundColor: '#FFF0F0' },
    row: { height: 28 },
    text: { textAlign: 'center' },
    tablecontainer: {
        height: 50,
        width: 400,
        marginBottom: 90,
        paddingLeft: 10,
        paddingRight: 10

    }
});

const main = createStackNavigator({
    //이동할 페이지들 리스트 
    CalendarDetail: { screen: CalendarDetail },
    Calendar: {
        screen: App, navigationOptions: ({ navigation }) => ({
            header: null
        })
    },
}, {
    headerMode: "none",
    initialRouteName: 'Calendar',
    navigationOptions: ({
        headerVisible: false
    })
},
);

export default createAppContainer(main);