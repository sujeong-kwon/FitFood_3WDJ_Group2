/*레시피 */
<template>
<v-container>
        <v-layout justify-center>
            <v-flex justify-center>
                <div class="display-2 green--text font-weight-bold" style="text-align:center;">RECIPE</div>

                <v-layout class="d-flex flex-wrap" style="margin-top: 100px;" justify-center>
                    <div style="margin-right:100px;" xs12 sm12 md6>
                        <v-img style="width:500px; height: 400px; margin-top:50px; margin-left:60px; margin-bottom : 50px;" height="300px" :src="recipes.recipe_image_2"></v-img>
                    </div>

                    <div xs12 sm12 md6 justify-center>
                        <div style="width:500px; height: 400px;">
                            <div class="display-1 font-weight-bold">{{recipes.recipe_food}}</div>
                            <br>
                            <h2 class="font-weight-bold">영양소</h2>
                            <div style="margin-right:50px;">
                                중량(1인분):{{nutrients.foot_weight}}
                                칼로리:{{nutrients.nutrient_calorie}}
                                탄수화물:{{nutrients.carbohydrate}}
                                콜레스테롤:{{nutrients.cholesterol}}
                                단백질:{{nutrients.protein}}
                                지방:{{nutrients.fat}}
                                나트륨:{{nutrients.salt}}
                            </div>
                            <br>
                            <h2 class="green--text font-weight-bold">재료</h2>
                            <div class="d-flex flex-wrap">
                                <h3 style="margin-right:30px;">
                                    {{recipes.recipe_material}}
                                </h3>                           
                            </div>
                        </div>
                    </div>                    
                </v-layout>

                <v-layout justify-center>  
                    <v-flex class="text-md-center" style="margin-top:50px;" justify-center xs12 sm12 md12>
                        <div class="display-1 font-weight-bold" style="margin-top:100px; text-align:center;">만드는 방법</div>
                        <v-img style="margin-top: 25px; width:600px;" :src="recipes.how_to_make_image_1"></v-img>
                        <div>{{recipes.how_to_make_1}}</div>
                        <v-img style="margin-top: 25px; width:600px;" :src="recipes.how_to_make_image_2"></v-img>
                        <div>{{recipes.how_to_make_2}}</div>
                        <v-img style="margin-top: 25px; width:600px;" :src="recipes.how_to_make_image_3"></v-img>
                        <div>{{recipes.how_to_make_3}}</div>
                        <v-img style="margin-top: 25px; width:600px;" :src="recipes.how_to_make_image_4"></v-img>
                        <div>{{recipes.how_to_make_4}}</div>
                        <v-img style="margin-top: 25px; width:600px;" :src="recipes.how_to_make_image_5"></v-img>
                        <div>{{recipes.how_to_make_5}}</div>
                        <v-img style="margin-top: 25px; width:600px;" :src="recipes.how_to_make_image_6"></v-img>
                        <div>{{recipes.how_to_make_6}}</div>
                        <v-img style="margin-top: 25px; width:600px;" :src="recipes.how_to_make_image_7"></v-img>
                        <div>{{recipes.how_to_make_7}}</div>
                        <v-img style="margin-top: 25px; width:600px;" :src="recipes.how_to_make_image_8"></v-img>
                        <div>{{recipes.how_to_make_8}}</div>
                        <v-img style="margin-top: 25px; width:600px;" :src="recipes.how_to_make_image_9"></v-img>
                        <div>{{recipes.how_to_make_9}}</div>
                        <v-img style="margin-top: 25px; width:600px;" :src="recipes.how_to_make_image_10"></v-img>
                        <div>{{recipes.how_to_make_10}}</div>
                        <v-img style="margin-top: 25px; width:600px;" :src="recipes.how_to_make_image_11"></v-img>
                        <div>{{recipes.how_to_make_11}}</div>
                        <v-img style="margin-top: 25px; width:600px;" :src="recipes.how_to_make_image_12"></v-img>
                        <div>{{recipes.how_to_make_12}}</div>
                        <v-img style="margin-top: 25px; width:600px;" :src="recipes.how_to_make_image_13"></v-img>
                        <div>{{recipes.how_to_make_13}}</div>
                        <v-img style="margin-top: 25px; width:600px;" :src="recipes.how_to_make_image_14"></v-img>
                        <div>{{recipes.how_to_make_14}}</div>
                        <v-img style="margin-top: 25px; width:600px;" :src="recipes.how_to_make_image_15"></v-img>
                        <div>{{recipes.how_to_make_15}}</div>
                </v-flex>
                </v-layout>

            </v-flex>
        </v-layout>
</v-container>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Recipe',
    data(){
        return{
            food:'',
            materials:'', // recipes에 recipe_material값으로 들어가있음. 바꿔서 쓸 것
            recipes:'',
            nutrients: '',
        };
    },

    created : function(){
        axios.get('/get_recipe_detail/'+this.$route.params.id)
        .then(res => {
            console.log(res);
            this.recipes = res.data[0][0]; // 현재 페이지 id값을 가진 레시피 데이터
            this.nutrients = res.data[1][0]; // 현재 가게에 등록된 모든 음식 데이터
            console.log("레시피",this.recipes);
            console.log("영양소",this.nutrients);
        })
        .catch((err) => {
            console.log(err);
        });
    },
}
</script>