import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import AlertCmp from './components/Shared/AlertView.vue'
import { getAuth } from 'firebase/auth'

Vue.config.productionTip = false
Vue.component('app-alert', AlertCmp)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created () {
    const firebaseConfig = {
      apiKey: 'AIzaSyBlUdHCJkgQancGS3ymM15kJAQSoAfYssA',
      authDomain: 'meetup-9dbba.firebaseapp.com',
      databaseURL: 'https://meetup-9dbba-default-rtdb.asia-southeast1.firebasedatabase.app',
      projectId: 'meetup-9dbba',
      storageBucket: 'meetup-9dbba.appspot.com',
      messagingSenderId: '450507481014',
      appId: '1:450507481014:web:6d6bbd9cc029999f5deb17'
    }
    // const firebaseConfig = {
    //   apiKey: 'AIzaSyBAMdeKVkbfjma1O2JzuqHEjJ-ZyJ99bPQ',
    //   authDomain: 'dvmeetup.firebaseapp.com',
    //   databaseURL: 'https://dvmeetup-default-rtdb.asia-southeast1.firebasedatabase.app',
    //   projectId: 'dvmeetup',
    //   storageBucket: 'dvmeetup.appspot.com',
    //   messagingSenderId: '313664811334',
    //   appId: '1:313664811334:web:537e8c1a467631fc303547'
    // }
    initializeApp(firebaseConfig)
    this.$store.dispatch('loadMeetups')
    getAuth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
  }
}).$mount('#app')

const db = getDatabase()
const auth = getAuth()
export { db, auth }
