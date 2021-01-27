<template>
  <v-app-bar fixed app color="blue-grey darken-4">
    <v-toolbar-items>
      <v-btn text to="/" color="white">{{ $t('title') }}</v-btn>
      <v-btn text to="/login" color="white">{{ $t('login') }}</v-btn>
      <v-menu offset-y>
        <template v-slot:activator="{on}">
          <v-btn v-on="on" text color="white">民事系</v-btn>
        </template>
        <v-list color="blue-grey darken-4">
          <v-list-item>
            <v-list-item-content>
              <v-btn text color="white" @click="selectSubject(civil_low)">民法</v-btn>
              <v-btn text color="white" @click="selectSubject(civil_low)">民訴</v-btn>
              <v-btn text color="white" @click="selectSubject(civil_low)">商法</v-btn>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-menu offset-y>
        <template v-slot:activator="{on}">
          <v-btn v-on="on" text color="white">刑事系</v-btn>
        </template>
        <v-list color="blue-grey darken-4">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title color="white">民法</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title color="white">民訴法</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-menu offset-y>
        <template v-slot:activator="{on}">
          <v-btn v-on="on" text color="white">公法系</v-btn>
        </template>
        <v-list color="blue-grey darken-4">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title color="white">民法</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title color="white">民訴法</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-menu offset-y>
        <template v-slot:activator="{on}">
          <v-btn v-on="on" text color="white">選択科目</v-btn>
        </template>
        <v-list color="blue-grey darken-4">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title color="white">民法</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title color="white">民訴法</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-spacer></v-spacer>
      <v-btn text to="/contributors" color="white">{{ $t('contributor') }}</v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
export default {
  asyncData() {
    return {
      allAnswers: [],
      displayAnswers: [],
      user: [],
      year: [],
      subject: [],
      civil_low: []
    }
  },
  methods: {
    selectSubject(selectedSubject) {
      console.log('selectedSubject',selectedSubject)
      console.log(this.allAnswers)
      this.displayAnswers = this.allAnswers.filter(e => e.subject == answer.selectedSubject)
      console.log(this.displayAnswers)
      console.log("fff")
    }
  }
}
</script>