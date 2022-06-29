<template>
  <q-page>
    <section class="column">
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
        <h4 class="q-mb-md text-primary keyword-title">커핑 노트 KEYWORD</h4>
        <p class="txt_keyword q-mb-xl keyword-des">
          키워드로 분류된 다양한 커핑 노트
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
              :title="cafe.cafe_name_pr"
              :distance="cafe.distance"
              :imgUrl="cafe.cafe_img"
            />
          </div>
        </div>

        <div class="q-my-xl">
          <btn-basic
            :dense="false"
            size="lg"
            to="map"
            color="secondary"
            label="지도 표시하기"
            icon="map"
            padding="5px 15px"
          />
        </div>
      </div>
    </section>
  </q-page>
</template>

<script>
import CardCafeMain from 'src/components/Card/CardCafeMain.vue'
import CarouselMainSlide from 'src/components/Carousel/CarouselMainSlide.vue'
import BtnMain from 'src/components/Button/BtnMain.vue'
import BtnBasic from 'src/components/Button/BtnBasic.vue'
import useFormatter from 'src/composables/useFormatter'
const { formatNumber } = useFormatter()
import useDistance from 'src/composables/useDistance'
const { getDistanceFromLatLng } = useDistance()
const MAX_TRY = 3
export default {
  name: 'MainPage',
  components: {
    CarouselMainSlide,
    CardCafeMain,
    BtnMain,
    BtnBasic
  },
  data() {
    return {
      keywords: null,
      currentLocation: null,
      distance: '0',
      cafes: [],
      try: 0
    }
  },
  computed: {
    locationSupported() {
      if ('geolocation' in navigator) return true
      return false
    }
  },
  created() {
    // Load Carousel
  },
  mounted() {
    // Load Keywords
    this.loadKeywords()

    // 내위치(위도,경도) 좌표 구하기
    if (this.locationSupported) {
      this.setCurrentLocation()
    }

    // Load Cafes Recommended 추천 카페
    this.loadCafes()
  },
  methods: {
    loadKeywords() {
      let apiUrl = `${process.env.API_LOCAL}/mainKeywords` // json-server
      // let apiUrl = `${process.env.API}/mainKeywords` // real-server

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
      // json-server
      let apiUrl = `${process.env.API_LOCAL}/mainCafes?_limit=3`

      this.$axios
        .get(apiUrl)
        .then((result) => {
          this.cafes = []
          for (let i = 0; i < result.data.length; i++) {
            let cafe = {
              ...result.data[i],
              distance: 0
            }

            this.cafes.push(cafe)
          }

          //console.log(result.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    handleClickKeyword(id) {
      console.log('keyword_id: ', id)
    },
    setCurrentLocation() {
      // this.locationLoading = true
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.currentLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            city: null
          }
          console.log('currentLocation: ', this.currentLocation)
          this.calculateDistance()
        },
        (err) => {
          if (this.try < MAX_TRY) {
            this.try++
            console.log('try again')
            this.setCurrentLocation()
          } else {
            this.locationError()
          }
        },
        { timeout: 1500 }
      )
    },
    calculateDistance() {
      this.cafes.forEach((cafe) => {
        let dist = getDistanceFromLatLng(
          this.currentLocation.lat,
          this.currentLocation.lng,
          cafe.cafe_latitude,
          cafe.cafe_longitude
        )
        console.log(dist)

        dist = parseInt(dist)

        cafe.distance = dist
      })
    },
    locationError() {
      console.log('현재 위치를 찾을 수 없습니다.')

      this.locationLoading = false
    }
  }
}
</script>
<style lang="scss" scope>
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
      transition: all 0.5s;
      &:hover {
        transform: scale(1.1);
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
