<template>
  <div class="h-100">
    <v-row
      class="h-100"
      align="center"
      justify="end"
    >
      <v-col
        class="text-center"
      >
        <v-row class="justify-center">
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <div class="d-flex flex-column align-center mb-10">
              <div>
                <v-img
                  width="10em"
                  :src="logoPapuaa"
                />
              </div>
            </div>
            <v-card
              min-width="320"
              class="text-primary pa-2"
              :color="$vuetify.display.smAndDown ? 'transparent' : ''"
              :flat="$vuetify.display.smAndDown"
            >
              <v-card-title class="d-flex justify-space-between">
                <div>
                  {{ $t('admin.session.login.title') }}
                </div>
                <v-avatar>
                  <v-img :src="favicon" />
                </v-avatar>
              </v-card-title>
              <v-card-text>
                <LoginForm v-model="loginForm" />
              </v-card-text>
              <div class="d-flex align-center justify-center pb-4">
                <v-btn
                  color="secondary"
                  @click="submit"
                >
                  {{ $t('admin.session.login.submit') }}
                </v-btn>
              </div>
            </v-card>
          </v-form>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import LoginForm from '@/components/admin/session/login/LoginForm.vue';
import favicon from '@/assets/logos/FAVICON.svg';
import logoPapuaa from '@/assets/logos/LOGO_PAPUAA.svg';
import form from '@/mixins/form';
import { useSessionStore } from '@/store/session.js';
import { mapActions } from 'pinia';

export default {
  name: 'LoginPage',
  components: { LoginForm },
  mixins: [ form ],
  data () {
    return {
      favicon,
      logoPapuaa,
      loginForm: {
        email: undefined,
        password: undefined,
      }
    };
  },
  methods: {
    ...mapActions(useSessionStore, [ 'login' ]),
    async submit () {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        await this.login(this.loginForm, true);
      }
    },
  }
};
</script>

<style scoped>

</style>
