import Vue from 'vue'
import Vuex from 'vuex'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { getDatabase, DataSnapshot, push, ref, set } from 'firebase/database'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loadedMeetups: [
      { imageUrl: 'https://media.cntraveler.com/photos/5a8f3b070e2cf839e9dbfa1d/2:1/w_2560%2Cc_limit/NYC_GettyImages-640006562.jpg', id: 'afajfjadjgja323', title: 'Meetup in New York', date: '23-10-2022', location: 'New York', description: 'It is New York' },
      { imageUrl: 'https://media.nomadicmatt.com/2022/parisguide2.jpeg', id: 'asfashgfadefg34', title: 'Meetup in Paris', date: '23-10-2021', location: 'Paris', description: 'It is Paris' },
      { imageUrl: 'https://www.nationsonline.org/gallery/UK/London-CBD.jpg', id: 'aadsfhbkhlk1242', title: 'Meetup in London', date: '23-10-2020', location: 'London', description: 'It is London' }
    ],
    user: null,
    loading: false,
    error: null
  },
  getters: {
    loadedMeetups (state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date
      })
    },
    featuredMeetups (state, getters) {
      return getters.loadedMeetups.slice(0, 5)
    },
    loadedMeetup (state) {
      return (meetupId) => {
        return state.loadedMeetups.find((meetup) => {
          return meetup.id === meetupId
        })
      }
    },
    user (state) {
      return state.user
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }
  },
  mutations: {
    setLoadedMeetups (state, payload) {
      state.loadedMeetups = payload
    },
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload)
    },
    setUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    loadMeetups ({ commit }) {
      // const commentsRef = ref(db, 'post-comments/' + postId);
      // onChildChanged(commentsRef, (data) => {
      //   setCommentValues(postElement, data.key, data.val().text, data.val().author)
      // }),
      const db = getDatabase()
      const GetdataRef = ref(db, 'devmeetups/', 'NERa8UaKsQ1tZuj78B6')
      DataSnapshot(GetdataRef)
        .then((doc) => {
          console.log(doc.data(), doc.id)
        })
      // onValue(GetdataRef, (snapshot) => {
      //   snapshot.forEach((childSnapshot) => {
      //     const childKey = childSnapshot.key
      //     const obj = childSnapshot.val()
      //     const key = obj.id
      //     childKey.push({
      //       id: key,
      //       title: obj[key].title,
      //       description: obj[key].description,
      //       imageUrl: obj[key].imageUrl,
      //       date: obj[key].date
      //     })
      //   })
      // },
      // commit('setLoadedMeetups', 'meetups')
      // )
      // const commentsRef = ref(db, 'post-comments/' + postId)
      // onValue(commmetsRef, (snapshot) => {
      //   shapshot.forEach((childSnapshot) => {
      //     const childKey = childSnapshot.key
      //     const childData = childSnapshot.val()
      //   })
      // },
      // {
      //   onlyOnce: true
      // })
    },
    createMeetup ({ commit }, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date.toISOString()
      }
      function writeUserData () {
        const db = getDatabase()
        const meetUpsRef = ref(db, 'devmeetups/', 'meetups')
        const newMeetupRef = push(meetUpsRef)
        const data = newMeetupRef
        console.log(data)
        set(newMeetupRef, {
          title: payload.title,
          location: payload.location,
          imageUrl: payload.imageUrl,
          description: payload.description,
          date: payload.date.toISOString()
        })
          .catch((error) => {
            console.log(error)
          })
      }
      writeUserData()
      commit('createMeetup', meetup)
    },
    signUserUp ({ commit }, payload) {
      commit('setLoading', true)
      commit('clearError')
      createUserWithEmailAndPassword(getAuth(), payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              registeredMeetups: []
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            // console.log(error)
          }
        )
    },
    signUserIn ({ commit }, payload) {
      commit('setLoading', true)
      commit('clearError')
      signInWithEmailAndPassword(getAuth(), payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              registeredMeetups: []
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    clearError ({ commit }) {
      commit('clearError')
    }
  },
  modules: {
  }
})
