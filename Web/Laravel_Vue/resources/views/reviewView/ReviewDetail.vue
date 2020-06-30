<template>
  <v-container fluid grid-list-md text-xs-center>
    <v-card class="mx-auto" min-width="344">
      <v-card-title>
        <span class="title font-weight-bold" style="font-family : 'MapoPeacefull';">{{item.review_title}}</span>
        <div class="flex-grow-1"></div>
        <v-menu bottom left transition="scale-transition">
          <template v-slot:activator="{ on }">
            <v-icon v-on="on">more_vert</v-icon>
          </template>
          <v-list>
            <v-list-item>
              <v-btn
                small
                class="float-right ma-2"
                tile
                outlined
                color="error"
                @click="delSuggestion($route.params.id)"
              >
                <v-icon left>clear</v-icon>
              </v-btn>
            </v-list-item>
            <v-list-item>
              <v-btn
                small
                class="float-right ma-2"
                tile
                outlined
                color="success"
                @click="dialog = true"
              >
                <v-icon left>create</v-icon>
              </v-btn>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-card-title>
      <!-- <v-card-text class="font-weight-light">{{id2date(item._id)}}</v-card-text> -->

      <v-card-text class="font-weight-bold" style="font-family : 'MapoPeacefull';">{{item.review_message}}</v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-list-item class="grow">
          <v-list-item-content>
            <v-list-item-title style="font-family : 'MapoPeacefull';">{{item.user_id}}</v-list-item-title>
          </v-list-item-content>

          <!-- <v-row align="center" justify="end">
            <v-card-actions>
              <div v-if="alreadyLike">
                <v-btn icon>
                  <v-icon v-html="like_icon" color="green darken-3" @click="decLike"></v-icon>
                </v-btn>
              </div>
              <div v-else>
                <v-btn icon>
                  <v-icon v-html="like_icon" color="grey" @click="incLike"></v-icon>
                </v-btn>
              </div>
            </v-card-actions>
            <span class="subheading">{{item.cnt.like}}</span>
          </v-row>-->
        </v-list-item>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
   data() {

     return {
       item: {
         review_title: "",
         review_message: "",
         user_id: 0
       }
     };
    //  if(true){
    //    axios.get('/showReview')
    //    .then(res => {
    //      this.review_title=res.data.review_title;
    //      this.review_message=res.data.review_message;
    //      this.user_id=res.data.user_id;
    //    })
    //    .catch(err => {
    //      console.log(err);
    //    })
    //  }
    // return {
    //   review_title: null,
    //   review_message: null,
    //   user_id: null,
    // };
  },
  //const review_id = this.$route.params.review_id
  // created: function() {
  //   axios.get("/showReview")
  //     .then(res => {  // select * from reviews

  //       // this.item = res.data.filter(
  //       //   data.review_id == this.$route.params.id
  //       // );

  //       // this.item = res.data.filter((data) => data.review_id == this.$route.params.id);

  //       this.review_title=res.data.review_title;
  //       this.review_message=res.data.review_message;
  //       this.user_id=res.data.user_id;
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     })
  //   // this.getSuggestion(this.review_id);
  // },
  created: function() {
    axios
      .get("/showReview") // select * from reviews;
      .then(response => {
        this.item = response.data.filter(
          data => data.review_id == this.$route.params.review_id
        )[0];
        console.log(response);
      })
      .catch(e => {
        console.log(e);
        // this.loading = false;
      });
  }
};
</script>

<style scoped>
@font-face { font-family: 'MapoPeacefull'; src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/MapoPeacefullA.woff') format('woff'); font-weight: normal; font-style: normal; }
</style>