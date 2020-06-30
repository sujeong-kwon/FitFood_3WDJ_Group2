<template>
    <v-layout justify-center>
        <v-flex xs12 sm12 md12 class="pa-5">
            <div class="display-1 green--text font-weight-bold" style="font-family : 'MapoPeacefull'; margin-bottom:30px; text-align:center;">
                NEW STORE
            </div>
            <v-form @submit.prevent="register">
                <span>
                <v-layout justify-center style="font-family : 'MapoPeacefull';">
                    <v-flex xs12 sm8 md6>
                        <v-text-field 
                            type="input" label="업체명" v-model="store_name" required>
                        </v-text-field>
                        <v-text-field
                            type="input" label="사업번호" v-model="store_issuance_number" required>
                        </v-text-field>
                        
                    </v-flex>  
                </v-layout>

                <v-layout align-center justify-center style="margin-top:25px; margin-bottom:50px; font-family : 'MapoPeacefull';">
                    
                        <v-btn-toggle v-model="store_category" style="font-family : 'MapoPeacefull';">
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
                
                <v-layout class="mt-4 mb-4" justify-center style="margin-top:25px; font-family : 'MapoPeacefull';">
                    <v-flex xs12 sm4 md1>
                         <div class="green--text font-weight-bold">주소</div>
                    </v-flex>
                    <v-flex xs12 sm4 md5>
                        <v-btn color="success" @click="goPopup()">주소 검색
                        </v-btn>
                        <v-btn @click="juso_check()" >확인</v-btn>
                        <!-- <v-btn @click="map_check()" >위도확인</v-btn> -->
                    </v-flex>
                </v-layout>

                <v-layout justify-center style="margin-top:20px; font-family : 'MapoPeacefull';">
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

                <v-layout class="mt-4 mb-4" justify-center style="font-family : 'MapoPeacefull';">
                    <v-flex xs12 sm8 md6>
                        <v-text-field
                            type="input" label="가게 운영 시간" v-model="storetime" required>
                        </v-text-field>
                        <v-text-field
                            type="input" label="음식 나오는 시간" v-model="storecomeouttime" required>
                        </v-text-field>
                    </v-flex>
                </v-layout>

                <v-layout class="mt-4 mb-4" style="font-family : 'MapoPeacefull';" justify-center>
                    <v-flex xs12 sm4 md1>
                        <div class="green--text font-weight-bold">메뉴</div>
                    </v-flex>
                    <v-flex xs12 sm4 md5>
                    <v-btn color="success" @click.stop="dialog = true">+ 추가</v-btn>



                        <v-dialog
                        v-model="dialog"
                        max-width="290"
                        style="font-family : 'MapoPeacefull';"
                        >
                        <v-card>
                            <v-card-title class="green--text" style="font-family : 'MapoPeacefull';">메뉴 추가</v-card-title>

                            <v-card-text>
                                <label for="file" class="input-plus" style="font-family : 'MapoPeacefull';">사진 추가</label>
                               <input id = "upload-file" type = "file" multiple class = "form-control" @change="fieldChange">
                                <v-text-field style="font-family : 'MapoPeacefull';"
                                    id = "img-name" type="input" label="메뉴 이름" v-model="food_name" required>
                                </v-text-field>
                            </v-card-text>

                            <v-card-actions>
                            <v-spacer></v-spacer>

                            <v-btn
                                color="green darken-1"
                                style="font-family : 'MapoPeacefull';"
                                text
                                @click="dialog = false"
                            >
                                CANCEL
                            </v-btn>
                            <v-btn
                                color="green darken-1"
                                style="font-family : 'MapoPeacefull';"
                                text
                                @click="uploadFile"
                            >
                                SAVE
                            </v-btn>
                            </v-card-actions>
                        </v-card>
                        </v-dialog>
                    </v-flex>
                </v-layout>

                <v-layout justify-center style="font-family : 'MapoPeacefull';">
                    <v-flex xs12 sm8 md6>
                        <!-- <v-list >
                            <v-list-item
                                v-for="item in attachments"
                                :key="item.name">

                                <v-list-item-avatar>
                                <v-img v-if="imageUrl" :src="imageUrl"></v-img>
                                </v-list-item-avatar>

                                <v-list-item-content>
                                <v-list-item-title v-text="item.name"></v-list-item-title>
                                </v-list-item-content>

                            </v-list-item>
                        </v-list> -->


                        <!-- <v-img v-if="i_url" :src="i_url"></v-img>
                        <v-text v-text="food_name"></v-text> -->
                    </v-flex>
                </v-layout>

                 <v-list style="margin-top:10px; margin-left:23%; font-family : 'MapoPeacefull';">
                        <v-list-item>


                            <v-list-item-avatar>
                            <v-img  v-if="i_url" :src="i_url"></v-img>
                            </v-list-item-avatar>

                            <v-list-item-content>
                            <v-list-item-title style="font-family : 'MapoPeacefull';" v-text="food_name" ></v-list-item-title>
                            </v-list-item-content>

                        </v-list-item>
                    </v-list>


                    <v-card-actions>
                        <v-layout row wrap justify-center style="margin-top:30px; font-family : 'MapoPeacefull';">
                            <v-flex xs12 sm8 md6>
                                <v-btn
                                    type="submit"
                                    color="success" large block
                                    style="font-family : 'MapoPeacefull';">
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
export default {
    name: 'Newstore',
    data(){
        return{
            dialog: false,
            store_name:'', //업체명
            store_issuance_number: 0, //사업번호
            
            store_category:this.store_category, // 가게 타입.
            roadAddrPart1:'', //주소, db에는 store_address로 저장되어야 한다.
            addrDetail:'', //상세주소
            zipNo:'' , //우편번호 -> db에 없음. 빼고 작업
            storetime:'',//가게 운영시간->빼고 작업
            stoestoretimertime:'', // 가게 운영 시간->빼고 작업
            storecomeouttime:'', //음식 나오는 시간->빼고 작업
            // imgs: [],   // 현재 선택된 이미지배열
            attachments:[], // 이미지배열
            form: new FormData,
            menuInfo: [], // 이미지, 이름 모두 들어간 배열
            food_name: '',
            items: [],
            store_gps_latitude: '',
            store_gps_longitude: '',
            arrIndex: 0,
            select_file: [],
            menuImgs : {},
            created_store_id : 0,
            imageUrl: null, // 임시
            i_url: null,
            imageArr: [],
            img_menu: [],
             items: [
          { title: 'Travis Howard', avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
          { title: 'Ali Connors', avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
          { title: 'Cindy Baker', avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
        ],
        }     
    },
    methods:{
            goPopup(){
                 var api_key = "devU01TX0FVVEgyMDIwMDYwODIzMjAxMjEwOTg0NTg=";
            var pop = window.open("/jusoPopup_utf8.php","pop","width=570,height=420, scrollbars=yes, resizable=yes"); 
            },
            juso_check(){
                this.roadAddrPart1 = document.getElementById('roadAddrPart1').value
                this.addrDetail = document.getElementById('addrDetail').value
                this.zipNo = document.getElementById('zipNo').value
                var geocoder = new kakao.maps.services.Geocoder();
                geocoder.addressSearch(this.roadAddrPart1, (result, status) => {
                    console.log("함수실행");
                    if (status === kakao.maps.services.Status.OK) {
                        console.log("이프문실행");
                        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                        console.log(coords.Ga);
                        console.log(coords.Ha);

                        var Ga = coords.Ga;
                        var Ha = coords.Ha;

                        this.store_gps_latitude = String(Ga);
                        this.store_gps_longitude = String(Ha);

                        console.log(this.store_gps_latitude);
                } 
            });    
            },
            // map_check(){
            //     var geocoder = new kakao.maps.services.Geocoder();
            //     geocoder.addressSearch(this.roadAddrPart1, (result, status) => {
            //         console.log("함수실행");
            //         if (status === kakao.maps.services.Status.OK) {
            //             console.log("이프문실행");
            //             var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
            //             console.log(coords.Ga);
            //             console.log(coords.Ha);
            //             this.store_gps_latitude = coords.Ga;
            //             this.store_gps_longitude = coords.Ha;
            //             console.log(this.store_gps_latitude);
            //     } 
            // });    
            // },
            register(){
                axios.post('/saveStore',
                {
                    store_name: this.store_name,
                    store_address: this.roadAddrPart1,
                    store_category: this.store_category,
                    store_issuance_number: this.store_issuance_number,
                    food_name: this.food_name,
                    store_gps_latitude: this.store_gps_latitude,
                    store_gps_longitude: this.store_gps_longitude
                })
                .then(res => {  // 마지막 테이블의 store_id를 반환받은 상태
                    console.log(res.data);
                    this.created_store_id = res.data;   // 마지막 열 store_id
                })
                .catch(err => {
                    console.log(err);
                })
                console.log(this.menuImgs)
                var sendData = new FormData();
                var menus = ''
                for(var key in this.menuImgs) { // menuIngs내용물 만큼 반복
                    var index = 0
                    menus += key + ','
                    this.menuImgs[key].forEach(img => {
                        console.log(String(key)+String(index))
                        sendData.append(String(key)+String(index), img)
                        index += 1;
                    });
                    sendData.append(String(key)+'size', index)
                }
                sendData.append('menus',menus);
                sendData.append('store_id', this.created_store_id);
                console.log(sendData)   // confirmed
                const config = { headers: { 'Content-Type' : 'multipart/form-data' } };
                axios.post('http://127.0.0.1:5000/send', sendData, config)
                    .then(response=> {
                        console.log(response);
                        document.getElementById('upload-file').value=[];    //초기화
                        document.getElementById('img-name').value='';
                        this.attachments = [];
                        this.food_name = '';
                        console.log(this.menuInfo);
                        console.log(this.attachments);
                        window.location.href='/#/income';
                    })
                    .catch(response=> {
                    });
            },
            fieldChange(e){
                let selectedFiles = e.target.files; // 선택된 파일

                if(!selectedFiles.length){
                    return false;
                }
                for(let i = 0; i<selectedFiles.length; i++){ // 선택된 파일 갯수만큼 반복
                    this.select_file.push(selectedFiles[i]);
                    this.imageUrl = URL.createObjectURL(selectedFiles[i]); // 선택된 파일 url변환
                    this.imageArr.push(this.imageUrl);   // url로 변환된 이미지 주소가 담긴 배열 생성
                }
                console.log(this.imageArr);
            },
            uploadFile(){
                this.dialog = false;
                var name = this.food_name;
                this.menuImgs[name] = new Array();
                this.img_menu[name] = new Array();
                this.i_url = this.imageUrl;

                for(let i = 0; i<this.select_file.length; i++){ // 선택된 파일 갯수만큼 반복
                    this.attachments.push(name, this.select_file[i]);
                    this.menuImgs[name].push(this.select_file[i]);
                    this.img_menu.push(name, this.imageUrl);
                }
                console.log(this.img_menu);
                console.log(this.menuImgs);
                document.getElementById('upload-file').value=[];    //초기화
                document.getElementById('img-name').value='';
                this.attachments = [];
                // this.food_name = ''; 오류 발생시 주석 해제
                this.select_file = [];
                console.log(this.menuImgs);
                console.log(this.attachments);
            },
    }
}
</script>

<style scoped>
@font-face { font-family: 'MapoPeacefull'; src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/MapoPeacefullA.woff') format('woff'); font-weight: normal; font-style: normal; }
</style>