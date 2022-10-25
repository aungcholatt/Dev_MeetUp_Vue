<template>
  <div id="app">
    <v-app id="inspire">
      <v-sheet>
        <v-toolbar color="purple darken-1 white--text">
          <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="hidden-sm-and-up" color="white">
          </v-app-bar-nav-icon>
          <v-toolbar-title>
            <router-link to="/" custom style="cursor: pointer" v-slot="{ navigate }">
              <span @click="navigate">DevMeetUp</span>
            </router-link>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items class="hidden-xs-only">
            <v-btn depressed v-for="item in menuItems" :key="item.title" class="purple darken-1 white--text" router
              :to="item.link">
              <v-icon left>{{ item.icon }}</v-icon>
              {{ item.title }}
            </v-btn>
            <v-btn depressed class="purple darken-1 white--text" v-if="userIsAuthenticated" @click="onLogout">
              <v-icon left>mdi-exit-to-app</v-icon>
              Logout
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-main>
          <router-view></router-view>
        </v-main>
        <v-navigation-drawer v-model="drawer" absolute temporary>
          <v-list>
            <v-list-item-title>
              <v-card class="px-5 py-5 white--text" color="primary" v-for="item in menuItems" :key="item.title" router
                :to="item.link">
                <v-icon left class="white--text">{{ item.icon }}</v-icon>
                {{ item.title }}
              </v-card>
            </v-list-item-title>
            <v-list-item-title>
              <v-card class="px-5 py-5 white--text" color="primary" v-if="userIsAuthenticated" @click="onLogout">
                <v-icon left class="white--text">mdi-exit-to-app</v-icon>
                Logout
              </v-card>
            </v-list-item-title>
          </v-list>
        </v-navigation-drawer>
      </v-sheet>
    </v-app>
  </div>
</template>

<script>
export default {
  data () {
    return {
      drawer: false
    }
  },
  computed: {
    menuItems () {
      let menuItems = [
        { icon: 'mdi-account-plus-outline', title: 'SignUp', link: '/signup' },
        { icon: 'mdi-lock-open', title: 'SignIn', link: '/signin' }
      ]
      if (this.userIsAuthenticated) {
        menuItems = [
          { icon: 'mdi-account-supervisor', title: 'ViewMeetUps', link: '/accv/' },
          { icon: 'mdi-map-marker', title: 'Organize MeetUp', link: '/meetup/new' },
          { icon: 'mdi-account', title: 'Profile', link: '/profile' }
        ]
      }
      return menuItems
    },
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    }
  },
  methods: {
    onLogout () {
      this.$store.dispatch('logout')
    }
  }
}
</script>
