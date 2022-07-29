<template>
  <q-page class="bg-grey-1">
    <div class="column constrain_sm q-pa-md">
      <!-- cafeId: {{ cafeId }} / uid: {{ uid }} -->

      <main class="createpost">
        <section class="keyword">
          <div class="section_title text-h5 q-my-md">
            방문하신 카페는 어땠나요?
          </div>
          <div class="text-subtitle1 q-mb-sm">
            카페 키워드 <span class="text-primary">(중복 선택 가능)</span>
          </div>
          <div class="keywords_container">
            <keyword-select
              v-for="keyword in cafeKeywords"
              :key="keyword.keyword_id"
              :id="keyword.keyword_id"
              :text="keyword.keyword_name"
              :icon="keyword.keyword_icon"
              :bg="keyword.reg_survey_imgurl"
              :by_user="keyword.by_user"
              @checked="selectCafeKeyword"
              @unchecked="deSelectCafeKeyword"
              ref="keywordSelect"
            />
          </div>
          <div class="q-my-sm">
            <q-input
              @keyup.enter="checkAndAddKeyword"
              v-model="newKeyword"
              placeholder="위 항목에 없는 키워드를 직접 입력해 주세요."
              stack-label
              outlined
              dense
              ><template v-slot:append>
                <q-btn
                  @click="checkAndAddKeyword"
                  :loading="isAddingKeyword"
                  round
                  flat
                  icon="add"
                /> </template
            ></q-input>
          </div>
        </section>

        <q-separator class="q-my-lg"></q-separator>

        <!-- 2. 커피는 어땠나요? -->
        <section class="drink">
          <div class="section_title q-mb-sm">커피는 어땠나요?☕️</div>

          <div :class="{ highlighted: highlighted }">
            <div class="text-subtitle1 q-pl-sm q-pb-none">
              커피의 종류 <span class="text-primary">(중복 선택 가능)</span>
            </div>
            <div class="q-gutter-sm">
              <q-checkbox
                v-model="selectedDrinkType"
                val="br"
                label="브루잉"
                color="primary"
              >
                <q-tooltip
                  anchor="top left"
                  self="bottom left"
                  class="bg-brown-5 text-body2"
                  :offset="[0, 0]"
                >
                  드립커피, 필터커피 등
                </q-tooltip></q-checkbox
              >
              <q-checkbox
                v-model="selectedDrinkType"
                val="va"
                label="배리에이션"
                color="primary"
              >
                <q-tooltip
                  anchor="top left"
                  self="bottom left"
                  class="bg-brown-5 text-body2"
                  :offset="[0, 0]"
                >
                  아메리카노, 카페라떼 등
                </q-tooltip></q-checkbox
              >
              <q-checkbox
                v-model="selectedDrinkType"
                checked-icon="star"
                unchecked-icon="star_border"
                val="sg"
                label="시그니처 메뉴"
                color="secondary"
              >
                <q-tooltip
                  anchor="top left"
                  self="bottom left"
                  class="bg-secondary text-body2"
                  :offset="[0, 0]"
                >
                  시그니처 메뉴였나요?
                </q-tooltip></q-checkbox
              >
            </div>
          </div>
          <div class="q-mb-sm q-px-sm">
            <q-input
              v-model="review.review_drink"
              label="커피(메뉴) 이름"
              placeholder="어떤 메뉴를 드셨나요?"
              stack-label
              outlined
              :dense="dense"
            />
          </div>
          <div class="q-mb-sm q-px-sm">
            <q-input
              v-model="review.review_content"
              label="커피(카페)를 리뷰해주세요."
              placeholder="커피(카페)에 대해 자유롭게 리뷰해주세요"
              stack-label
              outlined
              autogrow
              :dense="dense"
            />
            <!-- ex) 부드러운 질감, 베리류의 향미, 깔끔한 산미의 균형이 잘 잡힌 커피. 이 카페에서는 꼭 드립 커피를 드세요 -->
          </div>
        </section>

        <q-separator class="q-my-lg"></q-separator>

        <!-- 3. 카페 사진 -->
        <div class="section_title text-h5 q-pb-md">카페 사진</div>
        <section class="section_image_upload">
          <div></div>
          <!-- 3-1. 카페 실내외 사진 -->
          <div class="image_upload row">
            <div class="q-px-xs">
              <div class="column">
                <div class="subtitle2 q-mb-xs">음료‧카페 실내외 사진</div>
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
          <div class="image_upload">
            <div class="q-px-xs">
              <div class="column">
                <div class="subtitle2 q-mb-xs">메뉴판 사진</div>
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

      <!-- 리뷰 등록 -->
      <div class="q-mt-md q-my-xl flex flex-center">
        <btn-basic
          @click="postReview"
          size="md"
          color="primary"
          label="리뷰 등록"
          icon="edit"
          padding="6px 18px"
        />
      </div>

      <div v-show="false" class="q-mt-xl q-px-sm">
        선택한 카페 키워드: <strong>{{ selectedCafeKeywords }}</strong>
      </div>
      <div v-show="false" class="q-px-sm">
        커피의 종류: <strong>{{ review.drink_type }}</strong>
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

