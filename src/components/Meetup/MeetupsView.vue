<template>
<v-container>
    <v-card color="info" v-for="meetup in meetups" :key="meetup.id" class="mx-auto mt-2" max-width="1000">
      <v-row class="mb-6">
        <v-col cols="6">
        <v-img :src="meetup.imageUrl" height="200" class="ml-2">
        </v-img>
        </v-col>
         <v-col cols="6" class="white--text mt-4">
        <v-card-title class="text-h5">
            {{ meetup.title }}
        </v-card-title>
        <v-card-subtitle>{{ meetup.date | date }}</v-card-subtitle>
        <v-card-actions>
            <v-btn :to="'/meetup/'+ meetup.id" color="purple darken-1" class="white--text">
                <v-icon left>mdi-arrow-right-thick</v-icon>
                ViewMeetUp
            </v-btn>
         </v-card-actions>
       </v-col>
      </v-row>
    </v-card>
</v-container>
</template>

<script>
export default {
  name: 'MeetupsView',
  mounted () {

  },
  computed: {
    meetups () {
      return this.$store.getters.loadedMeetups
    }
  }
}
</script>
