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
              @click="addBrewing"
              size="sm"
              label="메뉴 추가"
              color="primary"
              icon="add"
              padding="7px 15px 7px 15px"
            />
          </div>
          <div>
            <card-add-menu
              v-for="(menu, index) in this.cafe_info.cafe_menu"
              :key="index"
              :menu_id="index"
              menu_type="br"
              ref="CardAddMenu"
              @printBrewing="printBrewing"
            />
          </div>
        </section>
        <section class="q-my-xl">
          <div class="flex justify-between q-mx-xl">
            <span class="text-h6">Variation Coffee</span>
            <btn-basic
              size="sm"
              label="메뉴 추가"
              color="primary"
              icon="add"
              padding="7px 15px 7px 15px"
            />
          </div>
          <div></div>
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
      count: 0,
      cafe_info: {
        cafe_name_pr: '',
        cafe_phone: '',
        cafe_operation_time: '',
        cafe_website: '',
        cafe_address: '',
        cafe_address_detail: '',
        cafe_postalcode: '',
        cafe_address_dong: '',
        cafe_menu: []
      }
    }
  },
  // create() {
  //   let apiUrl = `${process.env.API_LOCAL}/`
  // },
  // 페이지 로드 시 Default로 들어갈 메뉴카드 Brewing과 Variation
  mounted() {
    for (let i = 0; i < this.cafe_info.cafe_menu.length; i++) {
      this.$refs.CardAddMenu[i].new_menu
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
    // 메뉴 추가 버튼 클릭 시 추가되는 메뉴카드
    addBrewing() {
      console.log('Hi')
      /*
      v-for와 ref를 같이 사용할 경우 아래와 같이 ref를 통해 참조한 컴포넌트에 인덱스를 붙여야 하는데,
      동적으로 컴포넌트 생성할 때, 배열의 길이만큼 기하급수적으로 컴포넌트가 생성됨.
      지금 상황에서는 배열에 아무것도 없기 때문에 아래 Loop가 실행되지 않으며,
      때문에 컴포넌트를 참조할 수 없는 상황. 만약 Default로 배열을 밀어넣게 되면 양방향 바인딩이 안됨.
      */
      for (let i = 0; i < this.cafe_info.cafe_menu.length; i++) {
        this.$refs.CardAddMenu[i].sendBrewing()
      }
    },
    printBrewing(new_menu) {
      console.log(new_menu)
      this.cafe_info.cafe_menu.push(new_menu)
      console.log(this.cafe_info.cafe_menu)
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
