<template>
  <div container class="q-mt-xl row">
    <div class="q-pl-md col-6">
      <h6 class="title" style="font-weight: 600">카페메뉴</h6>
      <div class="q-pt-md">
        <div class="q-pl-md q-mb-md">
          <p style="font-size: 17px">
            <q-icon size="sm" name="coffee" class="q-pr-sm" />Brewing Menu
          </p>
          <div v-for="i in OnlyBrewing" :key="i" class="q-pl-md">
            {{ i.menu_name }} ----- {{ i.menu_price_hot }}
          </div>
        </div>
        <div class="q-pl-md">
          <p style="font-size: 17px">
            <q-icon size="sm" name="coffee" class="q-pr-sm" />Variation Menu
          </p>
          <div v-for="i in OnlyVariation" :key="i" class="q-pl-md">
            {{ i.menu_name }} ----- {{ i.menu_price_hot }}
          </div>
        </div>
      </div>
    </div>
    <div class="col-6">
      <img :src="cafeData[0].cafe_menu_image" alt="" style="width: 500px" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'CafeMenu',
  props: {
    cafeMenuData: {
      type: Object,
      default: () => {
        return {
          menu_name: '에스프레소',
          menu_price_hot: 3.5,
          menu_price_ice: 3.5
        }
      }
    },
    cafeData: {
      type: Object,
      default: () => {
        return {
          cafe_menu_image:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGOQ_VynXr2kDkkFhIOvherUBTWBujQs9PhA&usqp=CAU'
        }
      }
    }
  },
  computed: {
    OnlyBrewing() {
      return this.cafeMenuData.filter(
        (cafeMenuData) => cafeMenuData.menu_type == 'Brewing'
      )
    },
    OnlyVariation() {
      return this.cafeMenuData.filter(
        (cafeMenuData) => cafeMenuData.menu_type == 'Variation'
      )
    }
  }
}
</script>
<style lang="scss" scoped>
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
</style>
