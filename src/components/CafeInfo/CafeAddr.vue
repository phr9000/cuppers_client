<template>
  <!-- 카페 주소 -->
  <div>
    <p>{{ CafeAddr.address }}</p>
  </div>
</template>

<script>
import CafeAddrData from '../../data/CafeAddrData'

export default {
  name: 'CafeAddr',
  props: {
    CafeAddrData: Array
  },
  data() {
    return {
      CafeAddr: CafeAddrData
    }
  },
  computed: {
    firstAddr() {
      return this.CafeAddr[0]
    }
  }
}
</script>

<style></style>
