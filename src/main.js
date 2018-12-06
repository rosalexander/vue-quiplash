// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueSocketIO from 'vue-socket.io'
import io from 'socket.io-client'

Vue.config.productionTip = false

// Vue.use(new VueSocketIO({
//   debug: true,
//   connection: 'http://' + window.location.hostname + ':3000',
//   vuex: {
//     store,
//     mutationPrefix: 'SOCKET_'
//   }
// }))



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
})

