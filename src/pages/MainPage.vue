<template>
  <h3>따뜻한<br />커피 한 잔이<br />좋다</h3>
  <CNoteCarousel />
  <CafeKeywords :CafeKeywordsData="CafeKeywordsData" />
  <RecommendList />
</template>

<script>
import RecommendList from '../components/Card/RecommendList.vue'
import CNoteCarousel from '../components/Carousel/CNoteCarousel.vue'
import CafeKeywords from '../components/Keyword/CafeKeywords.vue'

import CafeKeywordsData from '../data/CafeKeywordsData'

export default {
  name: 'MainPage',
  components: {
    CNoteCarousel,
    CafeKeywords,
    RecommendList
  },
  data() {
    return {
      CafeKeywordsData
    }
  }
}
</script>
<style lang="scss" scoped>
h3 {
  padding-left: 30px;
}
</style>
