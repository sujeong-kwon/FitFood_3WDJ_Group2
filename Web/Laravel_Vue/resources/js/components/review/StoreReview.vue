<template>
  <v-flex xs12>
    <v-card>
      <v-toolbar flat color="orange">
        <v-toolbar-title class="white--text">리뷰</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-btn color="white" class="mb-2 orange--text" @click="mdUp">리뷰작성</v-btn>
      </v-toolbar>
      <v-data-table
        :headers="headers"
        :items="reviews"
        :loading="loading"
        :sort-by="['_id']"
        :sort-desc="[true]"
        class="elevation-1 mytable"
      >
        <template v-slot:item.review_title="{item}">
          <div @click="rowClick(item)">{{item.review_title}}</div>
        </template>
        <template v-slot:item.user_id="{item}">
          <v-chip class="ma-2" color="orange" outlined pill>
            {{item.user_id}}
            <v-icon right>mdi-account-outline</v-icon>
          </v-chip>
        </template>
        <template v-slot:item._id="{item}">
          <v-chip class="ma-2" color="orange" outlined pill>
            {{
            id2date(item._id)
            }}
          </v-chip>
        </template>
        <template v-slot:item.actions> 
          <v-chip>
             <v-btn class="mx-0" @click="editItem(item)">
                <v-icon color="teal">{{ icons.mdiPencil }}</v-icon>
              </v-btn>
              <v-btn icon class="mx-0" @click="deleteItem(item)">
                <v-icon dark color="pink">{{ icons.mdiDelete }}</v-icon>
              </v-btn>
          </v-chip>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline orange--text">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="제목" v-model="form.review_title" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea label="내용" v-model="form.review_message" required></v-textarea>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-rating
                  v-model="form.review_star_rating"
                  color="yellow darken-3"
                  background-color="grey darken-1"
                  empty-icon="$vuetify.icons.ratingFull"
                  half-increments
                  hover
                ></v-rating>
              </v-col>
            </v-row>
          </v-container>
          <small>부적절한 내용은 처벌의 대상이 될 수 있습니다.</small>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="orange darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="orange darken-1" text @click="postSuggestion">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-flex>
</template>

<script>
import axios from "axios";
import {
    mdiPencil,
    mdiDelete
  } from '@mdi/js'

export default {
  name: "review",
  data() {
    return {
      dialog: false,
      form: {
        review_title: "",
        review_message: "",
        review_star_rating: 0,
      },
       icons: {
        mdiPencil,
        mdiDelete
      },
      updateMode: false,
      reviews: [],
      editedIndex: false,
      headers: [
        { text: "제목", value: "review_title", sortable: true },
        {
          text: "글쓴이",
          value: "user_id",
          width: 150,
          sortable: false
        },
        {
          text: "날짜",
          value: "_id",
          sortable: true,
          width: 300,
          class: "hidden-sm-and-down"
        },
        { 
          text: '액션',
          value: 'actions', sortable: false }
      ],
      loading: false
    };
  },
  created() {
    this.getSuggestions();
  },

  computed: {
      formTitle () {
        return this.editedIndex ? '리뷰 수정' : '리뷰 작성'
      }
    },

  methods: {
    rowClick(item) {
      this.$router.push({
        path: `/review/detail/${item.review_id}`,
        params: {id: item.review_id}
      });
    },
    mdUp() {
      this.editedIndex = false;
      this.dialog = true;
      this.editedIndex = -1;
      this.updateMode = false;
      // this.form.review_title = "";
      // this.form.review_message = "";
      // this.form.review_star_rating = 0;
    },
    getSuggestions() {
      if (this.loading) return;
      this.loading = true;
      axios
        .get("/showReview/"+this.$route.params.id)
        .then(response => {
          this.reviews = response.data;
          this.loading = false;
          console.log(this.reviews);
          console.log(response);
        })
        .catch(e => {
          console.log(e);
          this.loading = false;
        });
    },
    postSuggestion() {

      this.dialog = false;

        axios
        .post('/storeReview', 
        {
          review_title: this.form.review_title,
          review_message: this.form.review_message,
          review_star_rating: this.form.review_star_rating,
          store_id: this.$route.params.id
        })
        .then(res => {
          // this.getSuggestions();
          console.log(res.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    id2date(_id) {
      if (!_id) return "잘못된 시간 정보";
      return new Date(
        parseInt(_id.substring(0, 8), 16) * 1000
      ).toLocaleString();
    },
    editItem(id){
    console.log("에디트 실행");
    this.editedIndex = true;
    this.dialog=true;
    this.updateMode = true;
    
    axios.post('/updateReview', {
      review_title: this.form.review_title,
      review_message: this.form.review_message,
      review_star_rating: this.form.review_star_rating,
      store_id: this.$route.params.id,
      review_id: id.review_id
    })
    .then(response => {

    })
    .catch(err => {
      console.log(err);
    })
  },
    deleteItem(id) {
    console.log("딜리트 실행");
  },
    close(){
    this.dialog=false
  }
  },
  save () {
       
      }
};
</script>

<style>
/* .mytable table tr {
    background-color: lightgoldenrodyellow;
    border-bottom: none !important;
} */
</style>