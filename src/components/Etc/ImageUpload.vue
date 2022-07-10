<template>
  <div class="q-px-xl q-py-lg">
    <div class="row flex justify-between align-center">
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
          <q-icon size="md" name="camera" />
        </label>
        <input
          id="file"
          type="file"
          ref="files"
          @click="addImageId"
          @change="imageUpload"
          placeholder="사진 추가"
          accept="/image"
          multiple
          class="uploadBox"
        />
      </div>
    </div>
    <q-card class="q-my-lg row uploadedImage">
      <div v-for="(image, index) in this.images" :key="index" class="flex">
        <img
          :src="image.thumbnail_url"
          class="q-py-sm q-px-md imageBox"
          alt=""
        />
        <!-- <q-card class="text-center deleteCard">지우기</q-card> -->
      </div>
    </q-card>
  </div>
</template>
<script>
import resizeImageSquare from 'src/composables/image-resize-square'

export default {
  name: 'imageUpload',

  data() {
    return {
      files: [],
      file: null,
      images: []
    }
  },
  methods: {
    imageUpload(event) {
      const maxImageLength = 5
      if (this.images.length < maxImageLength) {
        const files = event.target.files
        const file = files[0]
        const id = this.images.length + 1

        // 원본 이미지 URL로 바꾸기
        let new_original_url = URL.createObjectURL(file)
        console.log(new_original_url)

        // 썸네일 이미지 URL 만들기
        resizeImageSquare({ file: file, maxSize: 200, square: true })
          .then((uploadedImage) => {
            // console.log(uploadedImage)
            let new_thumbnail_url = URL.createObjectURL(uploadedImage)

            let new_image = {
              menu_id: id,
              type: 'g',
              cafe_image_url: new_original_url,
              thumbnail_url: new_thumbnail_url
            }
            this.images.push(new_image)
          })
          .catch((err) => console.error(err))
        console.log(this.images)
      } else {
        alert('이미지는 최대 5개까지 업로드할 수 있습니다')
      }
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
  height: 240px;

  .imageBox {
    position: relative;
    border-radius: 5px;
    transition: color, 0.3s;
    cursor: pointer;
  }
  .imageBox:hover {
    opacity: 0.7;
  }
  // .deleteCard {
  //   position: absolute;
  //   width: 70px;
  //   height: 22px;
  //   border: 1px solid #333;
  //   background-color: antiquewhite;
  //   top: 50%;
  //   left: 50%;
  //   margin-top: -11px;
  //   margin-left: -35px;
  // }
}
</style>
