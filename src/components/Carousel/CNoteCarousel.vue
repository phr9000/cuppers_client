<template>
  <div class="q-px-md">
    <q-carousel
      animated
      v-model="slide"
      navigation
      infinite
      :autoplay="autoplay"
      arrows
      transition-prev="slide-right"
      transition-next="slide-left"
      @mouseenter="autoplay = false"
      @mouseleave="autoplay = true"
    >
      <q-carousel-slide
        :name="1"
        img-src="https://www.readyseteat.com/sites/g/files/qyyrlu501/files/images/article/hero/BARISTA-STYLE-COFFEE-HERO.jpg"
        style="opacity: 0.7"
      >
        <div class="q-mt-md text-center">
          {{ title }}
        </div>
      </q-carousel-slide>
      <q-carousel-slide
        :name="2"
        img-src="https://cdn.quasar.dev/img/parallax1.jpg"
        style="opacity: 0.7"
      >
        <div class="q-mt-md text-center">
          {{ title }}
        </div>
      </q-carousel-slide>
      <q-carousel-slide
        :name="3"
        img-src="https://cdn.quasar.dev/img/parallax2.jpg"
        style="opacity: 0.7"
      >
        <div class="q-mt-md text-center">
          {{ title }}
        </div>
      </q-carousel-slide>
      <q-carousel-slide
        :name="4"
        img-src="https://solis.com/media/wysiwyg/blog/Iced-coffee.jpg"
        style="opacity: 0.7"
      >
        <div class="q-mt-md text-center">
          {{ title }}
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    return {
      slide: ref(1),
      autoplay: ref(true),
      title: '카페 글'
    }
  }
}
</script>

<style lang="scss" scoped>
.q-mt-md {
  font-size: 50px;
  font-weight: bold;
  margin-top: 130px;
}
</style>
