<template>
    <v-container>
        <v-card>
            <v-sheet row class="d-flex justify-center">
                <h3 class="info--text">Signin</h3>
            </v-sheet>
            <form @submit.prevent="onSignin">
                <v-container>
                    <v-col cols="12" class="">
                      <v-text-field
                      name="email"
                      lable="Email"
                      id="email"
                      v-model="email"
                      type="email"
                      required></v-text-field>
                      <v-text-field
                      name="password"
                      lable="Password"
                      id="password"
                      v-model="password"
                      type="password"
                      required></v-text-field>
                    </v-col>
                </v-container>
                <v-sheet row class="d-flex justify-center">
                    <v-btn color="primary" type="submit">Signin</v-btn>
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
    user () {
      return this.$store.getters.user
    }
  },
  watch: {
    user (value) {
      if (value !== null && value !== undefined) {
        this.$router.push('/')
      }
    }
  },
  methods: {
    onSignin () {
      this.$store.dispatch('signUserIn', { email: this.email, password: this.password })
    }
  }
}
