<template>
  <q-tabs
    active-color="secondary"
    v-model="current"
    dense
    class="sort_tabs text-grey-6"
  >
    <q-tab
      v-for="item in sort_items"
      :key="item.val"
      class="tab"
      :name="item.val"
      :label="item.label"
    />
  </q-tabs>
</template>

<script>
export default {
  name: 'TabSort',
  components: {},
  props: {
    sort_items: {
      type: Array,
      default: () => {
        return null
      }
    }
  },
  data() {
    return {
      current: ''
    }
  },
  watch: {
    current(val) {
      this.$emit('change', val)
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped></style>
