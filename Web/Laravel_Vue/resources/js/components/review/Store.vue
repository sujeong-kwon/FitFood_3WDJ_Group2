<template>
  <v-container grid-list-md>
    <v-layout justify-cetner row>
      <v-flex xs12>
        <!-- <h1>id {{$route.params.id}} 입니다</h1> -->
        <h1 class="font-weight-black text-center" style="margin-top: 20px; margin-bottom: 20px;">{{item.store_name}}</h1>
        
      </v-flex>
      <router-view></router-view>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  //   data () {
  //     return {
  //       reviews: [],
  //       headers: [
  //         { text: '제목', value: 'review_title', sortable: true },
  //         { text: '글쓴이', value: 'user_id2', sortable: false },
  //       ],
  //       loading: false,
  //       product:''
  //     }
  //   },
  //   // ..
  //   methods: {
  //     // ..
  //     list () {
  //       if (this.loading) return
  //       this.loading = true
  //       this.$axios.get('/static/reviews.json')
  //         .then((res) => {
  //           this.reivew = res.data.reviews;
  //           console.log(this.reviews);
  //         })
  //         .catch((e) => {
  //           this.pop(e.message, 'error')
  //           this.loading = false
  //         })
  //     },
  //     id2date (val) {
  //       if (!val) return '잘못된 시간 정보'
  //       return new Date(parseInt(val.substring(0, 8), 16) * 1000).toLocaleString()
  //     }
  //   },
  created: function() {
    axios
      .get("/showStore")
      .then(res => {
        this.item = res.data.filter(  // item변수 안에 select * from stores결괏값 적재
          data => data.store_id == this.$route.params.id
        )[0];
        this.item.image = "/" + this.item.image;
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  },
  data() {
    return {
      item: ""
    };
  }
};
</script>

<style>
.img {
  /* width: 240px; */
  height: 550px;
  object-fit: cover;
  margin-bottom: 4em;
}
</style>