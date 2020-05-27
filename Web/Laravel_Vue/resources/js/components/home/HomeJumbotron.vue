<template>
  <v-fade-transition mode="out-in">
    <v-img
     src="/static/main.jpg"
     max-height="90vh"
    >
      <v-fade-transition mode="out-in">
        <v-container :key="$route.path" fill-height>
          <v-layout align-center>
            <v-fade-transition mode="out-in">
              <v-flex :key="$route.path" text-xs-left>
                <h3 class=" white--text font-weight-bold">
                  AI기반 식단 컨설팅 서비스
                </h3>
                <h1 class="display-2 white--text font-weight-bold">
                  Find your FitFood 
                </h1>
                <div class="title white--text mt-4">
                  <h5 class=" white--text font-weight-light">내 몸에 딱 맞는 식단으로 건강하게</h5>
                </div>
                <v-btn color="white"
                 class="title green--text font-weight-bold mt-4 pl-5 pr-5 pa-4" router :to="{name: 'signup'}">
                 Start
                </v-btn>
              </v-flex>
            </v-fade-transition>
          </v-layout>        
        </v-container>       
      </v-fade-transition>
    </v-img>
  </v-fade-transition>
  <!-- <v-fade-transition mode="out-in">
    <v-layout column>
      <v-flex xs12>
        <div
          class="pa-5" 
          data-aos="fade-right" 
          data-aos-delay="200" >
          <v-layout align-center justify-center>
          <div>
            <h1 class=" black--text font-weight-bold">
                  Al기반 식단 컨설팅 서비스
                </h1>
                <h1 class="display-2 black--text font-weight-bold">
                  FitFood 
                </h1>
                <div class="title black--text mt-4">
                  Find your FitFood! 
                </div>
                <v-btn color="white" router :to="{name : 'survey'}" round
                 class="title font-weight-bold mt-4 pl-5 pr-5 pa-4">
                 START
                </v-btn>
          </div>
          <v-img src="/static/main1.png" class="ma-5" max-width="40%"></v-img>
          </v-layout>
        </div>
      </v-flex>
      </v-layout>
  </v-fade-transition> -->
</template>


 <style scoped>
  .floating{
    left:49%;
    bottom: 5%;
  }
 </style>
