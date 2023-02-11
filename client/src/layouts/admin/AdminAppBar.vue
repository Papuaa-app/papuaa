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
      <div>
        <v-img
          width="5em"
          :src="logoPapuaa"
          class="mouse-click"
          @click="goTo('AdminHome')"
        />
      </div>
    </v-toolbar-title>
    <v-toolbar-items class="pt-1 pr-2">
      <v-menu>
        <template #activator="{ props }">
          <v-btn
            color="primary"
            variant="tonal"
            height="40"
            v-bind="props"
          >
            <v-icon
              color="primary"
              class="mr-2"
            >
              {{ activeOrganizationId ? 'mdi-account-group' : 'mdi-account-circle' }}
            </v-icon>
            <span class="text--normal">
              {{ activeOrganization?.name }}
            </span>
            <v-icon color="primary">
              mdi-chevron-down
            </v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-list
            density="compact"
            nav
            active-color="primary"
          >
            <v-list-item
              v-if="!organizations.length"
              disabled
            >
              <v-list-item-title>
                {{ $t('admin.settings.noOrganizations') }}
              </v-list-item-title>
            </v-list-item>
            <v-list-item
              v-for="organization in organizations"
              :key="organization.label"
              :active="activeOrganizationId && activeOrganization._id === organization._id"
              @click="setActiveOrganizationId(organization._id)"
            >
              <template #prepend>
                <v-icon>
                  {{ organization.icon }}
                </v-icon>
              </template>
              <v-list-item-title>
                {{ organization.label }}
              </v-list-item-title>
            </v-list-item>
            <v-divider />
            <v-list-item
              v-for="menuItem in menu"
              :key="menuItem.label"
              :disabled="menuItem.disabled"
              link
              @click="menuItem.action"
            >
              <template #prepend>
                <v-icon>
                  {{ menuItem.icon }}
                </v-icon>
              </template>
              <v-list-item-title>
                {{ $t(menuItem.label) }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
import logoPapuaa from '@/assets/logos/LOGO_PAPUAA.svg';
import { goTo } from '@/composables/router';
import { useSessionStore } from '@/store/session';
import { mapActions, mapState } from 'pinia';

export default {
  name: 'AdminAppBar',
  emits: [ 'switch-drawer' ],
  data () {
    return {
      logoPapuaa,
    };
  },
  computed: {
    ...mapState(useSessionStore, [ 'me', 'activeOrganizationId' ] ),
    activeOrganization () {
      if (!this.activeOrganizationId) {
        return this.me;
      } else {
        return this.me.hotelGroups.find(hotelGroup => hotelGroup._id === this.activeOrganizationId);
      }
    },
    organizations () {
      return this.me.hotelGroups.map(hotelGroup => ({
        _id: hotelGroup._id,
        label: hotelGroup.name,
        icon: 'mdi-account-group',
      }));
    },
    menu () {
      return [
        {
          label: 'admin.settings.title',
          icon: 'mdi-cog',
          action: () => goTo('AdminSettings'),
        },
        {
          label: 'session.logout',
          icon: 'mdi-exit-to-app',
          action: () => this.logout(),
        },
      ];
    },
  },
  methods: {
    ...mapActions(useSessionStore, [ 'setActiveOrganizationId', 'logout' ]),
    goTo,
    switchDrawerVisibility () {
      this.$emit('switch-drawer');
    },
  }
};
</script>

<style scoped>

</style>
