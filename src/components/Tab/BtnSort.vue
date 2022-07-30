<template>
  <div class="row items-center q-pr-sm">
    <btn-basic
      v-for="item in sort_items"
      :key="item.val"
      class="btn_sort q-ml-xs"
      :class="{ active: current === item.val }"
      @click="changeSort(item.val)"
      :label="item.label"
      size="sm"
    />
  </div>
</template>

<script>
import BtnBasic from 'src/components/Button/BtnBasic.vue'
export default {
  name: 'BtnSort',
  components: {
    BtnBasic
  },
  props: {
    start: {
      type: String,
      default: () => {
        return null
      }
    },
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
  mounted() {
    if (this.start) {
      this.current = this.start
    }
  },
  methods: {
    changeSort(val) {
      this.current = val
      this.$emit('change', val)
    }
  }
}
</script>

<style lang="scss" scoped>
.btn_sort {
  color: $grey-5 !important;
  &.active {
    color: $brown-5 !important;
  }
}
</style>
