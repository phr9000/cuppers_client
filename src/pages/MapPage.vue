<template>
  <div>
    <div class="map_wrap">
      <!-- 지도가 표시되는 div -->
      <div id="map"></div>

      <!-- 왼쪽 drawer -->
      <q-drawer :width="362" v-model="drawerOpen" show-if-above bordered>
        <!-- tab -->
        <q-tabs
          v-model="tab"
          inline-label
          class="text-h1 text-primary shadow-2"
        >
          <q-tab name="search" icon="search" label="검색" />
          <q-tab name="mylist" icon="list" label="내목록" />
        </q-tabs>

        <!-- tab1: 검색 map-search -->
        <section
          v-show="tab === 'search'"
          class="section_search column q-py-sm"
        >
          <q-checkbox
            label="현 지도 내 검색"
            v-model="searchInMap"
            class="q-pr-sm text-grey-6"
            left-label
            color="secondary"
            size="sm"
          />
          <!-- 검색 모듈 -->
          <div class="search_module">
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
            <div class="row q-px-md q-pt-sm q-gutter-xs">
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
              <btn-basic
                @click="handleClickSearch('조용한')"
                color="secondary"
                label="조용한"
              />
              <btn-basic
                @click="handleClickSearch('공장형')"
                color="secondary"
                label="공장형"
              />
            </div>

            <!-- 정렬 -->
            <div class="q-mt-sm q-mt-md">
              <div class="row justify-end items-center q-mb-sm">
                <btn-sort :sort_items="sortItems" @change="changeSort" />
              </div>
            </div>
          </div>

          <q-separator class="" />

          <!-- 검색 결과 표시 (카페 카드) -->
          <q-list v-if="cafes.length > 0" class="search_result q-mb-sm">
            <div v-for="cafe in cafes" :key="cafe.cafe_id">
              <card-cafe-li
                :cafe="cafe"
                :keywords="cafe.keywords"
                :today="cafe.today"
                :curLoc="locState"
                @click="setTarget(cafe.cafe_id)"
              />
            </div>
          </q-list>
          <div v-else class="q-my-lg text-grey flex flex-center">
            <p>검색된 카페가 없습니다.</p>
          </div>

          <q-btn v-if="isMore" @click="loadMore" flat color="grey"
            >더불러오기
          </q-btn>
        </section>

        <!-- tab2: 내목록 map-my-list -->
        <section v-show="tab === 'mylist'">
          <div v-if="user === null" class="q-my-lg text-grey flex flex-center">
            <div class="q-pr-sm">로그인이 필요합니다.</div>
            <q-btn
              dense
              to="/login"
              label="로그인 페이지로"
              color="secondary"
              padding="4px 10px"
            />
          </div>
          <div v-else>
            <!-- 마이리스트 -->
            <div v-if="!currentMyListItem">
              <map-my-list
                :mylist_items="mylist"
                @click_like="handleClickMyListLike"
                @click_beenthere="handleClickMyListBeenthere"
                @click_item="handleClickMyListItem"
                @create_mylist="hancleCreateMylist"
              />
            </div>
            <div v-else>
              <q-item-label header class="mylist_header row items-center">
                <btn-icon
                  class="btn_arrow_back"
                  :flat="true"
                  size="sm"
                  color="grey-5"
                  icon="arrow_back_ios"
                  @click="backToMylist"
                />
                <div class="text">{{ currentMyListItem.mylist_name }}</div>
              </q-item-label>
              <!-- 마이리스트 내부 카페 리스트 (카페 카드) -->
              <q-list v-if="cafes.length > 0" class="search_result q-mb-sm">
                <div v-for="cafe in cafes" :key="cafe.cafe_id">
                  <card-cafe-li
                    :cafe="cafe"
                    :keywords="cafe.keywords"
                    :today="cafe.today"
                    :curLoc="locState"
                    @click="setTarget(cafe.cafe_id)"
                  />
                </div>
              </q-list>
              <div v-else class="q-my-lg text-grey flex flex-center">
                <p>검색된 카페가 없습니다.</p>
              </div>
            </div>
          </div>
        </section>
      </q-drawer>

      <!-- zoom_control -지도 확대, 축소 컨트롤 div -->
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
        @click="panToCurrentLocation"
        class="btn_current_location"
        icon="my_location"
      />

      <div class="map_left_top">
        <div class="sample_keywords">
          <btn-basic
            v-for="keyword in sampleKeywords"
            :key="keyword.val"
            class="bg-grey-2 q-mr-xs"
            @click="handleClickSearch(keyword.val)"
            color="secondary"
            size="lg"
            :label="keyword.label"
          />
          <!-- <btn-basic
            @click="handleClickSearch('강동')"
            color="secondary"
            size="md"
            label="강동"
          /> -->
        </div>
        <!-- 마커 클릭시 표시되는 인포 윈도우 -->
        <div v-if="targetCafe" class="target_cafe_wrap">
          <card-cafe-map
            @close="clearTarget"
            :cafe="targetCafe"
            :keywords="targetCafe.keywords"
            :today="targetCafe.today"
            :cafeFacility="targetCafe.cafeFacility"
            :menuBrewing="targetCafe.menuBrewing"
            :menuVariation="targetCafe.menuVariation"
          />
        </div>
      </div>

      <!-- 현재위치에서 재검색 -->
      <!-- <div style="">카페이름</div> -->
      <btn-basic
        v-if="tab === 'search'"
        @click="researchInCurrentPosition"
        class="btn_search_current"
        :class="{ fade: researchBtnFade }"
        :outline="true"
        :flat="false"
        size="lg"
        to="map"
        color="primary"
        label="이 지역에서 다시 찾기"
        icon="map"
        padding="4px 18px"
      />
    </div>

    <!-- 테스트 영역 -->
    <section v-if="false">
      <div class="q-ma-xs q-pa-xs custom_test radius_border">
        level: {{ mapLevel }} lastSearchPosition: {{ lastSearchPosition }}
        <br />
        distance: {{ distance }}
        <br />
        distance(보정치): {{ distest }}
      </div>
      <div v-html="boundMsg"></div>
      <div class="q-ma-xs q-pa-xs custom_test radius_border">
        현재위치: {{ locState }}
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
import CardCafeLi from 'src/components/Card/CardCafeLi.vue'
import BtnSort from 'src/components/Tab/BtnSort.vue'
import MapMyList from 'src/components/List/MapMyList.vue'

