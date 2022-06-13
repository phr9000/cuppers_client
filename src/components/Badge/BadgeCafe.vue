<template>
  <!-- 아로마노트 태그 -->
  <q-badge outline class="badge_cafe_keyword" color="secondary">{{
    value
  }}</q-badge>
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
  font-weight: 300;
  padding: 3px 3px;
  margin-right: 4px;
}
</style>
