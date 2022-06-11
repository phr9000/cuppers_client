<template>
  <q-page class="constrain" container>
    <!-- Image Grid -->
    <ImageGrid />

    <!-- CafeInformation -->
    <CafeInformation
      :CafeData="CafeData"
      :CafeKeywordsData="CafeKeywordsData"
    />

    <!-- Coffee Menu-->
    <CafeMenu />

    <!-- User Reveiw -->

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
import CafeMenu from '../components/CafeDetail/CafeMenu.vue'

import CafeKeywordsData from '../data/CafeKeywordsData'
import BrewingMenuData from '../data/BrewingMenuData'
import VariationMenuData from '../data/VariationMenuData'
import CafeData from 'src/data/CafeData.json'

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
      BrewingMenuData,
      VariationMenuData,
      CafeKeywordsData,
      CafeData
    }
  }
})
</script>

<style lang="scss" scoped></style>
