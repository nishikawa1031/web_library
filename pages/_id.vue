<template>
  <v-layout justify-center>
    <v-col cols="12" sm="8" md="6">
      <div class="text-center">
        <p>{{this.$route.params.id}}年度&nbsp;&nbsp;{{showSubject()}}</p>
      </div>
      <ul>
        <li v-for="answer in displayAnswers" :key="answer.id">
          <v-card
            class="mx-auto"
            outlined
          >
            <v-list-item three-line>
              <v-list-item-avatar
                size="80"
                color="grey"
              ></v-list-item-avatar>
              <v-list-item-content>
                <!-- <div class="overline mb-4">OVERLINE</div> -->
                <v-list-item-title class="headline mb-1">{{findContributor(answer)}}</v-list-item-title>
                <v-list-item-subtitle>{{answer.subject}}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-card-actions>
              <!-- <v-btn text>Button</v-btn>
              <v-btn text>Button</v-btn> -->
            </v-card-actions>
          </v-card>
        </li>
      </ul>
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
      urlNumber: '',
    }
  },
  components: {
    'headNav':HeadNavigation,
  },
  mounted(){
    this.getUsers();
    this.getAnswers();
    this.urlNumber = location.hash.replace(/[^0-9]/g, '')
  },
  watch: {
    '$route'(to, from) {
      this.loadArticle(to)
    }
  },
  methods: {
    loadArticle(to) {
      console.log("ddd",this.$route.params.id,to.hash);
      this.urlNumber = to.hash.replace(/[^0-9]/g, '')
      this.displayAnswers = this.allAnswers.filter(e => e.year == this.$route.params.id).filter(e => e.subject == this.urlNumber)
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
      setTimeout(() => {
        if (location.hash) {
          this.displayAnswers = this.allAnswers.filter(e => e.year == this.$route.params.id).filter(e => e.subject == this.urlNumber)
        } else {
          this.displayAnswers = this.allAnswers.filter(e => e.year == this.$route.params.id)
        }
      }, 1000);
      const data = this.displayAnswers
      data.forEach((value) => {
      　console.log("ddd",value,value.user_id);
        this.findContributor(value.user_id);
      });
    },
    // 答案の投稿者の名前を特定するメソッド
    findContributor(answer){
      const userId = answer.user_id
      this.contributor = this.allUsers.filter(e => e.id == userId)[0].name
      console.log("this.contributor",this.contributor)
      return this.contributor
    },
    showSubject(){
      return "ddd"
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
