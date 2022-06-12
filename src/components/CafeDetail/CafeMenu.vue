<template>
  <div container class="q-mt-xl">
    <div class="q-pl-md">
      <h5 class="title">카페메뉴</h5>
      <div class="body">
        <div class="q-pt-sm">
          <h6>브루잉 메뉴</h6>
          <p v-for="menu in Brewing" :key="menu">
            <strong>{{ menu.title }}</strong> ---HOT{{ menu.hot }}, ICE{{
              menu.ice
            }}
          </p>
        </div>
        <div>
          <h6>베리에이션 메뉴</h6>
          <p v-for="menu in Variation" :key="menu">
            <strong>{{ menu.title }}</strong> --- HOT{{ menu.hot }}, ICE{{
              menu.ice
            }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import brewingMenuData from '../../data/brewingMenuData'
import variationMenuData from '../../data/variationMenuData'

export default {
  name: 'CafeMenu',
  data() {
    return {
      Brewing: brewingMenuData,
      Variation: variationMenuData
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  margin-top: 0;
  background-color: azure;
  .title {
    margin: 0;
  }
  .body {
    padding-left: 20px;
    p {
      margin: 4px 0;
      padding-left: 15px;
    }
  }
  h6 {
    margin: 10px 0;
  }
}
</style>
