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
              <h3 class="title">선택한 사진(슬라이드)</h3>
              <div class="img-inner">
                <div class="img-area"><span class="">img1</span></div>
                <div class="img-area"><span>img2</span></div>
                <div class="img-area"><span>img3</span></div>
              </div>
            </div>
            <!-- 커핑노트 카드 영역 -->
            <!-- 220622 회의때 의논하기 빼는게 더 나은거 같아서.. 아님 디자인 수정 !!!!!!! -->
            <ul style="display: none">
              <li class="cafe-card-container">
                <card-cup-note></card-cup-note>
              </li>
              <li class="cafe-card-container">
                <card-cup-note></card-cup-note>
              </li>
            </ul>
            <!-- 유저 소개 영역 -->
            <div class="user-card-container">
              <div class="user-card-inner" style="">
                <div class="profile-img"></div>
                <div class="user-email-area" style="line-height: 24px">
                  test@gmail.com
                </div>
                <div
                  class="desc"
                  style="line-height: 24px; margin-bottom: 10px"
                >
                  여행자의 시선으로, 카페를 기록합니다.
                </div>
                <div class="follow-btn">
                  <button class="btn">+ 팔로우</button>
                </div>
              </div>
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
import CardCupNote from 'src/components/Card/CardCupNote.vue'
export default {
  components: { BtnLike, BtnBookMark, CardCupNote },
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
      writeType: false
    }
  },
  created() {
    let apiUrl = 'http://localhost:3000//1'
    this.$axios
      .get(apiUrl)
      .then((result) => {
        this.cafe = result.data
        this.cafe.cafe_description = this.cafe.cafe_description.replace(
          '#',
          '<br>'
        )
        if (this.cafe.menu) {
          this.menuBrewing = this.cafe.menu.filter((m) => m.menu_type === 'br')
          this.menuVariation = this.cafe.menu.filter(
            (menu) => menu.menu_type !== 'br'
          )
        }
      })
      .catch((err) => {
        console.log(err)
      })
  },
  mounted() {
    let apiUrl = 'localhost:3000/api/cnote/detail/7'
    this.$axios
      .get(apiUrl)
      .then((result) => {
        this.cnotedetail = result.data
        console.log(this.cnotedtail)
      })
      .catch((err) => {
        console.log(err)
      })
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
      margin: 0 60px;
    }
    .content-area {
      width: 100%;
      height: 100%;
      .content-inner {
        margin: 0 auto;
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
        // height: 200px;
        margin: 0 auto;
        margin-bottom: 20px;
        padding-top: 0;
        width: 900px;
        border-radius: 18px;

        .title {
          padding: 0;
          font-size: 20px;
        }
        .img-inner {
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
      .user-card-container {
        position: relative;
        .user-card-inner {
          position: absolute;
          left: 0;
          height: 200px;
          padding: 20px;
          margin-bottom: 10px;
          border-radius: 18px;
          .profile-img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: 1px solid #ccc;
            background-color: #fefefe;
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
  }
}
</style>
