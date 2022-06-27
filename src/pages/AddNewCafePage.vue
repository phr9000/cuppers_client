<template>
  <q-page class="constrain_sm">
    <section class="q-py-md section">
      <div class="text-center text-h5">
        <span class="title">새로운 카페를 등록해주세요</span>
      </div>
    </section>
    <section class="q-mx-xl q-my-xl q-pb-xl">
      <div class="text-right q-mr-xl q-mt-xl cafe-notice">
        <q-icon size="11px" name="emergency" class="q-mr-xs asterisk" /><span
          >는 필수항목 입니다</span
        >
      </div>
      <div class="q-py-sm q-mt-md background">
        <div class="flex justify-center q-mt-md">
          <q-icon size="md" name="house" class="q-pl-sm" />
          <span class="text-h6">카페정보</span>
        </div>
        <!-- 카페 이름 -->
        <div class="q-mx-xl q-my-xl contents_block">
          <div class="col-12">
            <q-input
              label="카페이름 *"
              v-model="cafe_info.cafe_name_pr"
              type="text"
              :rules="[(val) => !!val || 'Field is required']"
              class="col-12 input-area"
            />
          </div>
        </div>
        <div class="col-12 q-mx-xl q-mt-xl contents_block">
          <div class="row info-block items-center">
            <q-input
              v-model="cafe_info.cafe_address"
              readonly
              type="text"
              id="address"
              label="주소 *"
              class="col-8 input-area"
              :rules="[(val) => !!val || 'Field is required']"
            />
            <div class="col-3 flex row-area">
              <post-number
                @sendPostData="getPostData"
                label="주소 찾기"
                padding="7px 20px"
                class="button"
              />
            </div>
          </div>
        </div>
        <div class="col-12 q-mx-xl q-mb-xl contents_block">
          <div class="row info-block">
            <div class="col-7">
              <q-input
                type="text"
                v-model="cafe_info.cafe_address_detail"
                id="detailAddress"
                label="상세주소 *"
                :rules="[(val) => !!val || 'Field is required']"
              />
            </div>
            <div class="col-4 q-ml-xs">
              <q-input
                type="text"
                v-model="cafe_info.cafe_postalcode"
                label="우편번호 *"
                :rules="[(val) => !!val || 'Field is required']"
              />
            </div>
          </div>
        </div>
        <!-- 카페 전화번호-->
        <div class="q-mx-xl q-mt-xl q-my-xl contents_block">
          <div class="col-12">
            <q-input
              label="대표전화 *"
              v-model="cafe_info.cafe_phone"
              type="tel"
              mask="### -  #### - ####"
              :rules="[(val) => !!val || 'Field is required']"
            />
          </div>
        </div>
        <div class="q-mx-xl q-mt-xl q-my-xl contents_block">
          <div class="col-12">
            <q-input label="영업시간" v-model="cafe_info.cafe_operation_time" />
          </div>
        </div>
        <div class="q-mx-xl q-my-xl contents_block">
          <div class="col-12">
            <q-input label="웹사이트" v-model="cafe_info.cafe_website" />
          </div>
        </div>
      </div>
    </section>
    <section class="q-mx-xl q-my-xl q-pb-xl">
      <div class="q-py-sm q-mt-md background">
        <div class="flex justify-center q-mt-md">
          <q-icon size="md" name="coffee" class="q-pl-sm" />
          <span class="text-h6">커피정보</span>
        </div>
        <section class="q-my-xl">
          <div class="flex justify-between q-mx-xl">
            <span class="text-h6">Brewing Coffee</span>
            <btn-basic
              @click="getBrewing"
              @newBrewingMenu="createBrewing"
              size="sm"
              label="메뉴 추가"
              color="primary"
              icon="add"
              padding="7px 15px 7px 15px"
            />
          </div>
          <div>
            <card-add-menu
              v-for="(cafe_menu, index) in onlyBrewing"
              :key="index"
              @deleteCard="deleteMenu"
              :menu_id="cafe_menu.menu_id"
              :menu_type="cafe_menu.menu_type"
              ref="CardAddMenu"
            />
          </div>
        </section>
        <section class="q-my-xl">
          <div class="flex justify-between q-mx-xl">
            <span class="text-h6">Variation Coffee</span>
            <btn-basic
              @click="getVariation"
              @newVariationMenu="createVariation"
              size="sm"
              label="메뉴 추가"
              color="primary"
              icon="add"
              padding="7px 15px 7px 15px"
            />
          </div>
          <div>
            <card-add-menu
              v-for="(cafe_menu, index) in onlyVariation"
              :key="index"
              @deleteCard="deleteMenu"
              :menu_id="cafe_menu.menu_id"
              :menu_type="cafe_menu.menu_type"
              ref="CafeAddMenu"
            />
          </div>
        </section>
      </div>
    </section>
    <section>
      <div class="text-center">
        <btn-basic
          @click="submitCafeInfo"
          color="primary"
          size="md"
          label="카페 등록하기"
          icon="note"
          padding="10px 30px 10px 30px"
        />
      </div>
    </section>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import BtnBasic from 'src/components/Button/BtnBasic.vue'
