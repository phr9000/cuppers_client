<template>
  <div class="q-px-xl q-mx-lg q-my-lg q-py-md bg-white addcard">
    <div class="row flex justify-end">
      <!-- CardMenu 제거 -->
      <btn-icon @click="deleteCard" size="xs" icon="close" color="red" />
    </div>
    <div class="row flex justify-between">
      <q-input
        v-model="cafe_menu.menu_name"
        type="text"
        label="메뉴이름"
        class="col-8"
      />
      <div class="col-2 row justify-evenly align-center">
        <!-- Signature Menu 선택 -->
        <q-checkbox v-model="cafe_menu.is_signature" size="20px"
          ><span class="q-px-md">Signature</span></q-checkbox
        >
      </div>
    </div>
    <div class="row flex justify-between align-item">
      <q-input
        v-model="cafe_menu.menu_price_hot"
        label="Hot"
        class="col-5"
        type="number"
      />
      <q-input
        v-model="cafe_menu.menu_price_ice"
        label="Ice"
        class="col-5"
        type="number"
      />
    </div>
    <div>
      <div v-if="menu_type == 'br'">
        <q-input
          v-model="cafe_menu.menu_aromanote"
          type="text"
          label="Aromanote"
        />
      </div>
    </div>
  </div>
</template>
<script>
import BtnIcon from '../Button/BtnIcon.vue'
export default {
  name: 'CardAddBrewing',
  components: {
    BtnIcon
  },
  props: {
    menu_type: String
  },
  data() {
    return {
      cafe_menu: {
        menu_name: '',
        menu_price_hot: 0,
        menu_price_ice: 0,
        is_signaure: false,
        menu_aromanote: ''
      }
    }
  },
  methods: {
    deleteCard() {
      this.$emit('deleteCard')
    }
  }
}
</script>
<style lang="scss" scoped>
.addcard {
  border: 1px solid #ccc;
  box-sizing: content-box;
  border-radius: 10px;
  .clear {
    border: 1px solid $red;
    box-sizing: content-box;
    border-radius: 50%;
  }
  .clear:hover {
    cursor: pointer;
  }
}
</style>
