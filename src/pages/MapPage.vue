<template>
  <div>
    <div class="map_wrap">
      <!-- 지도가 표시되는 div -->
      <div id="map"></div>

      <!-- 왼쪽 drawer -->
      <q-drawer v-model="drawerOpen" show-if-above bordered>
        <!-- tab -->
        <q-tabs v-model="tab" inline-label class="shadow-2">
          <q-tab name="search" icon="search" label="검색" />
          <q-tab name="mylist" icon="list" label="내목록" />
        </q-tabs>

        <!-- tab1: map-search -->
        <q-list v-show="tab === 'search'">
          <q-input
            @keyup.enter="doSearch"
            v-model="search"
            dense
            placeholder="키워드 / 지역으로 검색"
            class="q-mx-auto q-my-sm text-grey-5"
            style="width: 90%"
            hint="키워드 / 지역으로 검색하세요"
          >
            <template v-slot:prepend>
              <q-btn @click="doSearch" round dense flat icon="search" />
            </template>
          </q-input>
          <!-- <q-space />
          <q-btn round dense flat icon="menu" class="q-mr-xs" /> -->
          <!-- 검색 결과 표시 -->
          <div class="q-ma-xs q-pa-xs custom_test radius_border">
            <div v-for="cafe in cafes" :key="cafe.cafe_id">
              {{ cafe.cafe_name_pr }}
            </div>
          </div>
        </q-list>

        <!-- tab2: map-my-list -->
        <q-list v-show="tab === 'mylist'">
          <q-item-label header> 마이리스트 </q-item-label>
        </q-list>
      </q-drawer>

      <!-- 지도 확대, 축소 컨트롤 div -->
      <div class="zoom_control radius_border">
        <span @click="zoomIn"
          ><img
            src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_plus.png"
            alt="확대"
        /></span>
        <span @click="zoomOut"
          ><img
            src="https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/ico_minus.png"
            alt="축소"
        /></span>
      </div>

      <!-- current location - 현재 위치 버튼 -->
      <btn-icon
        @click="setCurrentLocation"
        class="btn_current_location"
        icon="my_location"
      />

      <!-- 마커 클릭시 표시되는 인포 윈도우 -->
      <section v-if="targetCafe" class="info_window_wrap">
        <card-cafe-map
          @close="hideCard"
          :title="targetCafe.cafe_name_pr"
          :caption="targetCafe.cafe_description"
        />
      </section>
    </div>

    <!-- 테스트 영역 -->
    <section>
      <div class="q-ma-xs q-pa-xs custom_test radius_border">
        현재위치: {{ currentLocation }}
      </div>
      <div class="q-ma-xs q-pa-xs custom_test radius_border">
        <btn-basic
          @click="searchTest('송파')"
          color="secondary"
          label="송파 검색"
        />
        <btn-basic
          @click="searchTest('강동')"
          color="secondary"
          label="강동 검색"
        />
        <btn-basic
          @click="clearAllMarkers"
          color="warning"
          label="모든 마커 삭제"
        />
        <btn-basic
          @click="clickMarker(1)"
          color="primary"
          label="마커 클릭/다시 클릭"
        />
      </div>

      <!-- 검색 결과 표시 -->
      <div class="q-ma-xs q-pa-xs custom_test radius_border">
        검색 결과 표시
        <q-separator />
        <div v-for="cafe in cafes" :key="cafe.cafe_id">
          {{ cafe.cafe_name_pr }}
        </div>
      </div>
      <!-- 클릭한 카페 -->
      <div
        v-if="targetCafe && showCard"
        class="q-ma-xs q-pa-xs custom_test radius_border"
      >
        targetCafe
        <q-separator />
        {{ targetCafe.cafe_name_pr }}
      </div>
    </section>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import CafeData from 'src/data/CafeData.json'
import BtnBasic from 'src/components/Button/BtnBasic.vue'
import BtnIcon from 'src/components/Button/BtnIcon.vue'
import CardCafeMap from 'src/components/Card/CardCafeMap.vue'

