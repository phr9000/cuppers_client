<template>
  <div class="q-px-xl q-py-lg">
    <div class="row flex justify-between align-center">
      <div>
        <span class="text-h6">카페 이미지</span
        ><span class="q-px-sm text-subtitle2 grey-4">{{
          file ? file.name : '선택된 파일이 없습니다.'
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
import resizeImage from 'src/composables/image-resize'

export default {
  name: 'imageUpload',

  data() {
    return {
      // files: [],
      // filesPreview: [],
      // uploadImageIndex: 0
      files: [],
      file: null,
      images: [
        {
          type: '',
          cafe_image_url: '',
          thumbnail_url: ''
        }
      ]
    }
  },
  methods: {
    imageUpload(event) {
      const files = event.target.files
      const file = files[0]
      console.log(files)
      console.log(file)

      let new_image = {
        type: 'g',
        cafe_image_url: '',
        thumbnail_url: ''
      }
      this.images.push(new_image)
      console.log(this.images)

      resizeImageSquare({ file: file, maxSize: 200, square: true })
        .then((uploadedImage) => {
          console.log(uploadedImage)
          for (let i = 0; i < this.images.length; i++) {
            let thumb_url = URL.createObjectURL(uploadedImage)
            this.images[i].thumbnail_url = thumb_url
          }
        })
        .catch((err) => console.error(err))

      resizeImage({ file: file, maxSize: 512 })
        .then((uploadedImage) => {
          for (let i = 0; i < this.images.length; i++) {
            let original_url = URL.createObjectURL(uploadedImage)
            this.images[i].cafe_image_url = original_url
          }
        })
        .catch((err) => console.error(err))
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
