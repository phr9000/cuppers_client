<template>
  <q-page>
    <section class="column">
      <div class="q-pl-xl col">
        <h3 class="q-mb-lg main_tile">커피를<br />커피답게<br />커퍼스' ☕</h3>
        {{ currentLocation }}
      </div>
    </section>
    <!-- 3 -->
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
          <div class="card_wrap q-mr-md">
            <card-cafe-main
              title="커피리브레 연남점연남점연남점"
              :distance="distance"
              imgUrl="http://designcoffee.com/web/images/TAG/Round7/coffee%20libre_interview%20(3).jpg"
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
      cafes: []
    }
  },
  computed: {
    locationSupported() {
      if ('geolocation' in navigator) return true
      return false
    }
  },
  created() {
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
  mounted() {
    // 리브레 좌표
    const libre = {
      lat: 37.541501,
      lng: 127.1285397
    }
    if (this.locationSupported) {
      this.setCurrentLocation()
    }
    this.loadCafe()
  },
  methods: {
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
        },
        (err) => {
          this.locationError()
        },
        { timeout: 1500 }
      )
    },
    loadCafe() {
      // json-server
      let apiUrl = `${process.env.API_LOCAL}/cafeLocations?_limit=3`

      this.$axios
        .get(apiUrl)
        .then((result) => {
          // this.keywords = result.data
          console.log(result.data)
        })
        .catch((err) => {
          console.log(err)
        })
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
