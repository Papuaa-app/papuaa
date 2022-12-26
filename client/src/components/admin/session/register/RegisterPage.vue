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
              v-html="$t('admin.session.title')"
            />
            <h4 class="text-white">
              {{ $t('admin.session.subtitle') }}
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
      <v-col :offset="$vuetify.display.mdAndUp ? 6 : 0">
        <v-row class="justify-center">
          <v-form>
            <v-card
              min-width="320"
              class="text-primary pa-2"
              :color="$vuetify.display.smAndDown ? 'transparent' : ''"
              :flat="$vuetify.display.smAndDown"
            >
              <v-card-title>
                {{ $t('admin.session.register') }}
              </v-card-title>
              <v-card-text>
                <RegisterForm />
              </v-card-text>
              <v-card-actions>
                <v-btn>
                  {{ $t('admin.session.submit') }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-form>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import RegisterForm from '@/components/admin/session/register/RegisterForm.vue';

export default {
  name: 'RegisterPage',
  components: { RegisterForm }
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
