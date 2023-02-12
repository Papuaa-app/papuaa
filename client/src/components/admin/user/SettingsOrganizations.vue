<template>
  <div>
    <div class="d-flex justify-space-between">
      <h6 class="text-grey">
        {{ $t('admin.settings.organizations.title') }}
      </h6>
      <v-btn
        size="small"
        disabled
      >
        {{ $t('admin.settings.organizations.create') }}
      </v-btn>
    </div>
    <div class="mt-2">
      <v-card>
        <v-data-table
          :headers="headers"
          :items="userOrganizations"
          :items-per-page="userOrganizations.length"
        />
      </v-card>
    </div>
  </div>
</template>

<script>
import { useSessionStore } from '@/store/session';
import { useUserStore } from '@/store/user';
import { mapActions, mapState } from 'pinia';

export default {
  name: 'SettingsOrganizations',
  data () {
    return {
      headers: [
        { title: this.$t('table.name'), key: 'name' },
      ]
    };
  },
  computed: {
    ...mapState(useSessionStore, [ 'me' ]),
    ...mapState(useUserStore, [ 'userFetching' ]),
    userOrganizations () {
      return this.me?.hotelGroups?.length ? this.me.hotelGroups : [];
    }
  },
  async created () {
    await this.getMyHotelGroups();
  },
  methods: {
    ...mapActions(useSessionStore, [ 'getMyHotelGroups' ]),
  }
};
</script>

<style lang="scss" scoped>
div ::v-deep .v-data-table-footer {
  display: none;
}
</style>
