<template>
  <q-page class="bg-grey-1">
    <div class="column constrain_sm q-pa-md">
      <main class="createpost">
        <!-- 1. 카페 기본 정보 -->
        <section>
          <div class="row justify-between items-end q-my-md">
            <div class="section_title text-h5">카페 기본 정보</div>
            <div class="text-right cafe-notice">
              <q-icon name="emergency" class="asterisk" /><span
                class="text-grey-6"
                >는 필수항목 입니다</span
              >
            </div>
          </div>

          <!-- 카페 이름 -->
          <div class="subtitle q-mb-sm">
            카페 이름
            <q-icon name="emergency" class="asterisk" />
          </div>
          <div class="q-mb-sm">
            <q-input
              :class="{ wrong: cafeNameDuplicated }"
              v-model="cafeName"
              placeholder="카페 이름을 입력해주세요"
              outlined
              :dense="dense"
              @blur="checkCafeName"
            />
          </div>
          <div v-if="cafeNameDuplicated" class="q-pl-xs q-mb-sm text-red-5">
            이미 존재하는 카페 이름입니다. 다른 이름을 입력해주세요.
          </div>

          <!-- 주소 찾기 -->
          <div class="q-py-sm row justify-between items-center">
            <div class="subtitle">
              주소
              <q-icon name="emergency" class="asterisk" />
            </div>
            <post-number
              @sendPostData="getPostData"
              label="주소 찾기"
              padding="7px 20px"
              ref="daum"
            />
          </div>
          <div class="q-mb-sm row">
            <div class="col-12 col-sm-9">
              <q-input
                class="q-mr-xs"
                @click="handleClickAdress"
                v-model="cafe.cafe_address"
                placeholder="주소 찾기"
                stack-label
                outlined
                readonly
                :dense="dense"
              />
            </div>
            <div class="col-12 col-sm-3">
              <q-input
                placeholder="우편 번호"
                v-model="cafe.cafe_post"
                stack-label
                outlined
                readonly
                :dense="dense"
              />
            </div>
          </div>
          <div class="q-mb-sm">
            <q-input
              label="상세 주소"
              v-model="cafe_address_detail"
              stack-label
              outlined
            />
          </div>

          <!-- 기타 정보 -->
          <div class="subtitle q-py-sm">기타 정보</div>
          <!-- 대표 전화 -->
          <div class="q-mb-sm">
            <q-input
              label="대표 전화"
              v-model="cafe.cafe_phone"
              placeholder="000-0000-0000"
              stack-label
              outlined
              v-number
            />
          </div>
          <!-- 이메일 -->
          <div class="q-mb-sm">
            <q-input
              label="이메일"
              v-model="cafe.cafe_email"
              placeholder="sample@cuppers.com"
              stack-label
              outlined
            />
          </div>
          <!-- 웹사이트 -->
          <div class="q-mb-sm">
            <q-input
              label="웹사이트"
              v-model="cafe.cafe_webpage"
              placeholder="URL을 입력해주세요"
              stack-label
              outlined
            />
          </div>
          <!-- 바리스타 정보 -->
          <div class="q-mb-sm">
            <q-input
              label="바리스타 정보"
              v-model="cafe.cafe_webpage"
              placeholder="바리스타의 수상/자격증 등을 입력해주세요"
              stack-label
              outlined
            />
          </div>
          <!-- 카페 소개 -->
          <div class="q-mb-sm">
            <q-input
              label="카페 소개"
              v-model="cafe.cafe_description"
              placeholder="카페를 자유롭게 소개해주세요"
              stack-label
              outlined
              autogrow
            />
          </div>
        </section>

        <!-- 2. 영업 시간 -->
        <section class="q-pt-lg">
          <div class="q-py-sm row justify-between items-center">
            <div class="section_title text-h5">영업 시간</div>
            <btn-basic
              @click="addOpTime"
              size="md"
              label="항목 추가"
              color="brown-5"
              icon="add"
              :rounded="false"
            />
          </div>

          <!-- 영업 시간 리스트 -->
          <div v-if="opTime.length">
            <div v-for="(ot, i) in opTime" :key="i" class="q-mb-sm row">
              <div class="row" style="width: 93%">
                <div class="col-6 col-sm-6">
                  <q-input
                    class="q-mr-xs"
                    v-model="ot.operation_day"
                    placeholder="월,화,수,목,금"
                    stack-label
                    outlined
                    :dense="dense"
                  />
                </div>
                <div class="col-6 col-sm-6">
                  <q-input
                    placeholder="09:00 ~ 21:00"
                    v-model="ot.operation_time"
                    stack-label
                    outlined
                    :dense="dense"
                  />
                </div>
              </div>
              <div style="width: 7%" class="flex flex-center">
                <btn-icon
                  class="btn_del"
                  @click="delOpTIme(i)"
                  color="red-4"
                  size="md"
                  icon="close"
                  :flat="true"
                />
              </div>
            </div>
          </div>
        </section>

        <!-- 3. 커피 메뉴 -->
        <section class="q-pt-lg">
          <div class="section_title text-h5">커피 메뉴</div>

          <!-- 브루잉 커피 -->
          <div class="q-py-sm row justify-between items-center">
            <div class="subtitle2">브루잉 커피 메뉴</div>
            <btn-basic
              @click="addBrewingMenu"
              size="md"
              label="메뉴 추가"
              color="brown-5"
              icon="add"
              :rounded="false"
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

          <!-- 베리에이션 커피 -->
          <div class="q-py-sm row justify-between items-center">
            <div class="subtitle2">베리에이션 커피 메뉴</div>
            <btn-basic
              @click="addVariationMenu"
              size="md"
              label="메뉴 추가"
              color="brown-5"
              icon="add"
              :rounded="false"
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

        <!-- 3. 카페 이미지 등록 -->
        <div class="q-pt-lg section_title text-h5 q-pb-md">카페 사진</div>
        <section class="section_image_upload">
          <div></div>
          <!-- 3-1. 카페 실내외 사진 -->
          <div class="image_upload row q-pb-md">
            <div class="q-px-xs">
              <div class="column">
                <div class="subtitle2">카페 실내외 사진</div>
                <div class="row justify-start">
                  <img
                    v-for="img in imagesCafe"
                    :key="img.thumb"
                    class="pic img-pic"
                    :src="img.thumb"
                    alt="썸네일 이미지"
                  />
                  <div
                    v-if="imagesCafe.length < 1"
                    class="q-pt-sm text-caption text-grey"
                  >
                    ‧ 본인이 직접 촬영하지 않은 사진<br />‧ 1000 * 1000 미만
                    해상도의 사진은 통보없이 삭제될 수 있습니다.
                  </div>
                </div>
              </div>
            </div>
            <div class="row justify-end items-center">
              <label for="imgfile1">
                <div class="pic btn-pic">
                  <q-icon name="eva-camera-outline" size="sm"></q-icon>
                  <span>{{ imagesCafe ? imagesCafe.length : 0 }}/5</span>
                </div></label
              >
              <input
                type="file"
                id="imgfile1"
                @change="handleChangeCafeImage"
                accept=".png, .jpg, .jpeg"
                multiple
              />
            </div>
          </div>

          <q-separator class="q-my-md"></q-separator>

          <!-- 3-2. 메뉴판 사진 -->
          <div class="image_upload q-pb-md">
            <div class="q-px-xs">
              <div class="column">
                <div class="subtitle2">메뉴판 사진</div>
                <div class="row justify-start">
                  <img
                    v-for="img in imagesMenu"
                    :key="img.thumb"
                    class="pic img-pic"
                    :src="img.thumb"
                    alt="썸네일 이미지"
                  />
                  <div
                    v-if="imagesMenu.length < 1"
                    class="text-caption text-grey"
                  >
                    ‧ 메뉴판이나 커피 메뉴 정보가 보이는 사진을 올려주세요.<br />‧
                    본인이 직접 촬영하지 않은 사진<br />‧ 1000 * 1000 미만
                    해상도의 사진은 통보없이 삭제될 수 있습니다.
                  </div>
                </div>
              </div>
            </div>
            <div class="row justify-end items-center">
              <label for="imgfile2">
                <div class="pic btn-pic">
                  <q-icon name="eva-camera-outline" size="sm"></q-icon>
                  <span>{{ imagesMenu ? imagesMenu.length : 0 }}/5</span>
                </div></label
              >
              <input
                type="file"
                id="imgfile2"
                @change="handleChangeMenuImage"
                accept=".png, .jpg, .jpeg"
                multiple
              />
            </div>
          </div>
        </section>
      </main>

      <!-- 카페 등록 버튼 -->
      <div class="q-mt-md q-my-xl flex flex-center">
        <btn-basic
          @click="postCafe"
          :disable="
            this.cafeName === '' ||
            this.cafe.cafe_address === '' ||
            this.cafeNameDuplicated
          "
          size="lg"
          color="primary"
          label="카페 등록"
          icon="edit"
          padding="6px 22px 6px 18px"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { computed } from 'vue'
