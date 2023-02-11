<template>
  <v-main>
    <div v-if="fetching">
      loading
    </div>
    <template v-else>
      <AdminAppBar @switch-drawer="switchDrawer" />
      <v-navigation-drawer
        v-model="drawerVisible"
        :rail="isRail"
      >
        <v-sheet :height="!$vuetify.display.mobile ? '97%': '100%'">
          <v-list
            mandatory
            nav
          >
            <v-list-item
              v-for="page in pages"
              :key="page.routeName"
              active-color="secondary"
              :active="page.routeName === $route.name"
              :prepend-icon="page.icon"
              :title="$t(page.name)"
              :value="page.routeName"
              @click="goTo(page.routeName)"
            />
          </v-list>
        </v-sheet>
      </v-navigation-drawer>
      <div class="pa-3">
        <router-view v-slot="{ Component }">
          <v-fade-transition leave-absolute>
            <component :is="Component" />
          </v-fade-transition>
        </router-view>
      </div>
    </template>
  </v-main>
</template>

<script>
import { goTo } from '@/composables/router';
import AdminAppBar from '@/layouts/admin/AdminAppBar.vue';
import eventBus from '@/plugins/eventBus';
import { useSessionStore } from '@/store/session';
import { mapActions, mapState } from 'pinia';

export default {
  name: 'AdminLayout',
  components: { AdminAppBar },
  data () {
    return {
      fetching: true,
      drawerVisible: undefined,
    };
  },
  computed: {
    ...mapState(useSessionStore, [ 'me' ] ),
    pages () {
      return [
        { name: 'admin.home.title', icon: 'mdi-home-outline', routeName: 'HotelInformation' },
        { name: 'admin.home.myOffers', icon: 'mdi-bed-king-outline', routeName: '' },
        { name: 'admin.home.myBookings', icon: 'mdi-calendar-month-outline', routeName: '' },
      ];
    },
    isRail () {
      return !!this.$route.meta?.isDrawerCollapsed;
    },
  },
  async created () {
    await this.loadCriticalPath();
    this.fetching = false;
    this.setUserListeners();
  },
  methods: {
    ...mapActions(useSessionStore, [ 'getFullMe' ]),
    goTo,
    async loadCriticalPath () {
      await this.getFullMe();
    },
    switchDrawer () {
      this.drawerVisible = !this.drawerVisible;
    },
    setUserListeners () {
      eventBus.$on('HOTEL_GROUP_CREATED', async () => {
        await this.getFullMe();
      });
      eventBus.$on('HOTEL_CREATED', async () => {
        await this.getFullMe();
      });
    }
  },
};
</script>

<style scoped>

</style>
