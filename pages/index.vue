<template>
  <v-layout justify-center>
    <v-col cols="12" sm="8" md="6">
      <div class="text-center">
        2020年(令和2年) 民法
      </div>
        <ul>
          <li v-for="answer in allAnswers" :key="answer.id">
            <v-card
              class="mx-auto"
              max-width="344"
              outlined
            >
              <v-list-item-avatar
                tile
                size="80"
                color="grey"
              >
                <!-- <img :src="user.icon"/> -->
              </v-list-item-avatar>
              <v-card-title>
                {{ findContributor(answer.id)[0].name }}
              </v-card-title>
              <v-list-item-content>
                <div class="overline mb-4"></div>
                <v-list-item-title class="headline mb-1">
                  <!-- {{ user.name }} -->
                </v-list-item-title>
                <v-list-item-subtitle>
                    <!-- 学歴：{{ user.from }} -->
                  <br>
                    <!-- 司法試験の結果：{{ user.exam }} -->
                  <br>
                    <!-- 予備試験の結果：{{ user.pre }} -->
                  <br>
                    <!-- 予備校：{{ user.school }} -->
                  <br>
                    <!-- コメント：{{ user.comment }} -->
                </v-list-item-subtitle>
              </v-list-item-content>
              {{ answer.like }}
            </v-card>
          </li>
        </ul>
      <!-- <Article /> -->
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
  </v-layout>
</template>

<script>
import firebase from '@/plugins/firebase'

export default {
  data() {
    return {
      allAnswers:[],
    }
  },
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
        })
      const c = this.allAnswers
      console.log("c",c)
      for (const i in c) {
        console.log(c[i])
        return c[i]
      }
    },
    displayAnswers(){
      return this.allAnswers
    },
    // 答案の投稿者のuserIDを特定するメソッド
    findContributor(answerId){
      this.contributor = this.allUsers.filter(e => e.answer_id == answerId)
      console.log("contributor",this.contributor)
      console.log("contributor",this.contributor[0].name)
      return this.contributor
    }
  }
}
</script>
<style scoped>
  li {
    list-style: none;
    display: inline-block;
  }

</style>