import { useStore } from 'vuex'

// composables
import useResize from 'src/composables/useResize'
const { resizeImage, resizeImageSquare } = useResize()

import BtnBasic from 'src/components/Button/BtnBasic.vue'
import BtnIcon from 'src/components/Button/BtnIcon.vue'
import PostNumber from 'src/components/Etc/PostNumber.vue'
import CardAddMenu from 'src/components/Card/CardAddMenu.vue'

export default defineComponent({
  name: 'CreateCafePage',
  components: {
    BtnBasic,
    BtnIcon,
    PostNumber,
    CardAddMenu
  },
  setup() {
    const $store = useStore()

    const uid = computed({
      get: () => $store.state.auth.user.uid
    })

    return {
      uid
    }
  },
  data() {
    return {
      dense: true,
      cafeName: '',
      cafeNameDuplicated: false,
      cafe_address_detail: '',
      cafe: {
        cafe_name_pr: '',
        cafe_address: '',
        cafe_region: '',
        cafe_post: '',
        cafe_phone: '',
        cafe_email: '',
        cafe_webpage: '',
        cafe_description: '',
        cafe_latitude: '',
        cafe_longitude: '',
        cafe_barista_info: '',
        cafe_img: ''
      },
      opTime: [
        {
          operation_day: '월,화,수,목,금',
          operation_time: '09:00 ~ 22:00'
        },
        {
          operation_day: '토,일,공휴일',
          operation_time: '10:00 ~ 21:00'
        }
      ],
      images: [],
      menus: [],
      imagesCafe: [],
      imagesMenu: []
    }
  },
  watch: {
    cafeName(val) {
      console.log(val)
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
  mounted() {
    const ida = this.menus.length + 1
    const idb = this.menus.length + 2
    this.menus.push({ menu_id: ida, menu_type: 'br' })
    this.menus.push({ menu_id: idb, menu_type: 'va' })
  },
  methods: {
    checkCafeName() {
      // let payload = {
      //   param: {
      //     cafe_name_pr: this.cafe.cafe_name_pr
      //   }
      // }
      // console.log(payload)
      if (this.cafeName !== '') {
        this.$axios
          .post('http://localhost:3000/api/cafe/checkname', {
            param: {
              cafe_name_pr: this.cafeName
            }
          })
          .then((response) => {
            console.log(response.data)
            if (response.data.isAvailable == 1) {
              console.log('사용할 수 있는 카페 이름입니다')
              this.cafeNameDuplicated = false
            } else {
              this.cafeNameDuplicated = true
            }
          })
          .catch((err) => console.log(err))
      }
    },
    handleClickAdress() {
      this.$refs.daum.execDaumPostcode()
    },
    addOpTime() {
      this.opTime.push({
        operation_day: '',
        operation_time: ''
      })
    },
    delOpTIme(i) {
      console.log(i)

      this.opTime.splice(i, 1)
      // const index = this.opTime.indexOf(i)
      // console.log(index)
      // if (index > -1) {
      //   console.log(i)
      // }
    },

    async handleChangeCafeImage(e) {
      this.imagesCafe = []
      const files = e.target.files
      this.imageUpload(files, 'g')
    },
    async handleChangeMenuImage(e) {
      this.imagesMenu = []
      const files = e.target.files
      this.imageUpload(files, 'm')
    },
    async imageUpload(files, type) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        let url = ''
        let url_thumb = ''

        const apiUrl = `${process.env.API}/upload/image`

        // 1. 메인 이미지 업로드
        resizeImage({ file: file, maxSize: 2000 })
          .then((blob) => {
            const formData = new FormData()
            formData.append('image', blob)

            this.$axios
              .post(apiUrl, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
              })
              .then((r) => {
                // console.log(r.data)
                url = r.data.filename

                // 2. 썸네일 이미지 업로드
                resizeImageSquare({ file: file, maxSize: 500, square: true })
                  .then((blob_thumb) => {
                    const formData = new FormData()
                    formData.append('image', blob_thumb)

                    this.$axios
                      .post(apiUrl, formData, {
                        headers: { 'Content-Type': 'multipart/form-data' }
                      })
                      .then((r) => {
                        // console.log(r.data)
                        url_thumb = r.data.url

                        if (type === 'g') {
                          this.imagesCafe.push({
                            type: 'g',
                            cafe_image_url: url,
                            thumbnail_url: r.data.filename,
                            thumb: url_thumb
                          })
                        } else if (type === 'm') {
                          this.imagesMenu.push({
                            type: 'm',
                            cafe_image_url: url,
                            thumbnail_url: r.data.filename,
                            thumb: url_thumb
                          })
                        }
                      })
                      .catch((e) => {
                        console.error(e)
                      })
                  })
                  .catch((err) => {
                    console.error(err)
                  })
              })
              .catch((e) => {
                console.error(e)
              })
          })
          .catch((err) => {
            console.error(err)
          })
      }
    },
    notify(messsage) {
      this.$q.notify({
        position: 'top',
        timeout: 1000,
        message: messsage,
        color: 'primary'
      })
    },
    postCafe() {
      // 유효성 검사 VALIDATION
      if (this.cafeName === '') {
        this.notify('카페 이름은 필수 입력 항목입니다.')
        return
      } else if (this.cafeNameDuplicated) {
        this.notify(
          '이미 존재하는 카페 이름입니다. 이름은 필수 입력 항목입니다.'
        )
        return
      }
      if (this.cafe.address === '') {
        this.notify('카페 주소는 필수 입력 항목입니다.')
        return
      }

      // 메뉴 등록하기
      const menus = []
      for (let i = 0; i < this.menus.length; i++) {
        menus.push(this.$refs.CardAddMenu[i].sendMenu())
      }

      // 이미지 등록하기
      // const images = [...this.$refs.ImageUpload.images]
      const images = []
      if (this.imagesCafe.length) {
        this.imagesCafe.forEach((img) => {
          images.push(img)
        })
      }
      if (this.imagesMenu.length) {
        this.imagesMenu.forEach((img) => {
          images.push(img)
        })
      }
      // let cafe_img = ''
      if (images.length) {
        // cafe_img = images[0].thumbnail_url
        this.cafe.cafe_img = images[0].thumbnail_url
      }

      let payload = {
        cafe: {
          cafe_name_pr: this.cafeName,
          cafe_phone: this.cafe.cafe_phone,
          cafe_address: `${this.cafe.cafe_address} ${this.cafe.cafe_region} ${this.cafe_address_detail}`, // 카페 주소, 카페 상세 주소 문자열 병합
          cafe_region: this.cafe.cafe_region,
          cafe_webpage: this.cafe.cafe_webpage,
          cafe_description: this.cafe.cafe_description,
          cafe_latitude: this.cafe.cafe_latitude,
          cafe_longitude: this.cafe.cafe_longitude,
          cafe_post: this.cafe.cafe_post,
          cafe_barista_info: this.cafe.cafe_barista_info,
          cafe_img: this.cafe.cafe_img,
          cafe_email: '',
          user_id: this.uid // 등록한 사람
        },
        op_time: this.opTime,
        menus: menus,
        images: images
      }

      console.log(payload)
      // return

      const apiUrl = `${process.env.API}/cafe`
      this.$axios
        .post(apiUrl, payload)
        .then((result) => {
          console.log(result, '성공입니다')

          if (result.data.insertId > 0) {
            this.notify('☕ 카페가 등록되었습니다. 🪑')
            this.$router.push(`/cafe/${result.data.insertId}`)
          }
        })
        .catch((err) => {
          console.error(err, '실패입니다')
        })
    },
    getPostData(payload) {
      // console.log('카페주소: ', payload)
      this.cafe.cafe_address = payload.address
      this.cafe.cafe_region = payload.extraAddress
      this.cafe.cafe_latitude = payload.latitude
      this.cafe.cafe_longitude = payload.longitude
      // this.cafe.cafe_address_dong = payload.extraAddress
      this.cafe.cafe_post = payload.postcode
      // console.log(this.cafe)
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
.subtitle {
  font-size: 16px;
  font-weight: 500;
  color: $primary;
}
.subtitle2 {
  font-size: 18px;
  font-weight: 500;
  color: $primary;
}
.wrong {
  :deep(.q-field__inner) {
    border: 2px solid $red-4;
    border-radius: 6px;
  }
}
.createpost {
  .section_image_upload {
    border: 1px solid $grey-5;
    padding: 16px;
    border-radius: $border-radius;
  }
  .image_upload {
    display: grid;
    grid-template-columns: 1fr 74px;
  }
  .pic {
    border: 1px solid $brown-5;
    color: $brown-5;
    border-radius: 4px;
    width: 70px;
    height: 70px;
    margin: 0 4px 4px 0;
    &.btn-pic {
      cursor: pointer;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        width: 24px;
      }
      span {
        font-size: 14px;
      }
    }
  }
  input[type='file'] {
    visibility: hidden;
    width: 0px;
  }
}

.asterisk {
  color: $red-4;
  padding-bottom: 3px;
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
