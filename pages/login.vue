<template>
  <v-container fluid>
    <v-layout justify-center>
      <v-card
        v-if="isWaiting"
        class="mx-auto"
        max-width="500"
        outlined
      >
        <p>{{ $t('loading') }}</p>
      </v-card>
      <div v-else>
        <v-card
          v-if="!isLogin"
          class="mx-auto"
          max-width="500"
          outlined
        >
          <v-btn @click="googleLogin">{{ $t('googlelogin') }}</v-btn>
        </v-card>
      <v-card
        v-else
        class="mx-auto"
        max-width="500"
        outlined
      >
      <v-card-title>
        {{ $t('sing_up') }}
      </v-card-title>
        <v-card-actions>
          <v-btn @click="submit()">
            {{$t('submit')}}
          </v-btn>
        </v-card-actions>
      </v-card>
      <br>
      </div>
    <v-row>
      <v-btn v-if="isLogin" @click="logOut">{{$t('logout')}}</v-btn>
    </v-row>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from '@/plugins/firebase'

export default {
  asyncData() {
    return {
      isWaiting: true,
      isLogin: false,
      user: []
    }
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      this.isWaiting = false
      if (user) {
        this.isLogin = true
        this.user = user
      } else {
        this.isLogin = false
        this.user = []
      }
    })
  },
  methods: {
    googleLogin() {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithRedirect(provider)
    },
    logOut() {
      firebase.auth().signOut()
    },
  },
}
</script>
<style scoped>
  li {
    list-style: none;
    display: inline-block;
  }

</style>
