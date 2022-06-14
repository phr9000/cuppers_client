<template>
  <div>
    <swiper
      :slides-per-view="3"
      :space-between="50"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <swiper-slide>
        <li>
          <div class="wrap_pic PC_DISCOVER_B2">
            <div class="item_pic item_pic_type1">
              <a
                href="/"
                class="link_item #home_discover"
                target="_blank"
                data-tiara-action-name="TOP > 추천 콘텐츠 영역 클릭"
                data-tiara-action-kind="ClickContent"
                data-tiara-layer="recommended_article"
                data-tiara-id="@@"
                data-tiara-click_url="/"
                data-tiara-setnum="4"
                data-tiara-copy="쌀국수 한 그릇의
가치
"
              >
                <img
                  src="https://images.immediate.co.uk/production/volatile/sites/30/2022/04/Iced-Caramel-Macchiato-f4a10f9.jpg"
                  class="img_pic"
                  alt="쌀국수 한 그릇의<br>가치<br>"
                />

                <div class="append_info">
                  <div class="info_g">
                    <div class="inner_g">
                      <em class="cate_pic"></em>
                      <strong class="tit_pic">{{
                        cafeData[0].cafe_name_pr
                      }}</strong>
                      <span class="txt_pic">{{
                        cafeData[0].cafe_description
                      }}</span>
                      <span class="info_by">{{ cafeData[0].cafe_region }}</span>
                    </div>
                  </div>
                  <div class="align_g"></div>
                </div>
                <div class="mask"></div>
              </a>
            </div>

            <div class="item_pic item_pic_type2">
              <a
                href="/@@7Yl/596"
                class="link_item #home_discover"
                target="_blank"
                data-tiara-action-name="TOP > 추천 콘텐츠 영역 클릭"
                data-tiara-action-kind="ClickContent"
                data-tiara-layer="recommended_article"
                data-tiara-id="@@"
                data-tiara-click_url="/@@7Yl/596"
                data-tiara-setnum="5"
                data-tiara-copy="둘째가 태어난 뒤
첫째의 충격적인 말
"
              >
                <img
                  src="//img1.daumcdn.net/thumb/C320x520.fjpg/?fname=https://t1.daumcdn.net/section/oc/5fa226153eb945489e14772a7c48d31d"
                  class="img_pic"
                  alt="둘째가 태어난 뒤<br>첫째의 충격적인 말<br>"
                />

                <div class="append_info">
                  <div class="info_g">
                    <div class="inner_g">
                      <em class="cate_pic"></em>
                      <strong class="tit_pic"
                        >둘째가 태어난 뒤<br />첫째의 충격적인 말<br
                      /></strong>
                      <span class="txt_pic"
                        >6월 2일 새벽 1시 무렵. 첫째가<br />울먹이며 말했다.
                        무슨 안 좋은...</span
                      >
                      <span class="info_by"
                        ><span class="ico_by">by</span> 작가 김연지</span
                      >
                    </div>
                  </div>
                  <div class="align_g"></div>
                </div>
                <div class="mask"></div>
              </a>
            </div>

            <div class="item_pic item_pic_type3">
              <a
                href="/@@eblK/9"
                class="link_item #home_discover"
                target="_blank"
                data-tiara-action-name="TOP > 추천 콘텐츠 영역 클릭"
                data-tiara-action-kind="ClickContent"
                data-tiara-layer="recommended_article"
                data-tiara-id="@@"
                data-tiara-click_url="/@@eblK/9"
                data-tiara-setnum="6"
                data-tiara-copy="캠핑 밴에 사는
