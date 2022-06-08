<template>
  <!-- 카페 주소 -->
  <div>
    <p>{{ CafeAddrData[0].address }}</p>
  </div>
</template>

<script>
export default {
  name: 'CafeAddr',
  props: {
    CafeAddrData: Array
  }
}
</script>

<style></style>
