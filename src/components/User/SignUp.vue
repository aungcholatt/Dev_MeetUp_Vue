<template>
    <v-container>
        <v-card>
            <v-sheet row class="d-flex justify-center">
                <h3 class="info--text">SignUp</h3>
            </v-sheet>
            <form @submit.prevent="">
                <v-container>
                    <v-col cols="12" class="">
                        <v-text-field name="email" label="Email" id="email" v-model="email" type="email" required>
                        </v-text-field>
                        <v-text-field name="password" label="Password" id="password" v-model="password" type="password" required>
                        </v-text-field>
                        <v-text-field name="confirmpassword" label="ConfirmPassword" id="confirmpassword" v-model="confirmpassword" type="confirmpassword" required>
                        </v-text-field>
                    </v-col>
                </v-container>
                <v-sheet row class="d-flex justify-center">
                    <v-btn color="primary" type="submit">SignUp</v-btn>
                </v-sheet>
            </form>
        </v-card>
    </v-container>
</template>

<script>
export default {
  name: 'SignUp',
  data () {
    return {
      password: '',
      confirmPassword: ''
    }
  },
  computed: {
    comparePasswords () {
      return this.password !== this.confirmPassword ? 'Passwords do not match' : ''
    }
  },
  methods: {
    onSignup () {
      console.log({ email: this.email, password: this.password, confirmPassword: this.confirmPassword })
    }
  }
}
</script>
