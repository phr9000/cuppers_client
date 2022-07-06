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
      <img :src="images[0].thumbnail_url" alt="" />
      <div v-for="(image, index) in images" :key="index" class="flex">
        <img
          :src="image.url"
          :alt="image.filename"
          class="q-py-sm q-px-md imageBox"
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
          name: '',
          cafe_image_url: '',
          thumbnail_url: ''
        }
      ]
    }
  },
  methods: {
    imageUpload(event) {
      if (!this.images.type) {
        this.images = []
      }
      const files = event.target.files
      const file = files[0]

      resizeImageSquare({
        file: file,
        maxSize: 200
      })
        .then((resizedImage) => {
          const url = URL.createObjectURL(resizedImage)
          console.log(url)
          let image = {
            type: 'g',
            name: file.name,
            cafe_image_url: url,
            thumbnail_url: url
          }
          console.log(image)
          this.images.push(image)
          console.log('images: ', this.images)
        })
        .catch((err) => {
          console.error(err)
        })

      // for (let i = 0; i < files.length; i++) {
      //   const file = files[i]
      //   resizeImage({ file: file, maxSize: 512, square: false })
      //     .then((resizedImage) => {
      //       const path = `images/${file.name}` // ${cafe_info.cafe_name} 추가 예정
      //       const url = URL.createObjectURL(file)
      //       this.images.push({
      //         name: file.name,
      //         path: path,
      //         url: url,
      //         type: 'g'
      //       })
      //     })
      //     .catch((err) => {
      //       console.error(err)
      //     })
      // }
      // console.log(reader.$refs.files.files)
      // let num = -1
      // for (let i = 0; i < this.$refs.files.files.length; i++) {
      //   this.files = [
      //     ...this.files,
      //     {
      //       file: this.$refs.files.files[i],
      //       preview: URL.createObjectURL(this.$refs.files.files[i]),
      //       number: i
      //     }
      //   ]
      //   num = i
      // }
      // this.uploadImageIndex = num++
      // console.log(this.files)
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
