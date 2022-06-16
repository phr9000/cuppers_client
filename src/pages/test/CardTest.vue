<template>
  <q-page class="q-pa-sm">
    <!-- card-review 리뷰카드 -->
    <div class="q-ma-xs q-pa-xs custom_test radius_border">
      <p>card-cnote 커핑노트카드</p>
      <div class="row">
        <div class="q-mr-sm" style="width: 500px"><card-cnote /></div>
        <div class="q-mr-sm" style="width: 400px">
          <card-cnote />
        </div>
        <div style="width: 300px"><card-cnote /></div>
      </div>
    </div>

    <!-- card-review 리뷰카드 -->
    <div class="q-ma-xs q-pa-xs custom_test radius_border">
      <p>card-review 리뷰카드</p>
      <div class="row">
        <div class="q-mr-sm" style="width: 500px"><card-review /></div>
        <div class="q-mr-sm" style="width: 400px">
          <card-review />
        </div>
        <div style="width: 300px"><card-review /></div>
      </div>
    </div>

    <!-- card-cafe-main 카페카드-메인 -->
    <div class="q-ma-xs q-pa-xs custom_test radius_border">
      <p>card-cafe-main 카페카드-메인</p>
      <div class="row">
        <div class="q-mr-sm" style="width: 500px"><card-cafe-main /></div>
        <div class="q-mr-sm" style="width: 400px">
          <card-cafe-main
            title="커피 앰비언스"
            distance="300m"
            caption="‘커피를 커피답게’ 10년차 큐그레이더가 운영하는 호주식 로스터리 카페. 한적한 주택가에 위치해 있으며, 카펜터, 아이리스, 헬로다크니스 등 3종의 자체 블렌딩을 비롯해 다양한 싱글오리진 원두 라인업을 갖추고 있다. 핸드드립 커피를 즐기는 이들에게 좋은 평을 받고 있다."
            imgUrl="https://blog.kakaocdn.net/dn/TRtov/btqviGyD7Xs/4YJRM8qw366Wr5TpVofhRk/img.png"
          />
        </div>
        <div style="width: 300px"><card-cafe-main /></div>
      </div>
    </div>
    <div class="q-ma-xs q-pa-xs custom_test radius_border">
      <p>card-sample</p>

      <div style="width: 500px"><card-sample /></div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import CardSample from 'src/components/Card/CardSample.vue'
import CardCafeMain from 'src/components/Card/CardCafeMain.vue'
import CardReview from 'src/components/Card/CardReview.vue'
import CardCnote from 'src/components/Card/CardCnote.vue'

export default defineComponent({
  components: { CardSample, CardCafeMain, CardReview, CardCnote },
  data() {
    return {}
  }
})
</script>
