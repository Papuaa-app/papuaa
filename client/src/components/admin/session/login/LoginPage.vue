<template>
  <v-container>
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
              <div class="mt-2">
                {{ $t('admin.session.motivationalPhrase') }}
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
                  {{ $t('admin.session.register') }}
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
                  {{ $t('admin.session.submit') }}
                </v-btn>
              </div>
            </v-card>
          </v-form>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
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
  setup () {
    const useSessionStore = sessionStorage;
    return { useSessionStore };
  },
  data () {
    return {
      favicon,
      logoPapuaa,
      loginForm: {
        email: 'asdf@asdf.com',
        password: 'asdfasdf',
      }
    };
  },
  methods: {
    ...mapActions(useSessionStore, [ 'adminLogin' ]),
    async submit () {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        await this.adminLogin(this.loginForm);
      }
    },
  }
};
</script>

<style scoped>

</style>
