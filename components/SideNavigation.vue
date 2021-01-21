<template>
  <v-card>
    <v-card-title class="headline">
    </v-card-title>
    <v-card-text>
      <p>Vuetify is a progressive Material Design component framework for Vue.js. It was designed to empower developers to create amazing applications.</p>
      <p>
        For more information on Vuetify, check out the <a
          href="https://vuetifyjs.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          documentation
        </a>.
      </p>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn
        color="primary"
        nuxt
        to="/inspire"
      >
        Continue
      </v-btn>
    </v-card-actions>
  </v-card>
</template>