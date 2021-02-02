<template>
  <p>{{this.$route.params.id}}年度</p>
</template>

<script>
export default {
  mounted(){
    console.log(this.$route.params)
  },
}

</script>
