// import React from 'react';
// import { StyleSheet, TextInput,Text, View, ScrollView, Alert, Image, TouchableOpacity } from 'react-native';
// import { Container, Content, Icon, Button, Header, Body, Left, Right } from 'native-base'; //
// import { keyframes } from 'styled-components';
// import CardView from './CardView';
// import CardView2 from './CardView2';
// import { AppLoading } from 'expo';
// import Dialog from 'react-native-dialog';
// import firebase from 'firebase';
// import { createAppContainer } from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack';

// class List extends React.Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             recommand_: [],
//             loaded: 0,
//             dialogVisible1: false,
//             dialogVisible2: false,
//             breakfast: null,
//             value: null,
//             check_breakfast: true,
//             lunch: true,
//             dinner: true,
//             eaten_breakfast: false
//         };
//         this.setInputState = this.setInputState.bind(this);
//     }

//     setInputState(event) {
//         this.setState({ recommand_: event });
//     }

//     showAlertYes() {
//         this.setState({
//             dialogVisible1: true,
//         })
//     }

//     showAlertNo() {
//         this.setState({
//             dialogVisible2: true
//         })
//     }

//     componentDidMount() {
//         var year = 2020;
//         var date;
//         var month;
//         if (new Date().getMonth() + 1 < 10)
//             month = '0' + (new Date().getMonth() + 1);
//         else
//             month = new Date().getMonth() + 1;
//         if (new Date().getDate() < 10)
//             date = '0' + (new Date().getDate());
//         else
//             date = new Date().getDate();
//         const selected_day = '' + year + '-' + month + '-' + date;
//         const formData = new FormData();

//         const { navigation } = this.props;        

//         navigation.addListener('didFocus', () => {
//             formData.append('user_email',firebase.auth().currentUser.email);
//             formData.append('date', selected_day);
//             fetch(`http://ec2-52-72-52-75.compute-1.amazonaws.com/eaten_data`, {
//                 method: 'POST',
//                 body: formData
//             }).then(res => res.json()).then(res=>{
//                 if(res.eaten_start_list.length>0) {
//                     this.setState({
//                         eaten_breakfast: true
//                     })
//                 }
//             });
//         })


//     }

//     request_recommend = () => {
//         const formData = new FormData();
//         let kind='';
//         if (this.state.dialogVisible1) {
//             if(!this.state.check_breakfast) {            
//                 const formData_ = new FormData();
//                 formData_.append('user_email', firebase.auth().currentUser.email);
//                 formData_.append('food_name', this.state.breakfast);
//                 // 아침 추가
//                 fetch(`http://ec2-52-72-52-75.compute-1.amazonaws.com/app_eaten`, { method: 'POST', body: formData_ })
//                 .then((res) => res.text())
//                 .then(res => {console.log(res);})
//                 .catch((e) => console.log(e));
//             }

//             // kind 문자열
//             if(this.state.lunch) {
//                 kind=kind+'0,';
//             } else {
//                 kind=kind+'1,';
//             }
//             if(this.state.dinner) {
//                 kind=kind+'0';
//             } else {
//                 kind=kind+'1';
//             }

//             const rowData = [];
//             formData.append('kind',kind);
//             fetch(`http://127.0.0.1:5000/recommend/1`, { method: 'POST', body: formData })
//             .then((res) => res.json())
//             .then(res => {
//                 console.log(res);
//                 res.recommendMeals.map(value => {
//                     const array = [];
//                     for (let index = 0; index < 2; index++) {
//                         if(value[index].store_id=='-1') {
//                             array.push(value[index].id);
//                         } else {
//                             array.push(value[index].store_id);
//                         }
//                         array.push(value[index].image);
//                         array.push(value[index].recommend_name);
//                     }
//                     rowData.push(array);
//                     console.log(rowData);
//                 })
//                 this.setState({
//                     recommand_: rowData,
//                     dialogVisible2: false,
//                     loaded: 1
//                 })
//             })
//             .catch((e) => console.log(e));   
//         } else {
//             if(this.state.check_breakfast) {
//                 kind=kind+'0,';
//             } else {
//                 kind=kind+'1,';
//             }
//             if(this.state.lunch) {
//                 kind=kind+'0,';
//             } else {
//                 kind=kind+'1,';
//             }
//             if(this.state.dinner) {
//                 kind=kind+'0';
//             } else {
//                 kind=kind+'1';
//             }
//             // CardView로 보낼 데이터 배열
//             const rowData = [];