골드코스트의 히피들
"
              >
                <img
                  src="//img1.daumcdn.net/thumb/C320x520.fjpg/?fname=https://t1.daumcdn.net/section/oc/2359e14af9dd4270bfd02276dbabcc21"
                  class="img_pic"
                  alt="캠핑 밴에 사는<br>골드코스트의 히피들<br>"
                />

                <div class="append_info">
                  <div class="info_g">
                    <div class="inner_g">
                      <em class="cate_pic"></em>
                      <strong class="tit_pic"
                        >캠핑 밴에 사는<br />골드코스트의 히피들<br
                      /></strong>
                      <span class="txt_pic"
                        >호주의 골드코스트에는 캠핑 밴을 가진<br />사람이 많다.
                        특히나 직업도 없...</span
                      >
                      <span class="info_by"
                        ><span class="ico_by">by</span> 인생 탐험가</span
                      >
                    </div>
                  </div>
                  <div class="align_g"></div>
                </div>
                <div class="mask"></div>
              </a>
            </div>
          </div>
        </li>
      </swiper-slide>
      <swiper-slide>
        <li>
          <div class="wrap_pic PC_DISCOVER_D">
            <div class="item_pic item_pic_type1">
              <a
                href="/@@edg5/14"
                class="link_item #home_discover"
                target="_blank"
                data-tiara-action-name="TOP > 추천 콘텐츠 영역 클릭"
                data-tiara-action-kind="ClickContent"
                data-tiara-layer="recommended_article"
                data-tiara-id="@@"
                data-tiara-click_url="/@@edg5/14"
                data-tiara-setnum="7"
                data-tiara-copy="엄마는 김경호가
되었다
"
              >
                <img
                  src="//img1.daumcdn.net/thumb/C480x260.fjpg/?fname=https://t1.daumcdn.net/section/oc/41d79dc96e08488e9c23b900d1866a2c"
                  class="img_pic"
                  alt="엄마는 김경호가<br>되었다<br>"
                />

                <div class="append_info">
                  <div class="info_g">
                    <div class="inner_g">
                      <em class="cate_pic"></em>
                      <strong class="tit_pic"
                        >엄마는 김경호가<br />되었다<br
                      /></strong>
                      <span class="txt_pic"
                        >사촌동생이 집에 놀러 와 있던<br />날이었다. 명목상
                        손님이라고는 ...</span
                      >
                      <span class="info_by"
                        ><span class="ico_by">by</span> 홍시스프</span
                      >
                    </div>
                  </div>
                  <div class="align_g"></div>
                </div>
                <div class="mask"></div>
              </a>
            </div>

            <div class="item_pic item_pic_type2">
              <a
                href="/@@9vaW/26"
                class="link_item #home_discover"
                target="_blank"
                data-tiara-action-name="TOP > 추천 콘텐츠 영역 클릭"
                data-tiara-action-kind="ClickContent"
                data-tiara-layer="recommended_article"
                data-tiara-id="@@"
                data-tiara-click_url="/@@9vaW/26"
                data-tiara-setnum="8"
                data-tiara-copy="김밥에 꾹꾹 눌러
담은 엄마의 마음
"
              >
                <img
                  src="//img1.daumcdn.net/thumb/C480x260.fjpg/?fname=https://t1.daumcdn.net/section/oc/4755552ba71841c6beb2432ac89d0ba8"
                  class="img_pic"
                  alt="김밥에 꾹꾹 눌러<br>담은 엄마의 마음<br>"
                />

                <div class="append_info">
                  <div class="info_g">
                    <div class="inner_g">
                      <em class="cate_pic"></em>
                      <strong class="tit_pic"
                        >김밥에 꾹꾹 눌러<br />담은 엄마의 마음<br
                      /></strong>
                      <span class="txt_pic"
                        >길을 걷다 마주한 노점상에서 마지막<br />떨이 우엉이
                        발걸음을 멈춰 세웠...</span
                      >
                      <span class="info_by"
                        ><span class="ico_by">by</span> sera yoon</span
                      >
                    </div>
                  </div>
                  <div class="align_g"></div>
                </div>
                <div class="mask"></div>
              </a>
            </div>

            <div class="item_pic item_pic_type3">
              <a
                href="/@@3lfh/46"
                class="link_item #home_discover"
                target="_blank"
                data-tiara-action-name="TOP > 추천 콘텐츠 영역 클릭"
                data-tiara-action-kind="ClickContent"
                data-tiara-layer="recommended_article"
                data-tiara-id="@@"
                data-tiara-click_url="/@@3lfh/46"
                data-tiara-setnum="9"
                data-tiara-copy="주택 말고 주거"
              >
                <img
                  src="//img1.daumcdn.net/thumb/C480x260.fjpg/?fname=https://t1.daumcdn.net/section/oc/66173e0fe4c043fd81030aad072aeb23"
                  class="img_pic"
                  alt="주택 말고 주거"
                />

                <div class="append_info">
                  <div class="info_g">
                    <div class="inner_g">
                      <em class="cate_pic"></em>
                      <strong class="tit_pic">주택 말고 주거</strong>
                      <span class="txt_pic"
                        >대부분의 사람들이 단독주택을 짓고<br />싶어서요,
                        다가구주택을 짓고 싶...</span
                      >
                      <span class="info_by"
                        ><span class="ico_by">by</span> 탐미꾼</span
                      >
                    </div>
                  </div>
                  <div class="align_g"></div>
                </div>
                <div class="mask"></div>
              </a>
            </div>

            <div class="item_pic item_pic_type4">
              <a
                href="/@@4gDG/18"
                class="link_item #home_discover"
                target="_blank"
                data-tiara-action-name="TOP > 추천 콘텐츠 영역 클릭"
                data-tiara-action-kind="ClickContent"
                data-tiara-layer="recommended_article"
                data-tiara-id="@@"
                data-tiara-click_url="/@@4gDG/18"
                data-tiara-setnum="10"
                data-tiara-copy="콩알 세 쪽이 내게
