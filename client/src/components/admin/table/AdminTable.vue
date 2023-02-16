<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="items"
    >
      <template #item.inputText="{ item, columns }">
        <v-text-field
          v-model="item.value[getColumnByKey(columns, 'inputText').value]"
          :rules="getColumnByKey(columns, 'inputText').required ? [ validation.required ] : []"
          density="compact"
          variant="outlined"
          class="my-1"
          clearable
          hide-details
        />
      </template>
      <template #item.count="{ item, columns }">
        <v-chip
          size="small"
          color="info"
          rounded
        >
          {{ item.value[getColumnByKey(columns, 'count').dataKey].length }}
        </v-chip>
      </template>
      <template #item.actions-1="{ item }">
        <v-btn
          color="error"
          size="x-small"
          variant="flat"
          icon
          @click="emitDelete(item)"
        >
          <v-icon size="large">
            mdi-delete-outline
          </v-icon>
        </v-btn>
      </template>
      <template #item.actions-2="{ item }">
        <v-btn
          class="mr-1"
          color="info"
          size="x-small"
          variant="flat"
          icon
          @click="emitEdit(item)"
        >
          <v-icon size="large">
            mdi-pencil
          </v-icon>
        </v-btn>
        <v-btn
          color="error"
          size="x-small"
          variant="flat"
          icon
          @click="emitDelete(item)"
        >
          <v-icon size="large">
            mdi-delete-outline
          </v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import form from '@/mixins/form';

export default {
  name: 'AdminTable',
  mixins: [ form ],
  props: {
    headers: {
      type: Array,
      default: () => [],
    },
    items: {
      type: Array,
      default: () => [],
    },
  },
  emits: [ 'deleteItem' ],
  methods: {
    getColumnByKey (columns, columnKey) {
      return columns.find(column => column.key === columnKey);
    },
    emitDelete (item) {
      this.$emit('deleteItem', item.value);
    },
    emitEdit (item) {
      this.$emit('editItem', item.value);
    },
  },
};
</script>

<style scoped>

</style>
