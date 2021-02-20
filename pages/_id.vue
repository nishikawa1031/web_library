<template>
  <v-container>
    <v-row no-gutters>
      <v-col
        cols="6"
        md="4"
      >
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
              >
                <!-- <img :src="user.icon"/> -->
              </v-list-item-avatar>
              <v-list-item-content>
                <!-- <div class="overline mb-4">OVERLINE</div> -->
                <v-list-item-title class="headline mb-1">{{findContributor(answer)}}</v-list-item-title>
                <v-list-item-subtitle>{{displaySubject(answer.subject)}}</v-list-item-subtitle>
              </v-list-item-content>
              <v-card-actions>
                <v-btn
                  color="primary"
                  dark
                  @click.stop="dialog = true"
                  @click="passID(answer.imgUrl);"
                >
                  答案を見る
                </v-btn>
              </v-card-actions>
            </v-list-item>
          </v-card>
        </li>
      </ul>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        md="8"
      >
        <v-card
          min-height="80vh"
          v-if="isShowAnswer">
            <v-layout justify-center>
              <v-card-actions>
                <v-btn
                  color="primary"
                  dark
                  @click.stop="dialog = true"
                  @click="passID(answer.imgUrl);"
                >
                  全画面表示
                </v-btn>
              </v-card-actions>
            </v-layout>
            <iframe :src="selectedAnswer" width="100%" height="600"/>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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
      subjects: [
        { code: 0, name: '民法'},
        { code: 1, name: '民訴'},
        { code: 2, name: '商法'},
        { code: 3, name: '刑法'},
        { code: 4, name: '刑訴'},
        { code: 5, name: '憲法'},
        { code: 6, name: '行政法'},
        { code: 7, name: '倒産法'},
        { code: 8, name: '労働法'},
        { code: 9, name: '民法'},
        { code: 10, name: '民法'},
        { code: 11, name: '民法'},
        { code: 12, name: '民法'},
        { code: 13, name: '民法'},
      ],
      isShowAnswer: false,
      selectedAnswer: '',
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
        this.findContributor(value.user_id);
      });
    },
    // 答案の投稿者の名前を特定するメソッド
    findContributor(answer){
      const userId = answer.user_id
      this.contributor = this.allUsers.filter(e => e.id == userId)[0].name
      return this.contributor
    },
    showSubject(){
      const subjectName = this.urlNumber ? this.subjects[this.urlNumber].name : '' ;
      return subjectName
    },
    displaySubject(id){
      return this.subjects[id].name
    },
    passID(url){
      this.isShowAnswer = true
      this.selectedAnswer = url
    },
    passImgUrl(){}
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
