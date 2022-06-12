<template>
  <div container>
    <div class="row">
      <div view="lhh LpR lff" class="q-mt-xl col-6">
        <div class="q-pl-md info">
          <h6 class="title" style="font-weight: 600">기본정보</h6>
          <div class="body">
            <badge-cafe-tag :cafeKeywordsData="cafeKeywordsData" />
            <!-- 카페 주소 -->
            <div>
              <p>
                <q-icon size="xs" name="room" class="q-pr-xs" />
                {{ cafeData[0].cafe_address }}
              </p>
            </div>
            <!-- 카페 영업시간 -->
            <div>
              <span>
                <q-icon size="xs" name="alarm" class="q-pr-sm" />
                {{ cafeData[0].cafe_weekday }} |
                {{ cafeData[0].cafe_weekend }} |
                {{ cafeData[0].cafe_dayoff }}
              </span>
            </div>
            <!-- 카페 연락처(전화번호, 홈페이지, 인스타그램) -->
            <div>
              <div class="q-mt-sm">
                <q-icon size="xs" name="call" class="q-pr-sm" />{{
                  cafeData[0].cafe_phone
                }}
              </div>
              <div class="q-mt-sm">
                <q-icon size="xs" name="language" class="q-pr-sm" /><a
                  href=""
                  >{{ cafeData[0].cafe_web }}</a
                >
              </div>
              <div class="q-mt-sm">
                <q-icon size="xs" name="instagram" class="q-pr-sm" /><a
                  href=""
                  >{{ cafeData[0].cafe_insta }}</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div view="lhh LpR lff" class="q-mt-xl col-6 wow">
        <q-card class="my-card" flat bordered>
          <q-card-section horizontal>
            <q-card-section class="q-pt-sm">
              <q-avatar>
                <img :src="userData[0]['user_thumbnail_url']" alt="" />
              </q-avatar>
              <div class="text-overline">{{ reviewData[0].user_name }}</div>
              <div class="text q-mt-sm q-mb-xs">
                {{ reviewData[0].review_drink }}
              </div>
              <div class="text-caption text-grey">
                {{ reviewData[0].review_description }}
              </div>
            </q-card-section>
            <q-card-section class="col-5 flex flex-center">
              <q-img :src="reviewData[0].review_thumbnail" />
            </q-card-section>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
// Components
import BadgeCafeTag from '../Badge/BadgeCafeTag.vue'

export default {
  name: 'CafeInformation',
  props: {
    cafeData: Array,
    cafeKeywordsData: Array,
    reviewData: Array,
    userData: Array
  },
  components: {
    BadgeCafeTag
  }
}
</script>
<style lang="scss" scoped>
a:link {
  color: #000;
  text-decoration: none;
}
.info {
  padding-left: 10px;
  .title {
    margin: 0;
  }
  .body {
    padding-left: 20px;
  }
}
</style>
