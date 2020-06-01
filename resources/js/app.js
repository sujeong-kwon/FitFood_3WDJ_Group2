import Vue from 'vue';
import Vuetify from 'vuetify';
import App from './App.vue';
import router from './router';

Vue.use(Vuetify);

Vue.component('home-component',require('./components/home/Home.vue').default);

const vuetifyOptions = {}

new Vue({
    router,
    vuetify:new Vuetify(vuetifyOptions),
    render: h=>h(App)
}).$mount('#app');