import PostNumber from 'src/components/Etc/PostNumber.vue'
import CardAddMenu from 'src/components/Card/CardAddMenu.vue'

export default defineComponent({
  name: 'AddNewCafePage',
  components: {
    BtnBasic,
    PostNumber,
    CardAddMenu
  },
  data() {
    return {
      cafe_info: {
        cafe_name_pr: '',
        cafe_phone: '',
        cafe_operation_time: '',
        cafe_website: '',
        cafe_address: '',
        cafe_address_detail: '',
        cafe_postalcode: '',
        cafe_address_dong: '',
        cafe_menu: [
          {
            menu_name: '',
            menu_type: 'br',
            menu_price_hot: null,
            menu_price_ice: null,
            is_signature: true,
            menu_aromanote: ''
          },
          {
            menu_name: '',
            menu_type: 'va',
            menu_price_hot: null,
            menu_price_ice: null,
            is_signature: true
          }
        ]
      }
    }
  },
  methods: {
    submitCafeInfo() {
      console.log('카페정보출력테스트: ', this.cafe_info)
    },
    getPostData(payload) {
      console.log('카페주소: ', payload)
      this.cafe_info.cafe_address = payload.address
      this.cafe_info.cafe_address_dong = payload.extraAddress
      this.cafe_info.cafe_postalcode = payload.postcode
    },
    getBrewing(new_cafe_menu) {
      this.$refs.CardAddMenu.handleMenuCard(new_cafe_menu)
    },
    createBrewing(new_cafe_menu) {
      this.cafe_info.cafe_menu.push(new_cafe_menu)
      console.log(this.cafe_info.cafe_menu)
    },
    getVariation(new_cafe_menu) {
      this.$refs.CardAddMenu.handleMenuCard(new_cafe_menu)
    },
    createVariation(new_cafe_menu) {
      this.cafe_info.cafe_menu.push(new_cafe_menu)
      console.log(this.cafe_info.cafe_menu)
    },
    deleteMenu(index) {
      this.cafe_info.cafe_menu.splice(index, 1)
    }
  },
  computed: {
    onlyBrewing() {
      return this.cafe_info.cafe_menu.filter(
        (cafe_menu) => cafe_menu.menu_type === 'br'
      )
    },
    onlyVariation() {
      return this.cafe_info.cafe_menu.filter(
        (cafe_menu) => cafe_menu.menu_type === 'va'
      )
    }
  }
})
</script>
<style lang="scss" scoped>
.q-my-xl {
  margin-bottom: 0;
}
.constrain_sm {
  padding-bottom: 50px;
}
.q-mt-md {
  padding-bottom: 20px;
}
.section {
  position: relative;

  // border-bottom: 2px solid #ccc;
  &:after {
    content: '';
    display: block;
    width: 55px;
    position: absolute;
    bottom: 5px;
    left: 50%;
    transform: translate(-50%, 0);
    text-align: center;
  }
  .title {
    font-weight: 500;
  }
}
.asterisk {
  color: rgb(255, 136, 0);
}

.background {
  // outline: 1px solid #ccc;
  box-sizing: content-box;
  .info-block {
    display: flex;
    justify-content: space-between;
  }
}

@media (max-width: 800px) {
  .cafe-notice {
    font-size: 0.8rem;
  }
  .contents_block {
    margin: 48px 15px;
  }
}
</style>
