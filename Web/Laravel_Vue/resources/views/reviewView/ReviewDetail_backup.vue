<template>
  <v-container fluid grid-list-md text-xs-center>
    <v-card class="mx-auto" min-width="344">
      <v-card-title>
        <span class="title font-weight-bold">{{item.review_title}}</span>
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
                <v-icon left>clear</v-icon>삭제
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
                <v-icon left>create</v-icon>수정
              </v-btn>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-card-title>
      <!-- <v-card-text class="font-weight-light">{{id2date(item._id)}}</v-card-text> -->

      <v-card-text class="font-weight-bold">{{item.review_message}}</v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-list-item class="grow">
          <v-list-item-content>
            <v-list-item-title>{{item.user_id}}</v-list-item-title>
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
      item: [],
    };
  },
  //const review_id = this.$route.params.review_id
  created: function() {
    axios.get("/showReview")
      .then(res => {  // select * from reviews

        // this.item = res.data.filter(
        //   data.review_id == this.$route.params.id
        // );

        this.item = res.data.filter((data) => data.review_id == this.$route.params.id);
      })
      .catch(err => {
        console.log(err);
      })
    // this.getSuggestion(this.review_id);
  },
  // created: function() {
  //   axios
  //     .get("/static/reviews.json")
  //     .then(response => {
  //       this.item = response.data.reviews.filter(
  //         data => data.id == this.$route.params.review_id
  //       )[0];
  //       console.log(response);
  //     })
  //     .catch(e => {
  //       if (!e.response)
  //         this.$store.commit("pop", {
  //           msg: e.message,
  //           color: "error"
  //         });
  //       this.loading = false;
  //     });
  // }
};
</script>