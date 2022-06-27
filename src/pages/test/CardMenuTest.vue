<template>
  <div>
    <btn-basic @click="getMenu" />
    <card-add-menu
      v-for="(menu, index) in cafe_menu"
      :key="index"
      :menu_id="menu.menu_id"
      :menu_type="menu.menu_type"
      :ref="`CardAddMenu${menu.menu_id}`"
    />
  </div>
  <!-- @focusout="submit" @newMenu="addMenu" -->
</template>
<script>
import BtnBasic from 'src/components/Button/BtnBasic.vue'
import CardAddMenu from 'src/components/Card/CardAddMenu.vue'
export default {
  name: 'CardMenuTest',
  components: {
    BtnBasic,
    CardAddMenu
  },
  data() {
    return {
      cafe_menu: [
        {
          menu_id: 0,
          menu_name: '',
          menu_price_hot: 0,
          menu_price_ice: 0,
          is_signature: false,
          menu_aromanote: '',
          menu_type: ''
        },
        {
          menu_id: 1,
          menu_name: '',
          menu_price_hot: 0,
          menu_price_ice: 0,
          is_signature: false,
          menu_aromanote: '',
          menu_type: ''
        }
      ]
    }
  },
  methods: {
    getMenu(index) {
      let newData = this.$refs.CardAddMenu[index].callMenuData()
      this.cafe_menu.push(newData)
      console.log(this.cafe_menu)
      console.log(newData)
    },
    addMenu(MenuData) {
      console.log(MenuData)
    },
    submit() {
      console.log(cafe_menu)
    }
  }
}
</script>
<style lang="scss" scoped></style>
