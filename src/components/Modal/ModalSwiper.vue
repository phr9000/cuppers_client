<template>
  <div class="swiper_wrap" v-if="show">
    <swiper
      :style="{
        '--swiper-navigation-color': '#fff',
        '--swiper-pagination-color': '#fff'
      }"
      :lazy="true"
      :pagination="{
        clickable: true
      }"
      :navigation="true"
      :modules="modules"
      class="mySwiper"
    >
      <!-- <swiper-slide>
        <img
          data-src="https://swiperjs.com/demos/images/nature-1.jpg"
          class="swiper-lazy"
        />
        <div
          class="swiper-lazy-preloader swiper-lazy-preloader-white"
        ></div> </swiper-slide
      > -->
      <swiper-slide v-for="img in images" :key="img.id">
        <img :data-src="img.url" class="swiper-lazy" />
        <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
      </swiper-slide>

      <btn-icon
        @click="closeModal"
        :flat="true"
        color="grey-9"
        class="btn_close"
        icon="close"
      />
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/scss'
import 'swiper/css/lazy'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// import required modules
// import SwiperCore, { Lazy, Pagination, Navigation } from 'swiper'
// SwiperCore.use([Lazy, Pagination, Navigation])
import { Lazy, Pagination, Navigation } from 'swiper'
import BtnIcon from 'src/components/Button/BtnIcon.vue'

export default {
  name: 'ModalSwiper',
  components: { BtnIcon, Swiper, SwiperSlide },
  setup() {
    return {
      modules: [Lazy, Pagination, Navigation]
    }
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    images: {
      type: Array,
      default: () => {
        return null
      }
    }
  },
  data() {
    return {}
  },
  methods: {
    closeModal() {
      this.$emit('close')
    }
  }
}
</script>
<style lang="scss" scoped>
.swiper_wrap {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  z-index: 2002;
}
.swiper {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  .swiper-button-prev {
    left: 20px;
  }
  .swiper-button-next {
    right: 20px;
  }
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
}

.swiper-slide img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  -ms-transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  position: absolute;
  left: 50%;
  top: 50%;
}
.btn_close {
  position: absolute;
  top: 8px;
  right: 8px;
  border-radius: 50%;
  z-index: 2002;
  &:deep(i) {
    transform: scale(1.4);
    color: $grey-6;
    z-index: 2003;
    &:hover {
      transform: scale(1.4);
      color: $grey-3;
    }
  }
}
</style>
