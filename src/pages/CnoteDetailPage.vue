<template>
  <q-page>
    <div class="cupping-writer-container">
      <!-- editor 영역 -->
      <div class="editor-container">
        <div
          class="title-area"
          v-bind:style="{ 'background-image': 'url(' + backgroundImg + ')' }"
        >
          <!-- title 영역 -->
          <div class="title-area-inner">
            <input
              type="text"
              placeholder="제목을 입력하세요"
              class="input-box title"
              :readonly="!writeType"
              v-model="cnote_title"
            />
            <div class="writer-info flex column">
              <div class="date">{{ created_at }}</div>
              <div clsss="user" style="margin-right: 15px">
                {{ user_nickname }}
              </div>
            </div>
          </div>
          <!-- (상세페이지) 좋아요, 북마크 영역 -->
          <div class="btns_wrap row no-wrap">
            <div class="btn_like_wrap">
              <!-- <btn-like
                :user="user"
                :id_what="cnote.cnote_id"
                like_what="cnote"
                :is_liked="cnote.user_liked"
                :likeit_cnt="cnote.like_cnt"
              /> -->
            </div>
          </div>
          <!-- dim -->
          <div class="dim"></div>
        </div>
        <!-- (등록페이지) 공개여부  -->
        <q-toggle
          class="public-btn"
          label="커핑노트 공개여부"
          v-if="writeType"
        />

        <!-- content 영역 -->
        <div class="content-container">
          <div class="content-area">
            <div v-html="content"></div>
          </div>
        </div>
        <!-- 유저 소개 영역 -->
        <div class="user-card-container">
          <div class="user-card-inner">
            <div class="profile-img">
              <q-img :src="user_thumbnail" alt="profile 사진" />
            </div>
            <div class="user-email-area" style="line-height: 24px">
              {{ user_email }}
            </div>
            <div class="desc" style="line-height: 24px; margin-bottom: 10px">
              {{ user_introduce }}
            </div>
            <div class="follow-btn">
              <button class="btn">+ 팔로우</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref } from 'vue'
