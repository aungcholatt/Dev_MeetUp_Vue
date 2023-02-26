<template>
  <v-row justify="center">
    <v-dialog v-model="editDialog" persistent max-width="800">
      <template v-slot:activator="{ on }">
        <v-spacer></v-spacer>
        <v-btn fab color="primary" dark v-on="on">
          <v-icon class="">mdi-pencil</v-icon>
        </v-btn>
      </template>
      <form :meetup="meetup" @submit.prevent="EditedMeetup()">
        <v-card>
          <v-card-title class="text-h5 purple--text justify-center">
            Edit Meetup
          </v-card-title>
          <v-card-text>
            <v-text-field name="title" id="title" v-model="title" required></v-text-field>
            <v-text-field name="location" id="location" v-model="location" required></v-text-field>
              <v-btn color="primary" @click="onPickFile()">
                Upload Image
              </v-btn>
              <input type="file" style="display: none" ref="fileInput" accept="image/*" @change="onFilePicked">
              <v-row class="mb-2 justify-center "><img :src="imageUrl" height="150"></v-row>
            <!-- <v-text-field name="imageUrl" label="Image URL" id="imageUrl" class="shrink" v-model="imageUrl" required>
            </v-text-field>
            <img :src="imageUrl"> -->
            <v-text-field name="description" id="description" multi-line v-model="description" required>
            </v-text-field>
            <h4 class="text-info">Choose a Date & Time</h4>
            <v-sheet class="d-flex justify-center">
              <div class="mb-6">
                <v-row>
                  <v-col>
                    <v-menu v-model="menu2" :close-on-content-click="false" :nudge-right="40"
                      transition="scale-transition" offset-y min-width="auto">
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field v-model="date" label="*Choose Date*" prepend-icon="mdi-calendar" readonly
                          v-bind="attrs" v-on="on"></v-text-field>
                      </template>
                      <v-date-picker v-model="date" @input="menu2 = false"></v-date-picker>
                    </v-menu>
                  </v-col>
                </v-row>
              </div>
            </v-sheet>
            <v-sheet class="d-flex justify-center">
              <div class="mb-6">
                <v-row>
                  <v-col>
                  <v-row justify="space-around" align="center">
                    <v-time-picker v-model="time" scrollable></v-time-picker>
                  </v-row>
                  </v-col>
                </v-row>
              </div>
            </v-sheet>
          </v-card-text>
          <v-sheet class="d-flex justify-center mb-2">
            <v-card-actions>
              <div class="mr-4">
                <v-btn color="red darken-1" text @click="editDialog = false">
                  close
                </v-btn>
              </div>
              <div class="ml-4">
                <v-btn color="info darken-1" type="submit">
                  save
                </v-btn>
              </div>
            </v-card-actions>
          </v-sheet>
        </v-card>
      </form>
    </v-dialog>
  </v-row>
</template>
<script>
import { getDatabase, ref, remove } from 'firebase/database'
export default {
  props: ['meetup'],
  data () {
    return {
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu2: false,
      picker: null,
      time: this.meetup.time,
      editDialog: false,
      image: null,
      title: this.meetup.title,
      location: this.meetup.location,
      imageUrl: this.meetup.imageUrl,
      description: this.meetup.description
    }
  },
  computed: {
    formIsValid () {
      return this.title !== '' && this.location !== '' && this.imageUrl !== '' && this.description !== '' && this.setHours !== ''
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
    EditedMeetup (payload, getters) {
      if (!this.formIsValid) {
        return
      }
      if (!this.image) {
        alert('Please Choose Image File Edit!')
        return
      }
      if (!this.time) {
        alert('Please Choose Time Edit!')
        return
      }
      const payloadKey = this.$store.getters.loadedMeetups[0].id
      const db = getDatabase()
      const removes = {}
      removes['/meetups/' + payloadKey] = removes
      remove(ref(db), '/meetups/', payloadKey, removes)
      const meetupData = {
        title: this.title,
        location: this.location,
        image: this.image,
        description: this.description,
        date: this.submittableDateTime
      }
      this.$store.dispatch('createMeetup', meetupData)
      this.$router.push('/accv/')
    },
    onPickFile () {
      this.$refs.fileInput.click()
    },
    onFilePicked (event) {
      const files = event.target.files
      const filename = files[0].name
      if (filename.lastIndexOf('.') <= 0) {
        return alert('please add a valid file!')
      }
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.image = files[0]
    }
  }
}
</script>
