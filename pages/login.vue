<template>
  <v-container fluid>
    <v-layout justify-center>
    <v-col cols="12" sm="8" md="6">
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
      </div>
      <div v-if="isLogin">
        <v-btn @click="logOut">{{$t('logout')}}</v-btn>
        <br>
        <v-card
          class="mx-auto"
          max-width="800"
          outlined
        >
          <v-card-title>
            {{ $t('post') }}
          </v-card-title>
          <v-card-text>
            <v-select
              v-model="user.category"
              item-text="name"
              item-value="name"
              :rules="subjectRules"
              :items="subjects"
              label="科目"
              dense
            ></v-select>
            <v-select
              v-model="user.tool"
              item-text="name"
              item-value="name"
              :rules="yearRules"
              :items="years"
              label="年度"
              dense
            ></v-select>
            <v-text-field
              v-model="user.content"
              counter="200"
              label="コメント"
              outlined
            ></v-text-field>
            <label class="postImage-appendBtn">
              <input @change="upload" type="file" data-label="画像の添付">
            </label>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="submit()">
              {{$t('submit')}}
            </v-btn>
          </v-card-actions>
        </v-card>
        </div>
      </v-col>
      <v-col cols="12" sm="8" md="6">
        <v-card
          class="mx-auto"
          max-width="344"
          outlined
        >
          <v-card-title>
            {{ $t('profile') }}
          </v-card-title>
          <v-card-text>
            {{ user }}
          </v-card-text>
          <v-card-actions>
            <v-btn @click="edit()">
              {{$t('edit')}}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
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
      user: [],
      loginUser: 'aaa',
      year: [],
      subject: []
    }
  },
  data() {
    return {
      subjectRules:[
        v => !!v || "subject is required",
      ],
      yearRules:[
        v => !!v || 'year is required',
      ],
      subjects: [
        { code: '01', name: '民法' },
        { code: '02', name: '民訴' },
        { code: '03', name: '商法' },
        { code: '04', name: '刑法' },
        { code: '03', name: '刑訴' },
      ],
      years:[
        {name:'2020'},
        {name:'2019'},
        {name:'2018'},
      ]
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
    getUsers(){
      this.allUsers = []
      firebase
        .firestore()
        .collection('users')
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            this.allUsers.push(doc.data())
          })
        })
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
    }
  },
}
</script>
<style scoped>
  li {
    list-style: none;
    display: inline-block;
  }

</style>
