<template>
    <v-layout justify-center>
        <v-flex xs12 sm12 md12 class="pa-5">
            <div class="display-1 green--text font-weight-bold" style="margin-bottom:30px; text-align:center;">
                NEW STORE
            </div>
    
            <v-form>
                <span>
                <v-layout justify-center>
                    <v-flex xs12 sm8 md6>
                        <v-text-field
                            type="input" label="업체명" v-model="storename" required>
                        </v-text-field>
                        <v-text-field
                            type="input" label="사업번호" v-model="businessnumber" required>
                        </v-text-field>
                        <v-text-field
                            type="input" label="전화번호" v-model="tall" required>
                        </v-text-field>
                    </v-flex>  
                </v-layout>

                <v-layout align-center justify-center style="margin-top:25px; margin-bottom:25px;">
                    
                        <v-btn-toggle v-model="footkind">
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
                
                <v-layout justify-center style="margin-top:20px;">
                    <v-flex xs6 sm4 md5>
                        {{roadFullAddr}}
                        {{zipNo}}
                        <label>---------------------------</label>
                        <v-text-field
                            id ="roadFullAddr" required>
                        </v-text-field>
                        <v-text-field
                            id ="zipNo" required>
                        </v-text-field>
                    </v-flex>
                    <v-flex xs6 sm4 md1>
                        <v-btn color="success" @click="goPopup()">주소 검색
                        </v-btn>
                        <v-btn @click="juso_check()">확인</v-btn>
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
                                <v-btn color="success">사진 추가</v-btn>
                                <v-text-field
                                    type="input" label="메뉴 이름" required>
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
                                @click="dialog = false"
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
                                <v-img :src="item.img"></v-img>
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
                                    type="submit" form="check-register-form"
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

<script>
// function jusoCallBack(roadFullAddr,zipNo){
//             document.getElementById('roadFullAddr').value = roadFullAddr;
//             document.getElementById('zipNo').value = zipNo;
//     };
export default {
    name: 'Newstore',
    data(){
        return{
            dialog: false,
            storename:'', //업체명
            businessnumber:'', //사업번호
            tall:'', //전화번호
            footkind:this.footkind, //음식 종류
            roadFullAddr:'', //주소
            zipNo:'' , //우편번호
            storetime:'',//가게 운영시간
            stoestoretimertime:'', // 가게 운영 시간
            storecomeouttime:'', //음식 나오는 시간
            items:[{
               name:'탕수육',
               img:'/static/menus/탕수육.jpg'
            },
            {
                name:'스시',
               img:'/static/menus/탕수육.jpg'
            }] // 사진 추가 리스트
        }     
    },
    methods:{
        //주소 api
    //     jusoCallBack: function(roadFullAddr,zipNo){
    //         document.getElementById('roadFullAddr').value = roadFullAddr;
    //         document.getElementById('zipNo').value = zipNo;
    // },
        goPopup(){
            // 주소검색을 수행할 팝업 페이지를 호출합니다.
            // 호출된 페이지(jusopopup.jsp)에서 실제 주소검색URL(http://www.juso.go.kr/addrlink/addrEngUrl.do)를 호출하게 됩니다.
            var api_key = "devU01TX0FVVEgyMDIwMDYwMjIyNTkzNTEwOTgyNDQ=";
            var pop = window.open("/jusoPopup_utf8.php","pop","width=570,height=420, scrollbars=yes, resizable=yes"); 
    },
    juso_check(){
        this.roadFullAddr = document.getElementById('roadFullAddr').value
        this.zipNo = document.getElementById('zipNo').value
    }
// 주소 api end

    }
}
</script>