준 가르침
"
              >
                <img
                  src="//img1.daumcdn.net/thumb/C480x260.fjpg/?fname=https://t1.daumcdn.net/section/oc/0ef4229cf9b54d618913f3018bba282e"
                  class="img_pic"
                  alt="콩알 세 쪽이 내게<br>준 가르침<br>"
                />

                <div class="append_info">
                  <div class="info_g">
                    <div class="inner_g">
                      <em class="cate_pic"></em>
                      <strong class="tit_pic"
                        >콩알 세 쪽이 내게<br />준 가르침<br
                      /></strong>
                      <span class="txt_pic"
                        >아이가 학교 과제라며 강낭콩 세 알을<br />가지고 왔다.
                        강낭콩을 심은 후...</span
                      >
                      <span class="info_by"
                        ><span class="ico_by">by</span> 지뉴</span
                      >
                    </div>
                  </div>
                  <div class="align_g"></div>
                </div>
                <div class="mask"></div>
              </a>
            </div>
          </div>
        </li>
      </swiper-slide>
      <swiper-slide>
        <!-- <li>
          <div class="wrap_pic PC_DISCOVER_A">
            <div class="item_pic item_pic_type1">
              <a
                href="/@@bzeN/59"
                class="link_item #home_discover"
                target="_blank"
                data-tiara-action-name="TOP > 추천 콘텐츠 영역 클릭"
                data-tiara-action-kind="ClickContent"
                data-tiara-layer="recommended_article"
                data-tiara-id="@@"
                data-tiara-click_url="/@@bzeN/59"
                data-tiara-setnum="11"
                data-tiara-copy="시골 콩국수는
이렇게 만듭니다
"
              >
                <img
                  src="//img1.daumcdn.net/thumb/C520x520.fjpg/?fname=https://t1.daumcdn.net/section/oc/ab3848ca65d3409ba7cbd2d2431ff419"
                  class="img_pic"
                  alt="시골 콩국수는<br>이렇게 만듭니다<br>"
                />

                <div class="append_info">
                  <div class="info_g">
                    <div class="inner_g">
                      <em class="cate_pic"></em>
                      <strong class="tit_pic"
                        >시골 콩국수는<br />이렇게 만듭니다<br
                      /></strong>
                      <span class="txt_pic"
                        >엄마가 만들어주는 걸쭉하지 않은<br />콩국수를 좋아한다.
                        가끔 콩국수...</span
                      >
                      <span class="info_by"
                        ><span class="ico_by">by</span> 보리똥</span
                      >
                    </div>
                  </div>
                  <div class="align_g"></div>
                </div>
                <div class="mask"></div>
              </a>
            </div>

            <div class="item_pic item_pic_type2">
              <a
                href="/@@IrL/29"
                class="link_item #home_discover"
                target="_blank"
                data-tiara-action-name="TOP > 추천 콘텐츠 영역 클릭"
                data-tiara-action-kind="ClickContent"
                data-tiara-layer="recommended_article"
                data-tiara-id="@@"
                data-tiara-click_url="/@@IrL/29"
                data-tiara-setnum="12"
                data-tiara-copy="나만의 화를 참는
