import Vue from 'vue'
import Vuex from 'vuex'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { getDatabase, push, onValue, set, ref, update, get, child, remove } from 'firebase/database'
// import { getStorage, child, update } from 'firebase/database'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loadedMeetups: [
      { imageUrl: 'https://content.r9cdn.net/rimg/dimg/fd/9a/f4a5d916-lm-11128-16df86b6e99.jpg?width=1750&height=1000&xhint=1411&yhint=767&crop=true', id: 'afajfjadjgja323', title: 'Meetup in New York', date: new Date(), location: 'New York', description: 'It is New York' },
      { imageUrl: 'https://media.nomadicmatt.com/2022/parisguide2.jpeg', id: 'asfashgfadefg34', title: 'Meetup in Paris', date: new Date(), location: 'Paris', description: 'It is Paris' },
      { imageUrl: 'https://www.nationsonline.org/gallery/UK/London-CBD.jpg', id: 'aadsfhbkhlk1242', title: 'Meetup in London', date: new Date(), location: 'London', description: 'It is London' }
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
    email (state) {
      return state.email
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }
  },
  mutations: {
    registerUserForMeetup (state, payload) {
      const id = payload.id
      if (state.user.registeredMeetups.findIndex(meetup => meetup.id === id) >= 0) {
        return
      }
      state.user.registeredMeetups.push(id)
      // this.getters.user.fbKey[payload] = payload.fbKey
      state.user.fbKeys[id] = payload.fbKey
    },
    unregisterUserFormMeetup (state, payload) {
      const registeredMeetups = state.user.registeredMeetups
      registeredMeetups.splice(registeredMeetups.findIndex(meetup => meetup.id === payload), 1)
      Reflect.deleteProperty(state.user.fbKeys, payload)
    },
    setLoadedMeetups (state, payload) {
      state.loadedMeetups = payload
    },
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload)
    },
    updateMeetup (state, payload) {
      const meetup = state.loadedMeetups.find(meetup => {
        return meetup.id === payload.id
      })
      if (payload.title) {
        meetup.title = payload.title
      }
      if (payload.description) {
        meetup.description = payload.description
      }
      if (payload.date) {
        meetup.date = payload.date
      }
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
    registerUserForMeetup ({ commit, getters }, payload) {
      const user = getters.user
      const updates = {}
      const db = getDatabase()
      const payloadKey = push(child(ref(db), 'users')).key
      const registration = { payloadId: payload }
      const payloadId = registration.id
      // const key = id.key
      updates['/users/' + user.id + '/registrations/' + payloadKey] = payload
      return update(ref(db), updates)
        .then(data => {
          alert('Now! Meetup is register successfully.')
          commit('registerUserForMeetup', { id: payloadId, fbKey: data.key })
          commit('registerUserForMeetup', payload)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    unregisterUserFormMeetup ({ commit, getters }, payload) {
      commit('setLoading', true)
      const payloadKey = getters.loadedMeetups[0].creatorId
      // const key = getters.user.fbKey[payload]
      const db = getDatabase()
      const removes = { payloadKey }
      const newPostKey = push(child(ref(db), 'users'), payloadKey).key
      removes['/users/' + payloadKey + '/registration/' + newPostKey] = removes
      return remove(ref(db), 'users', removes)
        .then(() => {
          commit('setLoading', false)
          alert('Unregister successfully.')
          commit('unregisterUserFormMeetup', payload)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    // Data Fetching Process
    loadMeetups ({ commit }, id) {
      const db = getDatabase()
      const starCountRef = ref(db, 'meetups/')
      onValue(starCountRef, (snapshot) => {
        const meetups = []
        const obj = snapshot.val()
        for (const key in obj) {
          meetups.push({
            id: key,
            title: obj[key].title,
            location: obj[key].location,
            description: obj[key].description,
            imageUrl: obj[key].imageUrl,
            date: obj[key].date,
            creatorId: obj[key].creatorId
          })
        }
        commit('setLoadedMeetups', meetups)
      })
    },
    // Writing Process
    createMeetup ({ commit, getters }, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date.toISOString(),
        creatorId: getters.user.id
      }
      // let imageUrl
      writeUserData()
      function writeUserData () {
        const db = getDatabase()
        const meetUpsRef = ref(db, 'meetups/')
        const data = push(meetUpsRef)
        const refData = data
        console.log(refData)
        const key = data.key
        set(data, {
          ...meetup,
          id: key
        })
        // Image Uploading process
        // return key
          // }
          // writeNewPost()
          // function writeNewPost () {
          //   let newKey = key
          //   const storage = getStorage()
          //   const newData = {
          //     image: payload.image
          //   }
          //   newKey = push(child(ref(storage), '/meetups/', '/meetup/')).key
          //   const filename = payload.image.name
          //   const ext = filename.slice(filename.lastIndexOf('.'))
          //   storage().ref('meetups/' + newKey + ext)
          //   const updates = {}
          //   updates['/meetups/' + newKey] = newData
          //   updates['/update-meetups/' + ext + '/' + newKey] = newData
          //   return update(ref(storage), updates)
          .catch((error) => {
            console.log(error)
          })
        // commit('createMeetup', {
        //   ...meetup,
        //   imageUrl: imageUrl,
        //   id: key
        // })
        // set(ref, {
        //   title: payload.title,
        //   location: payload.location,
        //   // imageUrl: payload.imageUrl,
        //   description: payload.description,
        //   date: payload.date.toISOString(),
        //   creatorId: getters.user.id
        // })
      }
    },
    // Authentication Process
    signUserUp ({ commit }, payload) {
      commit('setLoading', true)
      commit('clearError')
      createUserWithEmailAndPassword(getAuth(), payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              registeredMeetups: [],
              fbKeys: {}
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
              email: user.email,
              registeredMeetups: [],
              fbKeys: {}
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
    autoSignIn ({ commit }, payload) {
      commit('setUser', {
        id: payload.uid,
        email: payload.email,
        registeredMeetups: [],
        fbKeys: {}
      })
    },
    // Fetching User Register Data
    fetchUserData ({ commit, getters }) {
      const dbRef = ref(getDatabase())
      get(child(dbRef, `users/${getters.user.id}`)).then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val()
          const dataPairs = data.registrations
          // console.log(dataPairs)
          const registeredMeetups = []
          const swappedPairs = {}
          for (const key in dataPairs) {
            registeredMeetups.push(dataPairs[key])
            swappedPairs[dataPairs[key]] = key
          }
          const updatedUser = {
            id: getters.user.id,
            email: getters.user.email,
            registeredMeetups: registeredMeetups,
            fbKey: swappedPairs
          }
          commit('setUser', updatedUser)
        } else {
          console.log('No data available')
        }
      })
        .catch((error) => {
          console.error(error)
        })
    },
    logout ({ commit }) {
      getAuth().signOut()
      commit('setUser', null)
    },
    clearError ({ commit }) {
      commit('clearError')
    }
  },
  modules: {
  }
})
