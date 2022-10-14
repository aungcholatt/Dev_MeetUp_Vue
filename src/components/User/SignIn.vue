<template>
  <v-container>
    <v-card class="mx-auto mt-4" max-width="600">
      <v-sheet row class="d-flex justify-center">
        <h3 class="info--text">SignIn</h3>
      </v-sheet>
      <form @submit.prevent="onSignIn">
        <v-container>
          <v-col cols="12" class="">
            <v-text-field name="email" label="Email" id="email" v-model="email" type="email" required>
            </v-text-field>
            <v-text-field name="password" label="Password" id="password" v-model="password" type="password" required>
            </v-text-field>
          </v-col>
        </v-container>
        <v-sheet row class="d-flex justify-center">
          <v-btn color="primary" type="submit">signin</v-btn>
        </v-sheet>
      </form>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'SignIn',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    comparePasswords () {
      return this.password !== this.confirmPassword ? 'Passwords do not match' : ''
    },
    user () {
      return this.$store.getters.user
    }
  },
  //  Vue Instance
  watch: {
    user (value) {
      if (value !== null && value !== undefined) {
        this.$router.push('/')
      }
    }
  },
  methods: {
    onSignIn () {
      this.$store.dispatch('signUserIn', { email: this.email, password: this.password })
      // console.log('signUserUp', { email: this.email, password: this.password })
    },
    onDismissed () {
      console.log('Dismissed Alert!')
      this.$store.dispatch('clearError')
    }
  }
}
</script>
