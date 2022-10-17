import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import AlertCmp from './components/Shared/AlertView.vue'

Vue.config.productionTip = false
Vue.component('app-alert', AlertCmp)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created () {
    // this.$store.dispatch('loadMeetups')
  }
}).$mount('#app')

const firebaseConfig = {
  apiKey: 'AIzaSyBAMdeKVkbfjma1O2JzuqHEjJ-ZyJ99bPQ',
  authDomain: 'dvmeetup.firebaseapp.com',
  databaseURL: 'https://dvmeetup-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'dvmeetup',
  storageBucket: 'dvmeetup.appspot.com',
  messagingSenderId: '313664811334',
  appId: '1:313664811334:web:537e8c1a467631fc303547'
}
initializeApp(firebaseConfig)
const db = getDatabase()
export { db }

// this.$store.dispatch('loadMeetups')