import KeywordSelect from 'src/components/Badge/KeywordSelect.vue'
import BtnBasic from 'src/components/Button/BtnBasic.vue'

export default defineComponent({
  name: 'WriteReviewPage',
  components: { KeywordSelect, BtnBasic },
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
      cafeId: null,
      dense: false,
      cafeKeywords: [], // 예시로 보여질 키워드
      addedKeywords: [], // 예시로 보여질 키워드
      newKeyword: '', // input으로 추가할 키워드
      isAddingKeyword: false,
      files: [],
      review: {
        cafe_id: 1,
        user_id: 1,
        review_drink: '',
        drink_type: '',
        review_content: '',
        review_img: 'images/review/26/g_01_thumb.jpg'
      },
      imagesCafe: [
        // {
        //   images_review_type: 'g',
        //   images_review_url: 'g_01.jpg',
        //   thumbnail_url:
        //     'http://localhost:3000/static/images/review/26/g_01_thumb.jpg'
        // },
        // {
        //   images_review_type: 'g',
        //   images_review_url: 'g_01.jpg',
        //   thumbnail_url:
        //     'http://localhost:3000/static/images/review/26/g_01_thumb.jpg'
        // }
      ],
      imagesMenu: [],
      selectedCafeKeywords: [
        // { keyword_id: 3 }, { keyword_id: 3 }
      ],
      selectedDrinkType: [
        // 'br', 'va', 'sg'
      ],
      highlighted: false // selectedDrinkType 선택하지 않았을 경우
    }
  },
  watch: {
    selectedDrinkType(val) {
      if (val.includes('br') || val.includes('va')) {
        this.highlighted = false
      }
      this.review.drink_type = val.toString()
    }
  },
  created() {
    this.cafeId = this.$route.params.id
    this.loadKeywords()
  },
  mounted() {},
  methods: {
    loadKeywords() {
      let apiUrl = `${process.env.API}/keyword/survey` // real-server
      // let apiUrl = `${process.env.API_LOCAL}/keywords` // json-server
      this.$axios
        .get(apiUrl)
        .then((result) => {
          // console.log(result.data)
          this.cafeKeywords = result.data.filter((item) => {
            return item.keyword_type === 'cafe'
          })
          // this.cafeKeywords = result.data
          console.log(this.cafeKeywords)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    checkAndAddKeyword() {
      const newKeyword = this.newKeyword

      // input value 유효성 검사
      // 1. 이미 리스트에 있는 키워드
      const isInArray = this.cafeKeywords.find(
        (el) =>
          el.keyword_name.replace(/\s/g, '') === newKeyword.replace(/\s/g, '')
      )
      if (isInArray) {
        this.$q.notify({
          position: 'top',
          timeout: 1000,
          message: '이미 보기로 불러온 키워드 입니다.',
          color: 'info'
        })

        return
      }

      // 2. 글자수
      if (newKeyword.length < 3) {
        this.$q.notify({
          position: 'top',
          timeout: 1000,
          message: '세 글자 이상의 키워드만 가능합니다.',
          color: 'info'
        })

        return
      }

      this.isAddingKeyword = true

      // -> db에 keyword_name 전달하여 실제 keyword_id, keyword_name 을 가져옴
      //    이 과정에서 db에 없다면 새로 추가

      // setTimeout(() => {
      this.addKeyword(newKeyword)
      // }, 300)
    },
    addKeyword(newKeyword) {
      // -> db에 keyword_name 전달하여 실제 keyword_id, keyword_name 을 가져옴
      //    이 과정에서 db에 없다면 새로 추가
      let apiUrl = `${process.env.API}/keyword/check`
      this.$axios
        .post(apiUrl, {
          param: {
            keyword_name: newKeyword
          }
        })
        .then((result) => {
          console.log(result)

          const isInArray = this.cafeKeywords.find(
            (el) => el.keyword_id === result.data.keyword_id
          )

          // 해당 keyword_id 가 이미 array에 있을 경우 추가하지 않음
          if (isInArray) {
            this.$q.notify({
              position: 'top',
              timeout: 1000,
              message: '이미 보기로 불러온 키워드 입니다.',
              color: 'info'
            })
          } else {
            // cafeKeywords 에추가
            this.cafeKeywords.push({
              keyword_id: result.data.keyword_id,
              keyword_name: result.data.keyword_name,
              by_user: result.data.isNew === 1 ? true : false
            })

            // 방금 추가한 card의 ref를 가지고 체크상태로 변경
            this.check(this.cafeKeywords.length - 1)
            this.newKeyword = ''
          }

          this.isAddingKeyword = false
        })
        .catch((err) => {
          console.log(err)
          this.isAddingKeyword = false
        })
    },
    async check(i) {
      setTimeout(() => {
        // 방금 추가한 card의 ref를 가지고 체크상태로 변경
        this.$refs.keywordSelect[i].handleClick()
      }, 30)
    },
    selectCafeKeyword(id) {
      this.selectedCafeKeywords.push({ keyword_id: id })
    },
    deSelectCafeKeyword(id) {
      this.selectedCafeKeywords = this.selectedCafeKeywords.filter((item) => {
        console.log(item)
        return item.keyword_id !== id
      })
    },
    // file 선택이 변경될때마다 호출
    // e.target.files 의 모든 file들은 products 에 저장
    // file[0] 은 썸네일 이미지로 따로 저장
    async handleChangeCafeImage(e) {
      if (e.target.files.length < 6) {
        this.imagesCafe = []
        const files = e.target.files
        this.imageUpload(files, 'g')
      } else {
        this.$q.notify({
          position: 'top',
          timeout: 1000,
          message: '5장 이하의 사진만 업로드 할 수 있습니다.',
          color: 'warning'
        })
      }
    },
    async handleChangeMenuImage(e) {
      if (e.target.files.length < 6) {
        this.imagesMenu = []
        const files = e.target.files
        this.imageUpload(files, 'm')
      } else {
        this.$q.notify({
          position: 'top',
          timeout: 1000,
          message: '5장 이하의 사진만 업로드 할 수 있습니다.',
          color: 'warning'
        })
      }
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
                            images_review_type: 'g',
                            images_review_url: url,
                            thumbnail_url: r.data.filename,
                            thumb: url_thumb
                          })
                        } else if (type === 'm') {
                          this.imagesMenu.push({
                            images_review_type: 'm',
                            images_review_url: url,
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

        // console.log(this.images)
      }
    },
    postReview() {
      // 유효성 검사 VALIDATION
      if (
        this.selectedDrinkType.length < 1 ||
        (!this.selectedDrinkType.includes('br') &&
          !this.selectedDrinkType.includes('va'))
      ) {
        this.$q.notify({
          position: 'top',
          timeout: 1000,
          message: '브루잉 또는 배리에이션 중에 적어도 하나 이상 선택해주세요.',
          color: 'primary'
        })

        this.highlighted = true
      }

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
      let review_img = ''
      if (images.length) {
        review_img = images[0].thumbnail_url
      }

      console.log(images)

      this.$axios
        .post(`http://localhost:3000/api/review/1`, {
          review: {
            cafe_id: this.cafeId,
            user_id: this.uid,
            review_drink: this.review.review_drink,
            drink_type: this.review.drink_type,
            review_content: this.review.review_content,
            review_img: review_img
            // review_img: images[0].thumbnail_url
          },
          images: images,
          // [
          //   {
          //     images_review_type: 'g',
          //     images_review_url: 'g_01.jpg',
          //     thumbnail_url: 'g_01_thumb.jpg'
          //   }
          // ]
          keywords: this.selectedCafeKeywords
          // keywords: [{ keyword_id: 30 }, { keyword_id: 31 }]
        })
        .then((response) => {
          console.log(response)
          this.$router.push(`/cafe/${this.cafeId}`)
        })
        .catch((ex) => {
          alert('리뷰를 로스팅하는데 문제가 생겼습니다.')
          console.log(ex)
        })
    }
  }
})
</script>

<style lang="scss" scoped>
.createpost {
  .subtitle {
    font-size: 16px;
    font-weight: 500;
    color: $primary;
  }
  .subtitle2 {
    font-size: 16px;
    font-weight: 500;
    color: $brown-5;
  }
  .keywords_container {
    display: grid;
    grid-template-columns: repeat(4, minmax(100px, auto));
    gap: 4px 4px;

    @media (max-width: $breakpoint-xs-max) {
      grid-template-columns: repeat(2, minmax(90px, auto));
    }
  }

  .highlighted {
    border: 2px solid $red-4;
    border-radius: 4px;
    margin-bottom: 8px;
  }
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
  }
  .btn-pic {
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
  input[type='file'] {
    visibility: hidden;
    width: 0px;
  }
}
</style>
