<template>
  <section class="q-px-xl q-py-lg">
    <section class="row justify-between align-center q-my-md">
      <div>
        <span class="text-h6">카페 이미지</span
        ><span class="q-px-sm text-subtitle2 grey-4">{{
          onlyCafeImage.length > 0
            ? onlyCafeImage.length + ' / 5'
            : '선택된 이미지가 없습니다'
        }}</span>
      </div>
      <div>
        <label for="file" class="text-h6 addButton">
          <q-icon size="md" name="eva-camera" />
        </label>
        <input
          id="file"
          type="file"
          ref="files"
          @change="uploadCafeImage"
          accept="/image"
          multiple
          class="uploadBox"
        />
      </div>
    </section>
    <section>
      <q-card>
        <p class="q-py-md q-px-md text-brown-7">
          * 방문하신 카페의 사진을 업로드해주세요.<br />
          * 직접 촬영하지 않은 사진 또는 1000 x 1000 미만 해상도의 사진은 별도의
          통보없이 삭제될 수 있습니다.
        </p>
        <p class="q-px-md"></p>
      </q-card>
    </section>
    <section>
      <q-card class="q-my-lg swiper-container">
        <swiper :slidesPerView="1" class="swiper-wrapper row">
          <swiper-slide
            class="slide"
            v-for="(image, index) in onlyCafeImage"
            :key="index"
          >
            <div>
              <img
                :src="image.thumbnail_url"
                class="image q-my-sm q-mx-md"
                alt=""
              />
            </div>
            <btn-basic
              @click="deleteImage"
              size="md"
              color="primary"
              label="지우기"
              padding="5px 15px"
            />
          </swiper-slide>
        </swiper>
      </q-card>
    </section>
  </section>

  <section class="q-px-xl q-py-lg">
    <section class="row justify-between align-center q-my-md">
      <div>
        <span class="text-h6">메뉴 이미지</span
        ><span class="q-px-sm text-subtitle2 grey-4">{{
          onlyMenuImage.length > 0
            ? onlyMenuImage.length + ' / 5'
            : '선택된 이미지가 없습니다'
        }}</span>
      </div>
      <div>
        <label for="file" class="text-h6 addButton">
          <q-icon size="md" name="camera" />
        </label>
        <input
          id="file"
          type="file"
          ref="files"
          @change="uploadMenuImage"
          placeholder="사진 추가"
          accept="/image"
          multiple
          class="uploadBox"
        />
      </div>
    </section>
    <section>
      <q-card>
        <p class="q-py-md q-px-md text-brown-7">
          * 방문하신 카페의 메뉴 사진을 업로드해주세요.<br />
          * 직접 촬영하지 않은 사진 또는 1000 x 1000 미만 해상도의 사진은 별도의
          통보없이 삭제될 수 있습니다.
        </p>
        <p class="q-px-md"></p>
      </q-card>
    </section>
    <section>
      <q-card class="q-my-lg swiper-container">
        <swiper :slidesPerView="1" class="swiper-wrapper row">
          <swiper-slide
            class="slide"
            v-for="(image, index) in onlyMenuImage"
            :key="index"
          >
            <div>
              <img
                :src="image.thumbnail_url"
                class="image q-my-sm q-mx-md"
                alt=""
              />
            </div>
            <btn-basic
              @click="deleteImage"
              size="md"
              color="primary"
              label="지우기"
              padding="5px 15px"
            />
          </swiper-slide>
        </swiper>
      </q-card>
    </section>
  </section>
</template>
<script>
import BtnBasic from 'src/components/Button/BtnBasic.vue'
import useResize from 'src/composables/useResize'
const { resizeImage, resizeImageSquare } = useResize()
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/scss'

export default {
  name: 'imageUpload',
  components: {
    Swiper,
    SwiperSlide,
    BtnBasic
  },
  data() {
    return {
      files: [],
      images: []
    }
  },
  methods: {
    uploadCafeImage(event) {
      const MAX_IMAGES_LENGTH = 5
      if (this.onlyCafeImage.length < MAX_IMAGES_LENGTH) {
        const files = event.target.files
        // const file = files[0]
        // console.log('file', file)

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
                .then((response) => {
                  console.log(response)
                  url = response.data.url

                  // 2. 썸네일 이미지 업로드
                  resizeImageSquare({ file: file, maxSize: 500, square: true })
                    .then((blob_thumb) => {
                      const formData = new FormData()
                      formData.append('image', blob_thumb)

                      this.$axios
                        .post(apiUrl, formData, {
                          headers: { 'Content-Type': 'multipart/form-data' }
                        })
                        .then((response) => {
                          console.log(response)
                          url_thumb = response.data.url

                          this.images.push({
                            type: 'g',
                            images_cafe_url: url,
                            thumbnail_url: url_thumb
                          })
                          console.log(this.images)
                        })
                        .catch((err) => {
                          console.error(err)
                        })
                    })
                    .catch((err) => {
                      console.error(err)
                    })
                })
                .catch((err) => {
                  console.error(err)
                })
            })
            .catch((err) => {
              console.error(err)
            })

          console.log(this.images)
        }
      } else {
        alert('이미지는 최대 5개까지 업로드할 수 있습니다')
      }
    },
    uploadMenuImage(event) {
      const MAX_IMAGES_LENGTH = 5
      if (this.onlyMenuImage.length < MAX_IMAGES_LENGTH) {
        const files = event.target.files
        // const file = files[0]
        // console.log('file', file)

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
                .then((response) => {
                  console.log(response)
                  url = response.data.url

                  // 2. 썸네일 이미지 업로드
                  resizeImageSquare({ file: file, maxSize: 500, square: true })
                    .then((blob_thumb) => {
                      const formData = new FormData()
                      formData.append('image', blob_thumb)

                      this.$axios
                        .post(apiUrl, formData, {
                          headers: { 'Content-Type': 'multipart/form-data' }
                        })
                        .then((response) => {
                          console.log(response)
                          url_thumb = response.data.url

                          this.images.push({
                            type: 'm',
                            images_cafe_url: url,
                            thumbnail_url: url_thumb
                          })
                          console.log(this.images)
                        })
                        .catch((err) => {
                          console.error(err)
                        })
                    })
                    .catch((err) => {
                      console.error(err)
                    })
                })
                .catch((err) => {
                  console.error(err)
                })
            })
            .catch((err) => {
              console.error(err)
            })

          console.log(this.images)
        }
      } else {
        alert('이미지는 최대 5개까지 업로드할 수 있습니다')
      }
    },
    deleteImage(event) {
      console.log(event)
      console.log(this.images)
      // this.images = this.images.filter((image) => images.index ! i == me)
    }
  },
  computed: {
    onlyCafeImage() {
      return this.images.filter((image) => image.type === 'g')
    },
    onlyMenuImage() {
      return this.images.filter((image) => image.type === 'm')
    }
  }
}
</script>
<style lang="scss" scoped>
.addButton {
  cursor: pointer;
}
.uploadBox {
  visibility: hidden;
  width: 0px;
}
.swiper-container {
  height: 300px;
  padding: 10px;

  .swiper-wrapper {
    display: flex;
    text-align: center;
    .slide {
      min-width: 300px;
      display: inline-block;

      .image {
        width: 250px;
      }

      .deleteButton {
        width: 70px;
        border: 1px solid #333;
        border-radius: 10px;
        background-color: transparent;
        cursor: pointer;
      }
    }
  }
}
</style>
