<template>
    <v-container>
      <v-card class="mx-auto mt-4" max-width="600">
        <v-sheet v-if="error">
        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
        </v-sheet>
      </v-card>
        <v-card class="mx-auto mt-4" max-width="600">
            <v-sheet row class="d-flex justify-center">
                <h3 class="info--text">SignUp</h3>
            </v-sheet>
            <form @submit.prevent="onSignup">
                <v-container>
                    <v-col cols="12" class="">
                        <v-text-field name="email" label="Email" id="email" v-model="email" type="email" required>
                        </v-text-field>
                        <v-text-field name="password" label="Password" id="password" v-model="password" type="password" required>
                        </v-text-field>
                        <v-text-field name="confirmpassword" label="ConfirmPassword" id="confirmpassword" v-model="confirmpassword" type="password" :rules="[comparePasswords]">
                        </v-text-field>
                    </v-col>
                </v-container>
                <v-sheet row class="d-flex justify-center">
                    <v-btn color="primary" type="submit"
                    :loading="loading4"
                    :disabled="loading4"
                    @click="loader = 'loading4'">
                      <template v-slot:loader>
                        <span class="custom-loader">
                          <v-icon light>mdi-cached</v-icon>
                        </span>
                      </template>
                      SignUp</v-btn>
                </v-sheet>
                <span>&nbsp;</span>
            </form>
        </v-card>
    </v-container>
</template>

<script>
export default {
  name: 'SignUp',
  data () {
    return {
      email: '',
      password: '',
      confirmpassword: ''
    }
  },
  computed: {
    comparePasswords () {
      return this.password !== this.confirmPassword ? 'Passwords do not match' : ''
    },
    user () {
      return this.$store.getters.user
    },
    error () {
      return this.$store.getters.error
    },
    loading4 () {
      return this.$store.getters.loading
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
    onSignup () {
      this.$store.dispatch('signUserUp', { email: this.email, password: this.password })
    },
    onDismissed () {
      this.$store.dispatch('clearError')
    }
  }
}
</script>
