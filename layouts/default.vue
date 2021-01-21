<template>
  <v-app>
    <v-app-bar fixed app color="blue-grey darken-4">
      <v-toolbar-title>
        <v-layout>
          <v-flex lg12>
            <v-btn text to="/" color="white">{{ $t('title') }}</v-btn>
          </v-flex>
        </v-layout>
      </v-toolbar-title>
      <v-toolbar-items>
          <v-btn text to="/login" color="white">{{ $t('login') }}</v-btn>
        <v-menu offset-y>
          <template v-slot:activator="{on}">
            <v-btn v-on="on" text color="white">民事系</v-btn>
          </template>
          <v-list color="blue-grey darken-4">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title color="white">民法</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title color="white">民訴法</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar-items>
      <v-spacer></v-spacer>
        <v-btn text to="/login" color="white">{{ $t('login') }}</v-btn>
    </v-app-bar>
    <div class="naviContainer">
      <side-navigation />
    </div>
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
import SideNavigation from '~/components/SideNavigation.vue'

export default {
  components: {
    SideNavigation
  },
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
<style lang="scss">
.naviContainer {
  background-color: $gray-1;
}
@include lessThan($small) {
  .naviContainer {
    position: sticky;
    position: -webkit-sticky;
    top: 0;
    z-index: z-index-of(sp-navigation);
  }
}
@include largerThan($small) {
  .naviContainer {
    grid-column: 1/2;
    position: fixed;
    top: 0;
    overflow-y: auto;
    width: 240px;
    height: 100%;
    border-right: 1px solid $gray-4;
    border-left: 1px solid $gray-4;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.15);
    overscroll-behavior: contain;
  }
}
@include largerThan($huge) {
  .naviContainer {
    width: 325px;
  }
}
</style>
