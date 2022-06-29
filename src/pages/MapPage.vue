<template>
  <div>
    <div class="map_wrap">
      <!-- 지도가 표시되는 div -->
      <div id="map"></div>

      <!-- 왼쪽 drawer -->
      <q-drawer :width="382" v-model="drawerOpen" show-if-above bordered>
        <!-- tab -->
        <q-tabs v-model="tab" inline-label class="shadow-2">
          <q-tab name="search" icon="search" label="검색" />
          <q-tab name="mylist" icon="list" label="내목록" />
        </q-tabs>

        <!-- tab1: map-search -->
        <q-list v-show="tab === 'search'" class="column q-py-sm">
          <q-checkbox
            label="현 지도 내 검색"
            v-model="searchInMap"
            class="q-pr-sm text-grey-6"
            left-label
            color="secondary"
            size="sm"
          />
          <!-- 검색창 -->
          <q-input
            @keyup.enter="handleClickSearch"
            v-model="search"
            dense
            placeholder="키워드 / 지역으로 검색"
            class="text-center text-grey-5 q-px-md"
            style="width: 100%"
            hint="키워드 / 지역으로 검색하세요"
          >
            <template v-slot:prepend>
              <q-btn
                @click="handleClickSearch"
                round
                dense
                flat
                icon="search"
              />
            </template>
          </q-input>
          <div class="row q-px-md q-pt-sm">
            <btn-basic
              @click="handleClickSearch('*')"
              color="secondary"
              label="전체"
            />
            <btn-basic
              @click="handleClickSearch('송파')"
              color="secondary"
              label="송파"
            />
            <btn-basic
              @click="handleClickSearch('강동')"
              color="secondary"
              label="강동"
            />
          </div>

          <!-- 검색 결과 표시 (카페 카드) -->
          <div v-if="cafes.length > 0" class="q-my-sm">
            <div v-for="cafe in cafes" :key="cafe.cafe_id">
              <card-cafe-small
                :cafe="cafe"
                :keywords="cafe.keywords"
                :today="cafe.today"
                @click="setTarget(cafe.cafe_id)"
              />
            </div>
          </div>
          <div v-else class="q-my-lg text-grey flex flex-center">
            <p>검색된 카페가 없습니다.</p>
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
      <section v-if="targetCafe" class="target_cafe_wrap">
        <card-cafe-map
          @close="clearTarget"
          :cafe="targetCafe"
          :keywords="targetCafe.keywords"
          :today="targetCafe.today"
        />
      </section>

      <!-- 현재위치에서 재검색 -->
      <!-- <div style="">카페이름</div> -->
      <btn-basic
        @click="researchInCurrentPosition"
        class="btn_search_current"
        :class="{ fade: researchBtnFade }"
        :outline="true"
        :flat="false"
        size="lg"
        to="map"
        color="primary"
        label="현재위치에서 재검색"
        icon="map"
        padding="4px 18px"
      />
    </div>

    <!-- 테스트 영역 -->
    <section v-if="true">
      <div class="q-ma-xs q-pa-xs custom_test radius_border">
        level: {{ mapLevel }} lastSearchPosition: {{ lastSearchPosition }}
        <br />
        distance: {{ distance }}
        <br />
        distance(보정치): {{ distest }}
      </div>
      <div v-html="boundMsg"></div>
      <div class="q-ma-xs q-pa-xs custom_test radius_border">
        현재위치: {{ currentLocation }}
      </div>

      <!-- 검색 결과 표시 테스트 -->
      <div class="q-ma-xs q-pa-xs custom_test radius_border">
        검색 결과 표시 테스트
        <q-separator />

        <div v-for="cafe in cafes" :key="cafe.cafe_id">
          {{ cafe.cafe_name_pr }}
        </div>
      </div>
      <!-- 클릭한 카페 테스트 -->
      <div v-if="targetCafe" class="q-ma-xs q-pa-xs custom_test radius_border">
        targetCafe
        <q-separator />
        {{ targetCafe.cafe_name_pr }}
      </div>
    </section>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import BtnBasic from 'src/components/Button/BtnBasic.vue'
import BtnIcon from 'src/components/Button/BtnIcon.vue'
import CardCafeMap from 'src/components/Card/CardCafeMap.vue'
import CardCafeSmall from 'src/components/Card/CardCafeSmall.vue'

