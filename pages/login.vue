<template>
  <login-navigation />
</template>

<script>
import LoginNavigation from '~/components/LoginNavigation.vue';
export default {
  asyncData() {
    return {
    }
  },
  components: { LoginNavigation },
  mounted() {
    console.log(LoginNavigation)
    // console.log(isLogin)
  }
}


</script>
<style scoped>
  li {
    list-style: none;
    display: inline-block;
  }

</style>
