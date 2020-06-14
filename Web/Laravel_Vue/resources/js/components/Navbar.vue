<template>
   <nav>
      <v-app-bar flat app absolute="" color="white">
        <v-app-bar-nav-icon @click="drawer =!drawer"></v-app-bar-nav-icon>
        <v-toolbar-title class="text-uppercase white--text">
            <span class="green--text font-weight-light" >Fit</span>
            <span class="green--text">Food</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn v-if="this.user_email" text class="green--text" @click.prevent="signOut">Logout</v-btn>
          <v-btn v-else text to="/login" class="green--text">Login</v-btn>
        </v-toolbar-items>  
      </v-app-bar>
      <v-navigation-drawer app v-model="drawer" class="white">
        <v-list-item two-line :class="miniVariant && 'px-0'">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title  class="title black--text">
              {{user_name}}
            </v-list-item-title>
            <v-list-item-subtitle class="grey--text">
             {{user_email}}
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
import axios from 'axios';

export default {
  // computed:{
  //   ...mapGetters({
  //     authenticated: 'auth/authenticated',
  //     user:'auth/user'

  //   })
  // },
  methods:{
    // ...mapActions({
    //     signOutAction:'auth/signOut'
    // }),

    signOut(){
      axios.get(`http://127.0.0.1:8000/logout`)
      .then(res=>
      {
        localStorage.removeItem('current_user');
        window.location.href='/';
        console.log(JSON.stringify(res));
      }
      )
      .catch(err=>console.error(err))
    }
  },
  data(){

    if(localStorage.getItem('current_user')!=null) {
      console.log("현재 유저 : "+localStorage.getItem('current_user'));
      axios.get('/show/'+localStorage.getItem('current_user'))
      .then(res=>
        {
          console.log(JSON.stringify(res.data));
          this.user_email=res.data.user_email;
          this.user_name=res.data.user_name;
        }
      )
      .catch(err=>console.error(err))
    }


    return {
      
      drawer : false,
      user_email: null,
      user_name: null,
      items: [
        { title: 'Graph', icon: 'mdi-view-dashboard', route: '/graph/daychart'},
        { title: 'Recommend', icon: 'mdi-image', route:'/recommendmain'},
        { title: 'Review', icon: 'mdi-help-box', route:'/review'},
        { title: 'NewStore', icon: 'mdi-alpha-n-box-outline', route:'/newstore'},
        { title: 'test', icon: 'mdi-alpha-n-box-outline', route:'/test'},
      ],
      right: null,
      miniVariant: false,
    }
  } 
}
</script>