법
"
              >
                <img
                  src="//img1.daumcdn.net/thumb/C440x260.fjpg/?fname=https://t1.daumcdn.net/section/oc/1b94b4ad5bea4a389bab7260343da1df"
                  class="img_pic"
                  alt="나만의 화를 참는<br>법<br>"
                />

                <div class="append_info">
                  <div class="info_g">
                    <div class="inner_g">
                      <em class="cate_pic"></em>
                      <strong class="tit_pic"
                        >나만의 화를 참는<br />법<br
                      /></strong>
                      <span class="txt_pic"
                        >둘째가 태어나고 남편이 군 행사<br />전담팀으로
                        들어가면서 내 육아 ...</span
                      >
                      <span class="info_by"
                        ><span class="ico_by">by</span> 다이아</span
                      >
                    </div>
                  </div>
                  <div class="align_g"></div>
                </div>
                <div class="mask"></div>
              </a>
            </div>

            <div class="item_pic item_pic_type3">
              <a
                href="/@@bRLx/31"
                class="link_item #home_discover"
                target="_blank"
                data-tiara-action-name="TOP > 추천 콘텐츠 영역 클릭"
                data-tiara-action-kind="ClickContent"
                data-tiara-layer="recommended_article"
                data-tiara-id="@@"
                data-tiara-click_url="/@@bRLx/31"
                data-tiara-setnum="13"
                data-tiara-copy="미니멀 살림 노하우"
              >
                <img
                  src="//img1.daumcdn.net/thumb/C440x260.fjpg/?fname=https://t1.daumcdn.net/section/oc/6cc967fe908745adbcce1990451c3586"
                  class="img_pic"
                  alt="미니멀 살림 노하우"
                />

                <div class="append_info">
                  <div class="info_g">
                    <div class="inner_g">
                      <em class="cate_pic"></em>
                      <strong class="tit_pic">미니멀 살림 노하우</strong>
                      <span class="txt_pic"
                        >“여보, 나 어깨 좀 주물러줘. 오늘<br />일 너무 많이 했나
                        봐." "뭐...</span
                      >
                      <span class="info_by"
                        ><span class="ico_by">by</span> 봄이</span
                      >
                    </div>
                  </div>
                  <div class="align_g"></div>
                </div>
                <div class="mask"></div>
              </a>
            </div>
          </div>
        </li> -->
      </swiper-slide>
      <swiper-slide> </swiper-slide>
    </swiper>
  </div>
</template>

<script>
// import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import cafeData from '../../data/cafeData.json'
export default {
  components: {
    Swiper,
    SwiperSlide
  },
  // 2.
  swiperOptions: {
    // 네비게이션
    navigation: true,

    // 페이지네이션
    pagination: true,

    slidesPerView: 6,
    slidesPerGroup: 6,
    spaceBetween: 10,
    // 반응형 breakpoints
    breakpoints: {
      375: {
        slidesPerView: 1
      },
      425: {
        slidesPerView: 2,
        slidesPerGroup: 2
      },
      768: {
        slidesPerView: 3,
        slidesPerGroup: 3
      },
      1024: {
        slidesPerView: 4,
        slidesPerGroup: 4
      },
      1400: {
        slidesPerView: 5,
        slidesPerGroup: 5
      }
    }
  },
  data() {
    return {
      cafeData
    }
  }
}
</script>

