<template>
  <btn-basic
    size="xs"
    type="button"
    label="주소 찾기"
    @click="execDaumPostcode()"
    color="primary"
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
      cafe_address_info: {
        address: '',
        extraAddress: '',
        postcode: ''
      }
    }
  },
  methods: {
    execDaumPostcode() {
      new window.daum.Postcode({
        oncomplete: (data) => {
          if (this.cafe_address_info.extraAddress !== '') {
            this.cafe_address_info.extraAddress = ''
          }
          if (data.userSelectedType === 'R') {
            // 사용자가 도로명 주소를 선택했을 경우
            this.cafe_address_info.address = data.roadAddress
          } else {
            // 사용자가 지번 주소를 선택했을 경우(J)
            this.cafe_address_info.address = data.jibunAddress
          }

          // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
          if (data.userSelectedType === 'R') {
            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
              this.cafe_address_info.extraAddress += data.bname
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if (data.buildingName !== '' && data.apartment === 'Y') {
              this.cafe_address_info.extraAddress +=
                this.cafe_address_info.extraAddress !== ''
                  ? `, ${data.buildingName}`
                  : data.buildingName
            }
            // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if (this.cafe_address_info.extraAddress !== '') {
              this.cafe_address_info.extraAddress = `(${this.cafe_address_info.extraAddress})`
            }
          } else {
            this.cafe_address_info.extraAddress = ''
          }
          // 우편번호를 입력한다.
          this.cafe_address_info.postcode = data.zonecode

          this.sendData()
        }
      }).open()
    },
    sendData() {
      this.$emit('sendPostData', this.cafe_address_info)
    }
  }
}
</script>
<style lang="scss" scoped></style>
