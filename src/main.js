import Vue from 'vue';
import App from './App.vue';
import { router } from './router'; // router'ı doğru bir şekilde import edin,burada sabit export ettiğimiz için süslü parantez kullanılıyor
import store from "./store"
Vue.config.productionTip = false;

new Vue({
  router, // router'ı Vue instance'ına ekleyin
  store,
  render: h => h(App),
}).$mount('#app');
