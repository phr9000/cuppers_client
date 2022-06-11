<template>
  <div class="q-mt-xl">
    <a href="#">
      <span style="font-size: 25px" class="title">{{
        firstReview.Cafe_title
      }}</span
      >|
    </a>
    <span class="title">{{ firstReview.Cafe_address }}</span>
  </div>
  <div view="lhh LpR lff" container class="shadow-2 q-mt-xl">
    <div class="row">
      <div class="col col-md-6 image">
        <q-img
          :src="firstReview.ImageUrl"
          style="height: 400px; max-width: 600px"
        >
          <div class="absolute-bottom text-subtitle text-center">
            {{ firstReview.Review_title }}
          </div>
        </q-img>
      </div>
      <div class="col">
        <div class="row">
          <div v-for="a in lestReview" :key="a" class="col-6 images">
            <q-img :src="a.ImageUrl" style="height: 197px; max-width: 300px">
              <div class="absolute-bottom text-subtitle text-center">
                {{ a.Review_title }}
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
import UserData from '../../data/UserData'
import ReviewData from '../../data/ReviewData'

export default {
  name: 'ImageGrid',
  props: {
    ReviewData: Array,
    UserData: Array
  },
  data() {
    return {
      Review: ReviewData,
      UserInfo: UserData
    }
  },
  computed: {
    firstReview() {
      return this.Review[0]
    },
    lestReview() {
      let lestData = [...this.Review]
      lestData = lestData.splice(1).slice(0, 4)
      return lestData
    },
    userInfo() {
      return this.UserInfo[1]
    }
    // cafeLike() {
    //   let like = 0
    //   for (i = 0; i < this.UserInfo.length; i++) {
    //     if (this.UserInfo.user_cafe_likeit) {
    //       like += 1
    //     }
    //   }
    //   return 1
    // }
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
