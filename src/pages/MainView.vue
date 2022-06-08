<template>
  <h3 style="padding-left: 30px">따뜻한<br />커피 한 잔이<br />좋다</h3>
  <div class="q-pa-md">
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
  <div v-for="list in 4" :key="list">
    <q-card class="my-card">
      <q-img
        src="http://designcoffee.com/web/images/TAG/Round7/coffee%20libre_interview%20(3).jpg"
      />

      <q-card-section>
        <q-btn
          fab
          color="primary"
          icon="place"
          class="absolute"
          style="top: 0; right: 12px; transform: translateY(-50%)"
        />

        <div class="row no-wrap items-center">
          <div class="col text-h6 ellipsis">커피리브레</div>
          <div
            class="col-auto text-grey text-caption q-pt-md row no-wrap items-center"
          >
            <q-icon name="place" />
            250m
          </div>
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="text-subtitle1">연남점</div>
        <div class="text-caption text-grey">
          커피리브레는 커피를 매개로 만나는 사람들의 미각적 행복과 기술적 진보를
          위해 노력합니다.
        </div>
      </q-card-section>
      <q-separator />
    </q-card>
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
.my-card {
  width: 100%;
  max-width: 300px;
  float: left;
  margin: 30px;
}
</style>
