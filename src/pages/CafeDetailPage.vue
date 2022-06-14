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
      :mainKeywordsData="mainKeywordsData"
    />

    <!-- Coffee Menu-->
    <cafe-menu :cafeMenuData="cafeMenuData" :cafeData="cafeData" class="half" />

    <!-- User Reveiw -->
    <div class="row q-mt-xl">
      <div class="card_wrap q-mr-md">
        <card-review
          v-for="review in reviews"
          :key="review.review_id"
          :review="review"
        />
      </div>
    </div>

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

import mainKeywordsData from '../data/mainKeywordsData'
import cafeMenuData from '../data/cafeMenuData'
import cafeData from '../data/cafeData.json'
import reviewData from '../data/ReviewData'
import userData from '../data/UserData'

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
      mainKeywordsData,
      cafeData,
      reviewData,
      userData,
      reviews: []
    }
  },
  mounted() {
    this.reviews = reviewData
    console.log(this.reviews)
  }
})
</script>

<style lang="scss" scoped>
.half {
  padding-bottom: 50px;
  border-bottom: 1px solid #848484;
}
</style>
