<template>
  <section
    :slidesPerView="1"
    :scrollbar="{ draggable: false }"
    class="swiper-container"
  >
    <swiper class="swiper-wrapper row">
      <swiper-slide class="slide"
        ><div class="contents">Hello</div></swiper-slide
      >
      <swiper-slide class="slide"
        ><div class="contents">Hello</div></swiper-slide
      >
      <swiper-slide class="slide"
        ><div class="contents">Hello</div></swiper-slide
      >
      <swiper-slide class="slide"
        ><div class="contents">Hello</div></swiper-slide
      >
      <swiper-slide class="slide"
        ><div class="contents">Hello</div></swiper-slide
      >
    </swiper>
  </section>
</template>
<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/scss'

export default {
  data() {
    return {}
  },
  components: {
    Swiper,
    SwiperSlide
  }
}
</script>
<style lang="scss" scoped>
.swiper-container {
  width: 100%;
  .swiper-wrapper {
    width: 600px;
    height: 50px;
    border: 1px solid black;
    display: flex;
    .slide {
      width: 300px;
      height: 50px;
      border: 1px solid #ccc;
      display: inline-block;
      text-align: center;
    }
    .swiper-button-disabled {
      display: none;
    }
  }
}
</style>
