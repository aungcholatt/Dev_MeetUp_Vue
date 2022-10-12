<template>
<v-container>
    <v-card color="info" class="mx-auto mt-2" max-width="600">
      <v-row>
        <v-col cols="6">
        <v-img src="https://www.nationsonline.org/gallery/UK/London-CBD.jpg" height="200" class="ml-2">
        </v-img>
        </v-col>
         <v-col cols="6" class="white--text mt-4">
        <v-card-title class="text-h5">
            MyMeetUp
        </v-card-title>
        <v-card-subtitle>14 Sep 20222</v-card-subtitle>
        <v-card-actions>
            <v-btn router to="/meetups/1" color="purple darken-1" class="white--text">
                <v-icon left>mdi-arrow-right-thick</v-icon>
                ViewMeetUp
            </v-btn>
         </v-card-actions>
       </v-col>
      </v-row>
    </v-card>
</v-container>
</template>
