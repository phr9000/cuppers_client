<template>
  <!-- 카페 영업시간 -->
  <div>
    <span>
      {{ CafeTimeData[0].weekday }} | {{ CafeTimeData[0].weekend }} |
      {{ CafeTimeData[0].dayoff }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'CafeOperationTime',
  props: {
    CafeTimeData: Array
  }
}
</script>

<style></style>
