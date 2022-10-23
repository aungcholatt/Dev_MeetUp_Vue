<template>
    <v-row justify="center">
        <v-dialog v-model="editDialog" persistent max-width="400">
            <template v-slot:activator="{ on }">
                <v-spacer></v-spacer>
                <v-btn  color="primary" dark v-on="on">
                    Edit Time
                </v-btn>
            </template>
            <v-card>
                <v-card-title class="text-h5 purple--text justify-center">
                    Edit Meetup Time
                </v-card-title>
                <v-card-text>
                    <v-sheet class="d-flex justify-center">
                        <div class="mb-2">
                            <v-row>
                                <v-col>
                                    <v-time-picker :v-model="editableTime" width="290" action></v-time-picker>
                                </v-col>
                            </v-row>
                        </div>
                    </v-sheet>
                 </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="red darken-1" text @click.native="editDialog = false">
                            close
                        </v-btn>
                        <v-btn color="info darken-1" text @click.native="onSaveChanges">
                            save
                        </v-btn>
                    </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
export default {
  props: ['meetup'],
  data () {
    return {
      editDialog: false,
      editableTime: null
    }
  },
  methods: {
    onSaveChanges () {
      const newDate = new Date(this.meetup.date)
      const hours = this.editableTime.match(/^(\d+)/)[1]
      const minutes = this.editableTime.match(/:(\d+)/)[1]
      newDate.setHours(hours)
      newDate.setMinutes(minutes)
      this.$store.dispatch('updateMeetupData', {
        id: this.meetup.id,
        date: newDate
      })
    }
  },
  created () {
    this.editableTime = new Date(this.meetup.date).toTimeString()
  }
}
</script>
