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
      :cafeData="cafeData"
      :cafeKeywordsData="cafeKeywordsData"
    />

    <!-- Coffee Menu-->
    <cafe-menu />

    <!-- User Reveiw -->

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

import cafeKeywordsData from '../data/cafeKeywordsData'
import brewingMenuData from '../data/brewingMenuData'
import variationMenuData from '../data/variationMenuData'
import cafeData from 'src/data/cafeData.json'
import reviewData from '../data/reviewData'
import userData from '../data/userData'

export default defineComponent({
  name: 'CafeDetailPage',
  components: {
    CafeInformation,
    InfiniteScroll,
    ImageGrid,
    CafeMenu
  },
  data() {
    return {
      brewingMenuData,
      variationMenuData,
      cafeKeywordsData,
      cafeData,
      reviewData,
      userData
    }
  }
})
</script>

<style lang="scss" scoped></style>