import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'MapPage',
  components: {
    BtnBasic,
    BtnIcon,
    CardCafeMap,
    CardCafeLi,
    BtnSort,
    MapMyList
  },
  setup() {
    const $store = useStore()
    // const $route = useRoute()

    const user = computed({
      get: () => $store.state.auth.user
    })

    const locState = computed({
      get: () => $store.state.map.loc,
      set: (val) => {
        $store.commit('map/setLoc', val)
      }
    })

    return {
      user,
      locState
    }
  },
  data() {
    return {
      cafesRaw: null, // 현재 불러온 전체 카페 리스트
      cafes: [], // 필터링된 카페 리스트

      // 검색 옵션
      page: 0,
      limit: 12,
      totalCnt: 0,
      map: null, // 카카오맵 인스턴스
      search: '',
      drawerOpen: false,
      tab: 'search', // 'search', 'mylist',
      currentMyListItem: null,
      searching: false,
      searchInMap: false, // 현지도 내 검색 체크박스
      targetCafe: null,
      researchBtnFade: true,
      mapLevel: null,
      lastSearchPosition: null,
      distance: 0, // 마지막 검색이후 지도 이동거리값(실제 km 아님)
      boundMsg: '', // 현재바운드정보 테스트출력
      distest: 0, // distance 보정치 테스트출력
      normalImage: null,
      clickImage: null,
      mylist: [],
      sortItems: [
        {
          label: '추천순',
          val: 'like'
        },
        {
          label: '거리순',
          val: 'dist'
        }
      ],
      sampleKeywords: [
        {
          label: '전체',
          val: '*'
        },
        {
          label: '송파',
          val: '송파'
        },
        {
          label: '강동',
          val: '강동'
        },
        {
          label: '조용한',
          val: '조용한'
        },
        {
          label: '공장형',
          val: '공장형'
        }
      ],
      isMore: false,
      sort: '' // none or like or dis
    }
  },
  computed: {},
  watch: {
    tab(val) {
      if (val === 'search') {
        // init
        this.currentMyListItem = null
      } else if (val === 'mylist') {
        if (this.user) {
          this.loadMyList()
        }
      }
    }
  },
  created() {
    // console.log(this.$route.params.id)
  },
  mounted() {
    if (!window.kakao || !window.kakao.maps) {
      console.log(window.kakao)
      const script = document.createElement('script')
      // 동적 로딩을 위해서 autoload=false 추가
      script.src = `http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.KAKAO_API}&libraries=services`

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
      // console.log(window.kakao)
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
      const imageSrc = '/icons/marker.png' // 마커이미지의 주소입니다
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

      console.log(this.$route.params.id)
      this.search = this.$route.params.id
      this.handleClickSearch()
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
    resetSearchOption() {
      this.page = 0
      this.isMore = true
      this.bounds = null
      if (this.cafes.length > 0) {
        // 모든 마커를 삭제
        this.clearAllMarkers()
      }
      this.cafes = []
    },
    // 검색 버튼 클릭, 또는 enter
    handleClickSearch(search) {
      // console.log(typeof search)
      if (typeof search == 'string') {
        this.search = search
      } else if (this.search === '') {
        console.log('검색어를 입력하세요')
        // this.$q.dialog({
        //   title: 'Error',
        //   message: '검색어를 입력하세요.'
        // })
        return
      }

      if (this.searching) {
        return
      }

      this.resetSearchOption()

      // if (this.cafes.length > 0) {
      //   // 모든 마커를 삭제
      //   this.clearAllMarkers()
      // }

      // this.page = 0
      // this.isMore = true
      // this.cafes = []
      // this.bounds = null
      this.doSearch()
    },
    loadMore() {
      this.doSearch()
    },
    doSearch() {
      this.page++

      let search = this.search

      // let bounds = null
      if (this.searchInMap) {
        // 현지도 바운더리 정보 가져오기

        this.bounds = this.getBounds()
      }

      this.searching = true

      // 초기화
      const SORT = this.sort
      const ORDER = SORT === 'like' ? 'd' : 'a' // 추천순일 경우 d, 거리순일 경우 a
      const PAGE = this.page
      const LIMIT = this.limit

      // this.sort = ''
      this.distance = 0
      this.distest = 0
      // 재검색 버튼 숨기기
      this.researchBtnFade = true

      // 중심좌표 저장
      const center = this.map.getCenter()
      const MAP_CENTER_LAT = center.Ma
      const MAP_CENTER_LONG = center.La
      this.lastSearchPosition = center
      console.log('center', center)

      if (this.search !== search) {
        this.search = search
      }
      if (search === '*') {
        search = ''
      }

      let CENTER_LAT = ''
      let CENTER_LONG = ''
      if (this.searchInMap) {
        // 지도의 중심
        CENTER_LAT = MAP_CENTER_LAT
        CENTER_LONG = MAP_CENTER_LONG
      } else {
        // 내위치
        CENTER_LAT = this.locState.lat
        CENTER_LONG = this.locState.lng
      }

      let apiUrl = `${process.env.API}/cafe?search=${search}&user=&page=${PAGE}&limit=${LIMIT}&sort=${SORT}&order=${ORDER}&current_lat=${CENTER_LAT}&current_long=${CENTER_LONG}`

      // console.log(center) console.log(apiUrl)

      if (this.bounds) {
        apiUrl += `&lat_min=${this.bounds.lat_min}&lat_max=${this.bounds.lat_max}&long_min=${this.bounds.long_min}&long_max=${this.bounds.long_max}`
      } else {
        apiUrl += `&lat_min=&lat_max=&long_min=&long_max=`
      }

      this.loadCafes(apiUrl, this.bounds)
    },
    changeSort(val) {
      console.log('chagne sort to: ', val)
      this.sort = val
      this.resetSearchOption()
      this.handleClickSearch()
    },
    loadCafes(apiUrl, bounds = null, liked = 0) {
      console.log(apiUrl)
      this.clearAllMarkers()
      this.$axios
        .get(apiUrl)
        .then((result) => {
          this.totalCnt = result.data.totalCnt
          // this.cafes = []
          for (let i = 0; i < result.data.arr.length; i++) {
            const cf = result.data.arr[i]

            let cafe = {
              ...cf,
              latlng: new kakao.maps.LatLng(
                cf['cafe_latitude'],
                cf['cafe_longitude']
              ),
              marker: null
            }

            // user_liked null 또는 undefined이면 추가
            if (!result.data.arr[i].user_liked) {
              cafe = { ...cafe, user_liked: liked }
            }

            if (cf.opTime) {
              cafe = { ...cafe, today: cf.opTime[0] }
            }

            // console.log(cafe)
            this.cafes.push(cafe)
          }

          // 더불러오기 비활성화
          if (this.cafes.length >= result.data.totalCnt) {
            this.isMore = false
          }
          // if (result.data.arr.length < this.limit) {
          //   this.isMore = false
          // }

          if (this.cafes.length < 1) {
            console.log('검색 결과가 없습니다.')
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
    // 마이리스트 목록 가져오기
    loadMyList() {
      this.resetSearchOption()

      let apiUrl = `${process.env.API}/cafe/mylist/all/${this.user.uid}` // real-server
      console.log(apiUrl)
      this.$axios
        .get(apiUrl)
        .then((result) => {
          this.mylist = result.data
          console.log(this.mylist)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 마이리스트 내부 카페 리스트 가져오기 - 마이리스트 내부로 진입
    handleClickMyListItem(item) {
      this.currentMyListItem = item

      let apiUrl = `${process.env.API}/cafe/mylist/one/${item.mylist_id}?user_id=${this.user.uid}&current_lat=${this.locState.lat}&current_long=${this.locState.lng}`
      if (this.cafes.length > 0) {
        // 모든 마커를 삭제
        this.clearAllMarkers()
      }
      this.cafes = []
      this.loadCafes(apiUrl)
    },
    // 마이리스트 좋아요한 카페 불러오기
    handleClickMyListLike() {
      this.currentMyListItem = { mylist_name: '좋아요한 카페 ' }

      if (this.cafes.length > 0) {
        // 모든 마커를 삭제
        this.clearAllMarkers()
      }
      let apiUrl = `${process.env.API}/cafe/mypage/like/${this.user.uid}&current_lat=${this.locState.lat}&current_long=${this.locState.lng}`
      // this.cafes = []
      this.resetSearchOption()
      this.loadCafes(apiUrl, null, 1)
    },
    // 마이리스트 가본곳 카페 불러오기
    handleClickMyListBeenthere() {
      this.currentMyListItem = { mylist_name: '가본곳 ' }
      if (this.cafes.length > 0) {
        // 모든 마커를 삭제
        this.clearAllMarkers()
      }
      let apiUrl = `${process.env.API}/cafe/mypage/beenthere/${this.user.uid}&current_lat=${this.locState.lat}&current_long=${this.locState.lng}`
      // this.cafes = []
      this.resetSearchOption()
      this.loadCafes(apiUrl, null)
    },
    // 마이리스트 새 리스트 생성 처리
    hancleCreateMylist(title) {
      // -> db에 title 전달하여 마이리스트에 새 리스트 만드는 라우트
      let apiUrl = `${process.env.API}/cafe/mylist`
      this.$axios
        .post(apiUrl, {
          param: {
            user_id: this.user.uid,
            mylist_name: title
          }
        })
        .then((result) => {
          if (result.data.insertId > 0) {
            this.$q.notify({
              position: 'top',
              timeout: 1000,
              message: '마이리스트가 생성되었습니다.',
              color: 'info'
            })
            this.loadMyList()
          }
        })
        .catch((err) => {
          console.log('마이리스트 생성 실패')
          console.log(err)
        })
    },
    // 마이리스트 내부 목록에서 마이리스트 목록으로 돌아가기
    backToMylist() {
      // this.clearTarget()
      this.currentMyListItem = null
    },
    // 현재위치에서 재검색
    researchInCurrentPosition() {
      this.resetSearchOption()
      // 현지도 바운더리 정보 가져오기
      this.bounds = this.getBounds()
      // this.searchInMap = true
      // this.cafes = []
      // 바운드로 검색
      this.doSearch()
      // this.handleClickSearch()
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
        })

        this.cafes[i].marker = marker

        marker.setMap(this.map)
      }
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

      // 시설 정보와 메뉴 정보 필드도 생성
      this.targetCafe = {
        ...find,
        cafeFacility: null,
        menuBrewing: null,
        menuVariation: null
      }

      // 시설 정보와 메뉴 정보를 로드
      this.loadCafeInfo(cafe_id)

      // target cafe 마커 활성황, 이외의 마커는 비활성화
      this.cafes.forEach((cafe) => {
        if (cafe.cafe_id === cafe_id) {
          cafe.marker.setImage(this.clickImage)
        } else {
          cafe.marker.setImage(this.normalImage)
        }
      })

      this.map.panTo(this.targetCafe.latlng)
    },
    // 카페 메뉴와 시설정보 로드
    loadCafeInfo(cafe_id) {
      let apiUrl = `${process.env.API}/cafe/info/${cafe_id}` // real-server
      this.$axios
        .get(apiUrl)
        .then((result) => {
          // console.log(result.data)
          if (this.targetCafe) {
            const facility = result.data['cafeFacility']
            if (facility.length > 0) {
              this.targetCafe.cafeFacility = facility
            }

            const cafeMenu = result.data['cafeMenu']
            // 브루잉(필터) 메뉴, 배리에이션 메뉴 구분
            if (cafeMenu.length > 0) {
              this.targetCafe.menuBrewing = cafeMenu.filter(
                (m) => m.menu_type === 'br'
              )
              this.targetCafe.menuVariation = cafeMenu.filter(
                (menu) => menu.menu_type !== 'br'
              )
            }
          }
        })
        .catch((err) => {
          console.log(err)
        })
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
      // console.log('marker 클릭 : ', cafe_id)
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
    zoomIn() {
      this.map.setLevel(this.map.getLevel() - 1, { animate: true })
    },
    zoomOut() {
      this.map.setLevel(this.map.getLevel() + 1, { animate: true })
    },
    panToCurrentLocation() {
      if (this.locState) {
        // 현재 위치로 지도 이동
        this.panTo(this.locState.lat, this.locState.lng)
      } else {
        this.locationError()
      }
    },
    panTo(lat, lng) {
      // 이동할 위도 경도 위치를 생성합니다
      const moveLatLon = new kakao.maps.LatLng(lat, lng)

      // 지도 중심을 부드럽게 이동시킵니다
      // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
      this.map.panTo(moveLatLon)
    },
    locationError() {
      this.$q.dialog({
        title: 'Error',
        message: '위치를 찾을 수 없습니다. 잠시후 다시 시도해 주세요.'
      })
    },
    toggleDrawer() {
      this.drawerOpen = !this.drawerOpen

      setTimeout(() => {
        this.map.relayout()
      }, 300)
    }
  }
})
</script>

<style lang="scss" scoped>
.map_wrap {
  position: relative;
  overflow: hidden;
  height: calc(100vh - 51px);

  .section_search {
    .search_module {
      .sort_tabs {
        margin-right: 0px;
        .tab {
          border-radius: 18px;
          min-height: 26px;
          height: 26px;
          padding: 0px 12px;
          &.active {
            color: $primary !important;
          }
        }
      }
    }
  }

  #map {
    width: 100%;
    height: 100%;
  }

  .mylist_header {
    border-bottom: 1px solid $grey-4;
    // 마이리스트 내부에서 뒤로가는 버튼
    .btn_arrow_back {
      // position: absolute;
      &:deep(i) {
        position: relative;
        left: 4px;
        top: 1px;
      }
    }
    .text {
      font-size: 0.9rem;
      padding-left: 10px;
      position: relative;
      top: 1px;
    }
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
  }

  .btn_current_location {
    position: absolute;
    bottom: 30px;
    right: 30px;
    z-index: 1;
  }

  .map_left_top {
    position: absolute;
    top: 15px;
    left: 15px;
    z-index: 1;

    // 마커 클릭시 표시되는 인포 윈도우
    .target_cafe_wrap {
      padding-top: 15px;
      width: 300px;
    }
  }
}
</style>
