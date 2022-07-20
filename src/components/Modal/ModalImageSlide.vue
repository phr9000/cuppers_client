<template>
  <div>
    <h6 @click="openModal = true">메뉴판 이미지</h6>
  </div>

  <div class="black-bg q-pa-md" v-if="openModal == true">
    <div class="white-bg">
      <q-btn
        flat
        round
        color="primary"
        icon="close"
        @click="openModal = false"
      />
      <q-carousel
        fullscreen
        swipeable
        animated
        v-model="slide"
        thumbnails
        infinite
      >
        <q-carousel-slide
          v-for="img in images"
          :key="img.id"
          :name="img.id"
          :img-src="img.url"
        />
      </q-carousel>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'ModalImageSlide',
  data() {
    return {
      openModal: false,
      images: [
        {
          id: 1,
          url: 'https://mblogthumb-phinf.pstatic.net/MjAyMDA4MjlfMTgw/MDAxNTk4NjY2MjE1OTcw.pq7AhVPdDwa2H-IscTqb-pi0GO4jhdTcd5tGhzJ7D-gg.9tz35FRlmDYlIEitt9awwBh3a7CZQg4zNj2AkJs4nyMg.JPEG.jeeesu92/output_395031238.jpg?type=w800'
        },
        {
          id: 2,
          url: 'https://media-cdn.tripadvisor.com/media/photo-s/14/f3/48/c0/coffee-mug.jpg'
        },
        {
          id: 3,
          url: 'https://mblogthumb-phinf.pstatic.net/MjAxOTEwMDJfNjMg/MDAxNTcwMDA4MTU2NTQ3.lTO75NOkU7x3wKv6AbOvAqQad18RGeABI-XGKIRdHMEg.zZeQSQNO4473KjiIwTJU3ZPpR9G6PKFGFiDxgtKyHyMg.JPEG.theazure7/SE-1457e66b-c235-40bb-b85e-c8ea8472c48c.jpg?type=w800'
        },
        {
          id: 4,
          url: 'https://mblogthumb-phinf.pstatic.net/MjAyMjAzMTlfMjQg/MDAxNjQ3NjYwODEwNDYw.P1G7DnGZHdBl-9uGxxKTCUS1VDPW1qN_MFeDEyVKmtAg.In3TMj4aK2dgzlzjAzFUrn2xeFeYDEdVtdkg-3Tn5Ecg.JPEG.sustaincoffee/SE-ee52c4e6-a196-4fe7-a6f7-b3e433101fa6.jpg?type=w800'
        }
      ]
    }
  },
  setup() {
    return {
      slide: ref(1)
    }
  }
}
</script>
<style lang="scss" scoped>
body {
  margin: 0;
}
div {
  box-sizing: border-box;
}
.black-bg {
  display: flex;
  width: 80%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  // position: fixed;
  padding: 20px;
  text-align: right;
}
.white-bg {
  width: 100%;
  background: white;
  border-radius: 8px;
  padding: 20px;
}
</style>
