<template>
  <div>
    <v-navigation-drawer
      v-model="drawerVisible"
      :location="getDrawerLocation"
    >
      <v-list
        mandatory
        nav
      >
        <v-list-item
          v-for="page in settingsPages"
          :key="page.routeName"
          :disabled="page.disabled"
          :active="page.routeName === $route.name"
          :prepend-icon="page.icon"
          :title="$t(page.label)"
          :value="page.routeName"
          active-color="secondary"
          @click="goTo(page.routeName)"
        />
      </v-list>
    </v-navigation-drawer>
    <div class="d-flex">
      <v-btn
        icon
        variant="flat"
        size="x-small"
        @click="switchDrawerVisibility"
      >
        <v-icon size="x-large">
          mdi-menu-down
        </v-icon>
      </v-btn>
      <h2 class="ml-3">
        {{ $t('admin.settings.title') }}
      </h2>
    </div>
    <div>
      <router-view />
    </div>
  </div>
</template>

<script>
import { goTo } from '@/composables/router';

export default {
  name: 'Settings',
  data () {
    return {
      drawerVisible: false,
      settingsPages: [
        { label: 'admin.settings.profile' , routeName: 'profile', icon: 'mdi-account-outline', disabled: true },
        { label: 'admin.settings.organizations' , routeName: 'organizations', icon: 'mdi-office-building' },
      ]
    };
  },
  computed: {
    getDrawerLocation () {
      return this.$vuetify?.display.mobile ? 'top' : 'left';
    }
  },
  methods: {
    goTo,
    switchDrawerVisibility () {
      this.drawerVisible = !this.drawerVisible;
    },
  },
};
</script>

<style scoped>

</style>
