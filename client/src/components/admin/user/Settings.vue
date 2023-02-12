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
        v-if="$vuetify.display.mobile"
        icon
        variant="flat"
        size="x-small"
        @click="switchDrawerVisibility"
      >
        <v-icon size="x-large">
          mdi-menu-down
        </v-icon>
      </v-btn>
      <div class="d-flex align-center ml-3">
        <v-icon>
          mdi-cog
        </v-icon>
        <h2 class="ml-3 mb-0">
          {{ $t('admin.settings.title') }}
        </h2>
      </div>
    </div>
    <div class="pt-4">
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
        { label: 'admin.settings.profile' , routeName: '', icon: 'mdi-account-outline', disabled: true },
        { label: 'admin.settings.organizations.title' , routeName: 'AdminSettingsOrganizations', icon: 'mdi-office-building' },
      ]
    };
  },
  computed: {
    getDrawerLocation () {
      return this.$vuetify?.display?.mobile ? 'top' : 'left';
    }
  },
  created () {
    this.drawerVisible = !this.$vuetify.display.mobile;
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
