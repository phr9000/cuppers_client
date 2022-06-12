<template>
  <q-page class="constrain" container>
    <!-- Image Grid -->
    <image-grid
      :cafeData="cafeData"
      :reviewData="reviewData"
      :userData="userData"
    />

    <!-- CafeInformation -->

    <cafe-information
      :reviewData="reviewData"
      :userData="userData"
      :cafeData="cafeData"
      :cafeKeywordsData="cafeKeywordsData"
    />

    <!-- Coffee Menu-->
    <cafe-menu :cafeMenuData="cafeMenuData" :cafeData="cafeData" class="half" />

    <!-- User Reveiw -->
    <review-card :reviewData="reviewData" :userData="userData" />

    <!-- 페이지네이션 -->
    <div class="q-pa-lg flex flex-center">
      <q-pagination v-model="current" :max="5" direction-links />
    </div>
  </q-page>
  <infinite-scroll />
</template>

<script>
import { defineComponent } from 'vue'
import CafeInformation from '../components/CafeDetail/CafeInformation.vue'
import InfiniteScroll from '../components/Scroll/InfiniteScroll.vue'
import ImageGrid from '../components/CafeDetail/ImageGrid.vue'
import CafeMenu from '../components/CafeDetail/CafeMenu.vue'
import ReviewCard from '../components/Card/ReviewCard.vue'

import cafeKeywordsData from '../data/cafeKeywordsData'
import cafeMenuData from '../data/cafeMenuData'
import cafeData from '../data/cafeData.json'
import reviewData from '../data/reviewData'
import userData from '../data/userData'

export default defineComponent({
  name: 'CafeDetailPage',
  components: {
    CafeInformation,
    InfiniteScroll,
    ImageGrid,
    CafeMenu,
    ReviewCard
  },
  data() {
    return {
      cafeMenuData,
      cafeKeywordsData,
      cafeData,
      reviewData,
      userData
    }
  }
})
</script>

<style lang="scss" scoped>
.half {
  padding-bottom: 50px;
  border-bottom: 1px solid #848484;
}
</style>
