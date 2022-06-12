<template>
  <div container>
    <div class="row">
      <div view="lhh LpR lff" class="q-mt-xl col-6">
        <div class="q-pl-md info">
          <h5 class="title">기본정보</h5>
          <div class="body">
            <badge-cafe-tag :CafeKeywordsData="CafeKeywordsData" />
            <!-- 카페 주소 -->
            <div>
              <p>{{ CafeData[0].cafe_address }}</p>
            </div>
            <!-- 카페 영업시간 -->
            <div>
              <span>
                {{ CafeData[0].cafe_weekday }} |
                {{ CafeData[0].cafe_weekend }} |
                {{ CafeData[0].cafe_dayoff }}
              </span>
            </div>
            <!-- 카페 연락처(전화번호, 홈페이지, 인스타그램) -->
            <div>
              <p>{{ CafeData[0].cafe_phone }}</p>
              <a href="">{{ CafeData[0].cafe_web }}</a>
              <br />
              <a href="">{{ CafeData[0].cafe_insta }}</a>
            </div>
          </div>
        </div>
      </div>
      <div view="lhh LpR lff" class="q-mt-xl col-6 wow">
        <div class="q-pl-md">리뷰</div>
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
    CafeData: Array,
    CafeKeywordsData: Array
  },
  components: {
    BadgeCafeTag
  }
}
</script>
<style lang="scss" scoped>
.info {
  background-color: antiquewhite;
  padding-left: 10px;
  .title {
    margin: 0;
  }
  .body {
    padding-left: 20px;
  }
}
.wow {
  background-color: bisque;
}
</style>
