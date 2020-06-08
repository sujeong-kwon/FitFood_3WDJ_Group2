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

const SCREEN_WIDTH = Dimensions.get('window').width;

class CalendarDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
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


