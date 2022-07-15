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
              <div clsss="user" style="margin-right: 15px">{{ user }}</div>
            </div>
          </div>
          <!-- (상세페이지) 좋아요, 북마크 영역 -->
          <div class="btns_wrap row no-wrap">
            <div class="btn_like_wrap">
              <btn-like
                :user_id="cnote.user_id"
                :id_what="cnote.cnote_id"
                like_what="cnote"
                :is_liked="cnote.user_liked"
                :likeit_cnt="cnote.like_cnt"
              />
            </div>
            <!-- <div class="btn_bookmark_wrap">
              <btn-book-mark
                :user_id="cnote.user_id"
                :cnote_id="cnote.cnote_id"
                :is_marked="cnote.user_marked"
              />
            </div> -->
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
              <q-img src="/icons/hacker.png" alt="profile 사진" />
            </div>
            <div class="user-email-area" style="line-height: 24px">
              {{ user }}
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
import BtnLike from 'src/components/Button/BtnLike.vue'
// import BtnBookMark from 'src/components/Button/BtnBookMark.vue'
// swiper
export default {
  components: {
    BtnLike
    // BtnBookMark
  },
  props: {
    cnote: {
      type: Object,
      default: () => {
        return {
          cnote_id: 1,
          user_id: 1,
          cnote_title: '한 잔의 커피는 나의 아낭케',
          user_name: '동글동글동글이',
          user_thumbnail:
            'https://lh3.googleusercontent.com/a-/AOh14GggDZ_vzX_GCd3BjndXJiua3NszhmGTdr-CK82pLcU=s83',
          cnote_content:
            '오늘도 정량을 비운 커피잔엔 내일 마실 한 잔의 커피를 그리워하는 마음이 말라버린 거품으로 남았다.오늘도 정량을 비운 커피잔엔 내일 마실 한 잔의 커피를 그리워하는 마음이 말라버린 거품으로 남았다.',
          cnote_thumbnail:
            'https://cdn.mhns.co.kr/news/photo/202103/502451_604128_1858.jpg',
          created_at: '2022-06-10T10:58:54.000Z',
          user_liked: 1,
          like_cnt: 142,
          user_marked: 0
        }
      }
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper
    }
  },
  data() {
    return {
      cnote_title: '',
      user: '',
      user_introduce: '',
      created_at: '',
      content: '',
      cnoteImgs: '',
      writeType: false,
      isLiked: true,
      backgroundImg: '',
      cnoteId: null
    }
  },
  async created() {
    this.cnoteId = this.$route.params.id
    setTimeout(() => {
      this.getcnoteDetail(this.cnoteId)
    }, 100)
    this.getcnoteDetail()
    this.getCnoteImg()
    this.getUserInfo()
  },
  mounted() {
    this.getcnoteDetail()
    this.getCnoteImg()
    this.getUserInfo()
  },
  methods: {
    getcnoteDetail(cnoteId) {
      let apiUrl = `http://localhost:3000/api/cnote/detail/${cnoteId}`
      console.log('here')
      console.log(apiUrl)
      this.$axios
        .get(apiUrl)
        .then((result) => {
          this.cnotedetail = result.data
          // 데이터베이스에서 받아온 content v-html 에 담아서 사용
          this.content = this.cnotedetail[0].cnote_content
          this.cnote_title = this.cnotedetail[0].cnote_title
          this.created_at = this.cnotedetail[0].created_at.substring(0, 10)
          this.user_id = this.cnotedetail[0].user_id
          this.backgroundImg = this.cnotedetail[0].cnote_img
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getUserInfo() {
      let apiUrl = 'http://localhost:3000/api/user/detail/3'
      this.$axios
        .get(apiUrl)
        .then((result) => {
          this.userInfo = result.data
          this.user = this.userInfo[0].user_email
          this.user_introduce = this.userInfo[0].user_introduce
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
      .btn_like_wrap {
        .btn_like {
          ::v-deep &:hover {
            color: #bdbdbd;
            .icon_fav,
            .likeit_cnt {
              color: #bdbdbd;
            }
          }
          ::v-deep .icon_fav {
            color: #bdbdbd;
          }
          ::v-deep .icon_fav {
            ::v-deep &.colored {
              color: #bdbdbd;
            }
          }
          .likeit_cnt {
            color: #bdbdbd;
            ::v-deep &.colored {
              color: #bdbdbd;
            }
          }
        }
      }
    }
    .likeit_wrap {
      &:hover {
        ::v-deep .icon_fav {
          color: #bdbdbd;
        }
      }

      ::v-deep .icon_fav {
        ::v-deep &.colored {
          color: #bdbdbd !important;
        }
      }
    }

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
