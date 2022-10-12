<template>
    <v-container>
        <v-card>
            <v-sheet row class="d-flex justify-center">
                <h3 class="info--text">Create a new Meetup</h3>
            </v-sheet>
            <form @submit.prevent="onCreateMeetup()">
                <v-container>
                    <v-col cols="12" class="">
                        <v-text-field name="title" label="Title" id="title" v-model="title" required></v-text-field>
                        <v-text-field name="location" label="Location" id="location" v-model="location" required>
                        </v-text-field>
                        <v-text-field name="imageUrl" label="Image URL" id="image-url" v-model="imageUrl" required>
                        </v-text-field>
                        <img :src="imageUrl">
                        <v-text-field name="description" label="Description" id="description" v-model="description"
                            multi-line required></v-text-field>
                        <h5 class="text-info">Choose a Date & Time</h5>
                        <v-sheet class="d-flex justify-center">
                        <div class="mb-2">
                        <v-row>
                        <v-col>
                        <v-date-picker v-model="date"></v-date-picker>
                        <p>{{ date }}</p>
                        </v-col>
                        </v-row>
                        </div>
                        </v-sheet>
                        <v-sheet class="d-flex justify-center">
                        <div>
                        <v-row>
                          <v-col>
                          <v-time-picker v-model="time"></v-time-picker>
                          <p>{{ time }}</p>
                          </v-col>
                       </v-row>
                       </div>
                      </v-sheet>
                    </v-col>
                </v-container>
                <v-sheet row class="d-flex justify-center">
                    <v-btn color="primary" type="submit">CreateMeetup</v-btn>
                </v-sheet>
            </form>
        </v-card>
    </v-container>
</template>
<script>
export default {
  name: 'HomeView',
  data: () => ({
    title: '',
    location: '',
    imageUrl: '',
    description: '',
    date: '',
    time: ''
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
      // console.log(date)
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
      this.$router.push('/meetups')
    }
  }
}
</script>
