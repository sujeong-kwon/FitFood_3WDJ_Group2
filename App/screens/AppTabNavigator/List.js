import React from 'react';
import {StyleSheet,Text,View, ScrollView, Alert} from 'react-native';
import { Container, Content, Icon , Button} from 'native-base'; //
import { keyframes } from 'styled-components';
import CardView from './CardView';
import {AppLoading} from 'expo';
import Dialog from 'react-native-dialog';
import firebase from 'firebase';
import Store from './Store';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

class List extends React.Component
{

    constructor(props) {
        super(props);
        this.state = {
            recommand_:[],
            loaded:true,
            dialogVisible: false,
            breakfast:null
        };
        this.setInputState = this.setInputState.bind(this);
    }

    componentDidMount() {
    }

    setInputState(event) {
        this.setState({recommand_:event});
    }

    load_list() {
        fetch(`http://ec2-52-72-52-75.compute-1.amazonaws.com/food`,{ method: 'GET'} )
          .then((res) => res.json())
          .then(res => {
              console.log(res);
          })
          .catch((e) => console.log(e))
    }

    showAlert() {
        this.setState({
            dialogVisible: true
        })
    } 

    handleCancel = () => {
      console.log(this.state.breakfast);
      this.setState({ 
          loaded: false,
          dialogVisible: false 
     });
     const rowData = [];
     const formData = new FormData();
     formData.append('food',this.state.breakfast);
     fetch(`http://127.0.0.1:5000/test2`,{ method: 'POST',body:formData} )
       .then((res) => res.json())
       .then(res=> {
           res.map(value => {
               rowData.push([value.lunch,value.dinner,value.lunch_img,value.dinner_img,value.resNum_lunch,value.resNum_dinner]);
             })
           this.setState({
               recommand_:rowData
           })
           this.send_Eaten_Food_to_Server();
       })
       .catch((e) => console.log(e));
    
    };
   
    handleDelete = () => {
      // The user has pressed the "Delete" button, so here you can do your own logic.
      // ...Your logic
      this.setState({ dialogVisible: false });
    };
   

    send_Eaten_Food_to_Server () {
        const formData = new FormData();
        formData.append('user_email',firebase.auth().currentUser.email);
        formData.append('food_name',this.state.breakfast);
        formData.append('store_name',107);
        fetch(`http://ec2-52-72-52-75.compute-1.amazonaws.com/app_eaten`,{ method: 'POST',body:formData} )
          .then((res) => res.text())
          .then(res=> {
              console.log(res);
          })
          .catch((e) => console.log(e));
    }

    render() {
            if (this.state.loaded) {
                return (
                    <View style={style.container}>
                        <Text style={{fontSize:50}} >아침은 드셨나요?</Text>
                        <View style={{ flexDirection:'row'}}>
                            <Button style={style.button}><Text style={style.textO} onPress={this.showAlert.bind(this)}>네</Text></Button>
                            <Dialog.Container visible={this.state.dialogVisible}>
                            <Dialog.Title>무엇을 드셨나요 ?</Dialog.Title>
                            <Dialog.Input onChangeText={(value)=>{
                                this.setState({
                                    breakfast:value
                                })
                            }}/>
                            <Dialog.Button label="입력" onPress={this.handleCancel} />
                            <Dialog.Button label="Cancel" onPress={this.handleDelete} />
                            </Dialog.Container>
                            <Button style={style.button}><Text style={style.textX}>아니오</Text></Button>
                        </View>
                    </View>
                );
            } else {
                return(
                    <View style={style.container}>
                        <Container style={style.container}>
                        <Content>
                            {
                                this.state.recommand_.map( (value,index) => <CardView data={value} key={index}/>)
                            }
                        </Content>
                    </Container>
                    </View>
                );
            }

    }
}

const style = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textO: {
        color: 'blue',
        fontSize: 25,
        textAlign: 'center',
    },    
    textX: {
        color: 'red',
        fontSize: 25,
        textAlign: 'center',
    },
    button: {
        marginTop: 20,
        width: 100,
        height: 50,
        backgroundColor: 'white',
        justifyContent: 'center',
        borderRadius: 30
    }
})

export default List;