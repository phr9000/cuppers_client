<template>
  <div class="row justify-center">
    <div class="q-py-md">
      <q-card class="uploader q-my-xl">
        <div class="row justify-between">
          <div class="text-h6">카페 사진 찾기</div>
          <span v-for="g in imageTypeG" :key="g">{{ g.length }}</span>
          <div>
            <input type="file" multiple accept=".png, .jpg, .jpeg" />
          </div>
        </div>
      </q-card>
      <q-card class="row justify-between uploader">
        <div class="text-h6">메뉴 사진 찾기</div>
        <span v-for="m in imageTypeG" :key="m">{{ m.length }}</span>
        <div>
          <input type="file" multiple accept=".png, .jpg, .jpeg" />
        </div>
      </q-card>
      <button @click="consoleUrl">button</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ImageUpload',
  data() {
    return {
      cafe_images: [
        {
          type: 'g',
          cafe_image_url: '',
          thumbnail_url: ''
        },
        {
          type: 'm',
          cafe_image_url: '',
          thumbnail_url: ''
        }
      ]
    }
  },
  methods: {
    consoleUrl() {
      console.log(this.cafe_images)
    }
  },
  computed: {
    imageTypeG() {
      return this.cafe_images.filter((cafe_images) => cafe_images.type === 'g')
    },
    imageTypeM() {
      return this.cafe_images.filter((cafe_images) => cafe_images.type === 'm')
    }
  }
}
</script>
<style lang="scss" scoped>
.uploader {
  width: 500px;
  min-height: 250px;
  .input-box {
    margin: none;
    padding: none;
  }
}
</style>
