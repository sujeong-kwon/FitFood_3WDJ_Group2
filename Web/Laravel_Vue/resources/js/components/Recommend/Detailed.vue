/*가게 추천 상세보기 */
<template>
<v-container justify-center>
        <v-layout justify-center>
            <v-flex justify-center>
                <h1 class="green--text font-weight-bold" style="margin-top:30px; text-align:center; font-family : 'MapoPeacefull';" justify-center>{{shop.store_name}}</h1>

                <v-layout class="d-flex flex-wrap" style="margin-top: 20px;" justify-center>
                    <v-flex justify-center>
                        <div xs12 sm12 md12 justify-center>
                            <div id="roadview" style="margin-left:auto; margin:0px auto; width:650px; height: 450px; margin-top:50px; margin-bottom : 50px;" justify-center></div>
                        <!-- <v-img style="width:500px; height: 400px; margin-top:50px; margin-bottom : 50px;" height="300px" :src="shop.image"></v-img> -->
                        </div>
                        <div class="text-center" style="pointer-events: none;">
                            <v-rating v-model="rating" background-color="orange lighten-3" color="orange" size="64"></v-rating>
                        </div>
                        <div xs12 sm12 md6 justify-center>
                            <div justify-center>
                                <h1 class="text font-weight-bold" style=" margin-top:60px; margin-bottom : 50px; text-align:center; font-family : 'MapoPeacefull';">메뉴</h1>
                                <div style="margin-left:auto; margin:0px auto; text-align:center;">
                                    <v-list style="max-height: 500px" class="overflow-y-auto">
                                        <v-list v-for="(menus,key) in menu" v-bind:key="key">
                                            <h2><strong class="warning--text" style="margin-right:50px; text-align:center; font-family : 'MapoPeacefull';">{{menus.food_name}} : </strong>{{menus.food_price}} 원<br>
                                            </h2>

                                <!-- <h2 class="font-weight-bold" v-for="(menus,key) in menu" v-bind:key="key">
                                    <strong class="warning--text" style="margin-right:50px">{{menus.food_name}}</strong>{{menus.food_price}}
                                </h2> -->
                                        </v-list>
                                    </v-list>
                                </div>                             
                            </div>`
                        </div>
                    </v-flex>                    
                </v-layout>

                <div justify-center>
                    
                    <v-flex class="text-md-center" xs12 sm12 md12 justify-center>
                        <h1 class="font-weight-bold" style="margin-top:30px; text-align:center; font-family : 'MapoPeacefull';">가게 위치</h1>
                        <v-img style="margin-top: 25px;" :src="shop.gps" justify-center></v-img>
                        <div id="map" style="width:1000px; height: 500px; margin-top:50px; margin-bottom : 50px; margin-left:auto; margin:0px auto;"  justify-center></div>
                    </v-flex>
                    
                </div>
            </v-flex>
        </v-layout>
</v-container>
</template>

<script type="text/javascript" src="/dapi.kakao.com/v2/maps/sdk.js?appkey=451969080561cdf9079bd37cf1e1e7ef"></script>
<script type="text/javascript" src="{{cdn('v2/maps/sdk.js?appkey=451969080561cdf9079bd37cf1e1e7ef')}}"></script>
<script type="text/javascript" src="{{URL::to('/dapi.kakao.com/v2/maps/sdk.js?appkey=451969080561cdf9079bd37cf1e1e7ef')}}"></script>

<script>
import axios from 'axios'

export default {
    name: 'Detailed',
    data(){
        return{
            shop:'',
            menu:'',
            offsetTop: 0,
            rating:0,
        };
    },
    created : function(){

        axios.get('/get_recommend_detail/'+this.$route.params.id)
        .then(res => {
            console.log(res);
            this.shop = res.data[0][0]; // 현재 페이지 id값을 가진 가게 데이터
            this.menu = res.data[1]; // 현재 가게에 등록된 모든 음식 데이터
            console.log("샵",this.shop);
            console.log("메뉴",this.menu);
            this.rating = this.shop.store_star_rating;

            // this.shop.image = "/static/recommend_img/a.jpg";
            // this.shop.gps = "/static/recommend_img/위치.png";
            if (this.$route.params.id == 108 || this.$route.params.id == 109) {
            gps_l = this.shop.gps_r
            gps_r = this.shop.gps_l
            }
            var gps_l = this.shop.store_gps_latitude
            var gps_r = this.shop.store_gps_longitude
            console.log(gps_l)
            console.log(gps_r)
            var roadviewContainer = document.getElementById('roadview'); //로드뷰를 표시할 div
            var roadview = new kakao.maps.Roadview(roadviewContainer); //로드뷰 객체
            var roadviewClient = new kakao.maps.RoadviewClient(); //좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체
            var position = new kakao.maps.LatLng(gps_r, gps_l);
            // 특정 위치의 좌표와 가까운 로드뷰의 panoId를 추출하여 로드뷰를 띄운다.
            roadviewClient.getNearestPanoId(position, 50, function(panoId) {
                roadview.setPanoId(panoId, position); //panoId와 중심좌표를 통해 로드뷰 실행
            });
            var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
            mapOption = { 
                center: new kakao.maps.LatLng(gps_r, gps_l), // 지도의 중심좌표
                level: 3 // 지도의 확대 레벨
            };
            // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
            var map = new kakao.maps.Map(mapContainer, mapOption); 
            // console,log(11111111,mapContainer);
            // console,log(22222,mapOption);

            // 마커가 표시될 위치입니다 
            var markerPosition  = new kakao.maps.LatLng(gps_r, gps_l); 
            // 마커를 생성합니다
            var marker = new kakao.maps.Marker({
                position: markerPosition
            });
            // 마커가 지도 위에 표시되도록 설정합니다
            marker.setMap(map);
        })
        .catch((err) => {
            console.log(err);
        });
    },
    methods: {
      onScroll (e) {
        this.offsetTop = e.target.scrollTop
      }
    }
}
</script>

<style scoped>
@font-face { font-family: 'MapoPeacefull'; src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/MapoPeacefullA.woff') format('woff'); font-weight: normal; font-style: normal; }
</style>