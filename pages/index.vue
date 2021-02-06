<template>
  <v-layout justify-center>
    <v-col cols="12" sm="8" md="6">
      <div class="text-center">
        <p>全年度</p>
      </div>
      <ul>
        <li v-for="answer in displayAnswers" :key="answer.id">
          <v-card
            class="mx-auto"
            max-width="500"
            outlined
          >
            <v-col cols="12" sm="8" md="6">
              <v-list-item-avatar
                tile
                size="80"
                color="grey"
              >
                <!-- <img :src="user.icon"/> -->
              </v-list-item-avatar>
            </v-col>
            <v-card-title>
              {{ findContributor(answer.id).name }}
            </v-card-title>
            <v-col cols="12" sm="8" md="6">
              <v-list-item-content>
                <div class="overline mb-4"></div>
                <v-list-item-title class="headline mb-1">
                  <!-- {{ user.name }} -->
                </v-list-item-title>
                <v-list-item-subtitle>
                    科目：{{ answer.subject }}
                  <br>
                    年度：{{ answer.year }}
                    {{ answer.like }}
                    {{ answer.count }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-col>
          </v-card>
        </li>
      </ul>
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
  </v-layout>
</template>

<script>
import HeadNavigation from "@/components/HeadNavigation.vue"
import firebase from '@/plugins/firebase'

export default {
  data() {
    return {
      allAnswers:[],
      displayAnswers: [],
      subjects: [
        { code: 1, name: '民法' },
        { code: 2, name: '民訴' },
        { code: 3, name: '商法' },
        { code: 4, name: '刑法' },
        { code: 5, name: '刑訴' },
    ],
    }
  },
  components: {
    'headNav':HeadNavigation,
  },
  mounted(){
    console.log(this,this.$refs.headNav)
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
        })
    },
    getAnswers(selectedSubject){
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
      if (selectedSubject) {
        this.displayAnswers = this.allAnswers.filter(e => e.subject == selectedSubject)
      } else {
        this.displayAnswers = this.allAnswers
      }
    },
    // 答案の投稿者のuserIDを特定するメソッド
    findContributor(answerId){
      this.contributor = this.allUsers.filter(e => e.answer_id == answerId)
      return this.contributor
    }
  }
}
</script>
<style scoped>
  li {
    list-style: none;
    display: list-item;
  }
  .card-content {
    list-style-type: unset;
  }
</style>
