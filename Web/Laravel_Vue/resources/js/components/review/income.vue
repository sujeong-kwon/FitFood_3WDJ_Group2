<template>
  <div id="map" style="width:100%;height:350px;"></div>
</template>

<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=120a463f1c98a30ef38460a15dabf50a"></script>
<script>
import axios from 'axios';

export default {
  data(){
    return {
      name: '', // 가게 이름
      store_gps_Lat: '',  // 위도
      store_gps_Lng: '',  // 경도

    }
  },

  created : function(){

    axios.get('/get_store_gps') // StoreController@get_store_gps
    .then(res => {
      console.log(res);
      this.name = res.data[0];  // 모든 가게 이름 배열
      this.store_gps_Lat = res.data[1]; // 모든 가게 위도
      this.store_gps_Lng = res.data[2]; // 모든 가게 경도
    })
    .catch(err => {
      console.log(err);
    })

    var mapContainer = document.getElementById('map'),

    mapOption = { 
            center: new kakao.maps.LatLng(33.450701, 126.570667), 
            level: 10
      }; 

    var map = new kakao.maps.Map(mapContainer, mapOption);


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

    // 마커를 표시할 위치와 title 객체 배열입니다 
    // var positions = [ // 서버에서 stores 테이블 위, 경도 데이터 받아와서 for문으로 차례차례 꺼내도록 한다.
    //                   // lating: new kakao.maps.LatLng(this.store_gps_Lat, this.store_gps_Lng)
    //     {
    //         title: '카카오', 
    //         latlng: new kakao.maps.LatLng(33.450705, 126.570677)
    //     },
    //     {
    //         title: '생태연못', 
    //         latlng: new kakao.maps.LatLng(33.450936, 126.569477)
    //     },
    //     {
    //         title: '텃밭', 
    //         latlng: new kakao.maps.LatLng(33.450879, 126.569940)
    //     },
    //     {
    //         title: '근린공원',
    //         latlng: new kakao.maps.LatLng(33.451393, 126.570738)
    //     }
    // ];
    var positions = {
      store_name: this.name,
      store_gps = new kakao.maps.LatLng(this.store_gps_Lat, this.store_gps_Lng)
    }

    // 마커 이미지의 이미지 주소입니다
    var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 
        
    for (var i = 0; i < positions.length; i ++) {
        
        // 마커 이미지의 이미지 크기 입니다
        var imageSize = new kakao.maps.Size(24, 35); 
        
        // 마커 이미지를 생성합니다    
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
        
        // 마커를 생성합니다
        var marker = new kakao.maps.Marker({
            map: map, // 마커를 표시할 지도
            position: positions[i].latlng, // 마커를 표시할 위치
            title : positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
            image : markerImage // 마커 이미지 
        });
    }

    // 지도에 마커와 인포윈도우를 표시하는 함수입니다
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
  }
}
</script>