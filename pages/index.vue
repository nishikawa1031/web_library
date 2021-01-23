<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div class="text-center">
        2020年(令和2年) 民法
      </div>
      <p>bbbb</p>
          <li v-for="answer in displayAnswers()" :key="answer.id">
            <p>ddd</p>
            <v-card
              class="mx-auto"
              max-width="344"
              outlined
            >
              {{ answer.like }}
              {{ findContributor(answer.id) }}
            </v-card>
          </li>
      <Article />
    </v-col>
    <v-col cols="12" sm="8" md="6">
      <div class="text-center">
        答案
      </div>
        <v-card>
          <p>Hey everyone.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor <br>
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco <br>
          laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse <br>
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia <br>
          deserunt mollit anim id est laborum.Thanks for reading.</p>
        </v-card>
    </v-col>
  </v-row>
</template>

<script>
import firebase from '@/plugins/firebase'

export default {
  mounted(){
    this.getUsers();
    this.getAnswers();
  },
  methods: {
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
          console.log(this.allUsers)
        })
    },
    displayUsers(){
      return this.allUsers
    },
    getAnswers(){
      this.allAnswers = []
      firebase
        .firestore()
        .collection('answers')
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            this.allAnswers.push(doc.data())
          })
          console.log(this.allAnswers)
        })
    },
    displayAnswers(){
      return this.allAnswers
    },
    // 答案の投稿者のuserIDを特定するメソッド
    findContributor(answerId){
      this.contributor = this.allUsers.filter(e => e.answer_id == answerId)
      console.log("contributor",this.contributor)
      return this.contributor
    }
  }
}
</script>
