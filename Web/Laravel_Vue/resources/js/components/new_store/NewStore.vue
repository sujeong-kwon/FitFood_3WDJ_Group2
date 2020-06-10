<template>
    <v-layout justify-center>
        <v-flex xs12 sm12 md12 class="pa-5">
            <div class="display-1 green--text font-weight-bold" style="margin-bottom:30px; text-align:center;">
                NEW STORE
            </div>
            <v-form @submit.prevent="register">
                <span>
                <v-layout justify-center>
                    <v-flex xs12 sm8 md6>
                        <v-text-field
                            type="input" label="업체명" v-model="store_name" required>
                        </v-text-field>
                        <v-text-field
                            type="input" label="사업번호" v-model="store_issuance_number" required>
                        </v-text-field>
                        <v-text-field
                            type="input" label="전화번호" v-model="tall" required>
                        </v-text-field>
                    </v-flex>  
                </v-layout>

                <v-layout align-center justify-center style="margin-top:25px; margin-bottom:25px;">
                    
                        <v-btn-toggle v-model="store_category">
                            <v-flex xs12 sm12 md6 text-xs-center>
                                <v-btn large class="display-1 green--text font-weight"
                                    depressed text :value="1" 
                                    >
                                    한식
                                </v-btn>
                            </v-flex>

                            <v-flex xs12 sm12 md6 text-xs-center>
                                <v-btn large class="display-1 green--text font-weight"
                                    depressed text :value="2"                                
                                    >
                                    일식
                                </v-btn>
                            </v-flex>

                            <v-flex xs12 sm12 md6 text-xs-center>
                                <v-btn large class="display-1 green--text font-weight"
                                    depressed text :value="3"                              
                                    >
                                    양식
                                </v-btn>
                            </v-flex>

                            <v-flex xs12 sm12 md6 text-xs-center>
                                <v-btn large class="display-1 green--text font-weight"
                                    depressed text :value="4"
                                    >
                                    중식
                                </v-btn>
                            </v-flex>
                        </v-btn-toggle>
                    
                </v-layout>
                
                <v-layout class="mt-4 mb-4" justify-center >
                    <v-flex xs12 sm4 md1>
                         <div class="green--text font-weight-bold">주소</div>
                    </v-flex>
                    <v-flex xs12 sm4 md5>
                        <v-btn color="success" @click="goPopup()">주소 검색
                        </v-btn>
                        <v-btn @click="juso_check()" >확인</v-btn>
                        <v-btn @click="map_check()" >위도확인</v-btn>
                    </v-flex>
                </v-layout>

                <v-layout justify-center style="margin-top:20px;">
                    <v-flex xs12 sm8 md6>
                        <v-text-field
                            id ="roadAddrPart1" v-model="roadAddrPart1" required>
                        </v-text-field>
                        <v-text-field
                            id ="addrDetail" v-model="addrDetail" required>
                        </v-text-field>
                        <v-text-field
                            id ="zipNo" v-model="zipNo" required>
                        </v-text-field>
                        <v-alert dark dense outlined type="warning" color="#F57C00" transition="scale-transition">
                            확인 버튼을 눌러 주세요.
                        </v-alert>
                
                    </v-flex>
                </v-layout>

                <v-layout class="mt-4 mb-4" justify-center >
                    <v-flex xs12 sm8 md6>
                        <v-text-field
                            type="input" label="가게 운영 시간" v-model="storetime" required>
                        </v-text-field>
                        <v-text-field
                            type="input" label="음식 나오는 시간" v-model="storecomeouttime" required>
                        </v-text-field>
                    </v-flex>
                </v-layout>

                <v-layout class="mt-4 mb-4" justify-center >
                    <v-flex xs12 sm4 md1>
                        <div class="green--text font-weight-bold">메뉴</div>
                    </v-flex>
                        <v-flex xs12 sm4 md5>
                        <v-btn color="success"  @click.stop="dialog = true">+ 추가</v-btn>
                         <v-dialog
                        v-model="dialog"
                        max-width="290"
                        >
                        <v-card>
                            <v-card-title class="green--text headline">메뉴 추가</v-card-title>

                            <v-card-text>
                                <label for="file" class="input-plus">사진 추가</label>
                                <!-- <input type="file" id ="file" class="inputfile" @click="upload()"> -->
                                <input type="file" multiple id ="file" class="inputfile" v-on:change="upload">
                                <v-text-field
                                    type="input" label="메뉴 이름" v-model="food_name" required>
                                </v-text-field>
                            </v-card-text>

                            <v-card-actions>
                            <v-spacer></v-spacer>

                            <v-btn
                                color="green darken-1"
                                text
                                @click="dialog = false"
                            >
                                CANCEL
                            </v-btn>

                            <v-btn
                                color="green darken-1"
                                text
                                @click="save_menu"
                            >
                                SAVE
                            </v-btn>
                            </v-card-actions>
                        </v-card>
                        </v-dialog>
                    </v-flex>
                </v-layout>

                <v-layout justify-center>
                    <v-flex xs12 sm8 md6>
                        <v-list >
                            <v-list-item
                                v-for="item in items"
                                :key="item.name">

                                <v-list-item-avatar>
                                <!-- <v-img :src="item.img"></v-img> -->
                                <v-img v-bind:src="item.img"></v-img>
                                </v-list-item-avatar>

                                <v-list-item-content>
                                <v-list-item-title v-text="item.name"></v-list-item-title>
                                </v-list-item-content>

                            </v-list-item>
                        </v-list>
                    </v-flex>
                </v-layout>

                    <v-card-actions>
                        <v-layout row wrap justify-center style="margin-top:30px;">
                            <v-flex xs12 sm8 md6>
                                <v-btn
                                    type="submit"
                                    color="success" large block
                                    class="headline font-weight-bold mt-3">
                                    확인
                                </v-btn>
                            </v-flex>
                        </v-layout>
                    </v-card-actions>

                </span>
            </v-form>
        </v-flex>
    </v-layout>
