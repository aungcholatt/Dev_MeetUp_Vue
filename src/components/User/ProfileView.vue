<template>
    <v-container>
        <!-- <v-card class="mx-auto mt-4" max-width="600">
        </v-card> -->
        <v-card class="mx-auto mt-4" max-width="600">
            <v-sheet row class="d-flex justify-center mt-4">
                <h3 class="info--text mt-4">User Profile</h3>
            </v-sheet>
            <v-card-text>
                <v-col>
                <v-sheet class="d-flex justify-center">
                <div class="">
                <v-sheet class="d-flex justify-center info--text mb-4">
                    <v-icon x-large>mdi-account</v-icon>
                </v-sheet>
                <v-data-table
                :headers="headers"
                :items="info" hide-default-header hide-default-footer class="elevation-1">
                </v-data-table>
                </div>
                </v-sheet>
                </v-col>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
export default {
  data () {
    return {
      id: '',
      email: '',
      headers: [
        {
          text: 'UserInfo',
          align: 'start',
          value: 'name'
        },
        { text: 'UserValues', value: 'userValue' }
      ],
      info: [
        {
          name: 'User ID:',
          userValue: this.$store.getters.user.id
        },
        {
          name: 'User Email:',
          userValue: this.$store.getters.user.email
        }
      ]
    }
  }
}
</script>
