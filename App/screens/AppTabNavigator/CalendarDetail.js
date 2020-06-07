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

import { Button } from 'react-native-elements';

import { Container, Header, Body, Right, Left, Content } from 'native-base';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import {
    BarChart,
    LineChart,
    StackedBarChart
} from "react-native-chart-kit";
import firebase from 'firebase';
import Eaten from '../../assets/databases/Eaten';
import * as SQLite from 'expo-sqlite';

const SCREEN_WIDTH = Dimensions.get('window').width;

class CalendarDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tableHead: ['', '음식', '가격', '식사시간'],
            tableTitle: ['아침', '점심', '저녁'],
            tableData: [
                ['씨리얼', '1500원', '17분'],
                ['제육덮밥', '2000원', '15분'],
                ['콩나물국', '100000원', '10분']
            ]
        }
    }

    render() {
        const state = this.state;

        return (
            <Container style={style.container}>
                <Header style={{ backgroundColor: "#1fa518" }}>
                    <Body style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 15, color: "white" }}>
                            캘린더상세</Text>
                    </Body>
                </Header>
                <ScrollView>
                    <View style={style.viewcontainer}>
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

const style = StyleSheet.create({
    container: {
        flex: 1
    },
    viewcontainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});

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

export default CalendarDetail;


