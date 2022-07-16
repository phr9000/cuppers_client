<template>
  <q-page class="flex flex-center">
    <div class="column items-center">
      <div>login page</div>
      <div>
        <q-input label="uid" v-model="uid" dense class="q-mb-sm"></q-input>
      </div>
      <div><button @click="login">입력한 uid로 로그인</button></div>
      <div v-if="user">logged user: {{ user }}</div>
      <button @click="kakaoLogin">카카오로 로그인 하기</button>
      <button @click="kakaoLogout">카카오로그아웃</button>
      <button @click="kakaoOut">카카오탈퇴</button>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { computed } from 'vue'
import { useStore } from 'vuex'
// console.log(process.env.KAKAO_API)
window.Kakao.init(process.env.KAKAO_API) // 중복 호출 방지 해야함
// 카카오로 로그인 -> 이메일,성별,연령대,닉네임 을 얻을 수 있음
// -> backend로 "이메일" 전송 ->
// 1. ->가입이 안되어있으면 -> 가입페이지로 redirect 이메일로 가입처리
// 2. -> 가입이 되어있으면 "서버"가 user_id(uid)를 리턴
//    해당 uid로 프론트에서 로그인 처리   ~ this.$router.push('/')

export default defineComponent({
  setup() {
    const $store = useStore()

    const user = computed({
      get: () => $store.state.auth.user,
      set: (val) => {
        $store.commit('auth/setUser', val)
      }
    })

    return {
      user
    }
  },
  data() {
    return {
      uid: 0
    }
  },
  created() {},
  methods: {
    kakaoLogin() {
      window.Kakao.API.request({
        url: '/v2/user/me',
        success: (res) => {
          const kakao_account = res.kakao_account
          console.log(kakao_account)
          var accessToken = Kakao.Auth.getAccessToken() // 액세스 토큰 할당
          console.log(accessToken)
        }
      })
    },
    // 로그아웃
    kakaoLogout() {
      Kakao.init(process.env.KAKAO_API)
      Kakao.isInitialized()
      if (!Kakao.Auth.getAccessToken()) {
        // 토큰이 있는지 확인 (토큰 가져와보기)
        console.log('Not logged in.')
        return
      }

      Kakao.Auth.logout(function () {
        // 카카오 로그아웃
        console.log(Kakao.Auth.getAccessToken())
      })
    },
    // 탈퇴
    kakaoOut() {
      Kakao.init(process.env.KAKAO_API)
      Kakao.isInitialized()
      Kakao.Auth.setAccessToken(
        QZigipQ81eBBhic4LGFlrRKDjQxgq8gZ7dFNhBIfCj10lwAAAYIEIhgM
      )

      Kakao.API.request({
        url: '/v1/user/unlink',
        success: function (response) {
          console.log(response)
          callbackFunction() // 연결끊기(탈퇴)성공시 서버에서 처리할 함수
        },
        fail: function (error) {
          alert(
            '탈퇴처리가 미완료되었습니다. \n관리자에게 문의하시기 바랍니다.'
          )
          console.log(error)
        }
      })
    },
    login() {
      const uid = parseInt(this.uid)
      this.user = {
        uid: uid,
        thumbUrl: `${process.env.STATIC}/images/avatar/${uid}/thumb.jpg`
      }
      this.$q.localStorage.set('auth', this.user)
      this.$router.push('/')
    }
  }
})
</script>

<style></style>
