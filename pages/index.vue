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
        <li v-for="user in displayUsers" :key="user.id">
          <v-card
            class="mx-auto"
            outlined
          >
            <v-list-item three-line>
              <v-list-item-avatar
                v-if="$vuetify.breakpoint.smAndUp"
                size="80"
                color="grey"
              >
                <img :src="user.icon"/>
              </v-list-item-avatar>
              <v-list-item-content>
                <!-- <div class="overline mb-4">OVERLINE</div> -->
                <v-list-item-title class="headline mb-1">{{user.name}}</v-list-item-title>
                <v-list-item-subtitle>コメント：{{ user.comment }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-card-actions>
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
        <ul>
          <li v-for="answer in displaySelectedAnswers" :key="answer.id">
            <v-card
              class="pa-2"
              outlined
              tile
            >
            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-title class="headline mb-1">{{ answer.year }}年度&nbsp;{{displaySubject(answer)}}</v-list-item-title>
                <v-list-item-subtitle>
                <v-layout justify-center>
                  <v-btn
                    color="primary"
                    dark
                    @click.stop="dialog = true"
                    @click="memorizeSelectedAnswer(answer)"
                  >
                    全画面表示
                  </v-btn>
                </v-layout>
                </v-list-item-subtitle>
              <iframe :src="getImgUrl(answer)" width="80%"/>
              </v-list-item-content>
            </v-list-item>
            </v-card>
          </li>
        </ul>
      </v-col>
    </v-row>
    <v-dialog
      v-model="dialog"
      max-width="1200px"
    >
      <v-card>
        <v-layout justify-center>
          <v-btn
            color="primary"
            dark
            @click="dialog = false"
          >
            Close
          </v-btn>
        </v-layout>
        <iframe :src="selectedAnswer" width="1200" height="800"/>
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
      displayUsers:[],
      allAnswers:[],
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
      isShowUserAnswers: false,
      displaySelectedAnswers: [],
      selectedAnswer: '',
      dialog: false
    }
  },
  components: {
    'headNav':HeadNavigation,
  },
  mounted(){
    this.getUsers();
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
      this.displayUsers = this.allUsers
    },
    passUserID(userId){
      this.isShowUserAnswers = true;
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
        this.displaySelectedAnswers = this.allAnswers.filter(e => e.user_id == userId)
      }, 1000);
    },
    displaySubject(answer){
      return this.subjects[answer.subject].name
    },
    getImgUrl(answer){
      return answer.imgUrl
    },
    memorizeSelectedAnswer(answer){
      this.selectedAnswer = answer.imgUrl
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
