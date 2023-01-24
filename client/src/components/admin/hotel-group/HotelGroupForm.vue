<template>
  <div>
    <AdminDetailFrame :title="isNew ? 'admin.hotelGroup.detail.edit' : 'admin.hotelGroup.detail.create'">
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        @submit.prevent="submit"
      >
        <v-card :loading="hotelGroupFetching">
          <v-card-text>
            <v-text-field
              v-model="hotelGroupForm.name"
              :label="$t('form.name')"
              :rules="[ validation.required ]"
              required
            />
            <v-textarea
              v-model="hotelGroupForm.description"
              :label="$t('form.description')"
              clearable
            />
            <v-card
              border
              variant="plain"
            >
              <v-card-title>
                {{ $t('admin.billing.title') }}
              </v-card-title>
              <v-card-text class="flex-form">
                <v-text-field
                  v-model="hotelGroupForm.billing.holdingName"
                  :label="$t('admin.billing.holdingName')"
                  :rules="[ validation.required ]"
                  required
                />
                <v-text-field
                  v-model="hotelGroupForm.billing.address"
                  :label="$t('form.address')"
                  :rules="[ validation.required ]"
                  required
                />
                <v-text-field
                  v-model="hotelGroupForm.billing.taxId"
                  :label="$t('admin.billing.taxId')"
                />
                <v-autocomplete
                  v-model="hotelGroupForm.billing.cityId"
                  :label="$t('admin.city.title')"
                  :items="cities"
                  item-title="name"
                  item-value="_id"
                />
              </v-card-text>
            </v-card>
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
import { useHotelGroupStore } from '@/store/hotelGroup';
import { useSessionStore } from '@/store/session';
import { mapActions, mapState } from 'pinia';

export default {
  name: 'HotelGroupForm',
  components: { AdminDetailFrame },
  mixins: [ form ],
  props: {
    isNew: {
      type: Boolean,
      default: () => false,
    },
  },
  data () {
    return {
      hotelGroupForm: {
        name: undefined,
        description: undefined,
        billing: {
          holdingName: undefined,
          address: undefined,
          cityId: undefined,
          taxId: undefined,
        }
      }
    };
  },
  computed: {
    ...mapState(useHotelGroupStore, [ 'hotelGroupFetching', 'hotelGroupDetail' ]),
    ...mapState(useSessionStore, [ 'me' ]),
    ...mapState(useCityStore, [ 'cities' ]),
  },
  async created () {
    await this.getCities();
  },
  methods: {
    ...mapActions(useCityStore, [ 'getCities' ]),
    ...mapActions(useHotelGroupStore, [ 'upsertHotelGroup', 'addUserToHotelGroup' ]),
    async submit () {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        await this.upsertHotelGroup(this.hotelGroupForm);
        console.log(this.hotelGroupDetail._id);
        await this.addUserToHotelGroup({
          hotelGroupId: this.hotelGroupDetail._id,
          userId: this.me._id,
        });
        await goTo('AdminHome');
      }
    }
  }
};
</script>

<style scoped>

</style>