// import BtnLike from 'src/components/Button/BtnLike.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'
import { userInfo } from '../store/auth/getters'
// swiper
export default {
  components: {
    // BtnLike
  },
  setup() {
    const $store = useStore()

    const user = computed({
      get: () => $store.state.auth.user
    })

    return {
      user
    }
  },
  props: {
    cnote: {
      type: Object,
      default: () => {
        return null
      }
    }
  },
  data() {
    return {
      // cnote로 묶어주기
      cnote_title: '',
      user_introduce: '',
      created_at: '',
      content: '',
      cnoteImgs: '',
      writeType: false,
      isLiked: true,
      backgroundImg: '',
      cnoteId: null,
      userId: '',
      user_email: '',
      user_thumbnail: '',
      user_nickname: ''
    }
  },
  computed: {},
  async created() {
    this.cnoteId = this.$route.params.id
    setTimeout(() => {
      this.getcnoteDetail(this.cnoteId)
    }, 100)
    this.getcnoteDetail()
    this.getCnoteImg()
  },
  mounted() {
    this.getcnoteDetail()
    this.getCnoteImg()
  },
  methods: {
    getcnoteDetail(cnoteId) {
      let apiUrl = `http://localhost:3000/api/cnote/detail/${cnoteId}`
      this.$axios
        .get(apiUrl)
        .then((result) => {
          this.cnotedetail = result.data
          // 데이터베이스에서 받아온 content v-html 에 담아서 사용
          this.content = this.cnotedetail[0].cnote_content
          this.cnote_title = this.cnotedetail[0].cnote_title
          this.created_at = this.cnotedetail[0].created_at.substring(0, 10)
          this.userId = this.cnotedetail[0].user_id
          this.backgroundImg = this.cnotedetail[0].cnote_img
          this.getUserInfo(this.userId)
          this.cnoteLike(this.userId, this.cnoteId)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getUserInfo(userId) {
      let apiUrl = `http://localhost:3000/api/user/detail/${userId}`
      this.$axios
        .get(apiUrl)
        .then((result) => {
          this.userInfo = result.data[0]
          this.user_nickname = this.userInfo.user_nickname
          this.user_email = this.userInfo.user_email
          this.user_introduce = this.userInfo.user_introduce
          this.user_thumbnail = this.userInfo.user_thumbnail_url
        })
        .catch((err) => {
          console.log(err)
        })
    },
    //좋아요버튼
    cnoteLike(userid, cnoteid) {
      let apiUrl = `http://localhost:3000/api/cnote/like/${userid}/${cnoteid}`
      console.log(apiUrl)
      this.$axios
        .get(apiUrl)
        .then((result) => {
          console.log(result)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getCnoteImg() {
      let apiUrl = 'http://localhost:3000/api/cnote/img/7'
      this.$axios
        .get(apiUrl)
        .then((result) => {
          this.cnoteImgs = result.data
          // console.log(this.cnoteImgs)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.cupping-writer-container {
  width: 100%;
  // height: 100%;

  // editor container
  .editor-container {
    width: 100%;
    // title 영역
    .title-area {
      font-family: 'Nanum Myeongjo';
      // font-weight: 600;
      position: relative;
      z-index: 1;
      width: 100%;
      max-height: 840px;
      // background-color: pink;
      border-bottom: 1px solid #cccc;
      overflow: hidden;
      background-image: url('https://wishbeen-seoul.s3.ap-northeast-2.amazonaws.com/plan/1498208096160_17881746_1930702927147954_3202367211201101824_n.jpg');
      background-repeat: no-repeat;
      background-size: 100% auto;
      background-attachment: fixed;
      &:after {
        display: block;
        content: '';
        padding-bottom: 56.25%;
        max-height: 840px;
      }
      .title-area-inner {
        width: 100%;
        position: absolute;
        z-index: 100;
        bottom: 9.285%;
        left: 50%;
        transform: translate(-50%, 0);
        z-index: 3;
        .input-box {
          width: 100%;
          border: none;
          text-align: center;
          background-color: transparent;
          color: #fff;
          &:focus {
            outline: none;
          }
          &.title {
            left: 0;
            font-size: 38px;
          }
          &.description {
            left: 0;
            font-size: 16px;
            bottom: 0px;
            left: 0;
          }
        }
        .writer-info {
          position: absolute;
          bottom: -60%;
          right: 20px;
          // transform: translate(-50%, 0);
          color: #fff;
          opacity: 0.8;
          .user {
            margin-right: 15px;
          }
        }
      }
    }
    .dim {
      position: absolute;
      z-index: 1;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
    }
    // 좋아요, 북마크 영역
    .btns_wrap {
      position: absolute;
      top: 15px;
      right: 21.1px;
      z-index: 101;
      // .btn_like_wrap {
      //   :deep(.btn_like) {
      //     &:hover {
      //       color: #bdbdbd;
      //       .icon_fav,
      //       .likeit_cnt {
      //         color: #bdbdbd;
      //       }
      //     }
      //     ::v-deep .icon_fav {
      //       color: #bdbdbd;
      //     }
      //     ::v-deep .icon_fav {
      //       ::v-deep &.colored {
      //         color: #bdbdbd;
      //       }
      //     }
      //     .likeit_cnt {
      //       color: #bdbdbd;
      //       ::v-deep &.colored {
      //         color: #bdbdbd;
      //       }
      //     }
      //   }
      // }
    }
    // .likeit_wrap {
    //   &:hover {
    //     ::v-deep .icon_fav {
    //       color: #bdbdbd;
    //     }
    //   }

    //   ::v-deep .icon_fav {
    //     ::v-deep &.colored {
    //       color: #bdbdbd !important;
    //     }
    //   }
    // }

    // content 영역
    .content-container {
      margin: 0 160px;
    }
    .content-area {
      padding: 60px 0;
      width: 100%;
      height: 100%;
      .content-inner {
        // margin: 0 auto;
        padding: 20px 40px;
        padding-top: 80px;
        width: 991px;

        // TODO: textarea 높이 스크립트 바꿔야됨 지금은 스크롤 생김
        .contents {
          width: 100%;
          min-height: 200px; // 임의로 글자 높이에 맞춰 설정함
          height: auto !important;
          border: none;
          // overflow: auto;
          outline: none;
          -webkit-box-shadow: none;
          -moz-box-shadow: none;
          box-shadow: none;
          resize: none; /*remove the resize handle on the bottom right*/
        }
      }
    }
    .user-card-container {
      width: 100%;
      padding: 20px;
      background-color: #eaeaea;
      .user-card-inner {
        // position: absolute;
        margin-left: 10%;
        height: 200px;
        padding: 20px;
        margin-bottom: 10px;
        border-radius: 18px;
        .profile-img {
          width: 50px;
          height: 50px;
          margin-bottom: 5px;
          border-radius: 50%;
          // border: 1px solid #ccc;
          // background-color: #003333;
          overflow: hidden;
          > img {
            width: 100%;
          }
        }
        .follow-btn {
          .btn {
            cursor: pointer;
            background-color: #000;
            color: #fff;
            border-radius: 10px;
          }
        }
      }
    }
  }
  .date {
    font-weight: 600;
  }
  .footer_global {
    display: none !important;
  }
}
</style>
