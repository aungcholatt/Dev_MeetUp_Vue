import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import DateFilter from './filters/date'
import vuetify from './plugins/vuetify'
import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { getStorage } from 'firebase/storage'
import { getAuth } from 'firebase/auth'
import AlertCmp from './components/Shared/AlertView.vue'
import EditMeetupDetailsDialogVue from './components/Meetup/Edit/EditMeetupDetailsDialog.vue'
import RegisterDialogVue from './components/Meetup/Registration/RegisterDialog.vue'

Vue.config.productionTip = false
Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertCmp)
Vue.component('app-edit-meetup-details-dialog', EditMeetupDetailsDialogVue)
Vue.component('app-meetup-register-dialog', RegisterDialogVue)
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created () {
    const firebaseConfig = {
      apiKey: 'AIzaSyBAMdeKVkbfjma1O2JzuqHEjJ-ZyJ99bPQ',
      authDomain: 'dvmeetup.firebaseapp.com',
      databaseURL: 'https://dvmeetup-default-rtdb.asia-southeast1.firebasedatabase.app',
      projectId: 'dvmeetup',
      storageBucket: 'gs://dvmeetup.appspot.com',
      messagingSenderId: '313664811334',
      appId: '1:313664811334:web:537e8c1a467631fc303547'
      // apiKey: 'AIzaSyBlUdHCJkgQancGS3ymM15kJAQSoAfYssA',
      // authDomain: 'meetup-9dbba.firebaseapp.com',
      // databaseURL: 'https://meetup-9dbba-default-rtdb.asia-southeast1.firebasedatabase.app',
      // projectId: 'meetup-9dbba',
      // storageBucket: 'gs://meetup-9dbba.appspot.com',
      // messagingSenderId: '450507481014',
      // appId: '1:450507481014:web:6d6bbd9cc029999f5deb17'
    }
    initializeApp(firebaseConfig)
    getAuth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
        this.$store.dispatch('fetchUserData')
      }
    })
    this.$store.dispatch('loadMeetups')
  }
}).$mount('#app')

const { db } = getDatabase()
const storage = getStorage()
const auth = getAuth()
export { db, storage, auth }
