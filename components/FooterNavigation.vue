<template>
  <small class="SideNavigation-Copyright">
    <v-row><v-btn small text to="/about" color="white">About Us</v-btn></v-row>
  </small>
</template>

<style lang="scss" scoped>
.SideNavigation-Copyright {
  display: block;
  margin-top: 15px;
  color: $gray-1;
  line-height: 1.3;
  font-weight: bold;
  @include font-size(10);
}
</style>