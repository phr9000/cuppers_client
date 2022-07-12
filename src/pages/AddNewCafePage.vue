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
              v-model="cafe.cafe_name_pr"
              type="text"
              :rules="[(val) => !!val || 'Field is required']"
              class="col-12 input-area"
              @blur="verifyCafeName"
            />
          </div>
        </div>
        <div class="col-12 q-mx-xl q-mt-xl contents_block">
          <div class="row info-block items-center">
            <q-input
              v-model="cafe.cafe_address"
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
                v-model="cafe.cafe_address_detail"
                id="detailAddress"
                label="상세주소 *"
                :rules="[(val) => !!val || 'Field is required']"
              />
            </div>
            <div class="col-4 q-ml-xs">
              <q-input
                type="text"
                v-model="cafe.cafe_postalcode"
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
              v-model="cafe.cafe_phone"
              type="tel"
              mask="### -  #### - ####"
              :rules="[(val) => !!val || 'Field is required']"
            />
          </div>
        </div>
        <div class="q-mx-xl q-mt-xl q-my-xl contents_block">
          <div class="col-12">
            <q-input label="영업시간" v-model="cafe.cafe_operation_time" />
          </div>
        </div>
        <div class="q-mx-xl q-my-xl contents_block">
          <div class="col-12">
            <q-input label="웹사이트" v-model="cafe.cafe_website" />
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
              @click="addBrewingMenu"
              size="sm"
              label="메뉴 추가"
              color="primary"
              icon="add"
              padding="7px 15px 7px 15px"
            />
          </div>
          <div>
            <card-add-menu
              v-for="menu in onlyBrewing"
              :key="menu.menu_id"
              :menu_id="menu.menu_id"
              :menu_type="menu.menu_type"
              @deleteCard="deleteCard"
              ref="CardAddMenu"
            />
          </div>
        </section>
        <section class="q-my-xl">
          <div class="flex justify-between q-mx-xl">
            <span class="text-h6">Variation Coffee</span>
            <btn-basic
              @click="addVariationMenu"
              size="sm"
              label="메뉴 추가"
              color="primary"
              icon="add"
              padding="7px 15px 7px 15px"
            />
          </div>
          <div>
            <card-add-menu
              v-for="menu in onlyVariation"
              :key="menu.menu_id"
              :menu_id="menu.menu_id"
              :menu_type="menu.menu_type"
              @deleteCard="deleteCard"
              ref="CardAddMenu"
            />
          </div>
        </section>
        <!-- <section>
          <image-upload />
        </section> -->
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
// import ImageUpload from 'src/components/Etc/ImageUpload.vue'

export default defineComponent({
  name: 'AddNewCafePage',
  components: {
    BtnBasic,
    PostNumber,
    CardAddMenu
    // ImageUpload
  },
  data() {
    return {
      cafe: {
        cafe_name_pr: '',
        cafe_phone: '',
        cafe_operation_time: '',
        cafe_website: '',
        cafe_address: '',
        cafe_address_detail: '',
        cafe_postalcode: '',
        cafe_address_dong: ''
      },
      images: [],
      menus: []
    }
  },
  methods: {
    verifyCafeName() {
      console.log(this.cafe.cafe_name_pr)
      this.$axios
        .post('http://localhost:3000/api/cafe/checkname', {
          param: {
            cafe_name_pr: this.cafe.cafe_name_pr
          }
        })
        .then((response) => console.log(response))
        .catch((err) => console.log(err))
    },
    submitCafeInfo() {
      // 카페 등록하기
      console.log('카페 등록: ', {
        cafe: this.cafe
      })

      // 메뉴 등록하기
      let menus = []
      for (let i = 0; i < this.menus.length; i++) {
        menus.push(this.$refs.CardAddMenu[i].sendMenu())
      }
      console.log('메뉴 등록: ', menus)
      this.$axios
        .post('http://localhost:3000/api/cafe', {
          cafe: {
            cafe_name_pr: 'Cafe Muirhead',
            cafe_name_sc: '',
            cafe_address: 'Huangjinchengdao, Changning, Shanghai',
            cafe_region: 'Gubei',
            cafe_latitude: null,
            cafe_longitude: null,
            cafe_img: '/test/url'
          },
          images: [
            {
              type: 'g',
              cafe_image_url: '/test/url/g',
              thumbnail_url: '/test/url/thumb/g'
            },
            {
              type: 'm',
              cafe_image_url: '/test/url/m',
              thumbnail_url: '/test/url/thumb/m'
            }
          ],
          menus: [
            {
              menu_name: 'Blend 1',
              menu_price_hot: 9000,
              menu_price_ice: null,
              menu_type: 'br',
              menu_aromanote: 'dark chocolate',
              is_signature: 1
            },
            {
              menu_name: 'Blend 2',
              menu_price_hot: 9500,
              menu_price_ice: null,
              menu_type: 'br',
              menu_aromanote: 'tangerine',
              is_signature: 0
            }
          ]
          // cafe: this.cafe,
          // menus: [menus]
        })
        .then((response) => {
          console.log(response, '성공입니다')
        })
        .catch((err) => {
          console.error(err, '실패입니다')
        })
    },
    getPostData(payload) {
      console.log('카페주소: ', payload)
      this.cafe.cafe_address = payload.address
      this.cafe.cafe_address_dong = payload.extraAddress
      this.cafe.cafe_postalcode = payload.postcode
    },
    addBrewingMenu() {
      const id = this.menus.length + 1
      this.menus.push({ menu_id: id, menu_type: 'br' })
      console.log(this.menus)
    },
    addVariationMenu() {
      const id = this.menus.length + 1
      this.menus.push({ menu_id: id, menu_type: 'va' })
      console.log(this.menus)
    },
    deleteCard(menu_id) {
      console.log(menu_id)
      this.menus = this.menus.filter((menu) => menu.menu_id !== menu_id)
    }
  },
  computed: {
    onlyBrewing() {
      return this.menus.filter((menus) => menus.menu_type === 'br')
    },
    onlyVariation() {
      return this.menus.filter((menus) => menus.menu_type === 'va')
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
