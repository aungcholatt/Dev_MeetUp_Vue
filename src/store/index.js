import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loadedMeetups: [
      { imageUrl: 'https://media.cntraveler.com/photos/5a8f3b070e2cf839e9dbfa1d/2:1/w_2560%2Cc_limit/NYC_GettyImages-640006562.jpg', id: 'afajfjadjgja323', title: 'Meetup in New York', date: '23-10-2022' },
      { imageUrl: 'https://media.nomadicmatt.com/2022/parisguide2.jpeg', id: 'asfashgfadefg34', title: 'Meetup in Paris', date: '23-10-2021' },
      { imageUrl: 'https://www.nationsonline.org/gallery/UK/London-CBD.jpg', id: 'aadsfhbkhlk1242', title: 'Meetup in London', date: '23-10-2020' }
    ],
    user: {
      id: 'ajgregedffdw12',
      registeredMeetups: ['aadsfhbkhlk1242']
    }
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
    }
  },
  mutations: {
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload)
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
    }
  },
  modules: {
  }
})
