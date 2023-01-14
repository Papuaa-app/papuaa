<template>
  <v-main>
    <AdminAppBar @switch-drawer="switchDrawer" />
    <v-navigation-drawer
      v-model="drawerVisible"
    />
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
import AdminAppBar from '@/layouts/admin/AdminAppBar.vue';

export default {
  name: 'AdminLayout',
  components: { AdminAppBar },
  data () {
    return {
      drawerVisible: undefined,
    };
  },
  methods: {
    switchDrawer () {
      this.drawerVisible = !this.drawerVisible;
    }
  }
};
</script>

<style scoped>

</style>
