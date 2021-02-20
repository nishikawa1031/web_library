<template>
  <v-container>
    <v-row no-gutters>
      <v-col
        cols="6"
        md="4"
      >
      <ul>
        <li v-for="user in displayUsers" :key="user.id">
          <v-card
            class="mx-auto"
            outlined
          >
            <v-list-item three-line>
              <v-list-item-avatar
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
                <v-btn
                  color="primary"
                  dark
                  @click.stop="dialog = true"
                  @click="passID(user);"
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
          class="pa-2"
          outlined
          tile
        >
          <p>Hey everyone.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor <br>
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco <br>
          laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse <br>
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia <br>
          deserunt mollit anim id est laborum.Thanks for reading.</p>
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
      displayUsers:[],
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
