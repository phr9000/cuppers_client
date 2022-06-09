<template>
  <div class="map_wrap">
    <!-- 지도가 표시되는 div -->
    <div id="map"></div>

    <!-- 왼쪽 nav -->
    <div class="map_nav">
      <q-toolbar class="map_nav_toolbar bg-secondary rounded-borders">
        <q-btn round dense flat icon="menu" class="q-mr-xs" />

        <q-space />

        <q-input
          @keyup.enter="doSearch"
          v-model="search"
          dense
          placeholder="키워드 / 지역으로 검색"
          class=""
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
          <template v-slot:append>
            <q-btn @click="doSearch" round dense flat icon="search" />
          </template>
        </q-input>
      </q-toolbar>
    </div>

    <!-- 지도 확대, 축소 컨트롤 div -->
    <div class="custom_zoomcontrol radius_border">
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
    <q-btn
      class="custom_current_location"
      v-if="locationSupported"
      :loading="locationLoading"
      round
      color="secondary"
      @click="setCurrentLocation"
      icon="my_location"
    />
  </div>
  <div class="q-ma-xs q-pa-xs custom_test radius_border">
    현재 위치 가져오기

    <q-btn
      v-if="locationSupported"
      :loading="locationLoading"
      round
      color="secondary"
      @click="setCurrentLocation"
      icon="my_location"
    />

    <q-btn
      v-if="locationSupported"
      :loading="locationLoading"
      color="secondary"
      @click="setCurrentLocation"
      label="현재 위치 가져오기"
    />
    현재위치: {{ currentLocation }}
  </div>

  <!-- 검색 테스트 -->
  <div class="q-ma-xs q-pa-xs custom_test radius_border">
    검색:

    <q-toolbar class="bg-secondary text-white rounded-borders">
      <q-btn round dense flat icon="menu" class="q-mr-xs" />

      <q-space />

      <q-input
        @keyup.enter="doSearch"
        v-model="search"
        dense
        text-color="white"
        placeholder="키워드 / 지역으로 검색"
      >
        <template v-slot:prepend>
          <q-icon name="search" />
        </template>
        <template v-slot:append>
          <q-btn @click="doSearch" round dense flat icon="search" />
        </template>
      </q-input>
    </q-toolbar>

    <div>
      <q-badge color="teal">Model: "{{ search }}"</q-badge>
    </div>

    검색하세요
    <q-input
      @keyup.enter="doSearch"
      v-model="search"
      dense
      placeholder="Search"
      hint="키워드 / 지역으로 검색하세요"
    >
      <template v-slot:prepend>
        <q-icon name="search" />
      </template>
      <template v-slot:append>
        <q-btn @click="doSearch" round dense flat icon="search" />
      </template>
    </q-input>
  </div>

  <!-- 검색 결과 표시 -->
  <div class="q-ma-xs q-pa-xs custom_test radius_border">
    <!-- <q-card v-for="cafe in cafes" :key="cafe.cafe_id" class="my-card">
      <img src="https://cdn.quasar.dev/img/mountains.jpg" />

      <q-card-section>
        <div class="text-h6">Our Changing Planet</div>
        <div class="text-subtitle2">by John Doe</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        {{ lorem }}
      </q-card-section>
    </q-card> -->
    <div v-for="cafe in cafes" :key="cafe.cafe_id">{{ cafe.name_kr }}</div>
  </div>
</template>

<script>
import CafeData from 'src/data/CafeData.json'
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      cafesRaw: [], // 현재 불러온 전체 카페 리스트
      cafes: [], // 필터링된 카페 리스트
      map: null,
      currentLocation: null,
      locationLoading: false,
      search: ''
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
    doSearch() {
      if (this.search === '') {
        console.log('검색어를 입력하세요')
        return
      }
      console.log('doSearch: ', this.search)

      // cafeData로 부터 검색
      this.cafes = this.cafesRaw.filter((cafe) => {
        return cafe['cafe_region'] === this.search
      })

      // console.log(this.cafes)
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
    },
    showCafesMarker() {
      // 지도에 여러개 마커 표시
      for (let i = 0; i < this.cafes.length; i++) {
        // 마커를 생성합니다
        const marker = new kakao.maps.Marker({
          map: this.map, // 마커를 표시할 지도
          position: this.cafes[i].latlng // 마커를 표시할 위치
        })
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

      this.cafesRaw = []
      for (let i = 0; i < CafeData.length; i++) {
        const cafe = {
          ...CafeData[i],
          latlng: new kakao.maps.LatLng(
            CafeData[i].cafe_latitude,
            CafeData[i].cafe_longitude
          )
        }

        this.cafesRaw.push(cafe)
      }
      // console.log(this.cafesRaw)
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
        { timeout: 3000 }
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
    }
  }
})
</script>

<style lang="scss">
.map_wrap {
  position: relative;
  overflow: hidden;
  // width: calc(100%-300px);
  height: 350px;
}
#map {
  width: calc(100%-300px);
  height: 400px;
}

.map_nav {
  position: relative;
  left: 0;
  top: 0;
  width: 300px;
  height: 100%;
  background: white;
  z-index: 1;
}
.map_nav_toolbar {
  color: $red-1;
  border-radius: 0;
}
.custom_current_location {
  position: absolute;
  bottom: 15px;
  right: 15px;
  z-index: 1;
}
.custom_zoomcontrol {
  position: absolute;
  top: 15px;
  right: 15px;
  width: 36px;
  height: 80px;
  overflow: hidden;
  z-index: 1;
  background-color: #f5f5f5;
}
.custom_zoomcontrol span {
  display: block;
  width: 36px;
  height: 40px;
  text-align: center;
  cursor: pointer;
}
.custom_zoomcontrol span img {
  width: 15px;
  height: 15px;
  margin-top: 11px;
  border: none;
}
.custom_zoomcontrol span:first-child {
  border-bottom: 1px solid #bfbfbf;
}
// .my-card {
//   width: 100%;
//   max-width: 250px;
// }
</style>
