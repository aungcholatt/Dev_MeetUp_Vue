<template>
    <v-container>
        <v-card>
            <v-card-title class="text-h5 info--text">
              MyMeetUp
            </v-card-title>
            <v-img src="https://thumbs.dreamstime.com/z/areal-view-rome-italy-beautiful-old-city-full-historical-amazing-buildings-cathedrals-bridges-areal-view-rome-italy-168049696.jpg" height="200" class="ml-2">
            </v-img>
            <v-card-subtitle>
                <span class="info--text">21 Dec 2021</span>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt harum, temporibus iure dolor asperiores</p>
            </v-card-subtitle>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn absolute bottom right color="purple" class="white--text">
                Rigestier
              </v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script>
export default {
  name: 'MeetupView'
  // mounted () {
  //   alert('Hi')
  // }
}
</script>