export default defineComponent({
  name: 'MapPage',
  components: {
    BtnBasic,
    BtnIcon,
    CardCafeMap,
    CardCafeSmall
  },
  data() {
    return {
      cafesRaw: null, // 현재 불러온 전체 카페 리스트
      cafes: [
        // {
        //   cafe_id: 1,
        //   cafe_name_pr: '커피앰비언스',
        //   cafe_name_sc: '',
        //   cafe_region: '송파',
        //   cafe_address: '서울 송파구 송이로17길 51',
        //   cafe_latitude: 37.5015764,
        //   cafe_longitude: 127.124833,
        //   cafe_phone: '02-449-9967',
        //   cafe_description:
        //     '‘커피를 커피답게’ 10년차 큐그레이더가 운영하는 호주식 로스터리 카페#한적한 주택가에 위치해 있으며, 카펜터, 아이리스, 헬로다크니스 등 3종의 자체 블렌딩을 비롯해 다양한 싱글오리진 원두 라인업을 갖추고 있다. 핸드드립 커피를 즐기는 이들에게 좋은 평을 받고 있다.'
        //   //latlng: new kakao.maps.LatLng(37.5015764, 127.124833)
        // }
      ], // 필터링된 카페 리스트
      map: null, // 카카오맵 인스턴스
      currentLocation: null,
      locationLoading: false,
      search: '',
      drawerOpen: false,
      tab: 'search', // 'search', 'mylist',
      searching: false,
      searchInMap: false, // 현지도 내 검색 체크박스
      targetCafe: null,
      researchBtnFade: true,
      mapLevel: null,
      lastSearchPosition: null,
      distance: 0,
      boundMsg: '', // 현재바운드정보 테스트출력
      distest: 0, // distance 보정치 테스트출력
      normalImage: null,
      clickImage: null
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
    initMap() {
      const container = document.getElementById('map')
      const options = {
        center: new kakao.maps.LatLng(37.501523, 127.1248332, 16), // 커피 앰비언스 16?
        level: 5 // 지도의 확대 레벨 (클수록 확대)
      }

      this.map = new kakao.maps.Map(container, options) // 지도를 생성합니다

      // 지도가 이동, 확대, 축소로 인해 지도영역이 변경되면 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다
      kakao.maps.event.addListener(this.map, 'bounds_changed', () => {
        this.handeBoundsChanged()
      })

      // 지도를 생성한 이후 작업들
      const imageSrc = '/public/icons/marker.png' // 마커이미지의 주소입니다
      const imageSrcClick = '/public/icons/marker_active.png' // 마커이미지의 주소입니다
      const imageSize = new kakao.maps.Size(34, 44) // 마커이미지의 크기입니다
      const imageOption = { offset: new kakao.maps.Point(17, 44) } // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의
      this.normalImage = this.createMarkerImage(
        imageSrc,
        imageSize,
        imageOption
      )
      this.clickImage = this.createMarkerImage(
        imageSrcClick,
        imageSize,
        imageOption
      )

      // 테스트
      // this.loadRawData()
      // this.test()
      // 앰비언스 검색 테스트
      // this.doSearch('앰비언스')
      // 테스트 끝
    },
    // 지도 위치 변경될때마다 호출되는 콜백
    handeBoundsChanged() {
      if (this.searching) {
        return
      }
      // console.log('bounds_changed')
      // if (this.researchBtnFade) {
      //   this.researchBtnFade = false
      // }
      if (this.lastSearchPosition === null) {
        return
      }
      this.mapLevel = this.map.getLevel()

      const centerNow = this.map.getCenter()

      // 마지막 검색 중심지점과 현지도 중심지도 사이의 거리
      this.distance = Math.sqrt(
        Math.pow(centerNow.La - this.lastSearchPosition.La, 2) +
          Math.pow(centerNow.Ma - this.lastSearchPosition.Ma, 2)
      )
      const dist_correction =
        (280 * (14 - this.mapLevel) * this.distance) /
        Math.pow(this.mapLevel, 2)
      this.distest = dist_correction
      // distance가 특정 수치 이상이고 현재 fade상태이면
      // fade 해제하고 버튼 보여줌
      if (dist_correction > 1) {
        this.researchBtnFade = false
      }
    },
    // 검색 버튼 클릭, 또는 enter
    handleClickSearch(search) {
      // console.log(typeof search)
      if (typeof search == 'string') {
        this.search = search
      } else if (this.search === '') {
        console.log('검색어를 입력하세요')
        this.$q.dialog({
          title: 'Error',
          message: '검색어를 입력하세요.'
        })
        return
      }

      if (this.searching === true) {
        return
      }

      // console.log('handleClickSearch: ', this.search)
      if (this.cafes.length > 0) {
        // 모든 마커를 삭제
        this.clearAllMarkers()
      }

      let bounds = null
      if (this.searchInMap) {
        // 현지도 바운더리 정보 가져오기
        bounds = this.getBounds()
      }
      this.doSearch(this.search, bounds)
    },
    doSearch(search, bounds) {
      this.searching = true

      // 초기화
      this.distance = 0
      this.distest = 0
      // 재검색 버튼 숨기기
      this.researchBtnFade = true

      // 테스트 중심좌표 저장
      this.lastSearchPosition = this.map.getCenter()

      this.clearAllMarkers()

      // json-server
      let apiUrl = `${process.env.API_LOCAL}/cafeLocations`
      if (search !== '*') {
        apiUrl += `?cafe_name_pr_like=${search}`
      } else {
        search = ''
      }
      // json-server

      // real-server
      // let apiUrl = `${process.env.API}/????`
      // real-server

      if (this.search !== search) {
        this.search = search
      }

      this.$axios
        .get(apiUrl)
        .then((result) => {
          this.cafes = []
          for (let i = 0; i < result.data.length; i++) {
            const cf = result.data[i]

            // bounds가 있다면 bounds안에 안들어오면 skip
            if (bounds) {
              if (
                cf['cafe_latitude'] < bounds.lat_min ||
                cf['cafe_latitude'] > bounds.lat_max ||
                cf['cafe_longitude'] < bounds.long_min ||
                cf['cafe_longitude'] > bounds.long_max
              ) {
                continue
              }
            }

            let cafe = {
              ...cf,
              latlng: new kakao.maps.LatLng(
                cf['cafe_latitude'],
                cf['cafe_longitude']
              ),
              marker: null
            }

            if (cf.opTime) {
              cafe = { ...cafe, today: cf.opTime[0] }
            }

            this.cafes.push(cafe)
          }

          if (this.cafes.length < 1) {
            // console.log('검색 결과가 없습니다. ', this.cafes.length)
            // this.$q.dialog({
            //   title: 'Error',
            //   message: '검색 결과가 없습니다.'
            // })
          } else {
            this.showCafesMarker()
            if (!bounds) {
              this.setCafesBounds()
            }
          }
          this.searching = false
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 현재위치에서 재검색
    researchInCurrentPosition() {
      // 현지도 바운더리 정보 가져오기
      const bounds = this.getBounds()

      // 바운드로 검색
      this.doSearch(this.search, bounds)

      // 필터링 (테스트)
      // this.filteringWithBounds(bounds)
    },
    getBounds() {
      // 지도 영역정보를 얻어옵니다
      const bounds = this.map.getBounds()

      // 영역정보의 남서쪽 정보를 얻어옵니다
      const swLatlng = bounds.getSouthWest()

      // 영역정보의 북동쪽 정보를 얻어옵니다
      const neLatlng = bounds.getNorthEast()

      // let message =
      //   '<p>영역좌표는 남서쪽 위도, 경도는  ' +
      //   swLatlng.toString() +
      //   '이고 <br>'
      // message += '북동쪽 위도, 경도는  ' + neLatlng.toString() + '입니다 </p>'
      // console.log(swLatlng, neLatlng)
      // this.boundMsg = message
      const resBounds = {
        lat_min: swLatlng.Ma,
        long_min: swLatlng.La,
        lat_max: neLatlng.Ma,
        long_max: neLatlng.La
      }
      return resBounds
    },
    // 테스트
    filteringWithBounds(bounds) {
      this.cafes = this.cafes.filter((cafe) => {
        if (
          cafe.cafe_latitude > bounds.lat_min &&
          cafe.cafe_latitude < bounds.lat_max &&
          cafe.cafe_longitude > bounds.long_min &&
          cafe.cafe_longitude < bounds.long_max
        ) {
          return cafe
        }
      })
    },
    createMarkerImage(imageSrc, imageSize, imageOption) {
      // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
      const markerImage = new kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
      )

      return markerImage
    },
    showCafesMarker() {
      // 지도에 여러개 마커 표시
      for (let i = 0; i < this.cafes.length; i++) {
        const cafe_id = this.cafes[i].cafe_id
        const position = this.cafes[i].latlng

        // 마커를 생성합니다
        const marker = new kakao.maps.Marker({
          map: this.map, // 마커를 표시할 지도
          position: position, // 마커를 표시할 위치
          image: this.normalImage
        })

        // 마커 클릭 이벤트 등록
        kakao.maps.event.addListener(marker, 'click', () => {
          this.handleClickMarker(cafe_id, position)

          this.cafes.forEach((cafe) => {
            cafe.marker.setImage(this.normalImage)
          })
          marker.setImage(this.clickImage)
        })

        this.cafes[i].marker = marker

        marker.setMap(this.map)
      }

      // 지도에 여러개 마커 표시
    },
    clearTarget() {
      if (this.targetCafe) {
        this.targetCafe = null
      }
    },
    // 검색결과 카페카드 클릭 처리
    setTarget(cafe_id) {
      this.clearTarget()
      const find = this.cafes.filter((cafe) => {
        return cafe['cafe_id'] === cafe_id
      })[0]
      this.targetCafe = { ...find }
      this.map.panTo(this.targetCafe.latlng)
    },
    // 모든 마커를 삭제
    clearAllMarkers() {
      this.clearTarget()
      // console.log('모든 마커를 삭제')
      for (let i = 0; i < this.cafes.length; i++) {
        this.cafes[i].marker.setMap(null)
      }
    },
    handleClickMarker(cafe_id) {
      console.log('marker 클릭 : ', cafe_id)
      this.setTarget(cafe_id)
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
    // test
    loadRawData() {
      let apiUrl = `${process.env.API_LOCAL}/cafeLocations` // json-server
      // let apiUrl = `${process.env.API}/cafeLocations` // real-server
      this.$axios
        .get(apiUrl)
        .then((result) => {
          this.cafesRaw = []
          for (let i = 0; i < result.data.length; i++) {
            const cafe = {
              ...result.data[i],
              latlng: new kakao.maps.LatLng(
                result.data[i]['cafe_latitude'],
                result.data[i]['cafe_longitude']
              ),
              marker: null
            }

            this.cafesRaw.push(cafe)
          }
          // console.log(this.cafesRaw)
        })
        .catch((err) => {
          console.log(err)
        })
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

      setTimeout(() => {
        this.map.relayout()
      }, 300)
      // 좌측 drawer 줄어든 이후 지도 우측 빈 타일 보여지는 부분 수정
      // if (!this.drawerOpen) {
      //   setTimeout(() => {
      //     this.map.relayout()
      //   }, 300)
      // }
    },
    test() {
      //   // 테스트
      //   // cafes[0]에 앰비언스 마커 표시
      //   console.log(this.cafes[0])
      //   const position = new kakao.maps.LatLng(37.5015764, 127.124833)
      //   // 마커를 생성합니다
      //   const marker = new kakao.maps.Marker({
      //     map: this.map, // 마커를 표시할 지도
      //     position: position // 마커를 표시할 위치
      //   })
      //   // 마커 클릭 이벤트 등록
      //   kakao.maps.event.addListener(marker, 'click', () => {
      //     this.handleClickMarker(1, position)
      //   })
      //   this.cafes[0] = {
      //     ...this.cafes[0],
      //     latlng: position,
      //     marker: marker
      //   }
      //   // console.log(this.cafes[0])
      //   // 테스트 끝
    }
  }
})
</script>

<style lang="scss">
.map_wrap {
  position: relative;
  overflow: hidden;
  // width: calc(100% - 382px);
  height: calc(90vh - 50px);

  #map {
    width: 100%;
    height: 100%;
  }

  .zoom_control {
    position: absolute;
    top: 20px;
    right: 20px;
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

  .btn_search_current {
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translate(-50%);
    z-index: 1;
    font-weight: 400;
    background-color: $grey-3 !important;

    transition: all 0.3s;
    opacity: 1;
    &.fade {
      opacity: 0;
      cursor: grab;
      pointer-events: none;
    }
    // &.fullopacity {
    //   opacity: 1;
    // }
    // background: rgba(255, 255, 255, 0.8) !important;
  }

  .btn_current_location {
    position: absolute;
    bottom: 30px;
    right: 30px;
    z-index: 1;
  }

  // 마커 클릭시 표시되는 인포 윈도우
  .target_cafe_wrap {
    position: absolute;
    top: 15px;
    left: 15px;
    width: 300px;
    z-index: 1;
  }
}
</style>
