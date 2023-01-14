export default {
  data () {
    return {
      valid: true,
      validation: {
        required: v => !!v || this.$t('form.validation.required'),
      }
    };
  },
};
