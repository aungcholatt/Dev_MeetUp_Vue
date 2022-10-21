<template>
    <v-container>
        <v-card>
            <v-card-title class="text-h5 info--text">
              {{ meetup.title }}
                <template v-if="userIsCreator">
                  <app-edit-meetup-details-dialog :meetup="meetup">
                  </app-edit-meetup-details-dialog>
              </template>
            </v-card-title>
            <v-img :src="meetup.imageUrl" height="400" class="ml-2">
            </v-img>
            <v-card-subtitle>
                <div><span class="info--text">{{ meetup.date | date }} - {{ meetup.location }}</span></div>
                  <div class="float-left mt-2">
                    <app-edit-meetup-date-dialog :meetup="meetup" v-if="userIsCreator">
                    </app-edit-meetup-date-dialog>
                  </div>
            </v-card-subtitle>
            <v-card-text><div class="ml-2 mt-5">
              <p>{{ meetup.description }}</p>
            </div></v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn absolute bottom right color="purple" class="white--text">
                Register
              </v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script>
export default {
  props: ['id'],
  name: 'MeetupView',
  data () {
    return {
    }
  },
  computed: {
    meetup () {
      return this.$store.getters.loadedMeetup(this.id)
      // return this.$store.dispatch('createMeetup', this.id)
    },
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    },
    userIsCreator () {
      if (!this.userIsAuthenticated) {
        return false
      }
      return true
      // return this.$store.getters.user.id === this.meetup.creatorId
    }
  }
}
</script>
