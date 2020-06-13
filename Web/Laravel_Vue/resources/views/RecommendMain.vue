<template>
    <v-container>
        <v-layout>
            <v-flex>
                <div class="display-1 green--text font-weight-bold" style="text-align:center;">RECOMMEND</div>

                <div style="margin-top: 50px; text-align:center;" v-if="check">
                    <!-- <v-btn  class="green--text font-weight-bold" style="margin-right: 40px" router :to="{name:'Recommend'}">식단 추천</v-btn>
                    <v-btn  class="green--text font-weight-bold" router :to="{name:'FootRecommend'}">레시피 추천</v-btn> -->
                    <!-- <v-btn class="green--text font-weight-bold" router :to="{name:'ReviewTest'}">테스트</v-btn> -->
                    <div v-if="breakfast_check">
                        <div class="font-weight-bold"><strong class="success--text"> 아침 </strong> 식사하셨습니까?</div>
                        <v-btn text class="green--text font-weight-bold" style="margin-right: 40px; margin-top:20px;" @click="breakfast_yes()">네</v-btn>
                        <v-btn text class="green--text font-weight-bold" style="margin-top:20px;" @click="breakfast_no()">아니요</v-btn>
                    </div>

                    <div v-else>
                        <div class="font-weight-bold"><strong class="success--text"> 점심 </strong> 식사하셨습니까?</div>
                        <v-btn text class="green--text font-weight-bold" style="margin-right: 40px; margin-top:20px;" @click="lunch_yes()">네</v-btn>
                        <v-btn text class="green--text font-weight-bold" style="margin-top:20px;" @click="lunch_no()">아니요</v-btn>
                    </div>
                </div>

                <!-- <Recommend /> -->
                <div v-else>
                    <v-layout justify-center style="margin-top: 50px;">
                        <v-flex xs12 sm10 md6 class="pa-5" v-show="value==3">           
                            <div class="green--text font-weight-bold" style="text-align:center;">아침</div>
                            <v-layout justify-center>
                                <v-radio-group row v-model="break_mealkind" class="justify-center" v-on:change="break_radio_change()">
                                    <v-radio label="식당"  color="success" value="0" ></v-radio>
                                    <v-radio label="레시피"  color="success" value="1"></v-radio>
                                </v-radio-group>
                            </v-layout>
                            <div v-if="break_mealkind == 0" class="d-flex flex-wrap" xs1 sm3 md6 style="justify-content:center; margin-top:30px;">   
                            <v-layout>
                                <v-flex xs3 sm3 md12>
                                    <v-card class="d-flex flex-wrap" style="margin-top:30px;" >                   
                                        <v-card v-for="(recommend,i) in recommends" v-bind:key="`${i}-${recommend.store_id}`"
                                            style="margin-top: 80px; height: 300px; width:400px; margin-right:25px; margin-left:25px;">
                                            <router-link rounded :to="{ name: 'Detailed',params : {id: recommend.store_id}}">
                                            <v-img height="300px" :src="recommend.store_image"></v-img>
                                            </router-link>
                                            <v-card-text class="display-1 black--text font-weight-bold" style="text-align:center;">{{recommend.store_name}}</v-card-text>
                                        </v-card>
                                    </v-card>
                                </v-flex>
                            </v-layout>
                        </div>

                        <div v-else class="d-flex flex-wrap" xs1 sm3 md6 style="justify-content:center; margin-top:30px;">   
                            <h1>아침 레시피 수정중</h1>
                        </div>
                        </v-flex>

                        <v-flex xs12 sm10 md6 justify-center class="pa-5" v-show="value==3||value==2">
                            <div class="green--text font-weight-bold" style="text-align:center;">점심</div>
                            <v-layout justify-center>
                                <v-radio-group row v-model="lunch_mealkind" class="justify-center" v-on:change="lunch_radio_change()">
                                    <v-radio label="식당"  color="success" value="0"  ></v-radio>
                                    <v-radio label="레시피"  color="success" value="1"></v-radio>
                                </v-radio-group>
                            </v-layout>

                            <div v-if="lunch_mealkind ==0" class="d-flex flex-wrap" xs1 sm3 md6 style="justify-content:center; margin-top:30px;">                   
                            <v-layout>
                                <v-flex xs3 sm10 md12>
                                    <v-card class="d-flex flex-wrap" style="margin-top:30px;">                   
                                        <v-card v-for="(recommend,i) in recommends" v-bind:key="`${i}-${recommend.store_id}`"
                                            style="margin-top: 80px; height: 300px; width:400px; margin-right:25px; margin-left:25px;">
                                            <router-link rounded :to="{ name: 'Detailed',params : {id: recommend.store_id}}">
                                            <v-img height="300px" :src="recommend.store_image"></v-img>
                                            </router-link>
                                            <v-card-text class="display-1 black--text font-weight-bold" style="text-align:center;">{{recommend.store_name}}</v-card-text>
                                        </v-card>
                                    </v-card>
                                </v-flex>
                            </v-layout>
                        </div>
                        <div v-else>
                            <h1>점심 레시피 수정중</h1>
                        </div>
                        </v-flex>

                        <v-flex xs12 sm12 md6 justify-center class="pa-5">
                            <div class="green--text font-weight-bold" style="text-align:center;">저녁</div>
                            <v-layout justify-center>
                                <v-radio-group row v-model="dinner_mealkind" class="justify-center" v-on:change="dinner_radio_change()">
                                    <v-radio label="식당"  color="success" value="0" ></v-radio>
                                    <v-radio label="레시피"  color="success" value="1" ></v-radio>
                                </v-radio-group>
                            </v-layout>

                            <div v-if="dinner_mealkind==0" class="d-flex flex-wrap" xs1 sm3 md6 style="justify-content:center; margin-top:30px;">                   
                            <v-layout>
                                <v-flex xs3 sm3 md12>
                                    <v-card class="d-flex flex-wrap" style="margin-top:30px;">                   
                                        <v-card v-for="(recommend,i) in recommends" v-bind:key="`${i}-${recommend.store_id}`"
                                            style="margin-top: 80px; height: 300px; width:400px; margin-right:25px; margin-left:25px;">
                                            <router-link rounded :to="{ name: 'Detailed',params : {id: recommend.store_id}}">
                                            <!-- <v-img height="300px" :src="recommend.store_image"></v-img> -->
                                            </router-link>
                                            <v-card-text class="display-1 black--text font-weight-bold" style="text-align:center;">{{recommend.store_name}}</v-card-text>
                                        </v-card>
                                    </v-card>
                                </v-flex>
                            </v-layout>
                        </div>
                        <div v-else>
                            <h1>저녁 레시피 수정중</h1>
                        </div>
                        </v-flex>
                </v-layout>
                </div>

            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import axios from 'axios'
