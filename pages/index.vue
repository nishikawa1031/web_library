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
            </v-card>
          </li>
      <Article />
    </v-col>
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
            </v-card>
          </li>
      <Article />
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
    }
  }
}
</script>
