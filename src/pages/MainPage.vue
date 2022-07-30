<template>
  <q-page>
    <section class="section_top column">
      <div class="q-pl-xl col">
        <h3 class="q-mb-lg main_tile">커피를<br />커피답게<br />커퍼스' ☕</h3>
      </div>
    </section>
    <!-- 1 -->
    <carousel-main-slide />

    <!-- 2 -->
    <section class="bottom_container text-center column constrain_md">
      <!-- 커핑 노트 KEYWORD -->
      <div class="title-area">
        <h4 class="q-mb-md text-primary keyword-title">CAFE KEYWORD</h4>
        <p class="txt_keyword q-mb-xl keyword-des">
          키워드로 내게 맞는 카페를 찾아보세요
        </p>
      </div>
      <section class="column keywords_container">
        <div class="row">
          <btn-main
            v-for="keyword in keywords"
            :key="keyword.keyword_id"
            :id="keyword.keyword_id"
            :keyword="keyword.keyword_name"
          />
        </div>
      </section>
    </section>

    <!-- 3 개발중 임시로 가장위 -->
    <section class="bg-grey-1">
      <div class="bottom_container text-center column constrain_md">
        <!-- 추천 카페 -->
        <div class="title-area">
          <h4 class="q-mb-md text-primary keyword-title">Today's CAFE</h4>
          <p class="txt_keyword q-mb-xl keyword-des">
            좋아할 만한 카페를 준비했어요
          </p>
        </div>
        <div class="recommends_container row q-mt-xl">
          <div
            v-for="cafe in cafes"
            :key="cafe.cafe_id"
            class="card_wrap q-mr-md"
          >
            <card-cafe-main
              :cafe_id="cafe.cafe_id"
              :title="cafe.cafe_name_pr"
              :distance="cafe.distance"
              :imgUrl="cafe.cafe_img"
            />
          </div>
        </div>

        <div class="q-my-xl">
          <btn-basic
            size="md"
            to="map"
            color="primary"
            label="지도에서 보기"
            icon="map"
            padding="6px 18px"
          />
        </div>
      </div>
    </section>
    <btn-scroll-top />
  </q-page>
</template>

<script>
import CardCafeMain from 'src/components/Card/CardCafeMain.vue'
import CarouselMainSlide from 'src/components/Carousel/CarouselMainSlide.vue'
import BtnMain from 'src/components/Button/BtnMain.vue'
import BtnBasic from 'src/components/Button/BtnBasic.vue'
import BtnScrollTop from 'src/components/Scroll/BtnScrollTop.vue'

// composables
// import useDistance from 'src/composables/useDistance'
// const { getDistanceFromLatLng } = useDistance()
import useFormatter from 'src/composables/useFormatter'
const { formatNumber } = useFormatter()

import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'MainPage',
  components: {
    CarouselMainSlide,
    CardCafeMain,
    BtnMain,
    BtnBasic,
    BtnScrollTop
  },
  setup() {
    const $store = useStore()

    const locState = computed({
      get: () => $store.state.map.loc,
      set: (val) => {
        $store.commit('map/setLoc', val)
      }
    })

    return {
      locState
    }
  },
  data() {
    return {
      keywords: null,
      currentLocation: null,
      cafes: [],
      try: 0
    }
  },
  created() {
    // Load Carousel
  },
  async mounted() {
    // Load Keywords
    this.loadKeywords()

    // Load Cafes Recommended 추천 카페
    if (this.locState) {
      this.loadCafes()
    } else {
      setTimeout(() => {
        this.loadCafes()
      }, 1000)
    }
  },
  methods: {
    loadKeywords() {
      let apiUrl = `${process.env.API}/keyword/landing` // real-server

      this.$axios
        .get(apiUrl)
        .then((result) => {
          this.keywords = result.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    loadCafes() {
      // json-server let apiUrl = `${process.env.API_LOCAL}/mainCafes?_limit=3`
      // real-server
      // 추천카페 backend api 가 생길때 까지 가까운 카페 3개 보여주도록
      let apiUrl = `${process.env.API}/cafe?search=&page=1&limit=3&sort=dist&order=a`
      if (this.locState) {
        apiUrl = `${apiUrl}&current_lat=${this.locState.lat}&current_long=${this.locState.lng}`
      } else {
        apiUrl = `${apiUrl}&current_lat=37.5415013&current_long=127.1285397`
      }
      console.log(apiUrl)

      this.$axios
        .get(apiUrl)
        .then((result) => {
          this.cafes = []
          for (let i = 0; i < result.data.arr.length; i++) {
            let cafe = {
              ...result.data.arr[i]
            }

            const dist = cafe.distance
            if (dist > 5) {
              cafe.distance = formatNumber(dist, '#,###')
            } else {
              cafe.distance = formatNumber(dist, '#,###.#')
            }

            this.cafes.push(cafe)
          }

          // if (this.locState) {
          //   this.currentLocation = this.locState
          //   this.calculateDistance()
          // }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    handleClickKeyword(id) {
      console.log('keyword_id: ', id)
    }
    // 현재위치 기준으로 각 카페의 거리 계산
    // calculateDistance() {
    //   console.log('calculateDistance')
    //   this.cafes.forEach((cafe) => {
    //     let dist = getDistanceFromLatLng(
    //       this.currentLocation.lat,
    //       this.currentLocation.lng,
    //       cafe.cafe_latitude,
    //       cafe.cafe_longitude
    //     )
    //     console.log(dist)

    //     dist = parseInt(dist)

    //     cafe.distance = dist
    //   })
    // },
  }
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
      transition: all 0.8s;
      &:hover {
        transform: translatey(-3px);
      }
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
  .title-area {
    .keyword-title {
      margin-bottom: 6px;
    }
    .keyword-des {
      font-size: 16px;
      color: #848484;
    }
  }
}
</style>
