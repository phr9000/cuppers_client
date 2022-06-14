<template>
  <!-- 아로마노트 태그 -->
  <q-badge outline rounded class="badge_aroma_note">{{ value }}</q-badge>
</template>

<script>
export default {
  name: 'BadgeAroma',
  props: {
    value: {
      type: String,
      default: '바삭한질감'
    }
  }
}
</script>

<style lang="scss">
.badge_aroma_note {
  color: $brown-3;
  border: 1px solid $brown-3;
  font-weight: 500;
  padding: 3px 6px;
  margin-right: 4px;
  margin-bottom: 3px;
}
</style>
