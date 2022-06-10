<template>
  <q-page>
    <div class="column">
      <div class="q-pl-xl col">
        <h3 class="q-mb-lg">따뜻한<br />커피 한 잔이<br />좋다☕</h3>
      </div>
    </div>
    <CNoteCarousel />

    <!-- 카페 키워드 -->

    <div class="keyword-container column constrain">
      <div class="keyword">
        <h4>CAFE KEYWORD</h4>
        <p>
          <span class="txt_keyword"> 키워드로 분류된 다양한 카페 모음 </span>
        </p>
      </div>
      <div class="column">
        <div class="row">
          <div class="col-2"></div>
          <div class="col-1"><keyword-for-main /></div>
          <div class="col-1"><keyword-for-main /></div>
          <div class="col-1"><keyword-for-main /></div>
          <div class="col-1"><keyword-for-main /></div>
          <div class="col-1"><keyword-for-main /></div>
          <div class="col-1"><keyword-for-main /></div>
          <div class="col-1"><keyword-for-main /></div>
          <div class="col-1"><keyword-for-main /></div>
          <div class="col-2"></div>
        </div>
      </div>

      <!-- <RecommendList /> -->
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
    </div>
  </q-page>
</template>

<script>
import CafeKeywordsData from '../data/CafeKeywordsData'

// import RecommendList from '../components/Card/RecommendList.vue'
import CNoteCarousel from '../components/Carousel/CNoteCarousel.vue'
// import CafeKeywords from '../components/Keyword/CafeKeywords.vue'
import KeywordForMain from '../components/Keyword/KeywordForMain.vue'

export default {
  name: 'MainPage',
  components: {
    CNoteCarousel,
    KeywordForMain
    // CafeKeywords
    // RecommendList
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
.keyword-container {
  text-align: center;
}
.q-pa-md q-gutter-sm {
  display: block;
  margin: auto;
  text-align: center;
  width: 100%;
}
</style>
