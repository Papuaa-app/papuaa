<template>
  <v-text-field :label="$t('admin.session.fullName')" />
  <v-text-field :label="$t('admin.session.hotelName')" />
  <v-text-field :label="$t('admin.session.roomsNumber')" />
  <v-text-field :label="$t('admin.session.email')" />
  <v-text-field :label="$t('admin.session.phone')" />
</template>

<script>
export default {
  name: 'RegisterForm'
};
</script>

<style scoped>

</style>
