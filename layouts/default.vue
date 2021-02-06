<template>
  <v-app class="app">
    <div class="headerContainer">
      <head-navigation
        v-on:get-selected-answers="getSelectedAnswers">
      </head-navigation>
    </div>
    <div class="appContainer">
      <div class="naviContainer">
        <side-navigation />
      </div>
      <main class="mainContainer">
        <v-container class="px-4 py-8">
          <nuxt />
        </v-container>
      </main>
    </div>
  </v-app>
</template>

<script>
import SideNavigation from '~/components/SideNavigation.vue'

export default {
  components: {
    SideNavigation
  },
  mounted() {
  },
  methods: {
    getSelectedAnswers(selectedSubject){
      console.log("getSelectedAnswersメソッド",selectedSubject)
    },
  }
}
</script>
<style lang="scss">
.app {
  max-width: 1440px;
  margin: 0 auto;
  background-color: inherit !important;
}
.appContainer {
  top: 40px;
  position: relative;
  @include largerThan($small) {
    display: grid;
    grid-template-columns: 240px 1fr;
    grid-template-rows: auto;
  }
  @include largerThan($huge) {
    grid-template-columns: 325px 1fr;
    grid-template-rows: auto;
  }
}
.naviContainer {
  position: relative;
  background-color: $gray-1;
}
@include lessThan($small) {
  .naviContainer {
    position: sticky;
    position: -webkit-sticky;
    top: 0;
    z-index: z-index-of(sp-navigation);
  }
}
@include largerThan($small) {
  .naviContainer {
    grid-column: 1/2;
    position: relative;
    top: 0;
    overflow-y: auto;
    width: 240px;
    height: 100%;
    border-right: 1px solid $gray-4;
    border-left: 1px solid $gray-4;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.15);
    overscroll-behavior: contain;
  }
}
@include largerThan($huge) {
  .naviContainer {
    width: 325px;
  }
}
.mainContainer {
  grid-column: 2/3;
  overflow: hidden;
  @include lessThan($small) {
    .container {
      padding-top: 16px;
    }
  }
}
</style>
