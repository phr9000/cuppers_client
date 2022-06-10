<template>
  <!-- 카페 영업시간 -->
  <div>
    <span>
      {{ firstCafeTime.weekday }} | {{ firstCafeTime.weekend }} |
      {{ firstCafeTime.dayoff }}
    </span>
  </div>
</template>

<script>
import CafeTimeData from '../../data/CafeTimeData'

export default {
  name: 'CafeOperationTime',
  props: {
    CafeTimeData: Array
  },
  data() {
    return {
      CafeTime: CafeTimeData
    }
  },
  computed: {
    firstCafeTime() {
      return this.CafeTime[0]
    }
  }
}
</script>

<style></style>
