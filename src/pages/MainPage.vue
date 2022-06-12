<template>
  <q-page>
    <section class="column">
      <div class="q-pl-xl col">
        <h3 class="q-mb-lg">따뜻한<br />커피 한 잔이<br />좋다☕</h3>
      </div>
    </section>
    <c-note-carousel />
    <section class="bottom_container text-center column constrain_more">
      <!-- 커핑 노트 KEYWORD -->
      <div>
        <h4 class="q-mb-md text-primary">커핑 노트 KEYWORD</h4>
        <p class="txt_keyword q-mb-xl">키워드로 분류된 다양한 커핑 노트</p>
      </div>
      <section class="column keywords_container">
        <div class="row">
          <btn-main
            v-for="keyword in keywords"
            :key="keyword.id"
            :id="keyword.id"
            :keyword="keyword.keyword"
          />
        </div>
      </section>
    </section>
    <section class="bg-grey-1">
      <div class="bottom_container text-center column constrain_more">
        <!-- 추천 카페 -->
        <div>
          <h4 class="q-mb-none text-primary">당신을 위한 추천카페</h4>
        </div>
        <div class="recommends_container row q-mt-xl">
          <div class="card_wrap q-mr-md">
            <card-cafe-main
              title="커피리브레 연남점연남점연남점"
              distance="3.4km"
              imgUrl="http://designcoffee.com/web/images/TAG/Round7/coffee%20libre_interview%20(3).jpg"
            />
          </div>
          <div class="card_wrap q-mr-md">
            <card-cafe-main
              title="커피 앰비언스"
              distance="300m"
              caption="‘커피를 커피답게’ 10년차 큐그레이더가 운영하는 호주식 로스터리 카페. 한적한 주택가에 위치해 있으며, 카펜터, 아이리스, 헬로다크니스 등 3종의 자체 블렌딩을 비롯해 다양한 싱글오리진 원두 라인업을 갖추고 있다. 핸드드립 커피를 즐기는 이들에게 좋은 평을 받고 있다."
              imgUrl="https://blog.kakaocdn.net/dn/TRtov/btqviGyD7Xs/4YJRM8qw366Wr5TpVofhRk/img.png"
            />
          </div>
          <div class="card_wrap q-mr-md"><card-cafe-main /></div>
        </div>

        <div class="q-my-xl">
          <q-btn
            to="map"
            color="primary"
            label="지도 표시하기"
            icon="map"
          ></q-btn>
        </div>
      </div>
    </section>
  </q-page>
</template>

<script>
import cafeKeywordsData from '../data/cafeKeywordsData'

import CardCafeMain from 'src/components/Card/CardCafeMain.vue'
import CNoteCarousel from 'src/components/Carousel/CNoteCarousel.vue'
import BtnMain from 'src/components/Button/BtnMain.vue'

export default {
  name: 'MainPage',
  components: {
    CNoteCarousel,
    BtnMain,
    CardCafeMain
  },
  data() {
    return {
      keywords: cafeKeywordsData
    }
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
.bottom_container {
  padding: 100px 16px;
  width: 945px;
  @media (max-width: 977px) {
    width: 717px;
  }
  @media (max-width: 749px) {
    width: 489px;
  }
  .keywords_container {
    border-collapse: collapse;
    border-right: 1px solid #eee;
    border-top: 1px solid #eee;
    margin: 0 auto;
  }
  .recommends_container {
    .card_wrap {
      width: 293px;
      &:nth-child(3n) {
        margin-right: 0;
      }
      @media (max-width: 977px) {
        width: 217px;
        margin-bottom: 1rem;
      }
      @media (max-width: 749px) {
        width: 220px;
        &:nth-child(2n) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
