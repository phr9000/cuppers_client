<template>
  <div class="welcome-user-container">
    <div class="user-info-container">
      <!-- user thumbnail -->
      <div class="pic">
        <img :src="thumnail" alt="" />
      </div>
      <!-- user nickname -->
      <div class="user-name">{{ nickname }} 님 안녕하세요!</div>
      <div class="which">
        <div class="coffee">어떤 커피를 선호하세요?</div>
        <div class="cafe">어떤 카페를 찾고 계세요?</div>
        <div class="desc">
          설문조사를 기반으로 취향에 맞는 카페를 추천해드려요
        </div>
      </div>
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
export default {
  data() {
    return {
      userId: '3',
      thumnail:
        'http://k.kakaocdn.net/dn/d1t0Y3/btrFLDKumH5/UAJNJRs8AQ9CPtJ2UiK27k/img_640x640.jpg',
      nickname: '해람',
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
    goToSurvey() {
      this.$router.push('/signup')
    }
  },
  created() {
    setTimeout(this.typeText, this.newTextDelay + 200)
  }
  // async created() {
  //   this.userId = '44'
  //   setTimeout(() => {
  //     this.getUserDetail(this.userId)
  //   }, 100)
  //   this.getUserDetail()
  // },
  // mounted() {
  //   this.getUserDetail()
  // },
  // methods: {
  //   getUserDetail(userId) {
  // let apiUrl = `http://localhost:3000/api/cnote/detail/${userId}`
  // console.log('here')
  // console.log(apiUrl)
  // this.$axios
  //   .get(apiUrl)
  //   .then((result) => {
  //     this.cnotedetail = result.data
  //     // 데이터베이스에서 받아온 content v-html 에 담아서 사용
  //     this.content = this.cnotedetail[0].cnote_content
  //     this.cnote_title = this.cnotedetail[0].cnote_title
  //     this.created_at = this.cnotedetail[0].created_at.substring(0, 10)
  //     this.user_id = this.cnotedetail[0].user_id
  //     this.backgroundImg = this.cnotedetail[0].cnote_img
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //   })
  // }
  // }
}
</script>
<style lang="scss" scoped>
.welcome-user-container {
  max-width: 1440px;
  margin: 0 auto;
  .user-info-container {
    width: 500px;
    height: 650px;
    margin: 60px auto;
    margin-top: 40px;
    padding: 20px;
    padding-top: 45px;
    text-align: center;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
      rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    border-radius: 10px;
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
      border: 4px solid #4374d9;
      > img {
        width: 100%;
      }
    }
    // user nickname
    .user-name {
      padding-top: 20px;
      font-size: 30px;
      font-weight: 600;
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
      h2 {
        font-size: 35px;
        font-weight: normal;

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
      margin-top: 40px;
      .btn {
        animation: goToSurvey 1.5s /* 속도 */ linear 0s
          /* 처음부터 끝까지 일정 속도로 진행 */ infinite alternate; /* 무한 반복 */
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
