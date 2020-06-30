<template>
  <v-container>
      <v-layout>
        <v-flex>
          <h1 style="font-family : 'MapoPeacefull'; text-align:center;margin-bottom: 100px;">등록 가게 한눈에 보기</h1>
          <div id="map" style="width:1000px; height: 500px; margin-top:50px; margin-bottom : 50px; margin-left:auto; margin:0px auto;" justify-center></div>
        </v-flex>
      </v-layout>
  </v-container>
  
</template>

<script type="text/javascript" src="/dapi.kakao.com/v2/maps/sdk.js?appkey=451969080561cdf9079bd37cf1e1e7ef"></script>
<script type="text/javascript" src="{{cdn('v2/maps/sdk.js?appkey=451969080561cdf9079bd37cf1e1e7ef')}}"></script>
<script type="text/javascript" src="{{URL::to('/dapi.kakao.com/v2/maps/sdk.js?appkey=451969080561cdf9079bd37cf1e1e7ef')}}"></script>

<script>
import axios from 'axios';

export default {
  name:'income',
  data(){
    return {
      name: [], // 가게 이름
      store_gps_Lat: [],  // 위도
      store_gps_Lng: [],  // 경도
      store_id: []
    }
  },
    mounted(){
    axios.get('/get_store_gps') // StoreController@get_store_gps
    .then(res => {

      this.name = res.data[0];  // 모든 가게 이름 배열
      this.store_gps_Lat = res.data[1]; // 모든 가게 위도
      this.store_gps_Lng = res.data[2]; // 모든 가게 경도
      this.store_id = res.data[3];

    var mapContainer = document.getElementById('map'),

    mapOption = { 
             center: new kakao.maps.LatLng(35.89441684, 128.6248589), 
            level: 3
      }; 

    var map = new kakao.maps.Map(mapContainer, mapOption);

    var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 

    var positions = new Array();

    var gps_lat = 0;
    var gps_lng = 0;

    for (let i = 0; i < this.name.length; i++){

      gps_lat = this.store_gps_Lat[i].store_gps_latitude;
      gps_lng = this.store_gps_Lng[i].store_gps_longitude;

      gps_lat = parseFloat(gps_lat);
      gps_lng = parseFloat(gps_lng);
      console.log(gps_lat);
      console.log(typeof gps_lat);

      positions[i] = {
        title: this.name[i].store_name,
        latlng: new kakao.maps.LatLng(gps_lng, gps_lat)
      }

        var imageSize = new kakao.maps.Size(24, 35); 
        
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
        
        console.log(positions[i]);

        var marker = new kakao.maps.Marker({
            map: map, // 마커를 표시할 지도
            position: positions[i].latlng, // 마커를 표시할 위치
            title : positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
            image : markerImage, // 마커 이미지
        });

        var infowindow = new kakao.maps.InfoWindow({
          content : positions[i].title
        });

        var store_id = this.store_id[i].store_id; // 현재 가게 id값

        kakao.maps.event.addListener(marker, 'mouseover', makeOverListener(map, marker, infowindow));
        kakao.maps.event.addListener(marker, 'mouseout', makeOutListener(infowindow));
        kakao.maps.event.addListener(marker, 'click', makeClickListener(store_id));
    }
    console.log(positions);

    function makeOverListener(map, marker, infowindow) {
        return function() {
            infowindow.open(map, marker);
        };
    }

    // 인포윈도우를 닫는 클로저를 만드는 함수입니다 
    function makeOutListener(infowindow) {
        return function() {
            infowindow.close();
        };
    }

    function makeClickListener(store_id){
      return function(){
        location.href = '/#/detailed/'+store_id;
      };
    }
        if (navigator.geolocation) {
        
      navigator.geolocation.getCurrentPosition(function(position) {
            
        var lat = position.coords.latitude, // 위도
            lon = position.coords.longitude; // 경도
            
        var locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
                message = '<div style="padding:5px;">현재 계신곳</div>';
            
        displayMarker(locPosition, message);                
      });
        
    } else {
        
        var locPosition = new kakao.maps.LatLng(33.450701, 126.570667),    
            message = '현재 위치를 불러올 수 없습니다'
            
        displayMarker(locPosition, message);
    }

        function displayMarker(locPosition, message) {

        // 마커를 생성합니다
        var marker = new kakao.maps.Marker({  
            map: map, 
            position: locPosition
        }); 
        
        var iwContent = message, // 인포윈도우에 표시할 내용
            iwRemoveable = true;

        // 인포윈도우를 생성합니다
        var infowindow = new kakao.maps.InfoWindow({
            content : iwContent,
            removable : iwRemoveable
        });
        
        // 인포윈도우를 마커위에 표시합니다 
        infowindow.open(map, marker);
        
        // 지도 중심좌표를 접속위치로 변경합니다
        map.setCenter(locPosition);      
    }
    })
    .catch(err => {
      console.log(err);
    })
  },
}
</script>

<style scoped>
@font-face { font-family: 'MapoPeacefull'; src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/MapoPeacefullA.woff') format('woff'); font-weight: normal; font-style: normal; }
</style>