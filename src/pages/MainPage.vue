<template>
  <q-page>
    <div class="column">
      <div class="q-pl-xl col">
        <h3 class="q-mb-lg">따뜻한<br />커피 한 잔이<br />좋다☕</h3>
      </div>
    </div>
    <c-note-carousel />

    <!-- 카페 키워드 -->
    <section class="text-center column constrain">
      <div>
        <h4>CAFE KEYWORD</h4>
        <p>
          <span class="txt_keyword"> 키워드로 분류된 다양한 카페 모음 </span>
        </p>
      </div>
      <div class="column keyword-container">
        <div class="row">
          <btn-main
            v-for="keyword in keywords"
            :key="keyword.id"
            :id="keyword.id"
            :keyword="keyword.keyword"
          />
        </div>
      </div>

      <!-- 추천 카페 -->
      <!-- <recommend-list /> -->

      <div class="q-my-xl">
        <q-btn to="map" color="black" label="지도 표시하기" icon="map"></q-btn>
      </div>
    </section>
  </q-page>
</template>

<script>
import CafeKeywordsData from '../data/CafeKeywordsData'

// import RecommendList from '../components/Card/RecommendList.vue'
import CNoteCarousel from '../components/Carousel/CNoteCarousel.vue'
import BtnMain from '../components/Button/BtnMain.vue'

export default {
  name: 'MainPage',
  components: {
    CNoteCarousel,
    BtnMain
    // RecommendList
  },
  data() {
    return {
      keywords: CafeKeywordsData
    }
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
.keyword-container {
  border-collapse: collapse;
  border-right: 1px solid #eee;
  border-top: 1px solid #eee;
  width: 962px;
  margin: 0 auto;
  @media (max-width: 962px) {
    width: 722px;
  }
  @media (max-width: 722px) {
    width: 482px;
  }
}
</style>
