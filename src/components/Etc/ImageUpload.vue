<template>
  <section class="q-px-xl q-py-lg">
    <section class="row justify-between align-center q-my-md">
      <div>
        <span class="text-h6">카페 사진</span
        ><span class="q-px-sm text-subtitle2 grey-4">{{
          onlyCafeImage.length > 0 ? onlyCafeImage.length + ' / 5' : null
        }}</span>
      </div>
      <div>
        <label for="cafe-file" class="text-h6 addButton">
          <q-icon size="sm" name="eva-camera" color="primary" /> 사진추가
        </label>
        <input
          id="cafe-file"
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
      </q-card>
    </section>
    <section>
      <div class="q-my-lg swiper-container">
        <div
          v-if="onlyCafeImage.length === 0"
          class="q-pt-lg flex justify-center"
        >
          <img src="/noImage.png" alt="이미지가 등록되지 않음" />
        </div>
        <swiper :slidesPerView="2" class="swiper-wrapper row">
          <swiper-slide
            ref="ImageSlide"
            class="slide"
            v-for="(image, index) in onlyCafeImage"
            :key="index"
          >
            <div>
              <img :src="image.thumbnail_url" class="image q-my-sm q-mx-md" />
            </div>
            <q-btn
              rounded
              @click="deleteImage(image)"
              color="primary"
              label="지우기"
              class="deleteButton"
              padding="2px 15px"
            />
          </swiper-slide>
        </swiper>
      </div>
    </section>
  </section>

  <!--------------------------------------------------------->

  <section class="q-px-xl q-py-lg">
    <section class="row justify-between align-center q-my-md">
      <div>
        <span class="text-h6">메뉴 사진</span
        ><span class="q-px-sm text-subtitle2 grey-4">{{
          onlyMenuImage.length > 0 ? onlyMenuImage.length + ' / 5' : null
        }}</span>
      </div>
      <div>
        <label for="menu-file" class="text-h6 addButton">
          <q-icon size="sm" name="eva-camera" color="primary" /> 사진추가
        </label>
        <input
          id="menu-file"
          type="file"
          ref="files"
          @change="uploadMenuImage"
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
      </q-card>
    </section>
    <section>
      <div class="q-my-lg swiper-container">
        <div
          v-if="onlyMenuImage.length === 0"
          class="q-pt-lg flex justify-center"
        >
          <img src="/noImage.png" alt="이미지가 등록되지 않음" />
        </div>
        <swiper :slidesPerView="2" class="swiper-wrapper row">
          <swiper-slide
            ref="ImageSlide"
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
              <q-btn
                rounded
                @click="deleteImage(image)"
                color="primary"
                label="지우기"
                class="deleteButton"
                padding="2px 15px"
              />
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </section>
  </section>
</template>
<script>
import useResize from 'src/composables/useResize'
const { resizeImage, resizeImageSquare } = useResize()
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/scss'

export default {
  name: 'imageUpload',
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      files: [],
      images: []
    }
  },
  mounted() {
    if (this.onlyCafeImage.length === 0) {
    }
  },
  methods: {
    uploadCafeImage(event) {
      console.log('uploadCafeImage is executed')
      const MAX_IMAGES_LENGTH = 5
      if (this.onlyCafeImage.length < MAX_IMAGES_LENGTH) {
        const files = event.target.files
        const image_id = this.images.length + 1
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
                            image_id: image_id,
                            type: 'g',
                            cafe_image_url: url,
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
        }
      } else {
        alert('이미지는 최대 5개까지 업로드할 수 있습니다')
      }
    },

    uploadMenuImage(event) {
      console.log('uploadMenuImage is executed')
      const MAX_IMAGES_LENGTH = 5
      if (this.onlyMenuImage.length < MAX_IMAGES_LENGTH) {
        const image_id = this.images.length + 1
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
                            image_id: image_id,
                            type: 'm',
                            cafe_image_url: url,
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
        }
      } else {
        alert('이미지는 최대 5개까지 업로드할 수 있습니다')
      }
    },
    deleteImage(image) {
      let image_id = image.image_id
      console.log(image_id)
      this.images = this.images.filter((image) => image.image_id !== image_id)
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
  border: 1px solid $primary;
  border-radius: 15px;
  padding: 5px 10px 7px 12px;
  font-size: 14px;
  cursor: pointer;
}
.uploadBox {
  visibility: hidden;
  width: 0px;
}
.swiper-container {
  height: 230px;
  padding: 10px;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;

  .swiper-wrapper {
    display: flex;
    text-align: center;
    .slide {
      min-width: 200px;
      display: inline-block;
      position: relative;
      &:hover {
        .image {
          opacity: 20%;
        }
        .deleteButton {
          display: block;
          &:hover {
            opacity: 50%;
          }
        }
      }
      .image {
        width: 200px;
        transition: 0.3s;
      }
      .deleteButton {
        display: none;
        width: 50px;
        position: absolute;
        top: 45%;
        left: 50%;
        transform: translate(-50%);
        transition: 0.5s;
        cursor: pointer;
      }
    }
  }
}
</style>
