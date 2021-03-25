<template>
<header>
  <v-app-bar fixed app color="blue-grey lighten-5">
    <v-app-bar-nav-icon v-if="!$vuetify.breakpoint.smAndUp" color="white" @click="drawer = true"></v-app-bar-nav-icon>
    <v-toolbar-items>
      <v-btn text to="/" color="black"
        v-if="$vuetify.breakpoint.smAndUp"
      >
          {{ $t('title') }}
      </v-btn>
      <v-btn text to="/login" color="black"
        v-if="$vuetify.breakpoint.smAndUp"
      >
        {{ $t('login') }}
      </v-btn>
    </v-toolbar-items>
    <v-toolbar-items v-if="!isTopPage">
        <v-menu offset-y>
          <template v-slot:activator="{on}">
            <v-btn v-if="$vuetify.breakpoint.smAndUp" v-on="on" text color="black">民事系</v-btn>
            <v-btn v-else v-on="on" text color="black">民事</v-btn>
          </template>
          <v-list color="blue-grey darken-4">
            <v-list-item>
              <v-list-item-content>
                <v-btn text :href="'#id='+ 0" color="black">民法</v-btn>
                <v-btn text :href="'#id='+ 1" color="black">民訴</v-btn>
                <v-btn text :href="'#id='+ 2" color="black">商法</v-btn>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-menu offset-y>
          <template v-slot:activator="{on}">
            <v-btn v-if="$vuetify.breakpoint.smAndUp" v-on="on" text color="black">刑事系</v-btn>
            <v-btn v-else v-on="on" text color="black">刑事</v-btn>
          </template>
          <v-list color="blue-grey darken-4">
            <v-list-item>
              <v-list-item-content>
                <v-btn text :href="'#id='+ 3" color="black">刑法</v-btn>
                <v-btn text :href="'#id='+ 4" color="black">刑訴法</v-btn>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-menu offset-y>
          <template v-slot:activator="{on}">
            <v-btn v-if="$vuetify.breakpoint.smAndUp" v-on="on" text color="black">公法系</v-btn>
            <v-btn v-else v-on="on" text color="black">公法</v-btn>
          </template>
          <v-list color="blue-grey darken-4">
            <v-list-item>
              <v-list-item-content>
                <v-btn text :href="'#id='+ 5" color="black">憲法法</v-btn>
                <v-btn text :href="'#id='+ 6" color="black">行政法</v-btn>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-menu offset-y>
          <template v-slot:activator="{on}">
            <v-btn v-if="$vuetify.breakpoint.smAndUp" v-on="on" text color="black">選択科目</v-btn>
            <v-btn v-else v-on="on" text color="black">選択</v-btn>
          </template>
          <v-list color="blue-grey darken-4">
            <v-list-item>
              <v-list-item-content>
                <v-btn text :href="'#id='+ 7" color="black">倒産法</v-btn>
                <v-btn text :href="'#id='+ 8" color="black">労働法</v-btn>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
    </v-toolbar-items>
  </v-app-bar>
  <v-navigation-drawer
    v-model="drawer"
    fixed
    temporary
  >
    <v-list
      nav
      dense
    >
      <v-list-item-group>
        <v-list-item>
          <v-list-item-title>
            <v-btn text to="/" color="blue-grey darken-4">
              HOME
            </v-btn>
          </v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>
            <v-btn text to="/login" color="blue-grey darken-4"
            >
              {{ $t('login') }}
            </v-btn>
          </v-list-item-title>
        </v-list-item>
        <Calender/>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
  </header>
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
      drawer: false
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