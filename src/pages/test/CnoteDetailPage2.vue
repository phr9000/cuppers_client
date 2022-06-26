<template>
  <q-page>
    <div class="cupping-writer-container">
      <!-- editor 영역 -->
      <div class="editor-container">
        <div class="title-area">
          <!-- title 영역 -->
          <div class="title-area-inner">
            <input
              type="text"
              placeholder="제목을 입력하세요"
              v-model="editor.title"
              class="input-box title"
              :readonly="!writeType"
            />
            <input
              type="text"
              placeholder="제목을 입력하세요"
              v-model="editor.description"
              class="input-box description"
              :readonly="!writeType"
            />
            <div class="writer-info flex column">
              <div class="date">{{ editor.created_at }}</div>
              <div clsss="user" style="margin-right: 15px">
                {{ editor.user }}
              </div>
            </div>
          </div>
          <!-- (상세페이지) 좋아요, 북마크 영역 -->
          <div class="btns_wrap row no-wrap">
            <div class="btn_like_wrap">
              <btn-like
                :user_id="cnote.user_id"
                :id_what="cnote.cnote_id"
                like_what="cnote"
                :is_liked="cnote.user_cnote_liked"
                :likeit_cnt="cnote.cnote_liked_cnt"
              />
            </div>
            <div class="btn_bookmark_wrap">
              <btn-book-mark
                :user_id="cnote.user_id"
                :cnote_id="cnote.cnote_id"
                :is_marked="cnote.user_cnote_marked"
              />
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
            <div class="content-inner">
              <textarea
                class="contents"
                v-model="editor.content"
                :readonly="!writeType"
              >
              </textarea>
            </div>
          </div>
          <div class="bottom">
            <!-- 선택한 사진 영역 -->
            <div class="img-container">
              <h3 class="title">선택한 사진</h3>
              <div class="img-inner">
                <swiper
                  class="imgSwiper"
                  ref="mySwiper"
                  :options="swiperOption"
                  :pagination="{ type: 'progressbar' }"
                  :slides-per-view="2"
                  :space-between="10"
                >
                  <swiper-slide
                    v-for="cnoteImg in cnoteImgs"
                    :key="cnoteImg.images_cnote_id"
                  >
                    <img :src="cnoteImg.images_cnote_url" />
                  </swiper-slide>
                </swiper>
              </div>
            </div>
            <!--
            <div v-for="cnoteImg in cnoteImgs" :key="cnoteImg.images_cnote_id">
              <img :src="cnoteImg.images_cnote_url" />
            </div> -->
          </div>
        </div>
        <!-- 유저 소개 영역 -->
        <div class="user-card-container">
          <div class="user-card-inner" style="">
            <div class="profile-img"></div>
            <div class="user-email-area" style="line-height: 24px">
              test@gmail.com
            </div>
            <div class="desc" style="line-height: 24px; margin-bottom: 10px">
              여행자의 시선으로, 카페를 기록합니다.
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
import BtnLike from 'src/components/Button/BtnLike.vue'
import BtnBookMark from 'src/components/Button/BtnBookMark.vue'
// import CardCupNote from 'src/components/Card/CardCupNote.vue'
// import
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import SwiperCore, { Pagination } from 'swiper'
import 'swiper/scss'
import 'swiper/scss/pagination'
SwiperCore.use([Pagination])
export default {
  components: { BtnLike, BtnBookMark, Swiper, SwiperSlide },
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
          user_cnote_liked: true,
          cnote_liked_cnt: 142,
          user_cnote_marked: false
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
      editor: {
        title: '핸드드립을 맛있게 내리는 팁 - 2',
        user: 'test@gmail.com',
        created_at: 'Jun 22 2022',
        description: '지난 글에서 이야기 했던 것을 이어나가려 한다.',
        content:
          'Text in a pre element\nis displayed in a fixed-width\nifont, and it preserves\nboth  spaces and\niline breaksText in a pre element\nis displayed in a fixed-width\nifont, and it preserves\nboth  spaces and\niline breaks'
      },
      cnoteImgs: '',
      writeType: false,
      swiperOption: {
        slidesPerView: '2',
        spaceBetween: 10, // swiper-slide 사이의 간격 지정
        slidesOffsetBefore: 0, // slidesOffsetBefore는 첫번째 슬라이드의 시작점에 대한 변경할 때 사용
        slidesOffsetAfter: 0, // slidesOffsetAfter는 마지막 슬라이드 시작점 + 마지막 슬라이드 너비에 해당하는 위치의 변경이 필요할 때 사용
        freeMode: true, // freeMode를 사용시 스크롤하는 느낌으로 구현 가능
        centerInsufficientSlides: true, // 컨텐츠의 수량에 따라 중앙정렬 여부를 결정함,
        touchRatio: 0
      }
    }
  },
  created() {},
  mounted() {
    this.getcnoteDetail()
    this.getCnoteImg()
  },
  methods: {
    getcnoteDetail() {
      let apiUrl = 'http://localhost:3000/api/cnote/detail/7'
      this.$axios
        .get(apiUrl)
        .then((result) => {
          this.cnotedetail = result.data
          console.log(this.cnotedetail)
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
          console.log(this.cnoteImgs)
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
            font-size: 34px;
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
          .icon_fav {
            &.colored {
              color: #bdbdbd !important;
            }
          }
        }
      }
    }

    // content 영역
    .content-container {
      margin: 0 160px;
    }
    .content-area {
      width: 100%;
      height: 100%;
      .content-inner {
        // margin: 0 auto;
        padding: 20px 40px;
        padding-top: 100px;
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

    .bottom {
      padding: 0 40px;

      // 선택한 사진 영역
      .img-container {
        .title {
          padding: 0;
          font-size: 20px;
        }
        .img-inner {
          margin-bottom: 30px;
          display: flex;
          max-width: 900px;
          height: 300px;

          .img-area {
            position: relative;
            margin-right: 20px;
            width: 300px;
            border: 1px solid #ccc;
            border-radius: 18px;
            background-color: #fff;
            box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
              rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
            &:after {
              display: block;
              content: '';
              padding-bottom: 100%;
            }
            span {
              position: absolute;
              top: 10px;
              left: 10px;
            }
          }
        }
      }
      .cafe-card-container {
        margin-bottom: 20px;
        .card {
          height: 300px !important;
          .card_image {
            width: 300px;
            > div {
              padding-bottom: 56.25% !important;
            }
          }
          .absolute-full {
            height: 255px !important;
          }
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
          border: 1px solid #ccc;
          background-color: #003333;
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
  .swiper {
    height: 100%;
  }
  .imgSwiper {
    width: 900px;
    &:before,
    &:after {
      content: '';
      position: absolute;
      top: 0;
      z-index: 2;
      // width: 100px;
      height: 100%;
      background-color: white;
    }
    &:before {
      left: 0;
    }
    &:after {
      right: 0;
    }

    .swiper-wrapper {
      // align-items: stretch;
    }
    .swiper-slide {
      img {
        width: 100%;
      }
    }
  }
}
.swiper-pagination-progressbar {
  .swiper-pagination-progressbar-fill {
    border: 1px solid red;
  }
}
</style>
