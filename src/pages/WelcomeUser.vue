<template>
  <div class="welcome-user-container">
    <div class="user-info-container">
      <!-- user thumbnail -->
      <div class="pic">
        <img :src="user.thumbUrl" alt="" />
      </div>
      <!-- user nickname -->
      <div class="user-name">
        <input
          class="input-box"
          v-model="userInfo.nickname"
          placeholder="스페셜티 커피 전문가2"
          ref="nickname"
        />
        <p class="input-desc-area">
          <span class="input-desc"
            ><span class="required-red">*</span> 닉네임을 정해주세요</span
          >
        </p>
      </div>
      <div class="user-introduce">
        <input
          class="input-box"
          v-model="userInfo.introduce"
          placeholder="커피 질문은 메일로만 부탁드려요~🙏🙏"
        />
        <p class="input-desc-area">
          <span class="input-desc">나를 한줄로 소개해주세요</span>
        </p>
      </div>
      <!-- <div class="which">
        <div class="coffee">어떤 커피를 선호하세요?</div>
        <div class="cafe">어떤 카페를 찾고 계세요?</div>
      </div> -->
      <div class="answer">
        <h2>
          나는 <br />
          <span class="typed-text">{{ typeValue }}</span>
          <span class="cursor" :class="{ typing: typeStatus }">&nbsp;</span>
          <p>를 선호한다</p>
        </h2>
      </div>
      <div class="survey-btn-area">
        <q-btn class="btn" @click="goToSurvey()">설문조사 하러 가기</q-btn>
      </div>
    </div>
  </div>
