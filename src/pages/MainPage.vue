<template>
  <h3>따뜻한<br />커피 한 잔이<br />좋다</h3>
  <CNoteCarousel />
  <CafeKeywords :CafeKeywordsData="CafeKeywordsData" />
  <RecommendList />
  <div class="">
    <div class="q-pa-md q-gutter-sm" style="padding-top: 850px">
      <q-btn
        color="black"
        label="지도 표시하기"
        icon="map"
        @click="MapRedirect()"
      ></q-btn>
    </div>
  </div>
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
  },
  methods: {
    MapRedirect() {
      this.$router.push('/map')
    }
  }
}
</script>
<style lang="scss" scoped>
h3 {
  padding-left: 30px;
}
.q-pa-md q-gutter-sm {
  display: block;
  margin: auto;
  text-align: center;
  width: 100%;
}
</style>
