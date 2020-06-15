<template>
  <v-container fluid grid-list-md text-xs-center>
    <v-card class="mx-auto" min-width="344">
      <v-card-title>
        <span class="title font-weight-bold">{{item.title}}</span>
        <div class="flex-grow-1"></div>
        <v-menu bottom left transition="scale-transition">
          <template v-slot:activator="{ on }">
            <v-icon v-on="on">more_vert</v-icon>
          </template>
          <v-list>
            <v-list-item>
              <v-btn small class="float-right ma-2" tile outlined color="error" @click="delSuggestion(suggestionId)">
                <v-icon left>clear</v-icon>삭제
              </v-btn>
            </v-list-item>
            <v-list-item>
              <v-btn small class="float-right ma-2" tile outlined color="success" @click="dialog = true">
                <v-icon left>create</v-icon>수정
              </v-btn>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-card-title>
      <v-card-text class="font-weight-light">{{id2date(item._id)}}</v-card-text>

      <v-card-text class="font-weight-bold">
        {{item.context}}
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-list-item class="grow">
          <v-list-item-avatar color="grey darken-3">
            <v-img class="elevation-6" src="@/assets/army.png"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{item._user.name}}</v-list-item-title>
          </v-list-item-content>

          <v-row align="center" justify="end">
            <v-card-actions>
              <div v-if="alreadyLike">
                <v-btn icon><v-icon v-html="like_icon" color="green darken-3" @click="decLike"></v-icon></v-btn>
              </div>
              <div v-else>
                <v-btn icon><v-icon v-html="like_icon" color="grey" @click="incLike"></v-icon></v-btn>
              </div>
            </v-card-actions>
            <span class="subheading">{{item.cnt.like}}</span>
          </v-row>
        </v-list-item>
      </v-card-actions>
    </v-card>
    <v-card dense class="mt-7 mx-auto" min-width="344">
      <v-card-title>
        <v-icon class="mr-3">chat</v-icon>
        <span class="title font-weight-bold">
          댓글
          <v-chip label outlined class="subtitle-1">
            {{comments.length}}
          </v-chip>
        </span>
      </v-card-title>

      <v-divider></v-divider>

      <v-flex class="pa-3">
        <v-alert type="warning" color="grey" width="90%" v-if="comments.length === 0">
            아직 댓글이 없습니다
        </v-alert>
      </v-flex>
      <v-card-text>
        <v-flex class="pa-3" v-for="item in comments" :key="item">
          <comment-card
            :comment="item"
            :createdAt="id2date(item._id)"
            @del="getSuggestion(suggestionId)"
          ></comment-card>
        </v-flex>
      </v-card-text>
      <v-divider></v-divider>
      <v-layout wrap row class="pa-5">
        <v-flex sm10>
          <v-text-field label="댓글 작성" dense outlined counter="200" v-model="cmtForm.context"></v-text-field>
        </v-flex>
        <v-btn class="ma-2" dark large color="green darken-4" @click="postComment">작성</v-btn>
      </v-layout>
    </v-card>

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">건의사항 수정</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="title*" v-model="form.title" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea label="context*" v-model="form.context" required></v-textarea>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="putSuggestion()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from 'axios'
import commentCard from '@/components/suggestion/commentCard'
export default {
  components: {
    commentCard
  },
  data () {
    const suggestionId = this.$route.params.suggestionId
    return {
      suggestionId: suggestionId,
      form: {
        title: '',
        context: ''
      },
      cmtForm: {
        context: ''
      },
      item: {},
      comments: [],
      like_icon: 'favorite',
      more: 'more-vert',
      dialog: false,
      alreadyLike: false
    }
  },
  created () {
    this.getSuggestion(this.suggestionId)
  },
  methods: {
    getSuggestion (sugId) {
      axios.get(`resources/suggestions/one/${sugId}`)
        .then((r) => {
          this.item = r.data.d
          this.comments = r.data.d._comments
          this.alreadyLike = r.data.alreadyLike
          this.form.title = this.item.title
          this.form.context = this.item.context
        })
        .catch((e) => {
          if (!e.response) this.$store.commit('pop', { msg: e.message, color: 'error' })
        })
    },

    putSuggestion () {
      this.dialog = false
      axios.put(`resources/suggestions/${this.suggestionId}`, this.form)
        .then((r) => {
          this.$store.commit('pop', { msg: '건의사항 수정완료', color: 'success' })
          this.getSuggestion(this.suggestionId)
        })
        .catch((e) => {
          if (!e.response) this.$store.commit('pop', { msg: e.message, color: 'error' })
        }) // api에 put 요청
    },

    delSuggestion (id) {
      axios.delete(`resources/suggestions/${id}`)
        .then((r) => {
          this.$store.commit('pop', { msg: '건의사항 삭제완료', color: 'success' })
          this.$router.push({
            path: '/suggestion'
          })
        })
        .catch((e) => {
          if (!e.response) this.$store.commit('pop', { msg: e.message, color: 'error' })
        })
    },
    postComment () {
      axios.post(`resources/comments/${this.suggestionId}`, this.cmtForm)
        .then((r) => {
          this.$store.commit('pop', { msg: '댓글 작성완료', color: 'success' })
          this.getSuggestion(this.suggestionId)
          this.cmtForm.context = ''
        })
        .catch((e) => {
          if (!e.response) this.$store.commit('pop', { msg: e.message, color: 'error' })
        })
    },
    incLike () {
      axios.get(`resources/suggestions/like/${this.suggestionId}`)
        .then((r) => {
          this.item.cnt.like = r.data.d
          this.alreadyLike = true
        })
        .catch((e) => {
          if (!e.response) this.$store.commit('pop', { msg: e.message, color: 'error' })
        })
    },
    decLike () {
      axios.get(`resources/suggestions/dislike/${this.suggestionId}`)
        .then((r) => {
          this.item.cnt.like = r.data.d
          this.alreadyLike = false
        })
        .catch((e) => {
          if (!e.response) this.$store.commit('pop', { msg: e.message, color: 'error' })
        })
    },
    id2date (_id) {
      if (!_id) return '잘못된 시간 정보'
      return new Date(parseInt(_id.substring(0, 8), 16) * 1000).toLocaleString()
    }
  }
}
</script>