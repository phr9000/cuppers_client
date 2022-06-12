<template>
  <div class="q-mt-xl">
    <a href="#">
      <span style="font-size: 25px" class="title">{{
        cafeData[0].cafe_name_pr
      }}</span
      >|
    </a>
    <span class="title">{{ cafeData[0].cafe_region }}</span>
  </div>
  <div view="lhh LpR lff" container class="shadow-2 q-mt-xl">
    <div class="row">
      <div class="col col-md-6 image">
        <q-img
          :src="reviewData[0].review_thumbnail"
          style="height: 400px; max-width: 600px"
        >
          <div class="absolute-bottom text-subtitle text-center">
            {{ reviewData[0].cafe_name }}
          </div>
        </q-img>
      </div>
      <div class="col">
        <div class="row">
          <div v-for="i in activeArray" :key="i" class="col-6 images">
            <q-img
              :src="i.review_thumbnail"
              style="height: 197px; max-width: 300px"
            >
              <div class="absolute-bottom text-subtitle text-center">
                {{ i.cafe_name }}
              </div>
            </q-img>
          </div>
        </div>
      </div>
      <div class="q-pa-md absolute-bottom">
        <q-btn :key="`btn_size_sq_xs`" label="이미지 더보기" />
      </div>
    </div>
  </div>
</template>
<script>
import reviewData from 'src/data/reviewData'

export default {
  name: 'ImageGrid',
  props: {
    cafeData: Array,
    reviewData: Array,
    userData: Array
  },
  computed: {
    activeArray() {
      return reviewData.splice(1, 4)
    }
  }
}
</script>
<style scoped lang="scss">
a:link {
  color: #000;
  text-decoration: none;
}
.title {
  margin: 10px;
}
.image {
  padding: 3px;
}
.images {
  padding: 3px;
}
</style>
