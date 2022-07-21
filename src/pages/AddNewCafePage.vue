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
              :rules="[(val) => !!val || '카페 이름은 필수 항목입니다']"
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
              :rules="[(val) => !!val || '카페 주소는 필수 항목입니다']"
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
                :rules="[(val) => !!val || '상세 주소는 필수 항목입니다']"
              />
            </div>
            <div class="col-4 q-ml-xs">
              <q-input
                type="text"
                v-model="cafe.cafe_postalcode"
                label="우편번호 *"
                :rules="[(val) => !!val || '우편 번호는 필수 항목입니다']"
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
              :rules="[(val) => !!val || '대표 전화는 필수 항목입니다']"
            />
          </div>
        </div>
        <div class="q-mx-xl q-mt-xl q-my-xl row justify-between contents_block">
          <div class="col-5">
            <q-input
              type="time"
              hint="오픈 시간(평일)"
              v-model="cafe.cafe_res_time"
            />
          </div>
          <div class="col-5">
            <q-input
              type="time"
              hint="닫는 시간(평일)"
              v-model="cafe.cafe_shutdown_time"
            />
          </div>
        </div>
        <div class="q-mx-xl q-my-xl contents_block">
          <div class="col-12">
            <q-input label="웹사이트" v-model="cafe.cafe_webpage" type="url" />
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
            <span class="text-h6">브루잉 커피</span>
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
            <span class="text-h6">베리에이션 커피</span>
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
        <section>
          <image-upload ref="ImageUpload" />
        </section>
      </div>
    </section>
    <section class="q-mb-xl">
      <div class="justify-center cafe_intro">
        <span class="text-h6 cafe_intro_title">카페 소개</span>
        <textarea
          v-model="cafe.cafe_description"
          name="캬페소개"
          cols="80"
          rows="10"
          class="cafe_intro_textarea"
        ></textarea>
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
import ImageUpload from 'src/components/Etc/ImageUpload.vue'

export default defineComponent({
  name: 'AddNewCafePage',
  components: {
    BtnBasic,
    PostNumber,
    CardAddMenu,
    ImageUpload
  },
  data() {
    return {
      cafe: {
        cafe_name_pr: '',
        cafe_phone: '',
        cafe_address: '',
        cafe_region: '',
        cafe_webpage: '',
        cafe_description: '',
        cafe_latitude: '',
        cafe_longitude: '',
        cafe_res_time: '',
        cafe_shutdown_time: ''
        // cafe_address_detail: '',
        // cafe_postalcode: '',
        // cafe_address_dong: '',
        // cafe_operation_time: '',
      },
      images: [],
      menus: []
    }
  },
  mounted() {
    const id = this.menus.length + 1
    this.menus.push({ menu_id: id, menu_type: 'br' })
    this.menus.push({ menu_id: id, menu_type: 'va' })
  },
  methods: {
    async verifyCafeName() {
      let payload = {
        param: {
          cafe_name_pr: this.cafe.cafe_name_pr
        }
      }
      console.log(payload)
      await this.$axios
        .post('http://localhost:3000/api/cafe/checkname', {
          param: {
            cafe_name_pr: this.cafe.cafe_name_pr
          }
        })
        .then((response) => {
          console.log(response.data)
          if (response.data.isAvailable == 1) {
            console.log('사용할 수 있는 카페 이름입니다')
          } else {
            alert('이미 등록된 카페입니다')
          }
        })
        .catch((err) => console.log(err))
    },
    submitCafeInfo() {
      const cafe = { ...this.cafe }
      console.log(cafe)

      // 메뉴 등록하기
      const menus = []
      for (let i = 0; i < this.menus.length; i++) {
        menus.push(this.$refs.CardAddMenu[i].sendMenu())
      }

      // 이미지 등록하기
      const images = [...this.$refs.ImageUpload.images]

      let payload = {
        cafe: cafe,
        menus: menus,
        images: images
      }

      console.log(payload)

      // const apiUrl = `${process.env.API}/cafe`
      // this.$axios
      //   .post(apiUrl, {
      //     cafe: cafe,
      //     images: images,
      //     menus: menus
      //   })
      //   .then((response) => {
      //     console.log(response, '성공입니다')
      //   })
      //   .catch((err) => {
      //     console.error(err, '실패입니다')
      //   })
    },
    getPostData(payload) {
      console.log('카페주소: ', payload)
      this.cafe.cafe_address = payload.address
      this.cafe.cafe_region = payload.extraAddress
      this.cafe.cafe_latitude = payload.latitude
      this.cafe.cafe_longitude = payload.longitude
      // this.cafe.cafe_address_dong = payload.extraAddress
      this.cafe.cafe_postalcode = payload.postcode
      console.log(this.cafe)
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

.cafe_intro {
  width: 80%;
  position: relative;
  margin: 0 auto;

  .cafe_intro_textarea {
    width: 100%;
    height: 200px;
    box-sizing: border-box;
    resize: none;
    transition: border 0.5s;
    &:focus {
      border: 2px solid #7b3838;
    }
  }

  .cafe_intro_title {
    position: absolute;
    top: -35px;
    left: 0;
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
