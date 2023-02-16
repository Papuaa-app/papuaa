<template>
  <v-dialog
    v-model="isVisible"
    :width="width"
    :fullscreen="isFullScreen"
    :transition="isFullScreen ? 'dialog-bottom-transition' : undefined"
  >
    <component
      :is="component"
      :data="data"
      :is-full-screen="isFullScreen"
    />
  </v-dialog>
</template>

<script>
import eventBus from '@/plugins/eventBus';
import { shallowRef } from 'vue';

export default {
  name: 'AdminDialog',
  data () {
    return {
      isVisible: false,
      component: undefined,
      data: undefined,
      defaultTransition: {
        component: {
          name: 'VDialogTransition'
        },
      },
    };
  },
  computed: {
    width () {
      return this.$vuetify?.display.mobile ? '100%': '50%';
    },
    isFullScreen () {
      return this.$vuetify.display.smAndDown;
    },
  },
  created () {
    this.setListeners();
  },
  methods: {
    setListeners () {
      eventBus.$on('OPEN_DIALOG', async ({ component, data }) => {
        this.component = shallowRef(component);
        this.data = data;
        this.isVisible = true;
      });
      eventBus.$on('CLOSE_DIALOG', async () => {
        this.isVisible = false;
      });
    },
    switchDialogVisibility () {
      this.isVisible = !this.isVisible;
    }
  }
};
</script>

<style scoped>
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
  transition: transform .2s ease-in-out;
}
</style>
