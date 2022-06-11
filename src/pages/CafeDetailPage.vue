<template>
  <q-page class="container" container>
    <!-- Image Grid -->
    <ImageGrid />

    <!-- CafeInformation -->
    <CafeInformation />

    <!-- Coffee Menu-->
    <CafeMenu />

    <!-- User Reveiw -->
    <CafeReview />

    <!-- 페이지네이션 -->
    <div class="q-pa-lg flex flex-center">
      <q-pagination v-model="current" :max="5" direction-links />
    </div>
  </q-page>
  <InfiniteScroll />
</template>

<script>
import { defineComponent } from 'vue'
import CafeInformation from '../components/CafeDetail/CafeInformation.vue'
import InfiniteScroll from '../components/Scroll/InfiniteScroll.vue'
import ImageGrid from '../components/CafeDetail/ImageGrid.vue'
import CafeReview from '../components/CafeDetail/CafeReview.vue'
import CafeMenu from '../components/CafeDetail/CafeMenu.vue'

import CafeTagData from '../data/CafeTagData'
import CafeAddrData from '../data/CafeAddrData'
import CafeContactData from '../data/CafeContactData'
import CafeTimeData from '../data/CafeTimeData'
import BrewingMenuData from '../data/BrewingMenuData'
import VariationMenuData from '../data/VariationMenuData'

export default defineComponent({
  name: 'CafeDetailPage',
  components: {
    CafeInformation,
    InfiniteScroll,
    ImageGrid,
    CafeReview,
    CafeMenu
  },
  data() {
    return {
      CafeTagData,
      CafeAddrData,
      CafeContactData,
      CafeTimeData,
      BrewingMenuData,
      VariationMenuData
    }
  }
})
</script>

<style lang="scss" scoped></style>