</template>
<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
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
      // userId: null,
      userInfo: {
        nickname: '',
        introduce: ''
      },
      // thumnail: '',
      typeValue: '',
      typeStatus: false,
      typeArray: [
        ' 스페셜티커피',
        '에스프레소',
        '분위기 좋은 카페',
        '사진 찍기 좋은 카페'
      ],
      typingSpeed: 200,
      erasingSpeed: 100,
      newTextDelay: 2000,
      typeArrayIndex: 0,
      charIndex: 1
    }
  },
  methods: {
    // getUserInfo(userId) {
    //   let apiUrl = `http://localhost:3000/api/user/detail/${userId}`
    //   this.$axios
    //     .get(apiUrl)
    //     .then((result) => {
    //       this.thumnail = result.data[0].user_thumbnail_url
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //     })
    // },
    typeText() {
      if (this.charIndex < this.typeArray[this.typeArrayIndex].length) {
        if (!this.typeStatus) this.typeStatus = true

        this.typeValue += this.typeArray[this.typeArrayIndex].charAt(
          this.charIndex
        )
        this.charIndex += 1

        setTimeout(this.typeText, this.typingSpeed)
      } else {
        this.typeStatus = false
        setTimeout(this.eraseText, this.newTextDelay)
      }
    },
    eraseText() {
      if (this.charIndex > 0) {
        if (!this.typeStatus) this.typeStatus = true
        this.typeValue = this.typeArray[this.typeArrayIndex].substring(
          0,
          this.charIndex - 1
        )
        this.charIndex -= 1
        setTimeout(this.eraseText, this.erasingSpeed)
      } else {
        this.typeStatus = false
        this.typeArrayIndex += 1
        if (this.typeArrayIndex >= this.typeArray.length)
          this.typeArrayIndex = 0

        setTimeout(this.typeText, this.typingSpeed + 1000)
      }
    },
    checkNickName() {
      this.$axios
        .post('http://localhost:3000/api/user/nickname', {
          param: {
            user_id: this.user.uid,
            user_nickname: this.userInfo.nickname,
            user_introduce: this.userInfo.introduce
          }
        })
        .then((response) => {
          if (response.statusText === 'OK' && response.data.isNew == 1) {
            console.log(response)
            this.user = {
              uid: this.user.uid,
              nickname: response.data.user_nickname,
              thumbUrl: this.user.thumbUrl
            }

            this.$q.notify({
              position: 'top',
              timeout: 1000,
              message: '성공적으로 등록 되었습니다',
              color: 'primary'
            })
            this.$router.push({
              path: `/welcome/survey`
              // path: `/welcome/survey/${this.userId}`,
              // params: { id: `${this.userId}` }
            })
          } else {
            console.log('닉네임 중복입니다.')
            this.$q.notify({
              position: 'top',
              timeout: 1000,
              message: '닉네임 중복입니다. 다른 닉네임으로 입력해주세요.',
              color: 'primary'
            })
          }
        })
        .catch((ex) => {
          this.$q.notify({
            position: 'top',
            timeout: 1000,
            message: '아이디를 등록하는데 문제가 생겼습니다.',
            color: 'primary'
          })
          console.log(ex)
        })
      return false
    },
    goToSurvey() {
      if (
        this.userInfo.nickname === '' ||
        this.userInfo.nickname === null ||
        this.userInfo.nickname === 0
      ) {
        this.$q.notify({
          position: 'top',
          timeout: 1000,
          message: '닉네임을 입력해주세요',
          color: 'primary'
        })
        this.$refs.nickname.focus()
        return false
      } else {
        this.checkNickName()
      }
    },
    nicknameFocus() {
      this.$refs.nickname.focus()
    }
  },
  created() {
    setTimeout(this.typeText, this.newTextDelay + 200)
    // 파라미터로 받아온 id
    // this.userId = this.$route.params.id
    // console.log(this.userId)
    // this.getUserInfo(this.userId)
    // console.log(this.user)
  },
  mounted() {
    this.nicknameFocus()
  }
}
</script>
<style lang="scss" scoped>
.welcome-user-container {
  max-width: 1440px;
  margin: 0 auto;
  .user-info-container {
    width: 500px;
    height: 630px;
    margin: 60px auto;
    margin-top: 40px;
    padding: 20px;
    padding-top: 45px;
    text-align: center;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
      rgba(0, 0, 0, 0.3) 5px 3px 7px -3px;
    border-radius: 23px;
    @media (max-width: 700px) {
      width: 100%;
      box-shadow: none;
    }
    // user thumnail
    .pic {
      width: 100px;
      height: 100px;
      margin: 0 auto;
      border-radius: 50%;
      overflow: hidden;
      border: 4px solid #848484;
      > img {
        width: 100%;
      }
    }
    // user nickname
    .user-name {
      padding-top: 20px;
      padding-bottom: 5px;
      font-weight: 600;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .input-desc-area {
      font-size: 14px;
      font-weight: 500;
      .required-red {
        color: red;
        font-weight: 600;
      }
    }
    .input-box {
      border: none;
      text-align: center;
      font-size: 25px;
      display: inline-block;

      &::placeholder {
        color: #bdbdbd;
        font-weight: 500;
      }
    }
    .input-desc {
      position: relative;
      z-index: 2;
      display: inline-block;
      color: #000;
      &:after {
        display: block;
        content: '';
        position: absolute;
        z-index: 1;
        width: 100%;
        height: 6px;
        background-color: #50a3a4;
        opacity: 0.4;
        bottom: 4px;
        left: 0;
      }
    }
    .user-introduce {
      font-size: 15px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .which {
      padding-top: 15px;
      color: #8c8c8c;
      font-size: 14px;
      font-weight: 600;
      .cafe {
        color: #bdbdbd;
      }
    }
    .answer {
      margin-top: 20px;
      h2 {
        font-size: 35px;
        font-weight: normal;
        line-height: 3.4rem;
        margin-top: 2px;

        span.typed-text {
          color: #d2b94b;
          display: inline-block;
        }

        span.cursor {
          display: inline-block;
          margin-left: 3px;
          width: 3px;
          background-color: #fff;
          animation: cursorBlink 1s infinite;
        }

        span.cursor.typing {
          animation: none;
        }
      }
    }
    .desc {
      font-size: 12px;
      margin-top: 5px;
      color: #c3c3c3;
    }
    .survey-btn-area {
      margin-top: 45px;
      .btn {
        border-radius: 23px;
        padding: 7px 20px;
        background-color: #000;
        color: #fff;
        font-weight: 600;
        font-size: 14px;
        // animation: goToSurvey 1.5s /* 속도 */ linear 0s
        //   /* 처음부터 끝까지 일정 속도로 진행 */ infinite alternate; /* 무한 반복 */
      }
    }
  }
}

@keyframes cursorBlink {
  49% {
    background-color: #242424;
  }
  50% {
    background-color: transparent;
  }
  90% {
    background-color: transparent;
  }
}

@keyframes goToSurvey {
  0% {
    margin-top: 0px;
  } /* 처음 위치 */
  100% {
    margin-top: 5px;
  } /* 마지막 위치 */
}
</style>
