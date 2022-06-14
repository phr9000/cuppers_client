<template>
  <!-- 카페 태그 -->
  <q-badge outline rounded class="badge_cafe_keyword">{{ value }}</q-badge>
</template>

<script>
export default {
  name: 'BadgeAroma',
  props: {
    value: {
      type: String,
      default: '내추럴 커피'
    }
  }
}
</script>

<style lang="scss">
.badge_cafe_keyword {
  cursor: pointer;
  color: $teal-4;
  border: 1px solid $teal-2;
  font-weight: 500;
  padding: 3px 6px;
  margin-right: 4px;
  margin-bottom: 3px;
  &:hover {
    background-color: $grey-2;
  }
}
</style>
