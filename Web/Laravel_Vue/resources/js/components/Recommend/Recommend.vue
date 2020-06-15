<template>
    <v-layout justify-center style="margin-top: 50px;">
        

            <v-flex xs12 sm10 md6 class="pa-5">           
                <div class="green--text font-weight-bold" style="text-align:center;">아침</div>
                <v-layout justify-center>
                    <v-radio-group row v-model="morning" class="justify-center">
                        <v-radio label="식당"  color="success" value="1" ></v-radio>
                        <v-radio label="레시피"  color="success" value="2"></v-radio>
                    </v-radio-group>
                </v-layout>
                <div class="d-flex flex-wrap" xs1 sm3 md6 style="justify-content:center; margin-top:30px;">   
                <v-layout>
                    <v-flex xs3 sm3 md12>
                        <v-card class="d-flex flex-wrap" style="margin-top:30px;" >                   
                            <v-card v-for="(recommend,i) in recommends" v-bind:key="`${i}-${recommend.id}`"
                                style="margin-top: 80px; height: 300px; width:400px; margin-right:25px; margin-left:25px;">
                                <router-link rounded :to="{ name: 'Detailed',params : {id: recommend.id}}">
                                <v-img height="300px" :src="recommend.image"></v-img>
                                </router-link>
                                <v-card-text class="display-1 black--text font-weight-bold" style="text-align:center;">{{recommend.recommend_name}}</v-card-text>
                            </v-card>
                        </v-card>
                    </v-flex>
                </v-layout>
            </div>
            </v-flex>

            <v-flex xs12 sm10 md6 justify-center class="pa-5">
                <div class="green--text font-weight-bold" style="text-align:center;">점심</div>
                <v-layout justify-center>
                    <v-radio-group row v-model="lunch" class="justify-center">
                        <v-radio label="식당"  color="success" value="1" ></v-radio>
                        <v-radio label="레시피"  color="success" value="2"></v-radio>
                    </v-radio-group>
                </v-layout>

                <div class="d-flex flex-wrap" xs1 sm3 md6 style="justify-content:center; margin-top:30px;">                   
                <v-layout>
                    <v-flex xs3 sm10 md12>
                        <v-card class="d-flex flex-wrap" style="margin-top:30px;">                   
                            <v-card v-for="(recommend,i) in recommends" v-bind:key="`${i}-${recommend.id}`"
                                style="margin-top: 80px; height: 300px; width:400px; margin-right:25px; margin-left:25px;">
                                <router-link rounded :to="{ name: 'Detailed',params : {id: recommend.id}}">
                                <v-img height="300px" :src="recommend.image"></v-img>
                                </router-link>
                                <v-card-text class="display-1 black--text font-weight-bold" style="text-align:center;">{{recommend.recommend_name}}</v-card-text>
                            </v-card>
                        </v-card>
                    </v-flex>
                </v-layout>
            </div>
            </v-flex>

            <v-flex xs12 sm12 md6 justify-center class="pa-5">
                <div class="green--text font-weight-bold" style="text-align:center;">저녁</div>
                <v-layout justify-center>
                    <v-radio-group row v-model="dinner" class="justify-center">
                        <v-radio label="식당"  color="success" value="1" ></v-radio>
                        <v-radio label="레시피"  color="success" value="2"></v-radio>
                    </v-radio-group>
                </v-layout>

                <div class="d-flex flex-wrap" xs1 sm3 md6 style="justify-content:center; margin-top:30px;">                   
                <v-layout>
                    <v-flex xs3 sm3 md12>
                        <v-card class="d-flex flex-wrap" style="margin-top:30px;">                   
                            <v-card v-for="(recommend,i) in recommends" v-bind:key="`${i}-${recommend.id}`"
                                style="margin-top: 80px; height: 300px; width:400px; margin-right:25px; margin-left:25px;">
                                <router-link rounded :to="{ name: 'Detailed',params : {id: recommend.id}}">
                                <v-img height="300px" :src="recommend.image"></v-img>
                                </router-link>
                                <v-card-text class="display-1 black--text font-weight-bold" style="text-align:center;">{{recommend.recommend_name}}</v-card-text>
                            </v-card>
                        </v-card>
                    </v-flex>
                </v-layout>
            </div>
            </v-flex>


    
    </v-layout>
</template>

<script>
import axios from 'axios'

export default {
    name: 'recommend',
    data(){
        return{
            recommends: [],
            morning:'',
            lunch:'',
            dinner:'',
        }; 
    },
    created : function(){
        axios.get('/recommendShow')
        .then((response) => {
            this.recommends = response.data;
            console.log(this.recommends);
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    // methods: {
    //     img_click:function(){
    //        window.open("http://localhost:8080/Detailed");
    //     }
    // }
};
</script>
