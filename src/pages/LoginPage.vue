<template>
  <q-page class="login-container">
    <div>
      <div class="login-inner">
        <div class="left">
          <div class="user-useful">
            <p><span class="hightlight">커핑노트</span> 작성,</p>
            <p>카페 <span class="hightlight">마이리스트</span> 관리,</p>
            <p>내 <span class="hightlight">주변 카페</span> 추천,</p>
            <p>카페 <span class="hightlight bold">SNS</span> 관리</p>
          </div>
          <div class="cuppers-desc">
            #커피를 커피답게 #커퍼스 #내 주변 카페 #커피SNS #감성
          </div>
        </div>
        <div class="right">
          <div class="img-area" @click="kakaoLogin()">
            <img
              src="https://developers.kakao.com/tool/resource/static/img/button/kakaosync/complete/ko/kakao_login_large_narrow.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>

    <!--시작 test -->
    <div
      v-show="false"
      class="column items-left"
      style="border: none; max-width: 100px"
    >
      <div style="color: #939393">
        <q-input
          style="color: #949494"
          label="test uid"
          v-model="uid"
          dense
          class="q-mb-sm"
        ></q-input>
      </div>
      <div>
        <button
          @click="login()"
          style="
            background-color: #fff;
            width: auto;
            font-size: 10px;
            border: 1px solid #949494;
            outline: none;
          "
        >
          uid로 로그인
        </button>
      </div>
      <div v-if="user">logged user: {{ user }}</div>
    </div>
    <!--//끝 test -->
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
    kakaoLogin() {
      if (window.Kakao.isInitialized()) {
        window.Kakao.Auth.login({
          scope: 'profile_image, account_email, profile_nickname',
          success: this.getProfile
        })
      }
    },
    getProfile(authObj) {
      window.Kakao.API.request({
        url: '/v2/user/me',
        success: (res) => {
          const kakao_account = res.kakao_account
          this.kLogin(kakao_account)
        }
      })
    },
    async kLogin(kakao_account) {
      console.log(kakao_account)
      await this.$axios
        .post('http://localhost:3000/api/user/login', {
          param: {
            user_email: kakao_account.email,
            user_thumbnail_url: kakao_account.profile.profile_image_url,
            user_nickname: kakao_account.profile.nickname
          }
        })
        .then((response) => {
          console.log(response)
          const isNew = response.data.isNew
          const userId = response.data.user_id
          let userThumbnail = response.data.user_thumbnail_url
          if (userThumbnail.startsWith('images/')) {
            userThumbnail = `${process.env.STATIC}/${userThumbnail}`
          }
          console.log(isNew)
          if (isNew == 0) {
            alert('로그인이 되었습니다 🥳')
            this.$router.push({
              path: `/`
            })
            const uid = parseInt(this.userId)
            this.user = {
              uid: uid,
              thumbUrl: userThumbnail
            }
          } else {
            setTimeout(() => {
              alert('커퍼즈 회원이 아닙니다. 회원가입먼저 진행해주세요🙏')
              this.$router.push({
                path: `/welcome`
                // params: { id: `${this.userId}` }
              })
            }, 700)
          }
        })
        .catch((ex) => {
          alert('서버에러입니다.')
          console.log(ex)
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
      this.$router.push('/')
    }
  }
})
</script>

<style lang="scss" scopped>
p {
  padding: 0;
  margin: 0;
}
.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 1330px;
  margin: 0 auto;
  min-height: 500px;
  height: calc(100vh - 170px);
  margin-top: 0px;
  .login-inner {
    display: flex;
    align-content: flex-start;
    align-items: flex-end;
    justify-content: center;
    padding: 20px 0px 20px 0px;
  }
  .left {
    flex-basis: 50%;
    margin-left: 13%;
    > p {
      margin: 0;
      padding: 0;
    }
    .user-useful {
      padding: 0;
      font-size: 45px;
      font-weight: 800;
      margin-bottom: 0;
      .hightlight {
        position: relative;
        z-index: 2;
        &.bold {
          font-style: bold;
        }
        &:after {
          position: absolute;
          z-index: 1;
          bottom: 3px;
          left: 0;
          display: block;
          content: '';
          background-color: #541300;
          opacity: 0.6;
          width: 100%;
          height: 20px;
        }
      }
    }
    .cuppers-desc {
      margin-top: 20px;
      font-size: 16px;
      font-weight: 500;
      color: #848484;
    }
  }
  .right {
    flex: 1;
    margin-left: 30px;
    .img-area {
      width: 300px;
      cursor: pointer;
      > img {
        width: 100%;
      }
    }
  }
}
</style>
