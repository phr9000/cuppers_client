<template>
  <!-- 브루잉 메뉴 -->
  <div>
    <h6>브루잉 메뉴</h6>
    <p v-for="(a, i) in BrewingMenuData" :key="i">
      <strong>{{ a.title }}</strong>
      --- HOT {{ a.hot }} ICE {{ a.ice }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'BrewingMenu',
  props: {
    BrewingMenuData: Array
  }
}
</script>

<style></style>
