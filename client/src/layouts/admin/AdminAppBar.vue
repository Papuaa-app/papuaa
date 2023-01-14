<template>
  <v-app-bar
    border
    height="50"
  >
    <v-app-bar-nav-icon
      v-if="$vuetify.display.mobile"
      @click="switchDrawerVisibility"
    />
    <v-toolbar-title class="pa-0">
      <v-img
        width="5em"
        :src="logoPapuaa"
      />
    </v-toolbar-title>
    <div style="width: 48px" />
  </v-app-bar>
</template>

<script>
import logoPapuaa from '@/assets/logos/LOGO_PAPUAA.svg';

export default {
  name: 'AdminAppBar',
  emits: [ 'switch-drawer' ],
  data () {
    return {
      logoPapuaa,
    };
  },
  methods: {
    switchDrawerVisibility () {
      this.$emit('switch-drawer');
    },
  }
};
</script>

<style scoped>

</style>
