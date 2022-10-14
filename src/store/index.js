import Vue from 'vue'
import Vuex from 'vuex'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
// import { FirebaseError } from 'firebase/app'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loadedMeetups: [
      { imageUrl: 'https://media.cntraveler.com/photos/5a8f3b070e2cf839e9dbfa1d/2:1/w_2560%2Cc_limit/NYC_GettyImages-640006562.jpg', id: 'afajfjadjgja323', title: 'Meetup in New York', date: '23-10-2022', location: 'New York', description: 'It is New York' },
      { imageUrl: 'https://media.nomadicmatt.com/2022/parisguide2.jpeg', id: 'asfashgfadefg34', title: 'Meetup in Paris', date: '23-10-2021', location: 'Paris', description: 'It is Paris' },
      { imageUrl: 'https://www.nationsonline.org/gallery/UK/London-CBD.jpg', id: 'aadsfhbkhlk1242', title: 'Meetup in London', date: '23-10-2020', location: 'London', description: 'It is London' }
    ],
    user: null
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
    }
  },
  mutations: {
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload)
    },
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    createMeetup ({ commit }, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date,
        id: 'fvcasjdfkj777'
      }
      // Store it in Firebase
      commit('createMeetup', meetup)
    },
    signUserUp ({ commit }, payload) {
      createUserWithEmailAndPassword(getAuth(), payload.email, payload.password)
        .then(
          user => {
            const newUser = {
              id: user.uid,
              registeredMeetups: []
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            console.log(error)
          }
        )
    },
    signUserIn ({ commit }, payload) {
      signInWithEmailAndPassword(getAuth(), payload.email, payload.password)
        .then(
          user => {
            const newUser = {
              id: user.uid,
              registeredMeetups: []
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            console.log(error)
          }
        )
    }
  },
  modules: {
  }
})
