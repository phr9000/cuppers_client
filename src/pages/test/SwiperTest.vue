<template>
  <section>
    <swiper :slidesPerView="5" class="row swiper-container justify-center">
      <swiper-slide class="slide">Hello</swiper-slide>
      <swiper-slide class="slide">Hello</swiper-slide>
      <swiper-slide class="slide">Hello</swiper-slide>
      <swiper-slide class="slide">Hello</swiper-slide>
      <swiper-slide class="slide">Hello</swiper-slide>
      <swiper-slide class="slide">Hello</swiper-slide>
      <swiper-slide class="slide">Hello</swiper-slide>
      <swiper-slide class="slide">Hello</swiper-slide>
    </swiper>
  </section>
</template>
<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
export default {
  components: {
    Swiper,
    SwiperSlide
  }
}
</script>
<style lang="scss" scoped>
.swiper-container {
  width: 100%;
  height: 500px;
  border: 1px solid black;
  display: flex;
  .slide {
    height: 50px;
    border: 1px solid #ccc;
    display: inline-block;
    text-align: center;
  }
}
</style>
