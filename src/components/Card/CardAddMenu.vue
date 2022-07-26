<template>
  <q-card ref="CardAddMenu" flat class="q-pa-md bg-grey-1 addcard">
    <!-- 삭제 버튼 -->
    <btn-icon
      class="btn_del"
      @click="deleteCard"
      color="red-4"
      size="md"
      icon="close"
      :flat="true"
    />

    <div class="row justify-between items-center q-py-xs">
      <q-input
        class="drink_name col-10 col-sm-8"
        v-model="new_menu.menu_name"
        placeholder="메뉴 이름을 입력해주세요"
        dense
      />
      <div class="col-10 col-sm-4 signature">
        <!-- Signature Menu 선택 -->
        <!-- <q-checkbox v-model="new_menu.is_signature" size="20px"
          ><span class="q-px-md">Signature</span></q-checkbox
        > -->

        <q-checkbox
          class=""
          v-model="new_menu.is_signature"
          checked-icon="star"
          unchecked-icon="star_border"
          label="시그니처 메뉴"
          color="secondary"
        ></q-checkbox>
      </div>
    </div>

    <!-- 음료 가격 -->
    <div class="row justify-between items-center q-py-xs">
      <div class="col-12 col-sm-6 row items-center">
        <q-icon class="q-mr-sm" size="xs" name="img:/icons/hot.png" />
        <q-input
          class="drink_price"
          v-model="new_menu.menu_price_hot"
          placeholder="음료 가격(HOT)"
          type="text"
          dense
          v-number
        />
      </div>
      <div class="col-12 col-sm-6 row items-center">
        <q-icon class="q-mr-sm" size="xs" name="img:/icons/ice.png" />
        <q-input
          class="drink_price"
          v-model="new_menu.menu_price_ice"
          placeholder="음료 가격(ICE)"
          dense
          v-number
        />
      </div>
    </div>

    <!-- 아로마노트 -->
    <div class="row justify-between items-center q-py-xs">
      <div class="col-12" v-if="menu_type === 'br'">
        <q-input
          class="drink_aromanote"
          v-model="new_menu.menu_aromanote"
          placeholder="커피 아로마노트 ( , ) 쉼표로 구분해주세요 (ex. 산미가 있는, 내추럴 커피)"
          dense
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
      required: true
    },
    menu_type: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      // 부모 컴포넌트 AddNewCafePage에 전달할 메뉴 데이터 선언
      new_menu: {
        menu_name: '',
        menu_price_hot: null,
        menu_price_ice: null,
        is_signature: false,
        menu_aromanote: '',
        menu_type: ''
      }
    }
  },
  directives: {
    number: {
      mounted(el) {
        el.addEventListener('input', () => {
          // console.log(event.target.value)
          event.target.value = event.target.value.replace(/[^0-9]/g, '')
        })
      }
    }
  },
  methods: {
    // changePrice(e) {
    //   this.new_menu.menu_price_hot += 500
    // },

    // 부모 컴포넌트 AddNewCafePage의 메뉴 추가 버튼과 연결된 메소드
    sendMenu() {
      this.new_menu.menu_type = this.menu_type
      return this.new_menu
    },
    deleteCard() {
      this.$emit('deleteCard', this.menu_id)
    }
  }
}
</script>
<style lang="scss" scoped>
.addcard {
  border: 1px solid $grey-5;
  margin-bottom: 8px;
  // box-sizing: content-box;
  // border-radius: 15px;
  // .clear {
  //   border: 1px solid $red;
  //   box-sizing: content-box;
  //   border-radius: 50%;
  // }
  // .clear:hover {
  //   cursor: pointer;
  // }
  .btn_del {
    position: absolute;
    top: 4px;
    right: 4px;
  }
  .signature {
    :deep(.q-checkbox__inner) {
      margin-left: 10px;
    }

    position: relative;
    justify-self: center;
    @media (max-width: $breakpoint-sm-max) {
      top: 4px;
      left: -4px;
    }
  }
  .drink_name {
    :deep(input) {
      padding-left: 10px;
    }

    // @media (max-width: $breakpoint-sm-max) {
    // padding-right: 30px;
    // }
  }
  .drink_price {
    width: 80%;

    @media (max-width: $breakpoint-sm-max) {
      width: 85%;
    }
    :deep(input) {
      padding-left: 10px;
      // @media (max-width: $breakpoint-sm-max) {
      //   padding-left: 10px;
      // }
    }
  }
  .drink_aromanote {
    width: 95%;
    @media (max-width: $breakpoint-sm-max) {
      width: 100%;
    }
    :deep(input) {
      padding-left: 10px;
    }
  }
}
</style>
