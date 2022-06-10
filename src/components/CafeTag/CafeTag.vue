<template>
  <!-- 카페 태그 -->
  <div class="q-pa-md badges">
    <div v-for="tag in CafeTag" :key="tag" class="badge">
      <q-badge color="brown">{{ tag.title }}</q-badge>
    </div>
  </div>
</template>

<script>
import CafeTagData from '../../data/CafeTagData'

export default {
  name: 'CafeTag',
  props: {
    CafeTagData: Array
  },
  data() {
    return {
      CafeTag: CafeTagData
    }
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
