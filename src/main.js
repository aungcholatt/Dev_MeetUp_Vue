import Vue from 'vue'
import App from './App.vue'
import * as firebase from 'firebase/app'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyDe-MI6kVKEFYl9tDl-W4r2_oP3sCcSuf4',
      authDomain: 'devmeetup-2be2f.firebaseapp.com',
      projectId: 'devmeetup-2be2f',
      storageBucket: '',
      appId: '1:117216801789:web:b36358cd560bf10cb39f94'
    })
  }
}).$mount('#app')
