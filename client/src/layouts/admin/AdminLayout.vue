<template>
  <v-main>
    <div v-if="fetching">
      loading
    </div>
    <template v-else>
      <AdminAppBar @switch-drawer="switchDrawer" />
      <v-navigation-drawer
        v-model="drawerVisible"
      >
        <v-sheet
          :height="!$vuetify.display.mobile ? '97%': '100%'"
          class="d-flex flex-column justify-center align-center"
        >
          <div class="w-100">
            <v-list
              mandatory
              nav
            >
              <v-list-item
                v-for="(page, i) in pages"
                :key="i"
                active-color="secondary"
                :active="page.routeName === $route.name"
                :prepend-icon="page.icon"
                :title="$t(page.name)"
                :value="page.routeName"
                @click="goTo(page.routeName)"
              />
            </v-list>
          </div>
          <div class="mt-auto">
            <v-btn
              class="mb-2"
              @click="logout"
            >
              {{ $t('session.logout') }}
              <v-icon class="ml-2">
                mdi-exit-to-app
              </v-icon>
            </v-btn>
          </div>
        </v-sheet>
      </v-navigation-drawer>
      <v-container class="main-container">
        <router-view v-slot="{ Component }">
          <v-fade-transition leave-absolute>
            <component :is="Component" />
          </v-fade-transition>
        </router-view>
      </v-container>
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
      pages: [
        { name: 'admin.home.myHotel', icon: 'mdi-home-outline', routeName: 'HotelInformation' },
        { name: 'admin.home.myOffers', icon: 'mdi-bed-king-outline', routeName: '' },
        { name: 'admin.home.myBookings', icon: 'mdi-calendar-month-outline', routeName: '' },
      ],
    };
  },
  computed: {
    ...mapState(useSessionStore, [ 'me' ] ),
  },
  async created () {
    await this.loadCriticalPath();
    this.fetching = false;
    this.setUserListeners();
  },
  methods: {
    ...mapActions(useSessionStore, [ 'getMe', 'getFullMe', 'logout' ]),
    goTo,
    async loadCriticalPath () {
      await this.getMe();
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
