<template>
  <div ref="Side" class="SideNavigation" tabindex="-1">
    <header class="SideNavigation-Header">
      <h1 class="SideNavigation-HeaderTitle">
        <nuxt-link :to="localePath('/')" class="SideNavigation-HeaderLink">
          <div class="SideNavigation-HeaderText" v-if="this.$route.params.id">
            <div class="text-center">
              <p>{{this.$route.params.id}}年度&nbsp;&nbsp;{{showSubject()}}</p>
            </div>
          </div>
        </nuxt-link>
      </h1>
    </header>
    <div class="SideNavigation-Body">
      <Calender/>

      <footer class="SideNavigation-Footer">
        <footer-navigation />
      </footer>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
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
    }
  },
  mounted(){
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
    },
    showSubject(){
      const subjectName = this.urlNumber ? this.subjects[this.urlNumber].name : '' ;
      return subjectName
    },
  }
}
</script>

<style lang="scss" scoped>
.SideNavigation {
  position: relative;
  @include lessThan($small) {
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.15);
  }
  &:focus {
    outline: 1px dotted $gray-3;
  }
}

.SideNavigation-Header {
  height: 64px;
  @include largerThan($small) {
    height: auto;
  }
  @include lessThan($small) {
    display: flex;
  }
  @include lessThan($tiny) {
    padding-left: 44px;
  }
}

.SideNavigation-OpenIcon {
  position: absolute;
  top: 0;
  left: 0;
  padding: 18px 8px 18px 16px;
  font-size: 28px;
  @include lessThan($tiny) {
    font-size: 24px;
    padding: 20px 10px;
  }
  @include largerThan($small) {
    display: none;
  }
}

.SideNavigation-CloseIcon {
  position: absolute;
  top: 0;
  left: 0;
  padding: 18px 8px 18px 16px;
  font-size: 28px;
  @include lessThan($tiny) {
    font-size: 24px;
    padding: 20px 10px;
  }
  @include largerThan($small) {
    display: none;
  }
}

.SideNavigation-HeaderTitle {
  width: 100%;
  color: $white;
  @include font-size(13);
  @include largerThan($small) {
    margin: 0;
    margin-top: 10px;
  }
}

.SideNavigation-HeaderLink {
  display: flex;
  align-items: center;
  padding-right: 10px;
  @include lessThan($small) {
    height: 64px;
  }
  @include lessThan($tiny) {
    justify-content: space-between;
  }
  &:link,
  &:hover,
  &:focus,
  &:visited,
  &:active {
    color: inherit;
    text-decoration: none;
  }

  &:hover,
  &:focus {
    font-weight: bold;
  }

  &:focus {
    outline: dotted $gray-3 1px;
  }

  @include largerThan($small) {
    display: block;
    padding: 15px 0;
  }
}

.SideNavigation-HeaderLogo {
  @include lessThan($tiny) {
    width: 100px;
  }
}

.SideNavigation-HeaderText {
  margin: 10px 0 0 0;
  color: $gray-1;
  @include lessThan($small) {
    margin: 0 0 0 10px;
  }

  @include lessThan($tiny) {
    margin: 0;
  }
}

.SideNavigation-Body {
  padding: 0 0px 5px;
  @include lessThan($small) {
    display: none;
    padding: 0 36px 36px;
    &.-opened {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      display: block !important;
      width: 100%;
      z-index: z-index-of(opened-side-navigation);
      background-color: $white;
      height: 100%;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
    }
  }
}

.SideNavigation-Menu {
  @include lessThan($small) {
    padding-top: 50px;
  }
}

.SideNavigation-LanguageLabel {
  display: block;
  margin-bottom: 5px;
  @include font-size(14);
}

.SideNavigation-Footer {
  padding-top: 20px;
}

.SideNavigation-Copyright {
  display: block;
  margin-top: 15px;
  color: $gray-1;
  line-height: 1.3;
  font-weight: bold;
  @include font-size(10);
}

.SideNavigation-LicenseLink {
  &:focus {
    outline: 1px dotted $gray-3;
  }
}
</style>