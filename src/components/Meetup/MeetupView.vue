<template>
    <v-container>
        <v-card>
            <v-card-title class="text-h5 info--text">
              {{ meetup.title }}
            </v-card-title>
            <v-img :src="meetup.imageUrl" height="400" class="ml-2">
            </v-img>
            <v-card-subtitle>
                <span class="info--text">{{ meetup.date }} - {{ meetup.location }}</span>
                <p>{{ meetup.description }}</p>
            </v-card-subtitle>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn absolute bottom right color="purple" class="white--text">
                Registier
              </v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script>
export default {
  props: ['id'],
  name: 'MeetupView',
  computed: {
    meetup () {
      return this.$store.getters.loadedMeetup(this.id)
    }
  }
}
</script>
