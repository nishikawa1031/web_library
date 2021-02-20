<template>
  <v-layout justify-center>
    <small class="SideNavigation-Copyright">
      <v-btn small text to="/about" color="black">About Us</v-btn>
    </small>
  </v-layout>
</template>

<style lang="scss" scoped>
.SideNavigation-Copyright {
  display: block;
  margin-top: 5px;
  margin-bottom: 25px;
  color: $gray-1;
  line-height: 1.3;
  font-weight: bold;
  @include font-size(10);
}
</style>