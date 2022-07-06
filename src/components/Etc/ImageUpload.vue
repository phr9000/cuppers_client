<template>
  <div class="q-px-xl q-py-lg">
    <div class="row flex justify-between align-center">
      <div>
        <span class="text-h6">카페 이미지</span
        ><span class="q-px-sm text-subtitle2 grey-4"
          >{{ this.uploadImageIndex }} /5</span
        >
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
      <div v-for="(file, index) in files" :key="index" class="flex">
        <img :src="file.preview" class="q-py-sm q-px-md imageBox" />
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
      files: [],
      filesPreview: [],
      uploadImageIndex: 0
    }
  },
  methods: {
    imageUpload(event) {
      console.log(reader.$refs.files.files)
      let num = -1
      for (let i = 0; i < this.$refs.files.files.length; i++) {
        this.files = [
          ...this.files,
          {
            file: this.$refs.files.files[i],
            preview: URL.createObjectURL(this.$refs.files.files[i]),
            number: i
          }
        ]
        num = i
      }
      this.uploadImageIndex = num++
      console.log(this.files)
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
  height: 160px;
  background-color: $primary;

  .imageBox {
    position: relative;
    width: 250px;
    height: 200px;
    border-radius: 5px;
    transition: color, 0.3s;
    cursor: pointer;
  }
  .imageBox:hover {
    background-color: $primary;
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
