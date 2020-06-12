import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card, CardItem, Icon } from 'native-base';

export default class Plan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dialog: false,
    }
  }

  handleDelete() {
    this.setState({
      dialog: false,
    })
  }

  render() {

    return (
      <Card style={styles.card}>
        <Text style={styles.daytext}>
          2020/06/10
        </Text>
        <CardItem style={styles.carditem}>
          <Text style={styles.itemtext} >아침</Text>
          <Text style={styles.foodtext} >시리얼</Text>
        </CardItem>
        <CardItem style={styles.carditem}>
          <Text style={styles.itemtext}>점심</Text>
          <Text style={styles.foodtext} >김치찌개</Text>
        </CardItem>
        <CardItem style={styles.carditem}>
          <Text style={styles.itemtext}>저녁</Text>
          <Text style={styles.foodtext} >닭가슴살</Text>
        </CardItem>
      </Card>
    )
  }
}

const styles = StyleSheet.create({
  daytext: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: 350,
    backgroundColor: '#e77f67'
  },
  carditem: {
    backgroundColor: '#F8EFBA'
  },
  itemtext: {
    color: 'grey',
    fontWeight: 'bold',
    fontSize: 16,
    paddingLeft: 20
  },
  foodtext: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
    paddingLeft: 80
  },
});