<style>
button {
  position: absolute;
  height: 40px;
  width: 50px;
  top: calc(50% - 20px);
  background-color: rgba(0, 0, 0, 0.8);
  border: none;
  color: #fff;
}
button:focus,
button:hover {
  outline: none;
  cursor: pointer;
}
.btn1 {
  left: 0;
}
.btn2 {
  right: 0;
}
div {
  display: block;
}
dl,
li,
menu,
ol,
ul {
  list-style: none;
}
ul {
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 40px;
}
li {
  display: list-item;
  text-align: -webkit-match-parent;
}
a {
  color: #333;
  text-decoration: none;
}
a:-webkit-any-link {
  cursor: pointer;
}
.editor_pic {
  margin-top: 22px;
  position: relative;
}
.editor_pic .wrap_slide {
  height: 520px;
  overflow: visible;
  width: 960px;
}
.wrap_slide {
  margin: 0 auto;
  position: relative;
}
.wrap_slide .list_slide {
  position: absolute;
  top: 0;
}
.wrap_slide .list_slide li {
  float: left;
}
.wrap_pic {
  overflow: hidden;
  width: 960px;
}
.PC_DISCOVER_BRUNCHBOOK .item_pic_type1 {
  background-image: linear-gradient(-180deg, #f4f4f4, #dedede 82%);
  position: relative;
  height: 520px;
  width: 50%;
}
.PC_DISCOVER_BRUNCHBOOK .item_pic_type1::before {
  background: #f6f6f6;
  bottom: 0;
  content: '';
  display: block;
  height: 156px;
  position: absolute;
  width: 100%;
}
.PC_DISCOVER_BRUNCHBOOK .item_pic_type1 .link_item:after {
  background: url(//t1.daumcdn.net/brunch9/static/images/pc/bg_brunchhome.png)
    no-repeat;
  bottom: 88px;
  content: '';
  display: block;
  height: 53px;
  left: 119px;
  position: absolute;
  width: 357px;
  z-index: 2;
}
.wrap_pic .item_pic {
  float: left;
  position: relative;
}
.wrap_pic .item_pic .link_item {
  display: block;
  height: 100%;
  overflow: hidden;
  width: 100%;
}
.PC_DISCOVER_BRUNCHBOOK .link_item .fade_cover1 {
  background-color: transparent;
  bottom: 0;
  display: block;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  -webkit-transition: -webkit-opacity 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  z-index: 0;
}
.PC_DISCOVER_BRUNCHBOOK .link_item .fade_cover1:before {
  background-image: url(//t1.daumcdn.net/brunch9/static/images/pc/bg_bookblur.png);
  content: '';
  display: block;
  height: 100%;
  left: 0;
  opacity: 0;
  position: absolute;
  top: 0;
  -webkit-transition: -webkit-opacity 0.3s ease-in-out;
  transition: opacity 0.3s ease-in-out;
  width: 100%;
  z-index: 1;
}
.book_cover {
  background-color: #ddd;
  background-position: 50% 50%;
  background-size: cover;
  border-radius: 2px 6px 6px 2px;
  box-shadow: 0 10px 20px 0 rgb(0 0 0 / 10%);
  box-sizing: border-box;
  display: block;
  height: 324px;
  left: 50%;
  margin-left: -115px;
  padding: 68px 0 0;
  position: absolute;
  top: 95px;
  width: 230px;
  z-index: 5;
}
.PC_DISCOVER_BRUNCHBOOK .book_cover {
  overflow: hidden;
}

.PC_DISCOVER_BRUNCHBOOK .book_cover:before {
  background: #fff;
  content: '';
  display: inline-block;
  filter: blur(0.7px);
  -webkit-filter: blur(0.7px);
  height: 100%;
  left: 0;
  opacity: 0.24;
  position: absolute;
  top: 0;
  width: 2px;
}
.PC_DISCOVER_BRUNCHBOOK .book_cover:after {
  background: #000;
  content: '';
  display: inline-block;
  filter: blur(1px);
  -webkit-filter: blur(1px);
  height: 100%;
  opacity: 0.12;
  position: absolute;
  right: 0;
  top: 0;
  width: 2px;
}
.book_cover .cont_cover {
  background-color: #fff;
  height: 172px;
  margin: 0 50px;
  position: relative;
  width: 130px;
  z-index: 1;
}
.book_cover .tit_cover,
.book_cover .txt_writer {
  -webkit-box-orient: vertical;
  /* display: block; */
  display: -webkit-box;
  /* font-family: "Nanum Myeongjo",sans-serif; */
  overflow: hidden;
  text-overflow: ellipsis;
}
.book_cover .tit_cover {
  /* -webkit-line-clamp: none; */
  word-wrap: break-word;
  font-size: 18px;
  font-weight: normal;
  line-height: 24px;
  max-height: 92px;
  padding: 10px 13px 0 10px;
  word-break: keep-all;
}
.book_cover .txt_writer {
  -webkit-line-clamp: 2;
  bottom: 9px;
  box-sizing: border-box;
  color: #666;
  font-size: 11px;
  left: 0;
  line-height: 16px;
  max-height: 35px;
  padding: 0 10px;
  position: absolute;
  width: 100%;
  word-break: break-all;
}
.book_cover .dimmed_book_type1 {
  z-index: 10;
}
.dimmed_book_type1 {
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 9px;
}
.dimmed_book_type1:before {
  background: rgba(0, 0, 0, 0.05);
  content: '';
  height: 100%;
  position: absolute;
  right: 2px;
  top: 0;
  width: 1px;
}
.dimmed_book_type1:after {
  background: hsla(0, 0%, 100%, 0.1);
  content: '';
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  width: 2px;
}
.book_cover .txt_publisher {
  bottom: 13px;
  color: #fff;
  display: block;
  font-family: 'SF Pro Bold', 'Malgun Gothic';
  font-size: 11px;
  left: 0;
  letter-spacing: 0.2px;
  line-height: 18px;
  position: absolute;
  text-align: center;
  width: 100%;
  z-index: 1;
}

.book_cover .dimmed_cover {
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 2px 6px 6px 0;
  width: 100%;
}
.book_cover .dimmed_cover,
.box_content .dimmed_book {
  display: block;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
}
.PC_DISCOVER_BRUNCHBOOK .book_cover:before {
  background: #fff;
  content: '';
  display: inline-block;
  filter: blur(0.7px);
  -webkit-filter: blur(0.7px);
  height: 100%;
  left: 0;
  opacity: 0.24;
  position: absolute;
  top: 0;
  width: 2px;
}
.PC_DISCOVER_BRUNCHBOOK .book_cover:after {
  background: #000;
  content: '';
  display: inline-block;
  filter: blur(1px);
  -webkit-filter: blur(1px);
  height: 100%;
  opacity: 0.12;
  position: absolute;
  right: 0;
  top: 0;
  width: 2px;
}
.PC_DISCOVER_BRUNCHBOOK .info_release {
  bottom: 0;
  display: table;
  height: 109px;
  position: absolute;
  width: 100%;
  z-index: 2;
}
.PC_DISCOVER_BRUNCHBOOK .inner-info {
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}
.PC_DISCOVER_BRUNCHBOOK .info_release .txt_g {
  display: block;
}
.PC_DISCOVER_BRUNCHBOOK .info_release .txt_g + .txt_g {
  color: #959595;
  letter-spacing: -0.1px;
}
.PC_DISCOVER_BRUNCHBOOK .item_pic_type2,
.PC_DISCOVER_BRUNCHBOOK .item_pic_type3 {
  height: 260px;
  width: 50%;
}
.PC_DISCOVER_B2 .item_pic {
  height: 520px;
  width: 320px;
}
.PC_DISCOVER_A .append_info,
.PC_DISCOVER_B .append_info,
.PC_DISCOVER_B2 .append_info,
.PC_DISCOVER_BRUNCHBOOK .append_info,
.PC_DISCOVER_C .append_info,
.PC_DISCOVER_F .append_info {
  display: table;
  height: 100%;
}
.wrap_pic .append_info {
  color: #fff;
  left: 50%;
  margin-left: -50%;
  position: absolute;
  text-align: center;
  top: 0;
  width: 100%;
  z-index: 2;
}
.info_g {
  display: inline-block;
  vertical-align: middle;
}
.wrap_pic .cate_pic {
  border-bottom: 1px solid #fff;
  display: inline;
  font-family: 'Noto Sans Light', sans-serif;
  font-size: 13px;
}
em {
  font-style: normal;
  font-weight: normal;
}

.wrap_pic .tit_pic {
  display: block;
  font-family: 'Nanum Myeongjo', sans-serif;
  font-size: 28px;
  font-weight: normal;
  letter-spacing: -0.025em;
  line-height: 36px;
  padding-top: 12px;
}
.wrap_pic .txt_pic {
  display: block;
  font-family: 'Noto Sans Light', sans-serif;
  line-height: 20px;
  padding-top: 9px;
}
.wrap_pic .info_g .info_by {
  width: 200px;
}
.info_g .info_by {
  color: #fff;
  filter: alpha(opacity=50);
  font-family: 'Noto Sans Light', sans-serif;
  font-size: 12px;
  opacity: 0.8;
  padding-top: 30px;
}
.info_by {
  display: block;
  margin: 0 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.editor_pic .ico_by {
  background-position: -38px -130px;
}
.wrap_pic .ico_by {
  color: #fff;
}
.info_by .ico_by {
  height: 13px;
  margin-top: 3px;
  width: 14px;
}
.ico_by {
  color: #bfbfbf;
  font-family: Georgia, sans-serif;
  font-style: italic;
}
.align_g {
  display: inline-block;
  height: 100%;
  overflow: hidden;
  vertical-align: middle;
}
.wrap_pic .item_pic .mask {
  background-color: #333;
  filter: alpha(opacity=40);
  height: 100%;
  left: 0;
  opacity: 0.4;
  position: absolute;
  top: 0;
  /* -webkit-transition: opacity 0.3s ease-in-out; */
  transition: opacity 0.3s ease-in-out;
  width: 100%;
}
.wrap_pic .img_pic {
  height: 100%;
  /* -webkit-transition: -webkit-transform .3s ease-in-out; */
  transition: transform 0.3s ease-in-out;
  width: 100%;
}
img {
  border: 0;
}
.align_g {
  display: inline-block;
  height: 100%;
  overflow: hidden;
  vertical-align: middle;
}
.editor_pic .wrap_btn .btn_brunch {
  margin-top: -77px;
}
.cont_brunch .wrap_btn .btn_brunch {
  height: 100px;
  margin-top: -50px;
  position: absolute;
  top: 50%;
  width: 100px;
  z-index: 10;
}
.cont_brunch .btn_prev {
  left: 30px;
}
.cont_brunch .btn_prev .ico_brunch {
  background-position: -167px -175px;
  float: right;
}
.cont_brunch .wrap_btn .ico_brunch {
  height: 101px;
  width: 100px;
}
.ico_brunch {
  background: url(//t1.daumcdn.net/brunch9/static/images/pc/ico_brunch_v8_181004_v2.png)
    no-repeat 0 0;
  overflow: hidden;
  text-indent: -9999px;
}
.ico_brunch {
  /* background: url(//t1.daumcdn.net/brunch9/static/images/pc/ico_brunch8_181106.png) no-repeat; */
  display: inline-block;
  vertical-align: top;
}
.ico_brunch,
.text_hide {
  line-height: 0;
  overflow: hidden;
  text-indent: -9999px;
}
.editor_pic .wrap_btn .btn_brunch {
  margin-top: -77px;
}
.cont_brunch .wrap_btn .btn_brunch {
  height: 100px;
  margin-top: -50px;
  position: absolute;
  top: 50%;
  width: 100px;
  z-index: 10;
}
.cont_brunch .btn_prev {
  left: 30px;
}
.cont_brunch .btn_next {
  right: 30px;
}
.cont_brunch .btn_next .ico_brunch {
  background-position: -269px -175px;
  float: left;
}
.cont_brunch .wrap_btn .ico_brunch {
  height: 101px;
  width: 100px;
}
.wrap_paging {
  margin: 22px auto 0;
  text-align: center;
  width: 960px;
}
.wrap_paging .link_page {
  display: inline-block;
  height: 31px;
  padding: 0 11px;
  vertical-align: top;
}
.wrap_paging {
  margin: 22px auto 0;
  text-align: center;
  width: 960px;
}
.screen_out {
  height: 0;
  line-height: 0;
  overflow: hidden;
  position: absolute;
  text-indent: -9999px;
  width: 0;
}
.wrap_paging span .txt_page1 {
  background-position: 0 -10px;
}
.wrap_paging span .img_page {
  height: 12px;
  margin-top: 8px;
}
.wrap_paging .img_page {
  display: block;
  height: 9px;
  margin-top: 10px;
  overflow: hidden;
  width: 13px;
}
.img_page,
.txt_brunch {
  /* overflow: hidden; */
  text-indent: -9999px;
}
.img_page {
  background: url(//t1.daumcdn.net/brunch/static/img/help/pc/top/img_paging.v2.png)
    no-repeat 0 0;
}
</style>
