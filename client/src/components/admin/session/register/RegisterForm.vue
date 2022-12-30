<template>
  <v-text-field
    v-model="modelValue.fullName"
    :label="$t('admin.session.fullName')"
    :rules="[ validation.required ]"
    required
  />
  <v-text-field
    v-model="modelValue.hotelName"
    :label="$t('admin.session.hotelName')"
    :rules="[ validation.required ]"
    required
  />
  <v-text-field
    v-model="modelValue.roomsNumber"
    :label="$t('admin.session.roomsNumber')"
  />
  <v-text-field
    v-model="modelValue.email"
    :label="$t('admin.session.email')"
    :rules="[ validation.required ]"
    required
  />
  <v-text-field
    v-model="modelValue.phone"
    :label="$t('admin.session.phone')"
    :rules="[ validation.required ]"
    required
  />
</template>

<script>
import form from '@/mixins/form';

export default {
  name: 'RegisterForm',
  mixins: [ form ],
  props: {
    modelValue: {
      type: Object,
      default: () => undefined,
    }
  }
};
</script>

