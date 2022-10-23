<template>
  <v-container>
    <v-card class="mx-auto mt-4" max-width="800">
      <v-sheet row class="d-flex justify-center">
        <h3 class="info--text">Create a new Meetup</h3>
      </v-sheet>
      <form @submit.prevent="onCreateMeetup()">
        <v-container>
          <v-col cols="12" class="">
            <v-text-field name="title" label="Title" id="title" v-model="title" required></v-text-field>
            <v-text-field name="location" label="Location" id="location" v-model="location" required>
            </v-text-field>
            <v-text-field name="imageUrl" label="Image URL" id="image-url" class="shrink" v-model="imageUrl" required>
            </v-text-field>
            <img :src="imageUrl">
            <v-text-field name="description" label="Description" id="description" v-model="description" multi-line
              required></v-text-field>
            <h4 class="text-info">Choose a Date & Time</h4>
            <v-sheet class="d-flex justify-center">
              <div class="mb-6">
                <v-row>
                  <v-col>
                  <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y
                    min-width="auto">
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field v-model="date" label="*Choose Date*" prepend-icon="mdi-calendar" readonly v-bind="attrs"
                        v-on="on"></v-text-field>
                    </template>
                    <v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
                  </v-menu>
                  </v-col>
                </v-row>
              </div>
            </v-sheet>
            <v-sheet class="d-flex justify-center">
              <div>
                <v-row>
                  <v-col>
                    <v-time-picker></v-time-picker>
                  </v-col>
                </v-row>
              </div>
            </v-sheet>
          </v-col>
        </v-container>
        <v-sheet row class="d-flex justify-center mt-3">
          <v-btn color="primary" type="submit">CreateMeetup</v-btn>
        </v-sheet>
        <span>&nbsp;</span>
      </form>
    </v-card>
  </v-container>
</template>
<script>

export default {
  name: 'HomeView',
  data: () => ({
    date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    menu2: false,
    title: '',
    location: '',
    imageUrl: '',
    description: '',
    // date: new Date(),
    time: new Date()
  }),
  computed: {
    formIsValid () {
      return this.title !== '' && this.location !== '' && this.imageUrl !== '' && this.description !== ''
    },
    submittableDateTime () {
      const date = new Date(this.date)
      if (typeof this.time === 'string') {
        const hours = this.time.match(/^(\d+)/)[1]
        const minutes = this.time.match(/:(\d+)/)[1]
        date.setHours(hours)
        date.setMinutes(minutes)
      } else {
        date.setHours(this.time.getHours())
        date.setMinutes(this.time.getMinutes())
      }
      return date
    }
  },
  methods: {
    onCreateMeetup () {
      if (!this.formIsValid) {
        return
      }
      const meetupData = {
        title: this.title,
        location: this.location,
        imageUrl: this.imageUrl,
        description: this.description,
        date: this.submittableDateTime
      }
      this.$store.dispatch('createMeetup', meetupData)
      this.$router.push('/accv/')
    }
  }
}
</script>
