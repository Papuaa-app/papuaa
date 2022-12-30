export default {
  data () {
    return {
      validation: {
        required: v => !!v || this.$t('form.validation.required'),
      }
    };
  },
};
