<template>
  <div view="lhh LpR lff" container class="shadow-2 q-mt-xl">
    <div class="q-pl-md">
      <h5 class="q-pt-md title">기본정보</h5>
      <CafeTag />
      <CafeAddr />
      <CafeOperationTime />
    </div>
  </div>
</template>

<script>
// Components
import CafeTag from '../CafeTag/CafeTag.vue'
import CafeAddr from '../CafeInfo/CafeAddr.vue'
import CafeOperationTime from '../CafeInfo/CafeOperationTime.vue'

// Data
import CafeTagData from '../../data/CafeTagData'
import CafeAddrData from '../../data/CafeAddrData'
import CafeContactData from '../../data/CafeContactData'
import CafeTimeData from '../../data/CafeTimeData'
import BrewingMenuData from '../../data/BrewingMenuData'
import VariationMenuData from '../../data/VariationMenuData'

export default {
  name: 'CafeInformation',
  components: {
    CafeTag,
    CafeAddr,
    CafeOperationTime
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
<style lang="scss" scoped>
.title {
  margin: 0;
}
</style>
