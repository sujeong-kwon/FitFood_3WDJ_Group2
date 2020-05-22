<template>
    <v-flex xs12>
        <!-- <v-data-table
            :headers="headers"
            :items="reviews"
            :loading="loading">
        <template slot="items" slot-scope="props">
            <td :class="headers[0].class">{{props.item.reivew_title}}</td>
            <td :class="headers[1].class">{{props.item.review_content}}</td>
            <td :class="headers[2].class">{{props.item.user_id2}}</td>
            <td :class="headers[3].class">
              <v-btn
                v-if="props.expanded"
                @click="props.expanded = false"
                color="info" fab small
              >
                <v-icon>keyboard_arrow_up</v-icon>
              </v-btn>
              <v-btn
                v-else
                @click="read(props)"
                color="info" fab small
              >
                <v-icon>keyboard_arrow_down</v-icon>
              </v-btn>
            </td>
        </template>
        </v-data-table> -->
        <v-data-table
        :headers="headers"
        :items="reviews"
        class="elevation-1 mytable"
        sort-by="review_content"
        >
        <template v-slot:top>
            <v-toolbar flat color="orange">
            <v-toolbar-title class="white--text">리뷰</v-toolbar-title>
            <v-divider
                class="mx-4"
                inset
                vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on }">
                <v-btn color="white" class="mb-2 orange--text" v-on="on">리뷰작성</v-btn>
                </template>
                <v-card>
                <v-card-title>
                    <span class="headline orange--text">리뷰작성</span>
                </v-card-title>            
                <v-card-text>
                    <v-container>
                    <v-row>
                        <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.review_title" label="제목"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="6" md="4">
                        <v-text-field v-model="editedItem.review_content" label="내용"></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" sm="6" md="4">
                        <v-rating
                          v-model="editedItem.rating"
                          color="yellow darken-3"
                          background-color="grey darken-1"
                          empty-icon="$vuetify.icons.ratingFull"
                          half-increments
                          hover
                        ></v-rating>
                        </v-col>
                    </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="orange darken-1" text @click="close">Cancel</v-btn>
                    <v-btn color="orange darken-1" text @click="save">Save</v-btn>
                </v-card-actions>
                </v-card>
            </v-dialog>
            </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
            <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
            >
            mdi-pencil
            </v-icon>
            <v-icon
            small
            @click="deleteItem(item)"
            >
            mdi-delete
            </v-icon>
        </template>
        <template v-slot:no-data>
            <v-btn color="orange" class="white--text" @click="initialize">Reset</v-btn>
        </template>
        </v-data-table>
    </v-flex>      
</template>

<script>


export default {
    data: () => ({
    dialog: false,
    headers: [
      {
        text: '제목',
        align: 'start',
        sortable: false,
        value: 'review_title',
      },
      { text: '내용', value: 'review_content' },
      { text: '별점', value: 'rating' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    reviews: [],
    editedIndex: -1,
    editedItem: {
      review_title: '',
      review_content: '',
      rating : 0,
    },
    defaultItem: {
      review_title: '',
      review_content: '',
      rating : 0,
    }
  }),
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
  },

  methods: {
    initialize () {
      this.reviews = [
        {
          review_title: '맛있어요',
          review_content: '어쩌구저쩌규ㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌ',
          rating : 3 
        },
        {
          review_title: '맛없음',
          review_content: 'ㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎㅎ',
          rating : 3
        },
        {
          review_title: '달콤함바그b',
          review_content: 'ㅇㅇㅇㅇㅇㅇㅇㅇ',
          rating : 3
        },
        {
          review_title: '매콤함바그 맛있음',
          review_content: 'ㅇㅇㅇㅇㅇㅇㅇ',
        },
        {
          review_title: '매콤함바그 맛있음',
          review_content: 'ㅇㅇㅇㅇㅇㅇㅇ',
        },
        {
          review_title: '맛있어요',
          review_content: '어쩌구저쩌규ㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌ',
        },
        {
          review_title: '달콤함바그b',
          review_content: 'ㅇㅇㅇㅇㅇㅇㅇㅇ',
        },
        {
          review_title: '맛있어요',
          review_content: '어쩌구저쩌규ㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌ',
        },
        {
          review_title: '맛있어요',
          review_content: '어쩌구저쩌규ㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌ',
        },
        {
          review_title: '맛있어요',
          review_content: '어쩌구저쩌규ㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌㅌ',
        },
      ]
    },

    editItem (item) {
      this.editedIndex = this.reviews.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      const index = this.reviews.indexOf(item)
      confirm('작성하신 리뷰를 삭제하시겠습니까?') && this.reviews.splice(index, 1)
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      if (this.editedIndex > -1) {
        Object.assign(this.reviews[this.editedIndex], this.editedItem)
      } else {
        this.reviews.push(this.editedItem)
      }
      this.close()
    }
  }
    // data(){
    //     return{
    //         reviews: [],
    //         headers: [
    //         { text: '제목', value: 'reivew_title', sortable: true},
    //         { text: '내용', value: 'reivew_content', sortable: true },
    //         { text: '내용', value: 'reivew_content', sortable: true },
    //         { text: '내용', value: 'reivew_content', sortable: true }
    //         ],
    //         loading:false
    //     }
    // },
    // methods: {
    //     list() {
    //         if(this.loading) return
    //         this.loading = true
    //         this.$axios.get('/static/reviews.json')
    //         .then((res)=>{
    //             this.reviews=res.data.reviews;
    //             console.log(this.reviews);
    //             this.loading = false
    //         })
    //         .catch((err)=>{
    //             console.log(err);
    //         });
    //     }
    // }
}
</script>

<style>
  /* .mytable table tr {
    background-color: lightgoldenrodyellow;
    border-bottom: none !important;
} */
</style>