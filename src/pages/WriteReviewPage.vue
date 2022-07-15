<template>
  <q-page class="bg-grey-1">
    <section class="column constrain_sm q-pa-md">
      <!-- cafeId: {{ cafeId }} / uid: {{ uid }} -->

      <main class="createpost">
        <section class="keyword">
          <div class="text-subtitle1">카페 키워드 (중복 선택 가능)</div>
          <div class="row justify-start">
            <survey-select
              style="width: 120px; height: 130px"
              class="q-ma-xs"
              v-for="keyword in cafeKeywords"
              :key="keyword.keyword_id"
              :id="keyword.keyword_id"
              :type="keyword.keyword_type"
              :text="keyword.keyword_name"
              :icon="keyword.keyword_icon"
              :bg="keyword.reg_survey_imgurl"
              @checked="selectCafeKeyword"
              @unchecked="deSelectCafeKeyword"
            />
          </div>
          <div>선택한 카페 키워드 : {{ selectedCafeKeywords }}</div>
        </section>

        <q-separator class="q-my-md"></q-separator>

        <section class="drink">
          <div class="text-subtitle1">드신 커피를 작성해 주세요.</div>
          <div class="q-mb-sm">
            <q-input
              v-model="review.drink_type"
              label="커피의 종류"
              placeholder="체크 박스로 구현할 예정"
              stack-label
              outlined
              :dense="dense"
            />
          </div>
          <div class="q-mb-sm">
            <q-input
              v-model="review.review_drink"
              label="커피 이름"
              stack-label
              outlined
              :dense="dense"
            />
          </div>
          <div class="q-mb-sm">
            <q-input
              v-model="review.review_content"
              label="드신 커피를 리뷰해주세요."
              placeholder="드신 커피에 대해 상세히 리뷰해주세요! ex) 부드러운 질감, 베리류의 향미, 깔끔한 산미의 균형이 잘 잡힌 커피. 이 카페에서는 꼭 드립 커피를 드세요"
              stack-label
              outlined
              autogrow
              :dense="dense"
            />
          </div>
        </section>

        <q-separator class="q-my-md"></q-separator>

        <section class="image_upload">
          <div class="row q-pb-md">
            <div class="col-10">
              <div class="column">
                <div class="text-subtitle1">음식‧실내외 사진</div>
                <div class="row justify-start">
                  <img
                    v-for="img in images"
                    :key="img.thumbnail_url"
                    class="pic img-pic"
                    :src="img.thumbnail_url"
                    alt="썸네일 이미지"
                  />
                  <div v-if="images.length < 1" class="text-caption text-grey">
                    ‧ 본인이 직접 촬영하지 않은 사진<br />‧ 1000 * 1000 미만
                    해상도의 사진은 통보없이 삭제될 수 있습니다.
                  </div>
                </div>
              </div>
            </div>
            <div class="col-2 row justify-end items-end">
              <label for="imgfile">
                <div class="pic btn-pic">
                  <img
                    class="icon"
                    src="/icons/camera-fill.svg"
                    alt="bell-icon"
                  />
                  <span>{{ images ? images.length : 0 }}/5</span>
                </div></label
              >
              <input
                type="file"
                id="imgfile"
                @change="handleChange"
                accept=".png, .jpg, .jpeg"
                multiple
              />
            </div>
          </div>
        </section>

        <q-separator class="q-my-md"></q-separator>
        <!-- <section>
        <input
          type="text"
          class="form-control"
          placeholder="리뷰 제목"
          v-model.trim="title"
        />
      </section> -->
      </main>
      <button class="q-mt-lg" @click="postReview">리뷰 등록</button>
    </section>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { computed } from 'vue'
import { useStore } from 'vuex'

// composables
import useResize from 'src/composables/useResize'
const { resizeImage, resizeImageSquare } = useResize()

import SurveySelect from 'src/components/Etc/SurveySelect.vue'

export default defineComponent({
  name: 'WriteReviewPage',
  components: { SurveySelect },

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
      files: [],
      review: {
        cafe_id: 1,
        user_id: 1,
        review_drink: '플랫화이트',
        drink_type: 'va',
        review_content:
          '플랫화이트 Flat White 는 에스프레소에 크림처럼 고운 스팀밀크를 올린 커피 음료예요. 라떼나 카푸치노와 비슷하지만, 밀크폼이 좀 더 부드럽고 커피맛이 진한 게 특징이에요. 저는 모르는 카페를 갔을 때 카페 라떼를 주문하는 일은 거의 없어도 플랫화이트는 종종 시켜먹어요',
        review_img: 'images/review/26/g_01_thumb.jpg'
      },
      images: [
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
      selectedCafeKeywords: [
        // { keyword_id: 3 }, { keyword_id: 3 }
      ]
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
      this.$axios
        .get(apiUrl)
        .then((result) => {
          this.cafeKeywords = result.data.filter((item) => {
            return item.keyword_type === 'cafe'
          })
        })
        .catch((err) => {
          console.log(err)
        })
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
    async handleChange(e) {
      this.images = []
      // const selected = e.target.files[0]
      // console.log(selected.name)
      const files = e.target.files
      // const file = files[0]

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
                console.log(r.data)
                url = r.data.url

                // 2. 썸네일 이미지 업로드
                resizeImageSquare({ file: file, maxSize: 300, square: true })
                  .then((blob_thumb) => {
                    const formData = new FormData()
                    formData.append('image', blob_thumb)

                    this.$axios
                      .post(apiUrl, formData, {
                        headers: { 'Content-Type': 'multipart/form-data' }
                      })
                      .then((r) => {
                        console.log(r.data)
                        url_thumb = r.data.url

                        this.images.push({
                          images_review_type: 'g',
                          images_review_url: url,
                          thumbnail_url: url_thumb
                        })
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

        console.log(this.images)
      }
    },
    postReview() {
      this.$axios
        .post(`http://localhost:3000/api/review/1`, {
          review: {
            cafe_id: this.cafeId,
            user_id: this.uid,
            review_drink: this.review.review_drink,
            drink_type: this.review.drink_type,
            review_content: this.review.review_content,
            review_img: this.images[0].thumbnail_url
          },
          images: this.images,
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
  .image_upload {
    height: 102px;
  }
  .pic {
    border: 1px solid $grey;
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
