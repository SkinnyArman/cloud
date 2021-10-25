import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VAnimateCss from 'v-animate-css';
import Vuelidate from 'vuelidate';

Vue.config.productionTip = false

const newApp=new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
})

Vue.use(VAnimateCss);
Vue.use(Vuelidate)


newApp.$mount('#app')
