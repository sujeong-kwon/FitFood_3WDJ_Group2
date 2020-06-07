<template>
  <v-layout>
    <v-card-text class="pa-4">
      <v-container class="d-flex" style="margin-top: 50px;">
        <v-layout>
            <v-flex style="width:500px;" xs12 sm12 md12>
              <v-img src="/static/fogg-welcome-2.png" class="ma-5 pa-4"></v-img>
            </v-flex>
          </v-layout>
          <span class="text-xs-left text-md-left">
            <v-layout row wrap>
              <v-flex xs12 sm12 md12>
                <v-form @submit.prevent="submit">
                  
                  <v-flex>
                  <h1
                    class="green--text font-weight-bold"
                      style="text-align: center; margin-bottom: 40px;"
                    >LOGIN</h1>
                  <v-text-field
                    name="email"
                    label="email"
                    class="email login-input"
                    type="email"
                    id="email"
                    v-model="form.user_email"
                  ></v-text-field>
                  <v-text-field
                    name="password"
                    label="password"
                    class="password login-input"
                    id="password"
                    type="password"
                    v-model="form.user_password"
                  ></v-text-field>
                  <v-card-actions>
                    <v-btn
                      type="submit"
                      block
                      text
                      class="success"
                      style="margin-top: 20px; margin-bottom: 20px;"
                    >LOGIN</v-btn>
                  </v-card-actions>
                  <v-card-actions>
                    <v-btn
                        class="green--text"
                        style="background-color: lightgray;"
                        block
                        outlined
                        @click="signupPage"
                      >SIGNUP</v-btn>
                  </v-card-actions>
                  </v-flex>
                </v-form>
              </v-flex> 
            </v-layout>  
            </span>
      </v-container>
    </v-card-text>
  </v-layout>
</template>

<script>
import { mapActions } from "vuex";
import axios from 'axios';

export default {
  name: "signin",
  // components: {},
  data() {
    return {
      form: {
        user_email: "",
        user_password: ""
      }
    };
  },
  methods: {
    submit() {
      axios.post('/check',this.form)
      .then(res=>
        {      
          let key = res.data;
          localStorage.setItem('current_user',key);
          axios.get('/show/'+localStorage.getItem('current_user'))
          .then(res=>
            {
              console.log(res);
              window.location.href='/';
            }
          )
          .catch(err=>console.error(err))
        }
      )
      .catch(err=>console.error(err))
    },

    signupPage() {
      this.$router.push({ name: "signup" });
      this.$store.state.isLoginDialog = false;

    },

    logout() {
      axios.get('/logout')
      .then(res=>
      {
        localStorage.removeItem('current_user');
        console.log(JSON.stringify(res));
      }
      )
      .catch(err=>console.error(err))
    }
  }

  
}
</script>

<style scoped>
.login-input {
  margin-left: 20px;
  width: 500px;
  margin-bottom: 20px;
}
</style>