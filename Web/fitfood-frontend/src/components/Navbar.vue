<template>
   <nav>
      <v-app-bar flat app absolute="" color="white">
        <v-app-bar-nav-icon @click="drawer =!drawer"></v-app-bar-nav-icon>
        <v-toolbar-title class="text-uppercase white--text">
            <span class="green--text font-weight-light" >Fitaaa</span>
            <span class="green--text">Foodaaa</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn v-if="authenticated" text class="green--text" @click.prevent="signOut">Logout</v-btn>
          <v-btn v-else text to="/login" class="green--text">Login</v-btn>
        </v-toolbar-items>  
      </v-app-bar>
      <v-navigation-drawer v-if="authenticated" app v-model="drawer" class="white">
        <v-list-item two-line :class="miniVariant && 'px-0'">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title black--text">
              {{user.name}}
            </v-list-item-title>
            <v-list-item-subtitle class="grey--text">
              {{user.email}}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        </v-list-item> 
        <v-divider></v-divider> 
        <v-list dense nav>
          <v-list-item v-for="item in items" :key="item.title" link router :to="item.route">
            <v-list-item-icon>
              <v-icon class="grey--text">{{ item.icon }}</v-icon>
            </v-list-item-icon> 
            <v-list-item-content>
              <v-list-item-title class="black--text">{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
   </nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed:{
    ...mapGetters({
      authenticated: 'auth/authenticated',
      user:'auth/user'

    })
  },
  methods:{
    ...mapActions({
        signOutAction:'auth/signOut'
    }),

    signOut(){
      this.signOutAction().then(()=>{
        this.$router.replace({
          name:'home'
        })
      })
    }
  },
  data(){
    return {
      drawer : false,
      items: [
        { title: 'Graph', icon: 'mdi-view-dashboard', route: '/graph/daychart'},
        { title: 'Recommend', icon: 'mdi-image', route:'/recommendmain/recommend'},
        { title: 'Review', icon: 'mdi-help-box', route:'/review'},
      ],
      right: null,
      miniVariant: false,
    }
  }   
}
</script>