//             formData.append('kind',kind);
//             fetch(`http://127.0.0.1:5000/recommend/1`, { method: 'POST', body: formData })
//             .then((res) => res.json())
//             .then(res => {
//                 res.recommendMeals.map(value => {
//                     const array = [];
//                     for (let index = 0; index < 3; index++) {
//                         if(value[index].store_id=='-1') {
//                             array.push(value[index].id);
//                         } else {
//                             array.push(value[index].store_id);
//                         }
//                         array.push(value[index].image);
//                         array.push(value[index].recommend_name);
//                     }
//                     rowData.push(array);
//                 })
//                 this.setState({
//                     recommand_: rowData,
//                     dialogVisible2: false,
//                     loaded: 2
//                 })
//             })
//             .catch((e) => console.log(e));   
//         }

//     };

//     cancel = () => {
//         // The user has pressed the "Delete" button, so here you can do your own logic.
//         // …Your logic
//         this.setState({ 
//             dialogVisible1: false ,
//             dialogVisible2: false
//         });
//     };


//     send_Eaten_Food_to_Server() {

//     }

//     render() {
//         if (this.state.loaded == 0) {
//             return (
//                 <View style={style.qcontainer}>
//                     <Text style={{ fontSize: 45, color: 'white', paddingTop: 210 }} >아침은 드셨나요?</Text>
//                     <View style={{ flexDirection: 'row' }}>
//                         <Button style={style.button}><Text style={style.textO} onPress={this.showAlertYes.bind(this)}>네</Text></Button>
//                         {/* 네 눌렀을 경우 다이얼로그 */}
//                         <Dialog.Container visible={this.state.dialogVisible1}>
//                             {this.state.eaten_breakfast 
//                             ? null
//                             : <View><Dialog.Title>아침으로 무엇을 드셨나요?</Dialog.Title><Dialog.Input onChangeText={(value) => {this.setState({breakfast: value})}} ></Dialog.Input></View>
//                             }
//                             <View style={{ marginLeft: 10 }}>
//                                 <Text style={{ fontSize: 15, marginBottom: 5 }}>점심은 어떻게 드실건가요?</Text>
//                                 <View style={{ flexDirection: 'row', marginBottom: 10 }}>
//                                     <TouchableOpacity
//                                         style={styles.radioCircle}
//                                         onPress={() => {
//                                             this.setState({
//                                                 lunch: true
//                                             })
//                                         }}>
//                                         {this.state.lunch
//                                             ? <View style={styles.selectedRb} />
//                                             : null}
//                                     </TouchableOpacity>
//                                     <Text style={styles.radioText}>가게</Text>
//                                     <TouchableOpacity
//                                         style={styles.radioCircle}
//                                         onPress={() => {
//                                             this.setState({
//                                                 lunch: false
//                                             })
//                                         }}>
//                                         {this.state.lunch
//                                             ? null
//                                             : <View style={styles.selectedRb} />}
//                                     </TouchableOpacity>
//                                     <Text style={styles.radioText}>레시피</Text>
//                                 </View>
//                                 <Text style={{ fontSize: 15, marginBottom: 5, marginTop: 10 }}>저녁은 어떻게 드실건가요?</Text>
//                                 <View style={{ flexDirection: 'row', marginBottom: 5 }}>
//                                     <TouchableOpacity
//                                         style={styles.radioCircle}
//                                         onPress={() => {
//                                             this.setState({
//                                                 dinner: true
//                                             })
//                                         }}>
//                                         {this.state.dinner
//                                             ? <View style={styles.selectedRb} />
//                                             : null}
//                                     </TouchableOpacity>
//                                     <Text style={styles.radioText}>가게</Text>
//                                     <TouchableOpacity
//                                         style={styles.radioCircle}
//                                         onPress={() => {
//                                             this.setState({
//                                                 dinner: false
//                                             })
//                                         }}>
//                                         {this.state.dinner
//                                             ? null
//                                             : <View style={styles.selectedRb} />}
//                                     </TouchableOpacity>
//                                     <Text style={styles.radioText}>레시피</Text>
//                                 </View>
//                             </View>
//                             <Dialog.Button label="확인" onPress={this.request_recommend} />
//                             <Dialog.Button label="취소" onPress={this.cancel} />
//                         </Dialog.Container>
//                         <Button style={style.button}><Text style={style.textX} onPress={this.showAlertNo.bind(this)}>아니오</Text></Button>
//                         <Dialog.Container visible={this.state.dialogVisible2}>
//                             <View style={{ marginLeft: 10 }}>
//                                 <Text style={{ fontWeight: "700", fontSize: 15, marginBottom: 5 }}>아침</Text>
//                                 <View style={{ flexDirection: 'row', marginBottom: 10 }}>
//                                     <TouchableOpacity
//                                         style={styles.radioCircle}
//                                         onPress={() => {
//                                             this.setState({
//                                                 check_breakfast: true
//                                             })
//                                         }}>
//                                         {this.state.check_breakfast
//                                             ? <View style={styles.selectedRb} />
//                                             : null }
//                                     </TouchableOpacity>
//                                     <Text style={styles.radioText}>가게</Text>
//                                     <TouchableOpacity
//                                         style={styles.radioCircle}
//                                         onPress={() => {
//                                             this.setState({
//                                                 check_breakfast: false
//                                             })
//                                         }}>
//                                         {this.state.check_breakfast
//                                             ? null
//                                             : <View style={styles.selectedRb} />}
//                                     </TouchableOpacity>
//                                     <Text style={styles.radioText}>레시피</Text>
//                                 </View>
//                                 <Text style={{ fontWeight: "700", fontSize: 15, marginBottom: 5 }}>점심</Text>
//                                 <View style={{ flexDirection: 'row', marginBottom: 10 }}>
//                                     <TouchableOpacity
//                                         style={styles.radioCircle}
//                                         onPress={() => {
//                                             this.setState({
//                                                 lunch: true
//                                             })
//                                         }}>
//                                         {this.state.lunch
//                                             ? <View style={styles.selectedRb} />
//                                             : null }
//                                     </TouchableOpacity>
//                                     <Text style={styles.radioText}>가게</Text>
//                                     <TouchableOpacity
//                                         style={styles.radioCircle}
//                                         onPress={() => {
//                                             this.setState({
//                                                 lunch: false
//                                             })
//                                         }}>
//                                         {this.state.lunch
//                                             ? null
//                                             : <View style={styles.selectedRb} />}
//                                     </TouchableOpacity>
//                                     <Text style={styles.radioText}>레시피</Text>
//                                 </View>
//                                 <Text style={{ fontWeight: "700", fontSize: 15, marginBottom: 5 }}>저녁</Text>
//                                 <View style={{ flexDirection: 'row', marginBottom: 5 }}>
//                                     <TouchableOpacity
//                                         style={styles.radioCircle}
//                                         onPress={() => {
//                                             this.setState({
//                                                 dinner: true
//                                             })
//                                         }}>
//                                         {this.state.dinner
//                                             ? <View style={styles.selectedRb} />
//                                             : null }
//                                     </TouchableOpacity>
//                                     <Text style={styles.radioText}>가게</Text>
//                                     <TouchableOpacity
//                                         style={styles.radioCircle}
//                                         onPress={() => {
//                                             this.setState({
//                                                 dinner: false
//                                             })
//                                         }}>
//                                         {this.state.dinner
//                                             ? null
//                                             : <View style={styles.selectedRb} />}
//                                     </TouchableOpacity>
//                                     <Text style={styles.radioText}>레시피</Text>
//                                 </View>
//                             </View>
//                             <Dialog.Button label="확인" onPress={this.request_recommend} />
//                             <Dialog.Button label="취소" onPress={this.cancel} />
//                         </Dialog.Container>
//                     </View>
//                     <View style={{ paddingTop: 20, paddingRight: 150 }}>
//                         <Image
//                             style={{ width: 250, height: 250 }}
//                             source={require('./list.png')} />
//                     </View>
//                 </View>
//             );
//         } else if (this.state.loaded == 1) {
//             return (
//                 <View style={style.container}>
//                     <Container style={style.container}>
//                         <Header style={{ backgroundColor: "#1fa518" }}>
//                             <Body style={{ justifyContent: 'center', alignItems: 'center' }}>
//                                 <Text style={{ fontSize: 17, color: "white", fontWeight: 'bold' }}>
//                                     추천식단
//                                 </Text>
//                             </Body>
//                         </Header>
//                         <Content style={{ backgroundColor: 'white' }}>
//                             <Text style={{ fontSize: 20, color: "black", marginTop: 15, marginBottom: 3, marginLeft: 10, fontWeight: "bold" }}>오늘의 추천식단</Text>
//                             <Text style={{ color: "grey", marginBottom: 15, marginLeft: 10 }}>균형잡힌 영양소를 기반으로 한 맞춤 식단을 확인해보세요</Text>
//                             {
//                                 this.state.recommand_.map((value, index) => <CardView data={value} key={index} />)
//                             }
//                         </Content>
//                     </Container>
//                 </View>
//             );
//         } else {
//             return (
//                 <View style={style.container}>
//                     <Container style={style.container}>
//                         <Header style={{ backgroundColor: "#1fa518" }}>
//                             <Body style={{ justifyContent: 'center', alignItems: 'center' }}>
//                                 <Text style={{ fontSize: 17, color: "white", fontWeight: 'bold' }}>
//                                     추천식단
//                                 </Text>
//                             </Body>
//                         </Header>
//                         <Content style={{ backgroundColor: 'white' }}>
//                             <Text style={{ fontSize: 20, color: "black", marginTop: 15, marginBottom: 3, marginLeft: 10, fontWeight: "bold" }}>오늘의 추천식단</Text>
//                             <Text style={{ color: "grey", marginBottom: 15, marginLeft: 10 }}>균형잡힌 영양소를 기반으로 한 맞춤 식단을 확인해보세요</Text>
//                             {
//                                 this.state.recommand_.map((value, index) => <CardView2 data={value} key={index}></CardView2>)
//                             }
//                         </Content>
//                     </Container>
//                 </View>
//             )
//         }

