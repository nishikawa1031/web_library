<template>
  <v-app-bar fixed app color="blue-grey darken-4">
    <v-toolbar-title>
      <v-layout>
        <v-flex lg12>
          <v-btn text to="/" color="white">{{ $t('title') }}</v-btn>
        </v-flex>
      </v-layout>
    </v-toolbar-title>
    <v-toolbar-items>
        <v-btn text to="/login" color="white">{{ $t('login') }}</v-btn>
      <v-menu offset-y>
        <template v-slot:activator="{on}">
          <v-btn v-on="on" text color="white">民事系</v-btn>
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
    </v-toolbar-items>
    <v-spacer></v-spacer>
      <v-btn text to="/login" color="white">{{ $t('login') }}</v-btn>
  </v-app-bar>
</template>