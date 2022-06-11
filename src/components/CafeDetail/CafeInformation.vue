<template>
  <div container>
    <div class="row">
      <div view="lhh LpR lff" class="q-mt-xl col-6">
        <div class="q-pl-md info">
          <h5 class="title">기본정보</h5>
          <div class="body">
            <CafeTag />
            <CafeAddr />
            <CafeOperationTime />
            <CafeContact />
          </div>
        </div>
      </div>
      <div view="lhh LpR lff" class="q-mt-xl col-6 wow">
        <div class="q-pl-md">리뷰</div>
      </div>
    </div>
  </div>
</template>

<script>
// Components
import CafeTag from '../CafeTag/CafeTag.vue'
import CafeAddr from '../CafeInfo/CafeAddr.vue'
import CafeOperationTime from '../CafeInfo/CafeOperationTime.vue'
import CafeContact from '../CafeInfo/CafeContact.vue'

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
    CafeOperationTime,
    CafeContact
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
.info {
  background-color: antiquewhite;
  padding-left: 10px;
  .title {
    margin: 0;
  }
  .body {
    padding-left: 20px;
  }
}
.wow {
  background-color: bisque;
}
</style>