//     }
// }

// const style = StyleSheet.create({
//     container: {
//         flex: 1,
//         // alignItems: 'center',
//         // justifyContent: 'center'
//     },
//     qcontainer: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: "#1fa518"
//     },
//     textO: {
//         color: 'white',
//         fontSize: 20,
//         textAlign: 'center',
//     },
//     textX: {
//         color: 'white',
//         fontSize: 20,
//         textAlign: 'center',
//     },
//     button: {
//         marginTop: 20,
//         marginLeft: 3,
//         marginRight: 3,
//         width: 100,
//         height: 50,
//         backgroundColor: '#F57C00',
//         justifyContent: 'center',
//         borderRadius: 30
//     },
//     food: {
//         marginTop: 20,
//         height: 200,
//         backgroundColor: '#F57C00'
//     }
// });

// const styles = StyleSheet.create({
//     radioText: {
//         marginRight: 10,
//         marginLeft: 3,
//         fontSize: 14,
//         color: '#000',
//         //fontWeight: '700'
//     },
//     radioCircle: {
//         height: 17,
//         width: 17,
//         borderRadius: 100,
//         borderWidth: 2,
//         borderColor: '#1fa518',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     selectedRb: {
//         width: 7,
//         height: 7,
//         borderRadius: 50,
//         backgroundColor: '#1fa518',
//     }
// });

