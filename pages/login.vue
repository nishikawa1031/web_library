<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col
        cols="12"
        sm="10"
        md="8"
        lg="4"
        xl="3"
      >
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
        :tile="$vuetify.breakpoint.sm || $vuetify.breakpoint.xs"
        class="mx-auto fill-width"
        flat
        max-width="640"
      >
        <v-card-title class="text-center pa-8">
          <h4 class="fill-width">会員情報入力</h4>
        </v-card-title>
        <v-divider> </v-divider>
        <div class="px-6 py-8">
          <div style="max-width:344px" class="mx-auto">
            <div>
              <v-btn
                class="fill-width text-capitalize caption"
                height="48px"
                outlined
                style="border-color:#979797;"
                tile
                @click="googleLogin"
              >
                <img
                  class="button-logo-img mr-4"
                  src="https://madeby.google.com/static/images/google_g_logo.svg"
                  style="height:24px;"
                />
                Googleで登録
              </v-btn>
            </div>
            <!-- <div class="separator separator_login_page">
              <div class="middle_separator">または</div>
            </div>
            <div class="pt-6">
              <div>
                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  autofocus
                  dense
                  height="48px"
                  outlined
                  placeholder="メールアドレス"
                ></v-text-field>

                <v-text-field
                  v-model="password"
                  :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="passwordRules"
                  :type="passwordShow ? 'text' : 'password'"
                  dense
                  height="48px"
                  name="input-password"
                  outlined
                  placeholder="パスワード"
                  @click:append="passwordShow = !passwordShow"
                ></v-text-field>
              </div>
              <div class="login-btn pb-8">
                <v-btn
                  class="fill-width caption"
                  color="#FFCB00"
                  depressed
                  height="48px"
                  tile
                >
                  会員登録
                </v-btn>
              </div>
              <v-divider></v-divider>
              <div class="pt-8 pb-4">
                <span>すでにアカウントをお持ちですか？</span>
                <nuxt-link to="/login">ログインに移動</nuxt-link>
              </div>
            </div> -->
          </div>
        </div>
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
            <v-text-field
              v-model="answer.comment"
              :rules="commentRules"
              label="キャプションを書いてください"
              dense
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
        <!-- <v-card
          class="mx-auto"
          max-width="344"
          outlined
        >
          <v-card-title>
            {{ $t('profile') }}
          </v-card-title>
          <v-card-text>
            {{ user }}{{ user.displayName }}
          </v-card-text>
          <v-card-actions>
            <v-btn @click="edit()">
              {{$t('edit')}}
            </v-btn>
          </v-card-actions>
        </v-card> -->
      </v-col>
    </v-row>
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
      comment: []
    }
  },
  data() {
    return {
      loginUser: [],
      isNewUser: true,
      commentRules:[
        v => !!v || "comment is required",
      ],
      answer: {
        comment: '',
      },
      email: null,
      emailRules: [
        value => !!value || 'Required.',
        value => (value || '').length <= 20 || 'Max 20 characters',
        // value => {
        //   const pattern = /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        //   return pattern.test(value) || 'Invalid e-mail.'
        // },
      ],
      password: null,
      passwordShow: false,
      passwordRules: [
        value => !!value || 'Required.',
        // value => {
        //   const pattern = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d]{8,128}$/.test(value)
        //   return pattern.test(value) || '半角英小文字大文字数字をそれぞれ1種類以上含む7文字以上128文字以下で入力してください.'
        // }
      ]
    }
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      this.isWaiting = false
      if (user) {
        this.isLogin = true
        this.user = user
        this.getUsers()
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

      const db = firebase.firestore()
      const dbUsers = db.collection('users')
      setTimeout(() => {
        for (let i = 0; i < this.allUsers.length; i++) {
          if (this.allUsers[i].email == this.user.email) {
            this.isNewUser = false
            this.loginUser = this.allUsers[i]
          }
        }
        if (this.isNewUser) {
          dbUsers
            .add({
              id: '',
              name: this.user.displayName,
              email: this.user.email,
              created_at: firebase.firestore.FieldValue.serverTimestamp()
            })
            .then(docRef => {
              dbUsers.doc(docRef.id).update({
                id: docRef.id
              }).then(() => {
                console.log("create")
                  // success
              }).catch(error => {
              // error
              })
            })
        }
      }, 1000);
    },
    submit() {
      const db = firebase.firestore()
      const dbAnswers = db.collection('answers')
      dbAnswers
        .add({
          id: "",
          comment: this.answer.comment,
          user_id: this.loginUser.id,
          imgUrl: this.imgUrl,
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
                this.imgUrl = url
                console.log(this.imgUrl)
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
  .fill-width {
    width: 100%;
  }
  .link-caption {
    text-decoration: none;
    color: #666 !important;
    font-size: .75rem;
  }
  .separator {
    margin-top: 30px;
    margin-bottom: 30px;
    height: 0;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #fff;
    position: relative;
  }
  .middle_separator {
    position: absolute;
    padding: 0 16px;
    color: #ccc;
    background: #fff;
    font-size: 11px;
    text-shadow: 0 1px 0 #fff;
    text-transform: uppercase;
    top: -7px;
    left: 30%;
  }
  .middle_separator {
    color: #777;
    font-size: 13px;
    top: -9px;
    left: 41%;
  }
</style>