export default defineComponent({
  name: 'MapPage',
  components: {
    BtnBasic,
    BtnIcon,
    CardCafeMap
  },
  data() {
    return {
      cafesRaw: null, // 현재 불러온 전체 카페 리스트
      cafes: [
        {
          cafe_id: 1,
          cafe_name_pr: '커피앰비언스',
          cafe_name_sc: '',
          cafe_region: '송파',
          cafe_address: '서울 송파구 송이로17길 51',
          cafe_latitude: 37.5015764,
          cafe_longitude: 127.124833,
          cafe_phone: '02-449-9967',
          cafe_description:
            '‘커피를 커피답게’ 10년차 큐그레이더가 운영하는 호주식 로스터리 카페#한적한 주택가에 위치해 있으며, 카펜터, 아이리스, 헬로다크니스 등 3종의 자체 블렌딩을 비롯해 다양한 싱글오리진 원두 라인업을 갖추고 있다. 핸드드립 커피를 즐기는 이들에게 좋은 평을 받고 있다.'
          //latlng: new kakao.maps.LatLng(37.5015764, 127.124833)
        }
      ], // 필터링된 카페 리스트
      map: null,
      currentLocation: null,
      locationLoading: false,
      search: '',
      drawerOpen: true,
      tab: 'search', // 'search', 'mylist',
      searching: false,
      targetCafe: null,
      showCard: false
    }
  },
  computed: {
    locationSupported() {
      if ('geolocation' in navigator) return true
      return false
    }
  },
  mounted() {
    //console.log(process.env.KAKAO_API)

    if (!window.kakao || !window.kakao.maps) {
      const script = document.createElement('script')
      // 동적 로딩을 위해서 autoload=false 추가
      script.src = `http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.KAKAO_API}`

      script.addEventListener('load', () => {
        // console.log('loaded', kakao)
        kakao.maps.load(this.initMap)
      })
      document.head.appendChild(script)
    } else {
      console.log('이미 로딩 됨')
      this.initMap()
    }
  },
  methods: {
    hideCard() {
      console.log('hide')
      this.showCard = flase
    },
    clearTarget() {
      console.log('clearTarget')
      if (this.targetCafe) {
        this.targetCafe = null
        this.showCard = flase
      }
    },
    clickMarker(cafeId) {
      if (this.targetCafe) {
        this.targetCafe = null
      } else {
        const find = this.cafes.filter((cafe) => {
          return cafe['cafe_id'] === cafeId
        })[0]
        console.log(find)
        this.targetCafe = { ...find }
        console.log(this.targetCafe)
      }
    },
    clearAllMarkers() {
      // 모든 마커를 삭제
      console.log('모든 마커를 삭제')
      for (let i = 0; i < this.cafes.length; i++) {
        this.cafes[i].marker.setMap(null)
      }
    },
    searchTest(search) {
      this.search = search
      this.doSearch()
    },
    doSearch() {
      if (this.cafes.length > 0) {
        // 모든 마커를 삭제
        this.clearAllMarkers()
      }
      if (this.search === '') {
        console.log('검색어를 입력하세요')
        return
      }
      if (this.searching === true) {
        return
      }
      this.searching = true
      console.log('doSearch: ', this.search)

      // cafeData로 부터 검색
      this.cafes = this.cafesRaw.filter((cafe) => {
        return cafe['cafe_region'] === this.search
      })

      console.log(this.cafes)
      if (this.cafes.length < 1) {
        console.log('검색 결과가 없습니다')
        this.$q.dialog({
          title: 'Error',
          message: '검색 결과가 없습니다.'
        })
      } else {
        this.showCafesMarker()
        this.setCafesBounds()
      }
      this.searching = false
    },
    showCafesMarker() {
      // 지도에 여러개 마커 표시
      for (let i = 0; i < this.cafes.length; i++) {
        // 마커를 생성합니다
        const marker = new kakao.maps.Marker({
          map: this.map, // 마커를 표시할 지도
          position: this.cafes[i].latlng // 마커를 표시할 위치
        })
        this.cafes[i].marker = marker

        marker.setMap(this.map)
      }
      // 지도에 여러개 마커 표시
    },
    setCafesBounds() {
      // 지도 범위 재설정 하기
      // 지도를 재설정할 범위정보를 가지고 있을 LatLngBounds 객체를 생성합니다
      var bounds = new kakao.maps.LatLngBounds()
      for (let i = 0; i < this.cafes.length; i++) {
        // LatLngBounds 객체에 좌표를 추가합니다
        bounds.extend(this.cafes[i].latlng)
      }
      this.map.setBounds(bounds)
      // 지도 범위 재설정 하기
    },
    initMap() {
      const container = document.getElementById('map')
      const options = {
        center: new kakao.maps.LatLng(37.501523, 127.1248332, 16), // 커피 앰비언스 16?
        level: 5 // 지도의 확대 레벨 (클수록 확대)
      }

      this.map = new kakao.maps.Map(container, options) // 지도를 생성합니다

      // 지도를 생성한 이후 작업들
      this.loadData()

      // 테스트 cafes[0]에 앰비언스 마커 표시
      console.log(this.cafes[0])
      const latlng = new kakao.maps.LatLng(37.5015764, 127.124833)
      this.cafes[0] = {
        ...this.cafes[0],
        latlng: latlng,
        marker: new kakao.maps.Marker({
          map: this.map, // 마커를 표시할 지도
          position: latlng
        })
      }
      console.log(this.cafes[0])
    },
    loadData() {
      this.cafesRaw = []
      for (let i = 0; i < CafeData.length; i++) {
        const cafe = {
          ...CafeData[i],
          latlng: new kakao.maps.LatLng(
            CafeData[i]['cafe_latitude'],
            CafeData[i]['cafe_longitude']
          ),
          marker: null
        }

        this.cafesRaw.push(cafe)
      }
      console.log(this.cafesRaw)
    },
    zoomIn() {
      this.map.setLevel(this.map.getLevel() - 1, { animate: true })
    },
    zoomOut() {
      this.map.setLevel(this.map.getLevel() + 1, { animate: true })
    },
    setCurrentLocation() {
      this.locationLoading = true
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.currentLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            city: null
          }
          // 현재 위치로 지도 이동
          this.panTo(this.currentLocation.lat, this.currentLocation.lng)

          // 동네(city) 얻어오기
          this.getCityAndCountry(position)
        },
        (err) => {
          this.locationError()
        },
        { timeout: 1500 }
      )
    },
    getCityAndCountry(position) {
      let apiUrl = `https://geocode.xyz/${position.coords.latitude},${position.coords.longitude}?json=1`
      this.$axios
        .get(apiUrl)
        .then((result) => {
          this.locationSuccess(result)
        })
        .catch((err) => {
          this.locationError()
        })
    },
    locationError() {
      //console.log('위치를 찾을 수 없습니다.')
      this.$q.dialog({
        title: 'Error',
        message: '위치를 찾을 수 없습니다. 잠시후 다시 시도해 주세요.'
      })
      this.locationLoading = false
    },
    locationSuccess(result) {
      this.currentLocation.city = result.data.city
      // console.log(result.data.city)
      console.log(result.data.country)
      this.locationLoading = false
    },
    panTo(lat, lng) {
      // 이동할 위도 경도 위치를 생성합니다
      const moveLatLon = new kakao.maps.LatLng(lat, lng)

      // 지도 중심을 부드럽게 이동시킵니다
      // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
      this.map.panTo(moveLatLon)
    },
    toggleDrawer() {
      this.drawerOpen = !this.drawerOpen
    }
  }
})
</script>

<style lang="scss">
.map_wrap {
  position: relative;
  overflow: hidden;
  // width: calc(100%-300px);
  height: 500px;

  #map {
    width: calc(100%-300px);
    height: 500px;
  }

  .zoom_control {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 36px;
    height: 80px;
    overflow: hidden;
    z-index: 1;
    background-color: #f5f5f5;

    span {
      display: block;
      width: 36px;
      height: 40px;
      text-align: center;
      cursor: pointer;
    }
    span img {
      width: 15px;
      height: 15px;
      margin-top: 11px;
      border: none;
    }
    span:first-child {
      border-bottom: 1px solid #bfbfbf;
    }
  }

  .btn_current_location {
    position: absolute;
    bottom: 15px;
    right: 15px;
    z-index: 1;
  }

  .info_window_wrap {
    position: absolute;
    top: 15px;
    left: 15px;
    width: 240px;
    z-index: 1;
  }
}
</style>
