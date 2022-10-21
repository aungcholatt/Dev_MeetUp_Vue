<template>
      <v-row justify="center">
        <v-dialog v-model="editDialog" persistent max-width="350">
            <template v-slot:activator="{ on }">
                <v-spacer></v-spacer>
                <v-btn fab color="primary" dark v-on="on">
                  <v-icon class="">mdi-pencil</v-icon>
                </v-btn>
            </template>
              <v-card>
                  <v-card-title class="text-h5 purple--text justify-center">
                      Edit Meetup
                    </v-card-title>
                      <v-card-text>
                        <v-text-field name="title"
                        id="title"
                        v-model="editedTitle"
                        required></v-text-field>
                          <v-text-field name="description"
                           id="description" multi-line
                           v-model="editedDescription"
                           required></v-text-field>
                        </v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                  <v-btn color="red darken-1" text @click="editDialog = false">
                      close
                  </v-btn>
                  <v-btn color="info darken-1" text @click="onSaveChanges">
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
      editedTitle: this.meetup.title,
      editedDescription: this.meetup.description
    }
  },
  methods: {
    onSaveChanges () {
      if (this.editedTitle.trim() === '' || this.editedDescription.trim() === '') {
        this.editDialog = true
      } else {
        this.editDialog = false
        this.$store.dispatch('updateMeetupData', {
          id: this.meetup.id,
          title: this.editedTitle,
          description: this.editedDescription
        })
      }
    }
  }
}
</script>
