<template>
  <v-container>
    <v-card class="" v-bind="meetup in meetup" :key="meetup.id">
      <v-card-title :id="meetup" class="text-h5 info--text">
        {{ meetup.title }}
        <template v-if="userIsCreator">
          <app-edit-meetup-details-dialog :meetup="meetup">
          </app-edit-meetup-details-dialog>
        </template>
      </v-card-title>
      <v-img :id="meetup" :src="meetup.imageUrl" height="400" class="ml-2">
      </v-img>
      <v-card-subtitle>
        <div><span :id="meetup" class="info--text">{{ meetup.date | date }} - {{ meetup.location }}</span></div>
        <!-- <div class="float-left mt-6 d-flex justify-center">
          <v-row>
            <div class="mr-6 ml-3">
              <app-edit-meetup-date-dialog :meetup="meetup" v-if="userIsCreator">
              </app-edit-meetup-date-dialog>
            </div>
            <div class="ml-2">
              <app-edit-meetup-time-dialog :meetup="meetup" v-if="userIsCreator">
              </app-edit-meetup-time-dialog>
            </div>
          </v-row>
        </div> -->
      </v-card-subtitle>
      <v-card-text>
        <div class="ml-1 mt-1">
          <p :id="meetup">{{ meetup.description }}</p>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <div class="mb-6 mr-4">
          <app-meetup-register-dialog :meetupId="meetup.id">
          </app-meetup-register-dialog>
        </div>
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
      // return this.$store.getters.loadedMeetups[0]
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