</template>
<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=451969080561cdf9079bd37cf1e1e7ef"></script>
<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=451969080561cdf9079bd37cf1e1e7ef&libraries=services"></script>

<script>
import axios from 'axios';
// function jusoCallBack(roadFullAddr,zipNo){
//             document.getElementById('roadFullAddr').value = roadFullAddr;
//             document.getElementById('zipNo').value = zipNo;
//     };
export default {
    name: 'Newstore',
    data(){
        return{
            dialog: false,
            store_name:'', //업체명
            store_issuance_number: 0, //사업번호
            tall:'', //전화번호->전화번호 안받음
            store_category:this.store_category, // 가게 타입.
            roadAddrPart1:'', //주소, db에는 store_address로 저장되어야 한다.
            addrDetail:'', //상세주소
            zipNo:'' , //우편번호 -> db에 없음. 빼고 작업
            storetime:'',//가게 운영시간->빼고 작업
            stoestoretimertime:'', // 가게 운영 시간->빼고 작업
            storecomeouttime:'', //음식 나오는 시간->빼고 작업
            imgSrc : '',
            food_name: '',
            // form: {
            //     food_name: "",
            //     //food_image:
            // },
            // items:{
            //     'img' : this.imgSrc,
            //     'name' : this.food_name,
            // } // 사진 추가 리스트
            items: {
                img: '',
                name: '',
            },
        }     
    },
    methods:{
            goPopup(){
                // 주소검색을 수행할 팝업 페이지를 호출합니다.
                // 호출된 페이지(jusopopup.jsp)에서 실제 주소검색URL(http://www.juso.go.kr/addrlink/addrEngUrl.do)를 호출하게 됩니다.
                 var api_key = "devU01TX0FVVEgyMDIwMDYwODIzMjAxMjEwOTg0NTg=";
            var pop = window.open("/jusoPopup_utf8.php","pop","width=570,height=420, scrollbars=yes, resizable=yes"); 
            },
            juso_check(){
                this.roadAddrPart1 = document.getElementById('roadAddrPart1').value
                this.addrDetail = document.getElementById('addrDetail').value
                this.zipNo = document.getElementById('zipNo').value
            },
            map_check(){
                // var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
                // mapOption = {
                //     center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
                //     level: 3 // 지도의 확대 레벨
                // };  

                // 지도를 생성합니다    
                // var map = new kakao.maps.Map(mapContainer, mapOption); 

                // 주소-좌표 변환 객체를 생성합니다
                var geocoder = new kakao.maps.services.Geocoder();

                // 주소로 좌표를 검색합니다
                geocoder.addressSearch(this.roadAddrPart1, function(result, status) {
                    console.log("함수실행");

                    // 정상적으로 검색이 완료됐으면 
                    if (status === kakao.maps.services.Status.OK) {
                        console.log("이프문실행");

                        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                        console.log(coords.Ga);
                        console.log(coords.Ha);
                        // 결과값으로 받은 위치를 마커로 표시합니다
                        // var marker = new kakao.maps.Marker({
                        //     map: map,
                        //     position: coords
                        // });

                        // 인포윈도우로 장소에 대한 설명을 표시합니다
                        // var infowindow = new kakao.maps.InfoWindow({
                        //     content: '<div style="width:150px;text-align:center;padding:6px 0;">우리회사</div>'
                        // });
                        // infowindow.open(map, marker);

                        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                        // map.setCenter(coords);
                } 
            });    
            },
            register(){
                axios.post('/saveStore',
                {
                    store_name: this.store_name,
                    store_address: this.roadFullAddr,
                    store_category: this.store_category,
                    store_issuance_number: this.store_issuance_number,
                    items: this.items,
                })
                .then(res => {
                    console.log(res.data);
                    // window.location.href='/';
                })
                .catch(err => {
                    console.log(err);
                })
                // console.log(this.items);
            },
            upload(e){
                let file = e.target.files;
                let reader = new FileReader();

                reader.readAsDataURL(file[0]);
                reader.onload = e => {
                    // console.log(e.target.result);
                    this.imgSrc = e.target.result;
                }
            },
            // save_menu(){
            //     axios.post('/storeMenu',
            //     {
            //         img : this.imgSrc,
            //         name: this.food_name,
            //     })
            //     .then(res => {
            //         this.items = res.data;
            //         this.dialog = false;
            //         console.log(items);
            //     })
            // }
            save_menu(){
                this.items.name = this.food_name;
                this.items.img = this.imgSrc;
                this.dialog = false;
            }
    }
}
</script>