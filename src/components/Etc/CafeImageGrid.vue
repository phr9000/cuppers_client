<template>
  <div class="q-mt-xl">
    <a href="#">
      <span style="font-size: 25px; font-weight: 700" class="title">{{
        cafeData[0].cafe_name_pr
      }}</span
      >|
    </a>
    <span class="title"> {{ cafeData[0].cafe_region }}</span>
  </div>
  <div class="q-mt-xs">
    <span style="font-weight: 700; color: #007f9f" class="q-pl-md">
      <q-icon size="sm" name="notes" class="q-pr-sm q-pb-xs" />리뷰 수
      {{ reviewData.length }}
    </span>
  </div>
  <div view="lhh LpR lff" container class="shadow-2 q-mt-xs">
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
    </div>
  </div>
</template>
<script>
export default {
  name: 'ImageGrid',
  props: {
    cafe_name_pr: {
      type: String,
      default: '커피앰비언스'
    },
    cafe_region: {
      type: String,
      default: '송파'
    },
    review_thumbnail: {
      type: String,
      default:
        'https://img1.kakaocdn.net/cthumb/local/R0x420/?fname=http%3A%2F%2Ft1.kakaocdn.net%2Fmystore%2F8B933339DC3E4BF2B9033A30ADBCA5F4'
    },
    cafe_name: {
      type: String,
      default: '커피앰비언스'
    },
    cafeData: Array,
    reviewData: Array,
    userData: Array
  },
  computed: {
    activeArray() {
      let recentReview = [...this.reviewData].splice(1, 4)
      return recentReview
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
  color: #000;
}
.image {
  padding: 3px;
}
.images {
  padding: 3px;
}
</style>
