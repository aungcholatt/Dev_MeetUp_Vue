<template>
    <v-container>
        <v-card>
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
                    <v-btn color="primary" type="submit">SignUp</v-btn>
                </v-sheet>
            </form>
        </v-card>
    </v-container>
</template>

<script>
// import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
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
    // register () {
    //   createUserWithEmailAndPassword(getAuth(), this.email, this.password).then((data) => {
    //     console.log('successfully registered')
    //   })
    //     .catch((error) => {
    //       console.log(error.code)
    //       alert(error.message)
    //     })
    // }
    onSignup () {
      this.$store.dispatch('signUserUp', { email: this.email, password: this.password })
      // console.log('signUserUp', { email: this.email, password: this.password })
    },
    onDismissed () {
      console.log('Dismissed Alert!')
      this.$store.dispatch('clearError')
    }
  }
}
</script>
