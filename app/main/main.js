import axios from 'axios'
import Vue from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'

Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.filter('two_digits', function (value) {
    if(value.toString().length <= 1)
    {
        return "0"+value.toString();
    }
    return value.toString();
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})


