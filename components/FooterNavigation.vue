<template>
  <small class="SideNavigation-Copyright">
    <v-row><v-btn text to="">About Us</v-btn></v-row>
    <v-row><v-btn text to="">News</v-btn></v-row>
    <v-row><v-btn text to="">Contact Us</v-btn></v-row>
    <v-row><v-btn text to="">Privacy Policy</v-btn></v-row>
    <v-row><v-btn text to="">Terms of Use</v-btn></v-row>
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