<template>
    <v-row justify="center">
        <v-dialog v-model="registerDialog" persistent max-width="350">
            <template v-slot:activator="{ on }">
                <v-spacer></v-spacer>
                <v-btn  color="primary" dark v-on="on">
                    {{ userIsRegistered ? 'Unregister' : 'Register' }}
                </v-btn>
            </template>
            <v-card>
                <v-card-title v-if="userIsRegistered" class="text-h6 purple--text justify-center">
                    Unregister for Meetup ?
                </v-card-title>
                <v-card-title v-else class="text-h6 purple--text justify-center">
                    Register for Meetup ?
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text class="d-flex justify-center mt-4 info--text">
                   You can alway change your decion later on.
                 </v-card-text>
                 <v-divider></v-divider>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="red darken-1" text @click.native="registerDialog = false">
                            cancel
                        </v-btn>
                        <v-btn color="green darken-1" text @click.native="onAgree()">
                            confirm
                        </v-btn>
                    </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
export default {
  props: ['meetupId'],
  data () {
    return {
      registerDialog: false
    }
  },
  computed: {
    userIsRegistered () {
      return this.$store.getters.user.registeredMeetups.findIndex(meetupId => {
        return meetupId === this.meetupId
      }) >= 0
    }
  },
  methods: {
    onAgree () {
      if (this.userIsRegistered) {
        this.$store.dispatch('unregisterUserFormMeetup', this.meetupId)
        this.regiserDialog = true
      } else {
        this.$store.dispatch('registerUserForMeetup', this.meetupId)
        this.registerDialog = false
      }
    }
  }
}
</script>
