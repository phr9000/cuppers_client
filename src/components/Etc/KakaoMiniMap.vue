<template>
  <!-- 지도가 표시되는 div -->
  <div id="map"></div>
</template>

<script>
export default {
  name: 'KakaoMiniMap',
  props: ['lat', 'lng'],
  data() {
    return {
      map: null, // 카카오맵 인스턴스
      normalImage: null
    }
  },
  mounted() {
    // console.log('KakaoMiniMap mounted')
    // console.log(this.lat, this.lng)

    if (!window.kakao || !window.kakao.maps) {
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
      const container = document.getElementById('map')
      const options = {
        // center: new kakao.maps.LatLng(37.513579, 127.104765, 16), // 커피 앰비언스 16?
        center: new kakao.maps.LatLng(this.lat, this.lng, 16), // 커피 앰비언스 16?
        level: 5 // 지도의 확대 레벨 (클수록 확대)
      }

      this.map = new kakao.maps.Map(container, options) // 지도를 생성합니다

      // 지도를 생성한 이후 작업들
      const imageSrc = '/icons/marker.png' // 마커이미지의 주소입니다
      const imageSize = new kakao.maps.Size(24, 33) // 마커이미지의 크기입니다
      const imageOption = { offset: new kakao.maps.Point(12, 33) } // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의
      this.normalImage = this.createMarkerImage(
        imageSrc,
        imageSize,
        imageOption
      )

      const position = new kakao.maps.LatLng(this.lat, this.lng)
      this.createMaker(position)
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
    // 지도에 카페 마커 표시
    createMaker(position) {
      // 마커를 생성합니다
      const marker = new kakao.maps.Marker({
        map: this.map, // 마커를 표시할 지도
        position: position, // 마커를 표시할 위치
        image: this.normalImage
      })
      marker.setMap(this.map)
      // this.panTo(position.lat, position.lng)
    }
  }
}
</script>

<style lang="scss" scoped>
#map {
  width: 100%;
  height: 300px;
}
</style>
