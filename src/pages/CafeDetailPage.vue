<template>
  <div class="q-container">
    <!-- Image Grid -->
    <ImageGrid />

    <!-- CafeInformation -->
    <CafeInformation />

    <!-- 카페 연락처(전화번호, 홈페이지, 인스타그램) -->
    <CafeContact :CafeContactData="CafeContactData" />

    <!-- 브루잉 메뉴 -->
    <BrewingMenu :BrewingMenuData="BrewingMenuData" />

    <!-- 베리에이션 메뉴 -->
    <VariationMenu :VariationMenuData="VariationMenuData" />

    <!-- 페이지네이션 -->
    <div class="q-pa-lg flex flex-center">
      <q-pagination v-model="current" :max="5" direction-links />
    </div>

    <CafeReview />

    <InfiniteScroll />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import CafeInformation from '../components/CafeDetail/CafeInformation.vue'
import CafeContact from '../components/CafeInfo/CafeContact.vue'
import BrewingMenu from '../components/CafeMenu/BrewingMenu.vue'
import VariationMenu from '../components/CafeMenu/VariationMenu.vue'
import InfiniteScroll from '../components/Scroll/InfiniteScroll.vue'
import ImageGrid from '../components/CafeDetail/ImageGrid.vue'
import CafeReview from '../components/CafeDetail/CafeReview.vue'

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
    CafeContact,
    BrewingMenu,
    VariationMenu,
    InfiniteScroll,
    ImageGrid,
    CafeReview
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

<style lang="scss" scoped>
.q-container {
  width: 80%;
  margin: 0 auto;
}
</style>
