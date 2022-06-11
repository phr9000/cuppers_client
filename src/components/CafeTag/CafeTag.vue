<template>
  <!-- 카페 태그 -->
  <div class="q-pa-md badges">
    <div class="badge">
      <q-badge color="brown">{{ CafeKeywordsData[0].keyword }}</q-badge>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CafeTag',
  props: {
    CafeKeywordsData: Array
  }
}
</script>

<style lang="scss">
.badges {
  display: flex;
  padding: 0;
  margin: 5px 0;
  .badge {
    padding-right: 5px;
  }
}
</style>
