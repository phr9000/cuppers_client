<template>
  <q-page class="constrain" container>
    <!-- Image Grid -->
    <cafe-image-grid
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
    <card-review :reviewData="reviewData" :userData="userData" />

    <!-- 페이지네이션 -->
    <div class="q-pa-lg flex flex-center">
      <q-pagination v-model="current" :max="5" direction-links />
    </div>
  </q-page>
  <infinite-scroll />
</template>

<script>
import { defineComponent } from 'vue'
import CafeInformation from '../components/Etc/CafeInformation.vue'
import InfiniteScroll from '../components/Scroll/InfiniteScroll.vue'
import CafeImageGrid from '../components/Etc/CafeImageGrid.vue'
import CafeMenu from '../components/Etc/CafeMenu.vue'
import CardReview from '../components/Card/CardReview.vue'

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
    CafeImageGrid,
    CafeMenu,
    CardReview
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
