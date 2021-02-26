<template>
  <v-container>
    <v-row no-gutters>
      <v-col
        cols="12"
        sm="10"
        md="8"
        lg="4"
        xl="3"
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
                  @click="passAnswerId(answer);"
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
          v-if="isShowAnswer">
          <v-list-item three-line>
            <v-list-item-content>
            <v-layout justify-center>
              <v-card-actions>
                <v-btn
                  color="primary"
                  dark
                  @click.stop="idPagedialog = true"
                  @click="showAnswerDetail()"
                >
                  全画面表示
                </v-btn>
              </v-card-actions>
            </v-layout>
            <iframe :src="getUrl()" width="80%"/>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog
      v-model="idPagedialog"
      max-width="1200px"
    >
      <v-card>
        <v-layout justify-center>
          <v-btn
            color="primary"
            dark
            @click="idPagedialog = false"
          >
            Close
          </v-btn>
        </v-layout>
        <iframe :src="pushedAnswer" width="1200" height="800"/>
        <v-card-actions>
          <v-spacer></v-spacer>

        </v-card-actions>
      </v-card>
    </v-dialog>
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
      pushedAnswer: '',
      idPagedialog: false
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
    displaySubject(id){
      return this.subjects[id].name
    },
    passAnswerId(answer){
      this.isShowAnswer = true
      this.pushedAnswer = answer.imgUrl
    },
    getUrl(){
      return this.pushedAnswer
    },
    showAnswerDetail(){
      return this.pushedAnswer
    },
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
