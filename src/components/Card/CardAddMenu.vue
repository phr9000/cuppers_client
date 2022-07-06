<template>
  <q-card
    ref="CardAddMenu"
    class="q-px-xl q-mx-lg q-my-lg q-py-md bg-white addcard"
  >
    <div class="row flex justify-end">
      <!-- CardMenu 제거 -->
      <btn-icon size="xs" icon="close" color="red" />
    </div>
    <div class="row flex justify-between">
      <q-input
        v-model="new_menu.menu_name"
        type="text"
        label="메뉴이름"
        class="col-8"
      />
      <div class="col-2 row justify-evenly align-center">
        <!-- Signature Menu 선택 -->
        <q-checkbox v-model="new_menu.is_signature" size="20px"
          ><span class="q-px-md">Signature</span></q-checkbox
        >
      </div>
    </div>
    <div class="row flex justify-between align-item">
      <q-input
        v-model="new_menu.menu_price_hot"
        label="Hot"
        class="col-5"
        type="number"
      />
      <q-input
        v-model="new_menu.menu_price_ice"
        label="Ice"
        class="col-5"
        type="number"
      />
    </div>
    <div>
      <div v-if="new_menu.menu_type === 'br'">
        <!-- Brewing // Variation-->
        <q-input
          v-model="new_menu.menu_aromanote"
          type="text"
          label="Aromanote"
        />
      </div>
    </div>
  </q-card>
</template>
<script>
import BtnIcon from '../Button/BtnIcon.vue'
export default {
  name: 'CardAddBrewing',
  components: {
    BtnIcon
  },
  props: {
    menu_id: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      // 부모 컴포넌트 AddNewCafePage에 전달할 메뉴 데이터 선언
      new_menu: {
        menu_name: '',
        menu_price_hot: 0,
        menu_price_ice: 0,
        is_signature: false,
        menu_aromanote: '',
        menu_type: ''
      }
    }
  },
  methods: {
    // 부모 컴포넌트 AddNewCafePage의 메뉴 추가 버튼과 연결된 메소드
    sendBrewing() {
      this.new_menu.menu_type = 'br'
      return this.new_menu
    },
    sendVariation() {
      this.new_menu.menu_type = 'va'
      return this.new_menu
    }
  }
}
</script>
<style lang="scss" scoped>
.addcard {
  border: 1px solid #ccc;
  box-sizing: content-box;
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
