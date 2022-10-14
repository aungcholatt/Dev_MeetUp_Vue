import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { initializeApp } from 'firebase/app'
import AlertCmp from './components/Shared/AlertView.vue'

//
const firebaseConfig = {
  apiKey: 'AIzaSyBlUdHCJkgQancGS3ymM15kJAQSoAfYssA',
  authDomain: 'meetup-9dbba.firebaseapp.com',
  projectId: 'meetup-9dbba',
  storageBucket: 'meetup-9dbba.appspot.com',
  messagingSenderId: '450507481014',
  appId: '1:450507481014:web:6d6bbd9cc029999f5deb17'
}

initializeApp(firebaseConfig)

Vue.config.productionTip = false
Vue.component('app-alert', AlertCmp)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

// firebase.initializeApp({
//   apiKey: 'AIzaSyBAMdeKVkbfjma1O2JzuqHEjJ-ZyJ99bPQ',
//   authDomain: 'dvmeetup.firebaseapp.com',
//   projectId: 'dvmeetup',
//   storageBucket: 'dvmeetup.appspot.com',
//   messagingSenderId: '313664811334',
//   appId: '1:313664811334:web:537e8c1a467631fc303547'
// })
