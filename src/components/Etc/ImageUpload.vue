<template>
  <section class="q-px-xl q-py-lg">
    <section class="row flex justify-between align-center q-my-md">
      <div>
        <span class="text-h6">카페 이미지</span
        ><span class="q-px-sm text-subtitle2 grey-4">{{
          this.images.length > 0
            ? this.images.length + ' / 5'
            : '선택된 파일이 없습니다'
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
          @change="uploadImage"
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
          * 방문하신 카페의 사진을 업로드해주세요.<br />
          * 직접 촬영하지 않은 사진 또는 1000 x 1000 미만 해상도의 사진은 별도의
          통보없이 삭제될 수 있습니다.
        </p>
        <p class="q-px-md"></p>
      </q-card>
    </section>
    <section>
      <q-card class="q-my-lg uploadedImage">
        <swiper
          :slidesPerView="5"
          :spaceBetween="30"
          class="swiper-container row"
        >
          <swiper-slide
            class="slide column justify-center"
            v-for="(image, index) in this.images"
            :key="index"
          >
            <img
              :src="image.thumbnail_url"
              class="image_list q-my-sm q-mx-md"
              alt=""
            />
            <button @click="deleteImage" class="deleteButton">지우기</button>
            <!-- <q-card class="text-center deleteCard">지우기</q-card> -->
          </swiper-slide>
        </swiper>
      </q-card>
    </section>
  </section>
</template>
<script>
import useResize from 'src/composables/useResize'
const { resizeImage, resizeImageSquare } = useResize()
import { Swiper, SwiperSlide } from 'swiper/vue'

export default {
  name: 'imageUpload',
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      files: [],
      images: [
        // {
        //   type: 'g',
        //   cafe_image_url: '/test/url/g',
        //   thumbnail_url: '/test/url/thumb/g'
        // },
        // {
        //   type: 'm',
        //   cafe_image_url: '/test/url/g',
        //   thumbnail_url: '/test/url/thumb/g'
        // }
      ]
    }
  },
  methods: {
    uploadImage(event) {
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
                resizeImageSquare({ file: file, maxSize: 300, square: true })
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
    },
    deleteImage() {
      console.log('Hello')
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
.uploadedImage {
  padding: 10px;
  position: relative;
  display: flex;
  height: 340px;
  .swiper-container {
    display: flex;

    .slide {
      min-width: 300px;
      display: inline-block;
      text-align: center;
      .image_list {
        cursor: pointer;
        position: relative;
        display: inline;
        transition: opacity 0.3s;
        &:hover {
          opacity: 0.5;
        }
      }
      .deleteButton {
        display: none;
        position: absolute;
        width: 70px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 10px;
        background-color: transparent;
        cursor: pointer;
      }
    }
    .swiper-button {
      color: #333;
    }
  }
}
</style>
