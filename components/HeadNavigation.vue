<template>
  <v-app-bar fixed app color="blue-grey darken-4">
    <v-toolbar-items>
      <v-btn text to="/" color="white"
        v-if="$vuetify.breakpoint.smAndUp"
      >
          {{ $t('title') }}
      </v-btn>
      <v-btn v-else small to="/" color="blue-grey darken-4">
        <v-icon
          color="white"
        >
          mdi-home
        </v-icon>
      </v-btn>
      <v-btn text to="/login" color="white"
        v-if="$vuetify.breakpoint.smAndUp"
      >
        {{ $t('login') }}
      </v-btn>
      <v-btn v-else small to="/login" color="blue-grey darken-4">
        <v-icon
          color="white"
        >
          mdi-login-variant
        </v-icon>
      </v-btn>
    </v-toolbar-items>
    <v-toolbar-items v-if="!isTopPage">
        <v-menu offset-y>
          <template v-slot:activator="{on}">
            <v-btn v-if="$vuetify.breakpoint.smAndUp" v-on="on" text color="white">民事系</v-btn>
            <v-btn v-else v-on="on" text color="white">民事</v-btn>
          </template>
          <v-list color="blue-grey darken-4">
            <v-list-item>
              <v-list-item-content>
                <v-btn text :href="'#id='+ 0" color="white">民法</v-btn>
                <v-btn text :href="'#id='+ 1" color="white">民訴</v-btn>
                <v-btn text :href="'#id='+ 2" color="white">商法</v-btn>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-menu offset-y>
          <template v-slot:activator="{on}">
            <v-btn v-if="$vuetify.breakpoint.smAndUp" v-on="on" text color="white">刑事系</v-btn>
            <v-btn v-else v-on="on" text color="white">刑事</v-btn>
          </template>
          <v-list color="blue-grey darken-4">
            <v-list-item>
              <v-list-item-content>
                <v-btn text :href="'#id='+ 3" color="white">刑法</v-btn>
                <v-btn text :href="'#id='+ 4" color="white">刑訴法</v-btn>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-menu offset-y>
          <template v-slot:activator="{on}">
            <v-btn v-if="$vuetify.breakpoint.smAndUp" v-on="on" text color="white">公法系</v-btn>
            <v-btn v-else v-on="on" text color="white">公法</v-btn>
          </template>
          <v-list color="blue-grey darken-4">
            <v-list-item>
              <v-list-item-content>
                <v-btn text :href="'#id='+ 5" color="white">憲法法</v-btn>
                <v-btn text :href="'#id='+ 6" color="white">行政法</v-btn>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-menu offset-y>
          <template v-slot:activator="{on}">
            <v-btn v-if="$vuetify.breakpoint.smAndUp" v-on="on" text color="white">選択科目</v-btn>
            <v-btn v-else v-on="on" text color="white">選択</v-btn>
          </template>
          <v-list color="blue-grey darken-4">
            <v-list-item>
              <v-list-item-content>
                <v-btn text :href="'#id='+ 7" color="white">倒産法</v-btn>
                <v-btn text :href="'#id='+ 8" color="white">労働法</v-btn>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
export default {
  asyncData() {
    return {
      allAnswers: [],
      user: [],
      year: [],
      subject: [],
    }
  },
  data() {
    return {
      isTopPage: true,
    }
  },
  mounted(){
    console.log("ddd",location.pathname.replace(/[^0-9]/g, ''))
    if (location.pathname.replace(/[^0-9]/g, '')) {
      this.isTopPage = false;
    } else {
      this.isTopPage = true;
    }
  },
  watch: {
    '$route'(to, from) {
      if (to.path.replace(/[^0-9]/g, '')) {
        this.isTopPage = false
      } else {
        this.isTopPage = true
      }
    }
  },
  mounted(){
  },
  props:{
    allAnswers: Array
  },
}
</script>