// export default List;
import React from 'react';
import { StyleSheet, TextInput, Text, View, ScrollView, Alert, Image, TouchableOpacity } from 'react-native';
import { Container, Content, Icon, Button, Header, Body, Left, Right } from 'native-base'; //
import { keyframes } from 'styled-components';
import CardView from './CardView';
import CardView2 from './CardView2';
import { AppLoading } from 'expo';
import Dialog from 'react-native-dialog';
import firebase from 'firebase';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
//import { DialogTitle } from 'react-native-paper/lib/typescript/src/components/Dialog/DialogTitle';

class List extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            recommand_: [],
            loaded: 0,
            dialogVisible1: false,
            dialogVisible2: false,
            breakfast: null,
            value: null,
            check_breakfast: true,
            lunch: true,
            dinner: true,
            eaten_breakfast: false
        };
        this.setInputState = this.setInputState.bind(this);
    }

    setInputState(event) {
        this.setState({ recommand_: event });
    }

    showAlertYes() {
        this.setState({
            dialogVisible1: true,
        })
    }

    showAlertNo() {
        this.setState({
            dialogVisible2: true
        })
    }

    componentDidMount() {
        var year = 2020;
        var date;
        var month;
        if (new Date().getMonth() + 1 < 10)
            month = '0' + (new Date().getMonth() + 1);
        else
            month = new Date().getMonth() + 1;
        if (new Date().getDate() < 10)
            date = '0' + (new Date().getDate());
        else
            date = new Date().getDate();
        const selected_day = '' + year + '-' + month + '-' + date;
        const formData = new FormData();

        const { navigation } = this.props;

        navigation.addListener('didFocus', () => {
            formData.append('user_email', firebase.auth().currentUser.email);
            formData.append('date', selected_day);
            fetch(`http://ec2-52-72-52-75.compute-1.amazonaws.com/eaten_data`, {
                method: 'POST',
                body: formData
            }).then(res => res.json()).then(res => {
                if (res.eaten_start_list.length > 0) {
                    this.setState({
                        eaten_breakfast: true
                    })
                }
            });
        })


    }

    request_recommend = () => {
        const formData = new FormData();
        let kind = '';
        if (this.state.dialogVisible1) {
            if (!this.state.check_breakfast) {
                const formData_ = new FormData();
                formData_.append('user_email', firebase.auth().currentUser.email);
                formData_.append('food_name', this.state.breakfast);
                // 아침 추가
                fetch(`http://ec2-52-72-52-75.compute-1.amazonaws.com/app_eaten`, { method: 'POST', body: formData_ })
                    .then((res) => res.text())
                    .then(res => { console.log(res); })
                    .catch((e) => console.log(e));
            }

            // kind 문자열
            if (this.state.lunch) {
                kind = kind + '0,';
            } else {
                kind = kind + '1,';
            }
            if (this.state.dinner) {
                kind = kind + '0';
            } else {
                kind = kind + '1';
            }

            const rowData = [];
            formData.append('kind', kind);
            fetch(`http://34.64.243.44:5000/recommend/1`, { method: 'POST', body: formData })
                .then((res) => res.json())
                .then(res => {
                    res.recommendMeals.map(value => {
                        const array = [];
                        for (let index = 0; index < 2; index++) {
                            if (value[index].store_id == '-1') {
                                array.push(value[index].id);
                            } else {
                                array.push(value[index].store_id);
                            }
                            array.push(value[index].image);
                            array.push(value[index].recommend_name);
                        }
                        rowData.push(array);
                    })
                    this.setState({
                        recommand_: rowData,
                        dialogVisible2: false,
                        loaded: 1
                    })
                })
                .catch((e) => console.log(e));
        } else {
            if (this.state.check_breakfast) {
                kind = kind + '0,';
            } else {
                kind = kind + '1,';
            }
            if (this.state.lunch) {
                kind = kind + '0,';
            } else {
                kind = kind + '1,';
            }
            if (this.state.dinner) {
                kind = kind + '0';
            } else {
                kind = kind + '1';
            }
            // CardView로 보낼 데이터 배열
            const rowData = [];

            formData.append('kind', kind);
            fetch(`http://34.64.243.44:5000/recommend/1`, { method: 'POST', body: formData })
                .then((res) => res.json())
                .then(res => {
                    res.recommendMeals.map(value => {
                        const array = [];
                        for (let index = 0; index < 3; index++) {
                            if (value[index].store_id == '-1') {
                                array.push(value[index].id);
                            } else {
                                array.push(value[index].store_id);
                            }
                            array.push(value[index].image);
                            array.push(value[index].recommend_name);
                        }
                        rowData.push(array);
                    })
                    this.setState({
                        recommand_: rowData,
                        dialogVisible2: false,
                        loaded: 2
                    })
                })
                .catch((e) => console.log(e));
        }

    };

    cancel = () => {
        // The user has pressed the "Delete" button, so here you can do your own logic.
        // …Your logic
        this.setState({
            dialogVisible1: false,
            dialogVisible2: false
        });
    };


    send_Eaten_Food_to_Server() {

    }

    render() {
        if (this.state.loaded == 0) {
            return (
                <View style={style.qcontainer}>
                    <Text style={{ fontSize: 45, color: 'white', paddingTop: 210 }} >아침은 드셨나요?</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Button style={style.button}><Text style={style.textO} onPress={this.showAlertYes.bind(this)}>네</Text></Button>
                        {/* 네 눌렀을 경우 다이얼로그 */}
                        <Dialog.Container visible={this.state.dialogVisible1}>
                            {this.state.eaten_breakfast
                                ? null
                                : <View><Dialog.Title>아침으로 무엇을 드셨나요?</Dialog.Title><Dialog.Input onChangeText={(value) => { this.setState({ breakfast: value }) }} ></Dialog.Input></View>
                            }
                            <View style={{ marginLeft: 10 }}>
                                <Text style={{ fontSize: 15, marginBottom: 5 }}>점심은 어떻게 드실건가요?</Text>
                                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                    <TouchableOpacity
                                        style={styles.radioCircle}
                                        onPress={() => {
                                            this.setState({
                                                lunch: true
                                            })
                                        }}>
                                        {this.state.lunch
                                            ? <View style={styles.selectedRb} />
                                            : null}
                                    </TouchableOpacity>
                                    <Text style={styles.radioText}>가게</Text>
                                    <TouchableOpacity
                                        style={styles.radioCircle}
                                        onPress={() => {
                                            this.setState({
                                                lunch: false
                                            })
                                        }}>
                                        {this.state.lunch
                                            ? null
                                            : <View style={styles.selectedRb} />}
                                    </TouchableOpacity>
                                    <Text style={styles.radioText}>레시피</Text>
                                </View>
                                <Text style={{ fontSize: 15, marginBottom: 5, marginTop: 10 }}>저녁은 어떻게 드실건가요?</Text>
                                <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                                    <TouchableOpacity
                                        style={styles.radioCircle}
                                        onPress={() => {
                                            this.setState({
                                                dinner: true
                                            })
                                        }}>
                                        {this.state.dinner
                                            ? <View style={styles.selectedRb} />
                                            : null}
                                    </TouchableOpacity>
                                    <Text style={styles.radioText}>가게</Text>
                                    <TouchableOpacity
                                        style={styles.radioCircle}
                                        onPress={() => {
                                            this.setState({
                                                dinner: false
                                            })
                                        }}>
                                        {this.state.dinner
                                            ? null
                                            : <View style={styles.selectedRb} />}
                                    </TouchableOpacity>
                                    <Text style={styles.radioText}>레시피</Text>
                                </View>
                            </View>
                            <Dialog.Button label="확인" onPress={this.request_recommend} style={{ color: 'black' }} />
                            <Dialog.Button label="취소" onPress={this.cancel} style={{ color: 'black' }} />
                        </Dialog.Container>
                        <Button style={style.button}><Text style={style.textX} onPress={this.showAlertNo.bind(this)}>아니오</Text></Button>
                        <Dialog.Container visible={this.state.dialogVisible2}>
                            <View style={{ marginLeft: 10 }}>
                                <Text style={{ fontSize: 15, marginBottom: 5, marginTop: 10 }}>아침은 어떻게 드실건가요?</Text>
                                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                    <TouchableOpacity
                                        style={styles.radioCircle}
                                        onPress={() => {
                                            this.setState({
                                                check_breakfast: true
                                            })
                                        }}>
                                        {this.state.check_breakfast
                                            ? <View style={styles.selectedRb} />
                                            : null}
                                    </TouchableOpacity>
                                    <Text style={styles.radioText}>가게</Text>
                                    <TouchableOpacity
                                        style={styles.radioCircle}
                                        onPress={() => {
                                            this.setState({
                                                check_breakfast: false
                                            })
                                        }}>
                                        {this.state.check_breakfast
                                            ? null
                                            : <View style={styles.selectedRb} />}
                                    </TouchableOpacity>
                                    <Text style={styles.radioText}>레시피</Text>
                                </View>
                                <Text style={{ fontSize: 15, marginBottom: 5, marginTop: 10 }}>점심은 어떻게 드실건가요?</Text>
                                <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                                    <TouchableOpacity
                                        style={styles.radioCircle}
                                        onPress={() => {
                                            this.setState({
                                                lunch: true
                                            })
                                        }}>
                                        {this.state.lunch
                                            ? <View style={styles.selectedRb} />
                                            : null}
                                    </TouchableOpacity>
                                    <Text style={styles.radioText}>가게</Text>
                                    <TouchableOpacity
                                        style={styles.radioCircle}
                                        onPress={() => {
                                            this.setState({
                                                lunch: false
                                            })
                                        }}>
                                        {this.state.lunch
                                            ? null
                                            : <View style={styles.selectedRb} />}
                                    </TouchableOpacity>
                                    <Text style={styles.radioText}>레시피</Text>
                                </View>
                                <Text style={{ fontSize: 15, marginBottom: 5, marginTop: 10 }}>저녁은 어떻게 드실건가요?</Text>
                                <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                                    <TouchableOpacity
                                        style={styles.radioCircle}
                                        onPress={() => {
                                            this.setState({
                                                dinner: true
                                            })
                                        }}>
                                        {this.state.dinner
                                            ? <View style={styles.selectedRb} />
                                            : null}
                                    </TouchableOpacity>
                                    <Text style={styles.radioText}>가게</Text>
                                    <TouchableOpacity
                                        style={styles.radioCircle}
                                        onPress={() => {
                                            this.setState({
                                                dinner: false
                                            })
                                        }}>
                                        {this.state.dinner
                                            ? null
                                            : <View style={styles.selectedRb} />}
                                    </TouchableOpacity>
                                    <Text style={styles.radioText}>레시피</Text>
                                </View>
                            </View>
                            <Dialog.Button label="확인" onPress={this.request_recommend} style={{ color: 'black' }} />
                            <Dialog.Button label="취소" onPress={this.cancel} style={{ color: 'black' }} />
                        </Dialog.Container>
                    </View>
                    <View style={{ paddingTop: 20, paddingRight: 150 }}>
                        <Image
                            style={{ width: 250, height: 250 }}
                            source={require('./list.png')} />
                    </View>
                </View>
            );
        } else if (this.state.loaded == 1) {
            return (
                <View style={style.container}>
                    <Container style={style.container}>
                        <Header style={{ backgroundColor: "#1fa518" }}>
                            <Body style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 17, color: "white", fontWeight: 'bold' }}>
                                    추천식단
                                </Text>
                            </Body>
                        </Header>
                        <Content style={{ backgroundColor: 'white' }}>
                            <Text style={{ fontSize: 20, color: "black", marginTop: 15, marginBottom: 3, marginLeft: 10, fontWeight: "bold" }}>오늘의 추천식단</Text>
                            <Text style={{ color: "grey", marginBottom: 15, marginLeft: 10 }}>균형잡힌 영양소를 기반으로 한 맞춤 식단을 확인해보세요</Text>
                            {
                                this.state.recommand_.map((value, index) => <CardView data={value} key={index} />)
                            }
                        </Content>
                    </Container>
                </View>
            );
        } else {
            return (
                <View style={style.container}>
                    <Container style={style.container}>
                        <Header style={{ backgroundColor: "#1fa518" }}>
                            <Body style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 17, color: "white", fontWeight: 'bold' }}>
                                    추천식단
                                </Text>
                            </Body>
                        </Header>
                        <Content style={{ backgroundColor: 'white' }}>
                            <Text style={{ fontSize: 20, color: "black", marginTop: 15, marginBottom: 3, marginLeft: 10, fontWeight: "bold" }}>오늘의 추천식단</Text>
                            <Text style={{ color: "grey", marginBottom: 15, marginLeft: 10 }}>균형잡힌 영양소를 기반으로 한 맞춤 식단을 확인해보세요</Text>
                            {
                                this.state.recommand_.map((value, index) => <CardView2 data={value} key={index}></CardView2>)
                            }
                        </Content>
                    </Container>
                </View>
            )
        }

    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center'
    },
    qcontainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#1fa518"
    },
    textO: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
    },
    textX: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
    },
    button: {
        marginTop: 20,
        marginLeft: 3,
        marginRight: 3,
        width: 100,
        height: 50,
        backgroundColor: '#F57C00',
        justifyContent: 'center',
        borderRadius: 30
    },
    food: {
        marginTop: 20,
        height: 200,
        backgroundColor: '#F57C00'
    }
});

const styles = StyleSheet.create({
    radioText: {
        marginRight: 10,
        marginLeft: 3,
        fontSize: 14,
        color: '#000',
        //fontWeight: '700'
    },
    radioCircle: {
        height: 17,
        width: 17,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: '#1fa518',
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedRb: {
        width: 7,
        height: 7,
        borderRadius: 50,
        backgroundColor: '#1fa518',
    }
});

export default List;