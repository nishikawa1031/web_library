<template>
  <v-app>
    <v-app-bar fixed app>
      <v-toolbar-title>
        <v-layout>
          <v-flex lg12>
              <!-- <v-col><Logo /></v-col> -->
              <v-btn text to="/">{{ $t('title') }}</v-btn>
          </v-flex>
        </v-layout>
      </v-toolbar-title>
      <v-toolbar-items>
        <v-btn text to="/login">{{ $t('login') }}</v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer>
      <v-row>
        <v-col lg="1">
          <v-row><v-btn text to="">About Us</v-btn></v-row>
          <v-row><v-btn text to="">News</v-btn></v-row>
          <v-row><v-btn text to="">Contact Us</v-btn></v-row>
        </v-col>
        <v-col lg="1">

        </v-col>
        <v-col lg="1">
          <v-row><v-btn text to="">Privacy Policy</v-btn></v-row>
          <v-row><v-btn text to="">Terms of Use</v-btn></v-row>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
// import firebase from '@/plugins/firebase'

import Logo from '~/components/Logo.vue'
export default {
  asyncData() {
    return {
      isWaiting: true,
      isLogin: false,
    }
  },
  mounted() {
    // firebase.auth().onAuthStateChanged((user) => {
    //   this.isWaiting = false
    //   if (user) {
    //     this.isLogin = true
    //     this.user = user
    //   } else {
    //     this.isLogin = false
    //     this.user = []
    //   }
    // })
  },
  components: {
    Logo
  },
  data() {
    return {
      fixed: false
    }
  },
  methods: {
    googleLogin() {
      // const provider = new firebase.auth.GoogleAuthProvider()
      // firebase.auth().signInWithRedirect(provider)
      // this.$router.push({path:'/login'})
    },
    logOut() {
      // firebase.auth().signOut()
    }
  }
}
</script>
