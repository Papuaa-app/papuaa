<template>
  <v-container class="h-100">
    <v-img
      class="bg-image hidden-sm-and-down"
      cover
      src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    >
      <v-row
        class="h-100"
        align="center"
      >
        <v-col class="r-ml">
          <div class="text">
            <h3
              class="text-white"
              v-html="$t('admin.session.register.bgTitle')"
            />
            <h4 class="text-white">
              {{ $t('admin.session.register.bgSubtitle') }}
            </h4>
          </div>
        </v-col>
      </v-row>
    </v-img>
    <v-row
      class="h-100"
      align="center"
      justify="end"
    >
      <v-col
        class="text-center"
        :offset="$vuetify.display.mdAndUp ? 6 : 0"
      >
        <v-row class="justify-center">
          <v-form
            ref="form"
            lazy-validation
            @submit.prevent="submit"
          >
            <div class="d-flex flex-column align-center mb-10">
              <div>
                <v-img
                  width="10em"
                  :src="logoPapuaa"
                />
              </div>
              <div class="mt-2">
                {{ $t('admin.session.register.motivationalPhrase') }}
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
                  {{ $t('admin.session.register.title') }}
                </div>
                <v-avatar>
                  <v-img :src="favicon" />
                </v-avatar>
              </v-card-title>
              <v-card-text>
                <RegisterForm v-model="registerForm" />
              </v-card-text>
              <v-card-text>
                <v-btn
                  variant="text"
                  class="text--normal"
                  @click="goTo('adminLogin')"
                >
                  {{ $t('admin.session.register.redirectLogin') }}
                </v-btn>
              </v-card-text>
              <div class="d-flex align-center justify-center pb-4">
                <v-btn
                  color="secondary"
                  type="submit"
                >
                  {{ $t('admin.session.register.submit') }}
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
import RegisterForm from '@/components/admin/session/register/RegisterForm';
import favicon from '@/assets/logos/FAVICON.svg';
import logoPapuaa from '@/assets/logos/LOGO_PAPUAA.svg';
import { mapActions, mapState } from 'pinia';
import { useSessionStore } from '@/store/session';
import { goTo } from '@/composables/router';

export default {
  name: 'RegisterPage',
  components: { RegisterForm },
  data: () => ({
    favicon,
    logoPapuaa,
    registerForm: {
      name: undefined,
      surname: undefined,
      email: undefined,
      password: undefined,
    },
  }),
  computed: {
    ...mapState(useSessionStore, [ 'session' ]),
  },
  methods: {
    goTo,
    ...mapActions(useSessionStore, [ 'register' ]),
    async submit () {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        await this.register(this.registerForm);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../../styles/styles.scss";

.r-ml {
 margin-left: 5vw;
}
.text {
 width: 25em;
}
.bg-image {
  z-index: 0;
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 50%;
  & ::v-deep() img {
    filter: brightness(.6);
  }
}
.bg-image:after{
  z-index: 1;
  content:"";
  position: absolute;
  height: 130vh;
  width: 20%;
  background-color: $admin-bg-color;
  top: -10em;
  left: 90%;
  transform: rotate(-5deg);
}
h1, h3 {
  font-size: 3em;
  line-height: .5em;
  & ::v-deep() h1 {
    font-size: 1.5em;
  }
}
</style>
