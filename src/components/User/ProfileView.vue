<template>
    <v-container>
        <v-card class="mx-auto mt-4" max-width="600">
        </v-card>
        <v-card class="mx-auto mt-4" max-width="600">
            <v-sheet row class="d-flex justify-center mt-4">
                <h3 class="info--text mt-2">User Profile</h3>
            </v-sheet>
            <v-card-text>
            <!-- <v-card-text v-for="meetup in meetups" :key="meetup.id"> -->
                <v-col rowspan="2">
                    <v-sheet class="d-flex justify-center info--text mb-4"><v-icon>mdi-image</v-icon></v-sheet>
                <v-col>
                <v-sheet class="d-flex justify-center">
                    <p class="mr-4">Name:</p><p class="ml-4">{{ }}</p>
                </v-sheet>
                </v-col>
                <v-col>
                <v-sheet class="d-flex justify-center">
                    <p class="mr-4">Email:</p><p class="ml-4">{{ }}</p>
                </v-sheet>
                </v-col>
                </v-col>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      email: ''
    }
  }
//   computed: {
//     meetups () {
//       return this.$store.dispatch('')
//     }
//   }
}
</script>
