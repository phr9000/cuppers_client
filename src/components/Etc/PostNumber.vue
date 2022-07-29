<template>
  <btn-basic
    size="md"
    label="주소 찾기"
    @click="execDaumPostcode"
    color="brown-5"
    :rounded="false"
    padding="10px 14px"
  />
</template>

<script>
import BtnBasic from '../Button/BtnBasic.vue'
export default {
  name: 'PostNumber',
  components: {
    BtnBasic
  },
  data() {
    return {
      // 주소-좌표 변환 객체
      geocoder: null,
      payload: {
        postcode: '',
        address: '',
        roadAddress: '',
        jibunAddress: '',
        extraAddress: '',
        latitude: null,
        longitude: null
      }
    }
  },
  mounted() {
    if (!window.Kakao || !window.Kakao.maps) {
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
      // 주소-좌표 변환 객체를 생성합니다
      // console.log(window.kakao)
      this.geocoder = new kakao.maps.services.Geocoder()
    },
    execDaumPostcode() {
      new window.daum.Postcode({
        oncomplete: (data) => {
          console.log(data)
          // 우편번호
          this.payload.postcode = data.zonecode
          this.payload.roadAddress = data.roadAddress
          this.payload.jibunAddress = data.jibunAddress

          this.getExtraAddress(data)

          if (data.userSelectedType === 'R') {
            // 사용자가 도로명 주소를 선택했을 경우
            this.payload.address = data.roadAddress

            // 선택한 도로명 주소로 좌표 얻어오기
            this.getCoordsByAddress(data.roadAddress)
          } else {
            // 사용자가 지번 주소를 선택했을 경우(J)
            this.payload.address = data.jibunAddress
            // this.payload.extraAddress = ''
            // 선택한 지번 주소로 좌표 얻어오기
            this.getCoordsByAddress(data.jibunAddress)
          }
        }
      }).open()
    },
    getExtraAddress(data) {
      // (사용자가 선택한 주소가 도로명 타입일때?)참고항목을 조합한다.
      // 법정동명이 있을 경우 추가한다. (법정리는 제외)
      // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
      if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
        this.payload.extraAddress += data.bname
      }
      // 건물명이 있고, 공동주택일 경우 추가한다.
      if (data.buildingName !== '' && data.apartment === 'Y') {
        this.payload.extraAddress +=
          this.payload.extraAddress !== ''
            ? `, ${data.buildingName}`
            : data.buildingName
      }
      // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
      if (this.payload.extraAddress !== '') {
        this.payload.extraAddress = `(${this.payload.extraAddress})`
      }
    },
    getCoordsByAddress(address) {
      // 로도명 주소로 좌표를 검색
      this.geocoder.addressSearch(address, (result, status) => {
        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {
          this.payload.latitude = result[0].y
          this.payload.longitude = result[0].x
        } else {
          console.log('도로명주소로 좌표 얻어오기 실패')
        }
        this.sendData()
      })
    },
    sendData() {
      this.$emit('sendPostData', this.payload)
    }
  }
}
</script>
