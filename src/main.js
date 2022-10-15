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
  render: h => h(App)
}).$mount('#app')

const firebaseConfig = {
  apiKey: 'AIzaSyDe-MI6kVKEFYl9tDl-W4r2_oP3sCcSuf4',
  authDomain: 'devmeetup-2be2f.firebaseapp.com',
  databaseURL: 'https://devmeetup-2be2f-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'devmeetup-2be2f',
  storageBucket: 'devmeetup-2be2f.appspot.com',
  messagingSenderId: '117216801789',
  appId: '1:117216801789:web:b36358cd560bf10cb39f94'
}

initializeApp(firebaseConfig)
const db = getDatabase()
export { db }
