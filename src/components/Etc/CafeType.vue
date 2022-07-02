<template>
  <!-- cafe type, region -->
  <div class="cafe_type row items-center">
    <span v-if="cafe_type === 'r'" class="icon_cafe_type"
      ><q-icon size="14px" name="img:/icons/br.png"
    /></span>
    <span class="text-subtitle2 text-grey q-pt-xs"> {{ cafe_region }}</span>
  </div>
</template>

<script>
export default {
  name: 'CafeType',
  props: {
    cafe_type: {
      type: String,
      default: ''
    },
    cafe_region: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.cafe_type {
  display: inline;
  .icon_cafe_type {
    padding-bottom: 1px;
    padding: 0 2px;
  }
}
</style>
