<template>
  <q-page class="q-pa-sm">
    <div class="q-ma-xs q-pa-xs custom_test radius_border">
      <p>카드 컴포넌트 테스트 테스트</p>
      <test-card />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import TestCard from 'src/components/Card/TestCard.vue'

export default defineComponent({
  components: { TestCard },
  data() {
    return {}
  }
})
</script>
