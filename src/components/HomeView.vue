<template>
  <v-container>
    <v-sheet class="mx-auto mt-4" max-width="800">
      <v-row class="mb-1 justify-center ">
        <v-col cols="6">
          <v-btn rounded router to="/accv/" color="purple darken-1" class="mr-2 mb-1 white--text">Explore Meetups
          </v-btn>
          <v-btn rounded router to="/meetup/new" color="purple darken-1" class="white--text">Organize Meetups</v-btn>
        </v-col>
      </v-row>
    </v-sheet>
    <v-sheet class="mt-1 flex-column">
      <v-carousel style="cursor: pointer;">
        <v-carousel-item v-for="meetup in meetups" :src="meetup.imageUrl" :key="meetup.id"
          @click="onLoadMeetup(meetup.id)">
          <div class="title">{{ meetup.title }}</div>
        </v-carousel-item>
      </v-carousel>
    </v-sheet>
    <v-sheet row wrap class="mt-1 d-flex align-center flex-column ">
      <p class="text-info">Join Our Awesome Meetups!</p>
    </v-sheet>
  </v-container>
</template>

<script>
export default {
  name: 'HomeView',
  computed: {
    meetups () {
      return this.$store.getters.featuredMeetups
    }
  },
  methods: {
    onLoadMeetup (id) {
      this.$router.push('/meetup/' + id)
    }
  }
}
</script>

<style scoped>
.title {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.3);
  color: white;
  font-size: 1em;
  bottom: 30px;
  padding: 20px;
  left: 40%;
}
</style>
