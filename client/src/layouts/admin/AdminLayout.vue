<template>
  <v-main>
    <AdminAppBar @switch-drawer="switchDrawer" />
    <v-navigation-drawer
      v-model="drawerVisible"
    >
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
    </v-navigation-drawer>
    <v-container class="main-container">
      <router-view v-slot="{ Component }">
        <v-fade-transition leave-absolute>
          <component :is="Component" />
        </v-fade-transition>
      </router-view>
    </v-container>
  </v-main>
</template>

<script>
import { goTo } from '@/composables/router';
import AdminAppBar from '@/layouts/admin/AdminAppBar.vue';
import { useSessionStore } from '@/store/session';
import { mapActions } from 'pinia';

export default {
  name: 'AdminLayout',
  components: { AdminAppBar },
  data () {
    return {
      drawerVisible: undefined,
      pages: [
        { name: 'admin.home.myHotel', icon: 'mdi-home-outline', routeName: 'hotelInformation' },
        { name: 'admin.home.myOffers', icon: 'mdi-bed-king-outline', routeName: '' },
        { name: 'admin.home.myBookings', icon: 'mdi-calendar-month-outline', routeName: '' },
      ]
    };
  },
  async created () {
    await this.getMe();
  },
  methods: {
    ...mapActions(useSessionStore, [ 'getMe' ]),
    goTo,
    switchDrawer () {
      this.drawerVisible = !this.drawerVisible;
    }
  },
};
</script>

<style scoped>

</style>
