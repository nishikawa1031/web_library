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
    submit() {
      const db = firebase.firestore()
      const dbAnswers = db.collection('answers')
      dbAnswers
        .add({
          id: "",
          year: this.answer.year,
          subject: this.answer.subject,
          count: 0,
          like: 0,
          user_id: '',
          created_at: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(docRef => {
          dbAnswers.doc(docRef.id).update({
            id: docRef.id
          }).then(() => {
              // success
          }).catch(error => {
          // error
          })
          alert('送信しました')
           this.$router.push({path:'/'})
        })
    },
    upload (p) {
        const file = p.target.files[0]
        const storageRef = firebase.storage().ref('users/' + file.name)
        // 画像をStorageにアップロード
        storageRef.put(file).then(() => {
            // アップロードした画像のURLを取得
            firebase.storage().ref('users/' + file.name).getDownloadURL().then((url) => {
                // アップロードした画像のURLと画像名をDBに保存
                this.icon = url
                console.log(this.icon)
            }).catch((error) => {
                console.log(error)
            })
        })
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
