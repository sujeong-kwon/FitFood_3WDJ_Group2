<template>
    <v-container>
        <v-layout>
            <v-flex>
                <div class="display-1 green--text font-weight-bold" style="text-align:center;">RECOMMEND</div>

                <div style="margin-top: 50px; text-align:center;" v-show="!hidden">
                    <!-- <v-btn  class="green--text font-weight-bold" style="margin-right: 40px" router :to="{name:'Recommend'}">식단 추천</v-btn>
                    <v-btn  class="green--text font-weight-bold" router :to="{name:'FootRecommend'}">레시피 추천</v-btn> -->
                    <!-- <v-btn class="green--text font-weight-bold" router :to="{name:'ReviewTest'}">테스트</v-btn> -->
                    <div class="font-weight-bold"><strong class="success--text">{{ formTitle }}</strong> 식사하셨습니까?</div>
                    <v-btn text class="green--text font-weight-bold" style="margin-right: 40px; margin-top:20px;" @click="yes()">네</v-btn>
                    <v-btn text class="green--text font-weight-bold" style="margin-top:20px;" @click="no()">아니요</v-btn>
                </div>

                <!-- <Recommend /> -->
                <router-view></router-view>

            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { mdiConsoleLine } from '@mdi/js'
// import Recommend from "../components/Recommend/Recommend.vue";
// import FootRecommend from '@/components/foot_recommend/FootRecommend';

export default {
    name: 'RecommendMain',
    data(){
        return{
            editedIndex:-1,
            hidden: false,
            //value:'',
        }
    },

    methods: {
    yes() {
        console.log("아침 먹음");
        
        this.editedIndex = 1;
      },
    no() {
        console.log("아침 안 먹음");
        

    }
    },
	components: {
            // Recommend,
            // FootRecommend
        },
    
    computed :{
        formTitle(){
            return this.editedIndex === -1 ? '아침' : '점심'
        }
    },
    editedIndex() {
        console.log("아침 점심 버튼 실행");
    },
         
}
</script>