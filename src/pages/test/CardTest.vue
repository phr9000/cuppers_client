<template>
  <h5>카드 컴포넌트 테스트</h5>
  <recommend-list />
  <test-card />
</template>

<script>
import { defineComponent } from 'vue'
import RecommendList from 'src/components/Card/RecommendList.vue'
import TestCard from 'src/components/Card/TestCard.vue'

export default defineComponent({
  name: 'CardTest',
  components: { RecommendList, TestCard },
  data() {
    return {}
  },
  mounted() {}
})
</script>
