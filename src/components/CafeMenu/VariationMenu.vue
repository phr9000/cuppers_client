<template>
  <!-- 베리에이션 메뉴 -->
  <div>
    <h6>베리에이션 메뉴</h6>
    <p v-for="(a, i) in VariationMenuData" :key="i">
      <strong>{{ a.title }}</strong>
      --- HOT {{ a.hot }} ICE {{ a.ice }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'VariationMenu',
  props: {
    VariationMenuData: Array
  }
}
</script>

<style></style>
