<template>
  <v-container fluid>
    <v-layout justify-center>
      <v-col cols="12" sm="8" md="6">
        <ul>
          <li v-for="user in displayUsers" :key="user.id">
            <v-card
              class="mx-auto"
              max-width="500"
              outlined
            >
              <v-list-item>
                <v-col cols="12" sm="8" md="6">
                <v-list-item-avatar
                  tile
                  size="80"
                  color="grey"
                >
                  <img :src="user.icon"/>
                </v-list-item-avatar>
                <v-card-actions>
                  <v-layout justify-center>
                    <v-btn
                      color="primary"
                      dark
                      @click.stop="dialog = true"
                      @click="passID(user);"
                    >
                      詳細を見る
                    </v-btn>
                  </v-layout>
                </v-card-actions>
                </v-col>
                <v-col cols="12" sm="8" md="6">
                <v-list-item-content>
                  <div class="overline mb-4"></div>
                  <v-list-item-title class="headline mb-1">
                    {{ user.name }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                      学歴：{{ user.from }}
                    <br>
                      司法試験の結果：{{ user.exam }}
                    <br>
                      予備試験の結果：{{ user.pre }}
                    <br>
                      予備校：{{ user.school }}
                    <br>
                      コメント：{{ user.comment }}
                  </v-list-item-subtitle>
                </v-list-item-content>
                </v-col>
              </v-list-item>
            </v-card>
          </li>
        </ul>
      </v-col>
      <v-col cols="12" sm="8" md="6">
      </v-col>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from '@/plugins/firebase'

export default {
  data() {
    return {
      allUsers: [],
      // allUsersLength:'',
      selectedUser:'',
      displayUsers:[],
    }
  },
  mounted(){
    this.getData();
  },
  methods: {
    getData(){
      this.allUsers = []
      firebase
        .firestore()
        .collection('users')
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            this.allUsers.push(doc.data())
          })
          // this.allUsersLength = this.allUsers.length

          this.length = Math.ceil(this.allUsers.length/this.pageSize)
          this.displayUsers = this.allUsers.slice(0,this.pageSize)

        })
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
