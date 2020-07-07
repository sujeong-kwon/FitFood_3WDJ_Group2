import React, { Component } from 'react';
import { Button, StyleSheet, Text, View, ScrollView, Dimensions, TextInput, Platform, TouchableOpacity, Image } from 'react-native';
import firebase from 'firebase';
import Dialog from 'react-native-dialog';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import { Container, Content, Icon, Thumbnail, Header, Left, Right, Body, Tab, Tabs, TabHeading, Card, CardItem } from 'native-base';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import {
    LineChart,
    PieChart
} from "react-native-chart-kit";
import Plan from './Plan';
const screenWidth = Dimensions.get("window").width;


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            day: {},
            list: null,
            tableHead: ['', '음식', '칼로리', '가격'],
            tableTitle: ['아침', '점심', '저녁'],
            tableData: [1, 2, 4, 5],
            detailPage: false,
            data1_: [1, 1, 1],
            data2_: [1, 1, 1],
            dialog: false,
            date: new Date(),
            total: null,
            Car_Per: null,
            Pro_Per: null,
            Fat_Per: null,
            Carbohydrate: 0,
            Cholesterol: 0,
            Kamium: 0,
            calorie: 0,
            fat: 0,
            protein: 0,
            salt: 0,
            b: null,
            l: null,
            d: null,
            selected_day: null,
            count: null,
            b_i: null,
            b_n: null,
            b_s: null,

            l_i: null,
            l_n: null,
            l_s: null,

            d_i: null,
            d_n: null,
            d_s: null,
        }
    }

    componentDidMount() {
        var year = 2020;
        var month = new Date().getMonth();
        var day = new Date().getDate();

        const selected_day = '' + year + month + day;
        this.setState({
            selected_day: selected_day
        })
        const { navigation } = this.props;

        navigation.addListener('didFocus', () => {
            firebase.database().ref('eaten/' + selected_day).on('value', (snapshot) => {
                if (snapshot.numChildren() == 9) {
                    this.setState({
                        count: 3
                    })
                } else {
                    this.setState({
                        count: 2
                    })
                }
            });

            this.db_get();
        });
    }

    db_get() {
        var year = 2020;
        var month = new Date().getMonth();
        var day = new Date().getDate();
        const selected_day = '' + year + month + day;
        firebase.database().ref('eaten/' + selected_day).on('value', (snapshot) => {
            this.setState({
                b_i: snapshot.child('breakfast_id').val(),
                b_n: snapshot.child('breakfast_name').val(),
                b_s: snapshot.child('breakfast_image').val(),
                l_i: snapshot.child('lunch_id').val(),
                l_n: snapshot.child('lunch_name').val(),
                l_s: snapshot.child('lunch_image').val(),
                d_i: snapshot.child('dinner_id').val(),
                d_n: snapshot.child('dinner_name').val(),
                d_s: snapshot.child('dinner_image').val()
            })
        });
    }

    get_EatenData(day) {
        this.setState({
            tableData: []
        })
        const data = new FormData();
        data.append('user_email', firebase.auth().currentUser.email);
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
                    let price = 0;
                    for (let i = 0; i < res.nutrients_list.length; i++) {
                        sum_cholesterol += res.nutrients_list[i][0].nutrient_cholesterol;
                        sum_kamium += res.nutrients_list[i][0].nutrient_kamium;
                        sum_salt += res.nutrients_list[i][0].nutrient_salt;

                        sum_carbonhydrate += res.nutrients_list[i][0].nutrient_carbohydrate;
                        sum_protein += res.nutrients_list[i][0].nutrient_protein;
                        sum_fat += res.nutrients_list[i][0].nutrient_fat;
                    }
                    for (let i = 0; i < res.food_list.length; i++) {
                        console.log(res.food_list[i][0].food_price);
                        if (res.food_list[i][0].food_price == undefined) {
                            this.state.tableData.push([
                                res.food_list[i][0].food_name,
                                Math.round(res.nutrients_list[i][0].nutrient_carbohydrate * 4 +
                                    res.nutrients_list[i][0].nutrient_protein * 4 +
                                    res.nutrients_list[i][0].nutrient_fat * 9),
                                0
                            ]);
                        } else {
                            this.state.tableData.push([
                                res.food_list[i][0].food_name,
                                Math.round(res.nutrients_list[i][0].nutrient_carbohydrate * 4 +
                                    res.nutrients_list[i][0].nutrient_protein * 4 +
                                    res.nutrients_list[i][0].nutrient_fat * 9),
                                res.food_list[i][0].food_price
                            ]);
                            price += res.food_list[i][0].food_price;
                        }
                    }

                    this.setState({
                        data1_: [sum_protein, sum_cholesterol, sum_kamium, sum_salt],
                        total: price
                    });
                    if (res.user_gender == 'M') {
                        this.setState({
                            data2_: [65, 300, 3500, 1500]
                        })
                    } else {
                        this.setState({
                            data2_: [55, 300, 3500, 1500],
                        })
                    }
                    price = 0;

                    let Car_Per = Math.round((sum_carbonhydrate / (sum_carbonhydrate + sum_protein + sum_fat)) * 100)
                    let Pro_Per = Math.round((sum_protein / (sum_carbonhydrate + sum_protein + sum_fat)) * 100)
                    let Fat_Per = Math.round((sum_fat / (sum_carbonhydrate + sum_protein + sum_fat)) * 100)

                    this.setState({
                        Carbohydrate: sum_carbonhydrate,
                        protein: sum_protein,
                        fat: sum_fat,
                        Car_Per,
                        Pro_Per,
                        Fat_Per
                    })
                }
            )
            .catch(error => console.error(error))

    }

    handleDelete() {
        this.setState({
            dialog: false,
        })
    }

    render() {

        const { date } = this.state;

        if (!this.state.detailPage) {
            return (
                <Container style={styles.container}>
                    <Header style={{ backgroundColor: "#1fa518" }}>
                        <Body style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ textAlign: 'center', fontSize: 17, color: "white", fontWeight: 'bold' }}>
                                리포트</Text>
                        </Body>
                    </Header>
                    <Tabs tabBarUnderlineStyle={styles.tabBarUnderlineStyle}>
                        <Tab heading={<TabHeading style={{ backgroundColor: 'white' }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>캘린더</Text>
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
                                />
                            </View>
                        </Tab>
                        <Tab heading={<TabHeading style={{ backgroundColor: 'white' }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>오늘의 식단</Text>
                        </TabHeading>}>
                            <Container style={style.container}>
                                <Content>
                                    <View style={{ marginBottom: 10, marginTop: 15, flexDirection: 'row' }}>
                                        <Icon name='ios-heart' style={{ fontSize: 16, color: 'red', paddingLeft: 10, paddingRight: 5 }} ></Icon>
                                        <Text>찜한 오늘의 식단을 확인하세요!</Text>
                                    </View>
                                    <View style={styles.cardview}>
                                        {this.state.count == 3
                                            ? <View style={styles.view}><Text onPress={this.breakfast_get} style={styles.cardtext}>아침</Text><Plan data={[this.state.b_i, this.state.b_n, this.state.b_s]} /></View>
                                            : null}
                                        <View style={styles.view}>
                                            <Text onPress={this.lunch_get} style={styles.cardtext}>점심</Text>
                                            <Plan data={[this.state.l_i, this.state.l_n, this.state.l_s]} />
                                        </View>
                                        <View style={styles.view}>
                                            <Text onPress={this.dinner_get} style={styles.cardtext}>저녁</Text>
                                            <Plan data={[this.state.d_i, this.state.d_n, this.state.d_s]} />
                                        </View>
                                    </View>
                                </Content>
                            </Container>
                        </Tab>
                    </Tabs>
                </Container>
            );
        } else {
            const state = this.state;

            return (
                <Container style={styles.container}>
                    <Header style={{ backgroundColor: "#1fa518" }}>
                        <Left>
                            <Icon name='md-arrow-back' style={{ color: 'white', paddingLeft: 10 }} onPress={() => {
                                this.setState({
                                    detailPage: false
                                })
                            }}></Icon>
                        </Left>
                        <Body style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ textAlign: 'center', fontSize: 17, color: "white", fontWeight: 'bold' }}>
                                섭취 리포트</Text>
                        </Body>
                        <Right>
                        </Right>
                    </Header>
                    <ScrollView style={{ backgroundColor: "#ecf0f1" }}>
                        <View style={styles.viewcontainer}>
                            <Text style={{ fontSize: 20, paddingTop: 30, paddingBottom: 30, textAlign: 'center', color: 'black' }}>{this.state.day.dateString}</Text>
                            <View style={{ flex: 1, backgroundColor: "white", marginTop: 10, marginLeft: 5, marginRight: 5 }}>
                                <Text style={{ fontWeight: 'bold', marginLeft: 13, fontSize: 17, paddingTop: 20, paddingBottom: 5, color: 'black' }}>오늘 섭취 목록</Text>
                                <View style={styles.tablecontainer}>
                                    <Table>
                                        <Row data={state.tableHead} flexArr={[1, 1, 1, 1]} style={styles.head} textStyle={styles.text} />
                                        <TableWrapper style={styles.wrapper}>
                                            <Col data={state.tableTitle} style={styles.title} heightArr={[28, 28]} textStyle={styles.text} />
                                            <Rows data={state.tableData} flexArr={[1, 1, 1]} style={styles.row} textStyle={styles.text} />
                                        </TableWrapper>
                                    </Table>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 16, paddingTop: 10, paddingBottom: 20, paddingLeft: 15 }}>총 식비 : </Text>
                                    <Text style={{ fontSize: 16, paddingTop: 10, paddingBottom: 20, color: 'red' }}>{this.state.total}</Text>
                                    <Text style={{ fontSize: 16, paddingTop: 11, paddingBottom: 20 }}>원</Text>
                                </View>
                            </View>
                            <View style={{ flex: 1, backgroundColor: "white", marginTop: 30, marginLeft: 5, marginRight: 5 }}>
                                <Text style={{ fontWeight: 'bold', marginLeft: 13, fontSize: 17, paddingTop: 20, paddingBottom: 5, color: 'black' }}>영양소 비교 그래프</Text>
                                <View style={{ flex: 1, flexDirection: 'row', marginTop: 20, alignItems: 'center', justifyContent: 'center' }}>
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
                                            '단백질',
                                            '콜레스트롤',
                                            '칼륨',
                                            '염분'
                                        ],
                                        datasets: [
                                            {
                                                data: this.state.data1_,
                                                //strokeWidth: 2,
                                                color: () => '#FF4646'
                                            },
                                            {
                                                data: this.state.data2_,
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
                            <View style={{ flex: 1, backgroundColor: "white", marginTop: 30, marginLeft: 5, marginRight: 5, marginBottom: 10 }}>
                                <Text style={{ fontWeight: 'bold', marginLeft: 13, fontSize: 17, paddingTop: 20, paddingBottom: 10, color: 'black' }}>탄단지 비율 비교 그래프</Text>
                                <Text style={{ fontSize: 13, color: "black", marginRight: 5, marginBottom: 5, textAlign: 'center' }}>
                                    탄단지 비율 비교</Text>
                                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>

                                    <View style={{ width: 20, height: 20, backgroundColor: "#FF6E6E" }}>
                                    </View>
                                    <Text style={{ fontSize: 13, color: "#FF6E6E", marginLeft: 2 }}>
                                        {this.state.Car_Per}</Text>
                                    <Text style={{ fontSize: 13, color: "black", marginRight: 2 }}>
                                        %</Text>
                                    <Text style={{ fontSize: 13, color: "black", marginRight: 2, fontWeight: 'bold' }}>
                                        /</Text>
                                    {this.state.Car_Per > 50
                                        ? <Text style={{ fontSize: 13, color: "red", marginRight: 5 }}>50%</Text>
                                        : <Text style={{ fontSize: 13, color: "black", marginRight: 5 }}>50%</Text>
                                    }
                                    <View style={{ width: 20, height: 20, backgroundColor: "#0A6EFF" }}>
                                    </View>
                                    <Text style={{ fontSize: 13, color: "#0A6EFF", marginLeft: 2 }}>
                                        {this.state.Pro_Per}</Text>
                                    <Text style={{ fontSize: 13, color: "black", marginRight: 2 }}>
                                        %</Text>
                                    <Text style={{ fontSize: 13, color: "black", marginRight: 2, fontWeight: 'bold' }}>
                                        /</Text>
                                    {this.state.Pro_Per > 30
                                        ? <Text style={{ fontSize: 13, color: "red", marginRight: 5 }}>30%</Text>
                                        : <Text style={{ fontSize: 13, color: "black", marginRight: 5 }}>30%</Text>
                                    }
                                    <View style={{ width: 20, height: 20, backgroundColor: "#c56cf0" }}>
                                    </View>
                                    <Text style={{ fontSize: 13, color: "#c56cf0", marginLeft: 2 }}>
                                        {this.state.Fat_Per}</Text>
                                    <Text style={{ fontSize: 13, color: "black", marginRight: 2 }}>
                                        %</Text>
                                    <Text style={{ fontSize: 13, color: "black", marginRight: 2, fontWeight: 'bold' }}>
                                        /</Text>
                                    {this.state.Fat_Per > 20
                                        ? <Text style={{ fontSize: 13, color: "red", marginRight: 5 }}>20%</Text>
                                        : <Text style={{ fontSize: 13, color: "black", marginRight: 5 }}>20%</Text>
                                    }
                                </View>
                                <PieChart
                                    data={[
                                        {
                                            name: '탄수화물',
                                            ratio: Math.round(this.state.Carbohydrate),
                                            color: '#FF6E6E',
                                            legendFontColor: '#7F7F7F',
                                            legendFontSize: 15,
                                        },
                                        {
                                            name: '단백질',
                                            ratio: Math.round(this.state.protein),
                                            color: '#0A6EFF',
                                            legendFontColor: '#7F7F7F',
                                            legendFontSize: 15,
                                        },
                                        {
                                            name: '지방',
                                            ratio: Math.round(this.state.fat),
                                            color: '#c56cf0',
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
                            </View>
                        </View>
                    </ScrollView>
                </Container >
            );
        }

    }
}
const styles = StyleSheet.create({
    container: { flex: 1 },
    head: { height: 40, backgroundColor: '#FFDBC1' },
    wrapper: { flexDirection: 'row' },
    title: { flex: 1, backgroundColor: '#FFF0F0' },
    row: { height: 28 },
    text: { textAlign: 'center' },
    tablecontainer: {
        marginBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 20
    },
    cardview: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
        backgroundColor: '#ecf0f1',
        paddingRight: 20,
        paddingLeft: 20
    },
    cardtext: {
        fontSize: 16
    },
    view: {
        marginBottom: 10
    },
    tabBarUnderlineStyle: {
        backgroundColor: '#1fa518',
        height: 3
    }
});

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1'
    }
});

const main = createStackNavigator({
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