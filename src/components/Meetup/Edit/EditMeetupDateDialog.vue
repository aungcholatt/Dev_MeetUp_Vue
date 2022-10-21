<template>
    <v-row justify="center">
        <v-dialog v-model="editDialog" persistent max-width="400">
            <template v-slot:activator="{ on }">
                <v-spacer></v-spacer>
                <v-btn  color="primary" dark v-on="on">
                    Edit Date
                </v-btn>
            </template>
            <v-card>
                <v-card-title class="text-h5 purple--text justify-center">
                    Edit Meetup Date
                </v-card-title>
                <v-card-text>
                    <v-sheet class="d-flex justify-center">
                        <div class="mb-2">
                            <v-row>
                                <v-col>
                                    <v-date-picker :v-model="editableDate" full-width action></v-date-picker>
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
      editableDate: null
    }
  },
  methods: {
    onSaveChanges () {
      const newDate = new Date(this.meetup.date)
      const newDay = new Date(this.editableDate).getUTCDate()
      const newMonth = new Date(this.editableDate).getUTCMonth()
      const newYear = new Date(this.editableDate).getUTCFullYear()
      newDate.setUTCDate(newDay)
      newDate.setUTCMonth(newMonth)
      newDate.setUTCFullYear(newYear)
      this.$store.dispatch('updateMeetupData', {
        id: this.meetup.id,
        date: newDate
      })
    }
  },
  created () {
    this.editableDate = new Date(this.meetup.date)
  }
}
</script>
