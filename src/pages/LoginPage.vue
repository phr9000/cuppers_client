<template>
  <q-page class="flex flex-center">
    <div class="column items-center">
      <div>login page</div>
      <div>
        <q-input label="uid" v-model="uid" dense class="q-mb-sm"></q-input>
      </div>
      <div><button @click="login">입력한 uid로 로그인</button></div>
      <div v-if="user">logged user: {{ user }}</div>
      <button @click="kLogin">카카오로 로그인 하기</button>
      <button @click="kakaoLogout">카카오로그아웃</button>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { computed } from 'vue'
import { useStore } from 'vuex'

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
  created() {
    if (this.$store.getters['auth/isLoggedIn']) {
      this.$router.push('/my')
    }
  },
  methods: {
    // kakaoLogin2() {
    //   if (window.Kakao.isInitialized()) {
    //     window.Kakao.Auth.login({
    //       scope: 'profile_image, account_email, profile_nickname',
    //       success: function (authObj) {
    //         // console.log(authObj)
    //         window.Kakao.API.request({
    //           url: '/v2/user/me',
    //           success: (res) => {
    //             const kakao_account = res.kakao_account
    //             console.log(kakao_account)
    //             var accessToken = Kakao.Auth.getAccessToken() // 액세스 토큰 할당
    //             console.log(accessToken)
    //           }
    //         })
    //       },
    //       async login(kakao_account) {
    //         console.log(kakao_account)
    //         await this.$axios.post('http://localhost:3000/api/login', {
    //           login: [
    //             {
    //               user_email: kakao_account_email,
    //               user_thumbnail_url: kakao_account.profile.thumbnail_image_url,
    //               user_nickname: kakao_account.profile.nickname
    //             },
    //             {
    //               user_email: kakao_account_email,
    //               user_thumbnail_url: kakao_account.profile.thumbnail_image_url,
    //               user_nickname: kakao_account.profile.nickname
    //             }
    //           ]
    //         })
    //       }
    //     })
    //   }
    // },

    // 로그인
    async kLogin(kakao_account) {
      await this.$axios.post('http://localhost:3000/api/login', {
        param: [
          {
            user_email: kakao_account.email,
            user_thumbnail_url: kakao_account.profile.thumbnail_image_url,
            user_nickname: kakao_account.profile.nickname
          }
        ]
      })
    },

    getProfile(authObj) {
      window.Kakao.API.request({
        url: '/v2/user/me',
        success: (res) => {
          const kakao_account = res.kakao_account
          this.kLogin(kakao_account)
          console.log(kakao_account)
        }
      })
    },
    // 로그아웃
    kakaoLogout() {
      // Kakao.init(process.env.KAKAO_API)
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
