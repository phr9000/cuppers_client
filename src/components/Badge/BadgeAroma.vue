<template>
  <!-- 아로마노트 태그 -->
  <q-badge outline class="badge_aroma_note text-brown-1" color="brown-7">{{
    value
  }}</q-badge>
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
  font-weight: 300;
  padding: 3px 3px;
  margin-right: 4px;
}
</style>