import { mdiConsoleLine } from '@mdi/js'
// import Recommend from "../components/Recommend/Recommend.vue";
// import FootRecommend from '@/components/foot_recommend/FootRecommend';

export default {
    name: 'RecommendMain',
    data(){
        return{
            recommends: [],
            break_mealkind:"0",
            lunch_mealkind:"0",
            dinner_mealkind:"0",
            breakfast:[],
            lunch:[],
            dinner:[],
            check: true,
            breakfast_check : true,
            value:0, // 3이면 아점저, 2면 점저, 1이면 저녁만 보여줄 것
            mealKind: "", 
            user_id : "",
        }
    },

    methods: {
        breakfast_yes() {
            this.breakfast_check = false;
            console.log("아침 먹음",this.mealKind);
        },
        breakfast_no() {
            this.value = 3;
            this.check= false;
            this.mealKind = "0,0,0";
            console.log("아침 안 먹음",this.mealKind);
        },
        lunch_yes(){
            this.value=1;
            this.check=false;
            this.mealKind = "0";
            console.log("점심 먹음",this.mealKind);
        },
        lunch_no(){
            this.value=2;
            this.check=false;
            this.mealKind = "0,0";

            console.log("점심 안 먹음",this.mealKind);
        },
        break_radio_change(){
            var lun = this.mealKind.charAt(2);
            var din = this.mealKind.charAt(4);
            this.mealKind = "";
            this.mealKind += String(this.break_mealkind+ ","+lun+","+din); 
            console.log("유저아이디:",this.user_id);
            console.log(this.mealKind);

           fetch('http://127.0.0.1:5000/recommend/'+this.user_id,{
            headers: {'Access-Control-Allow-Origin':'*'},
            method: 'POST',
            
            })
            .then((res)=>{
            this.breakfast = res.data;
            console.log("아침 데이터",this.breakfast);
            })
            .catch((err)=>{
                console.log("유저값 실패",err)
            })
        },
        lunch_radio_change(){
            if(this.value == 3){
                var bre = this.mealKind.charAt(0);
                var din = this.mealKind.charAt(4);
                this.mealKind = "";
                this.mealKind += String(bre+ ","+this.lunch_mealkind+","+din); 
                console.log(this.mealKind);
            }
            else if(this.value==2){
                var din = this.mealKind.charAt(2);
                this.mealKind = "";
                this.mealKind += String(this.lunch_mealkind+","+din); 
                console.log(this.mealKind);
            }
            console.log("유저아이디:",this.user_id);
            console.log(this.mealKind);       

            fetch('http://127.0.0.1:5000/recommend/'+this.user_id,{
            headers: {'Access-Control-Allow-Origin':'*'},
            method: 'POST',
            data:{
                maelkind : this.mealKind
            }
            })
            .then((res)=>{
            this.lunch = res.data;
            console.log("점심 데이터",this.lunch);  
            })
            .catch((err)=>{
                console.log("실패",err)
            })
        },
        dinner_radio_change(){
            if(this.value == 3){
                var bre = this.mealKind.charAt(0);
                var lun = this.mealKind.charAt(2);
                this.mealKind = "";
                this.mealKind += String(bre+ ","+lun+","+this.dinner_mealkind); 
                console.log(this.mealKind);
            }
            else if(this.value==2){
                var lun = this.mealKind.charAt(0);
                this.mealKind = "";
                this.mealKind += String(lun+","+this.dinner_mealkind); 
                console.log(this.mealKind);
            }
            else if(this.value ==1){
                this.mealKind = String(this.dinner_mealkind);
            }
            console.log("유저아이디:",this.user_id);
            console.log(this.mealKind);

            fetch('http://127.0.0.1:5000/recommend/'+this.user_id,{
            headers: {'Access-Control-Allow-Origin':'*'},
            method: 'POST',
            data:{
                maelkind : this.mealKind
            }
            })
            .then((res)=>{
             this.dinner = res.data;
            console.log("저녁 데이터",this.dinner);  
            })
            .catch((err)=>{
                console.log("실패",err)
            })
        },
    },
    computed :{
    },
    created:function(){
        axios.get('/show/'+localStorage.getItem('current_user'))
        .then(res=>
            {
            this.user_id=res.data.user_id;
            console.log('유저 아이디: ',this.user_id);
            })
        .catch(err=>console.error(err))

            
        axios.get('/recommendShow')
        .then((response) => {
            this.recommends = response.data;
            console.log(this.recommends);
        })
        .catch((err)=>{
            console.log(err);
        })
            
    },   
}
</script>