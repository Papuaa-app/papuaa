<template>
  <div>
    <AdminDetailFrame :title="isNew ? 'admin.hotel.detail.edit' : 'admin.hotel.detail.create'">
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        @submit.prevent="submit"
      >
        <v-card :loading="hotelFetching">
          <v-card-text>
            <v-text-field
              v-model="hotelForm.name"
              :label="$t('form.name')"
              :rules="[ validation.required ]"
              required
            />
            <v-textarea
              v-model="hotelForm.description"
              :label="$t('form.description')"
              clearable
            />
            <v-autocomplete
              v-model="hotelForm.hotelGroupId"
              :label="$t('admin.hotelGroup.title')"
              :items="me ? me.hotelGroups : []"
              :rules="[ validation.required ]"
              item-title="name"
              item-value="_id"
            />
            <v-autocomplete
              v-model="hotelForm.cityId"
              :label="$t('admin.city.title')"
              :items="cities"
              :rules="[ validation.required ]"
              item-title="name"
              item-value="_id"
            />
          </v-card-text>
          <v-card-text class="text-center">
            <v-btn
              class="text-white"
              @click="submit"
            >
              {{ $t('form.submit') }}
            </v-btn>
          </v-card-text>
        </v-card>
      </v-form>
    </AdminDetailFrame>
  </div>
</template>

<script>
import AdminDetailFrame from '@/components/form/AdminDetailFrame.vue';
import { goTo } from '@/composables/router';
import form from '@/mixins/form';
import { useCityStore } from '@/store/city';
import { useHotelStore } from '@/store/hotel';
import eventBus from '@/plugins/eventBus';
import { useSessionStore } from '@/store/session';
import { mapActions, mapState } from 'pinia';

export default {
  name: 'HotelForm',
  components: { AdminDetailFrame },
  mixins: [ form ],
  data () {
    return {
      hotelForm: {
        name: undefined,
        description: undefined,
      }
    };
  },
  computed: {
    ...mapState(useHotelStore, [ 'hotelFetching', 'hotelDetail' ]),
    ...mapState(useCityStore, [ 'cities' ]),
    ...mapState(useSessionStore, [ 'me' ]),
    isNew () {
      return this.$route.params?.id;
    },
  },
  async created () {
    if (this.$route.params?._id) {
      await this.getHotelById(this.$route.params.id);
    }
    this.fillForm();
    this.getCities();
  },
  methods: {
    ...mapActions(useHotelStore, [ 'getHotelById', 'upsertHotel' ]),
    ...mapActions(useCityStore, [ 'getCities' ]),
    fillForm () {
      this.hotelForm = Object.assign({}, this.hotelForm, { ...this.hotelDetail });
      this.hotelForm.hotelGroupId = this.me.hotelGroups?.at(0)._id;
    },
    async submit () {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        await this.upsertHotel(this.hotelForm);
        await goTo('AdminHome');
        eventBus.$emit('HOTEL_CREATED');
      }
    }
  }
};
</script>

<style scoped>

</style>
