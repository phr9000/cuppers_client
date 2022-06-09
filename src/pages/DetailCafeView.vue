<template>
  <!-- 카페 태그 -->
  <CafeTag :CafeTagData="CafeTagData" v-for="(a, i) in CafeTagData" :key="i">
    <q-badge color="brown">{{ a.title }}</q-badge>
  </CafeTag>

  <!-- 카페 주소 -->
  <CafeAddr :CafeAddrData="CafeAddrData" />

  <!-- 카페 영업시간 -->
  <CafeOperationTime :CafeTimeData="CafeTimeData" />

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
  <!-- 인피니트스크롤 -->
  <InfiniteScroll />
</template>

<script>
import { defineComponent } from 'vue'
import CafeTag from '../components/CafeTag/CafeTag.vue'
import CafeAddr from '../components/CafeInfo/CafeAddr.vue'
import CafeContact from '../components/CafeInfo/CafeContact.vue'
import CafeOperationTime from '../components/CafeInfo/CafeOperationTime.vue'
import BrewingMenu from '../components/CafeMenu/BrewingMenu.vue'
import VariationMenu from '../components/CafeMenu/VariationMenu.vue'
import InfiniteScroll from '../components/Scroll/InfiniteScroll.vue'

import CafeTagData from '../data/CafeTagData'
import CafeAddrData from '../data/CafeAddrData'
import CafeContactData from '../data/CafeContactData'
import CafeTimeData from '../data/CafeTimeData'
import BrewingMenuData from '../data/BrewingMenuData'
import VariationMenuData from '../data/VariationMenuData'

export default defineComponent({
  name: 'DetailCafeView',
  components: {
    CafeTag,
    CafeAddr,
    CafeContact,
    CafeOperationTime,
    BrewingMenu,
    VariationMenu,
    InfiniteScroll
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

<style>
* {
  padding-left: 10px;
}
</style>
