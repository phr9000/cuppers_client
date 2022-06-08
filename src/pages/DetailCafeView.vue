<template>
  <!-- 카페 태그 -->
  <CafeTag :CafeTagData="CafeTagData" v-for="(a, i) in CafeTagData" :key="i">
    <q-badge color="brown">{{ a.title }}</q-badge>
  </CafeTag>

  <!-- 카페 주소 -->
  <div>
    <p>{{ CafeAddrData[0].address }}</p>
  </div>
  <CafeAddr :CafeAddrData="CafeAddrData" />

  <!-- 카페 영업시간 -->
  <div>
    <span>
      {{ CafeTimeData[0].weekday }} | {{ CafeTimeData[0].weekend }} |
      {{ CafeTimeData[0].dayoff }}
    </span>
  </div>
  <CafeOperationTime :CafeTimeData="CafeTimeData" />

  <!-- 카페 연락처(전화번호, 홈페이지, 인스타그램) -->
  <div>
    <span>{{ CafeContactData[0].tel }}</span>
    <br />
    <a href="">{{ CafeContactData[0].web }}</a>
    <br />
    <a href="">{{ CafeContactData[0].insta }}</a>
  </div>
  <CafeContact :CafeContactData="CafeContactData" />

  <!-- 브루잉 메뉴 -->
  <div>
    <h6>브루잉 메뉴</h6>
    <p v-for="(a, i) in BrewingMenuData" :key="i">
      <strong>{{ a.title }}</strong>
      --- HOT {{ a.hot }} ICE {{ a.ice }}
    </p>
  </div>
  <BrewingMenu :BrewingMenuData="BrewingMenuData" />

  <!-- 베리에이션 메뉴 -->
  <div>
    <h6>베리에이션 메뉴</h6>
    <p v-for="(a, i) in VariationMenuData" :key="i">
      <strong>{{ a.title }}</strong>
      --- HOT {{ a.hot }} ICE {{ a.ice }}
    </p>
  </div>
  <VariationMenu :VariationMenuData="VariationMenuData" />

  <!-- 페이지네이션 -->
  <div class="q-pa-lg flex flex-center">
    <q-pagination v-model="current" :max="5" direction-links />
  </div>

  <InfiniteScroll />
</template>

<script>
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

export default {
  name: 'DetailCafeView',
  component: {
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
}
</script>

<style>
* {
  padding-left: 10px;
}
</style>
