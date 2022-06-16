<template>
  <q-page v-if="cafe" class="cafe_detail_page constrain">
    <!-- 카페이름 및 기본버튼들 -->
    <section class="cafe_title_section column q-px-lg q-pt-lg">
      <div class="col">
        <div class="row items-center">
          <div class="title text-h5 cafe_name q-mb-xs">
            {{ cafe.cafe_name_pr }}
          </div>
          <div class="q-ml-sm">송파</div>
        </div>
      </div>
      <div class="col q-mb-xs">
        <div class="row justify-between">
          <div class="row items-center">
            <!-- 좋아요 버튼 -->
            <div class="btn_likeit q-mr-xs">
              <btn-like
                :user_id="1"
                :id_what="cafe.cafe_id"
                like_what="cafe"
                :is_liked="cafe.likeIt.user_cafe_liked"
                :likeit_cnt="cafe.likeIt.count"
              />
            </div>
            <!-- 가본곳 버튼 -->
            <div class="btn_been_there q-mr-xs">
              <btn-been-there
                :user_id="1"
                :cafe_id="cafe.cafe_id"
                :been_there="cafe.beenThere.user_cafe_beenthere"
              />
            </div>

            <!-- 리뷰수 -->
            <div>(리뷰수)</div>
          </div>
          <div class="row items-end">
            <div>
              <!-- <btn-basic-right
                color="secondary"
                label="리뷰 쓰기"
                icon="edit"
                size="md"
              />
              <btn-basic-right
                color="secondary"
                label="공유"
                icon="share"
                size="md"
              /> -->
              <btn-basic
                color="grey-6"
                label="리뷰 쓰기"
                icon="edit"
                size="sm"
              />
              <btn-basic color="grey-6" label="공유" icon="share" size="sm" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Image Grid -->
    <section class="q-mx-xs q-px-sm q-pt-xs">
      <!-- Image Grid -->
      <q-img class="rounded" src="/public/GRIDIMAGES_TEMP.JPG" />
      <!-- 기존 코드 -->
      <!-- <cafe-image-grid
        :cafeData="cafeData"
        :reviewData="reviewData"
        :userData="userData"
      /> -->
    </section>

    <!-- 기본정보 & 최근리뷰 컨테이너 -->
    <section class="cafe_information_section column">
      <section class="cafe_detail_wrap row">
        <div class="cafe_basic_info_wrap col-7 q-pa-md">
          <!-- 기본정보 -->
          <div class="subtitle q-pl-sm q-mb-md">기본 정보</div>
          <div class="cafe_basic_info col q-pl-md">
            <!-- info_top -->
            <div class="info_top">
              <!-- 키워드 -->
              <div class="info q-mb-xs">
                <q-icon size="xs" name="tag" class="icon q-mb-xs" />

                <div class="cafe_keywords_wrap">
                  <badge-cafe
                    v-for="keyword in cafe.keywords"
                    :key="keyword.keyword_name"
                    :value="keyword.keyword_name"
                  />
                </div>
              </div>
            </div>

            <!-- info_mid -->
            <div class="info_mid row justify-between">
              <div class="info_left col-12 col-md-7">
                <!-- 주소 -->
                <div class="info q-mb-xs">
                  <q-icon size="xs" name="place" class="icon" />

                  <div class="text_subtitle1">{{ cafe.cafe_address }}</div>
                </div>

                <!-- 영업시간 -->
                <div class="info q-mb-xs">
                  <q-icon
                    size="xs"
                    name="calendar_today"
                    class="icon q-pt-xs"
                  />

                  <div class="cafe_keywords_wrap text_subtitle1 q-pt-xs">
                    <div
                      v-for="time in cafe.operationTime"
                      :key="time.operation_day"
                    >
                      {{ time.operation_day }} : {{ time.operation_time }}
                    </div>
                  </div>
                </div>

                <!-- 시설정보 -->
                <div class="info q-mb-xs">
                  <q-icon size="xs" name="info" class="icon q-pr-xs" />
                  <div class="text_subtitle1">시설 정보</div>
                </div>
                <div class="q-pl-lg q-pb-sm">
                  <q-img width="210px" src="/public/facility.png" />
                </div>
              </div>

              <div class="info_right col-12 col-md-5">
                <!-- 전화번호 -->
                <div class="info q-mb-xs">
                  <div class="text_subtitle1">{{ cafe.cafe_phone }}</div>

                  <q-icon size="xs" name="phone_in_talk" class="icon q-pl-xs" />
                </div>
                <!-- 분점정보 -->
                <div class="info q-mb-xs">
                  <div class="text_subtitle1">분점 송파점 | 강남점</div>

                  <q-icon size="xs" name="storefront" class="icon q-pl-xs" />
                </div>
              </div>
            </div>
            <div class="info_bottom">
              <!-- 홈페이지 -->
              <div class="info q-mb-xs">
                <div class="text_subtitle1 cafe_sns">
                  {{ cafe.cafe_sns }}
                </div>

                <q-icon size="xs" name="language" class="icon q-pl-xs" />
              </div>
            </div>
          </div>

          <!-- 커피메뉴 -->
          <div class="subtitle q-pl-sm q-mb-md">커피 메뉴</div>
          <div class="coffe_menu col q-pl-md">
            <!-- info_top -->
            <div class="info_top">
              <!-- 브루잉 메뉴 -->
              <div v-if="menuBrewing">
                <div class="info q-mb-xs">
                  <q-icon size="xs" name="info" class="icon q-pr-xs" />
                  <div class="text_subtitle1">브루잉 메뉴</div>
                </div>
                <div class="q-pl-lg q-pr-xs q-pb-sm">
                  <menu-item
                    v-for="menu in menuBrewing"
                    :name="menu.menu_name"
                    :aromaNotes="menu.menu_aromanote"
                    :key="menu.menu_name"
                    :type="menu.menu_type"
                    :hot="menu.menu_price_hot"
                    :ice="menu.menu_price_ice"
                    :is_signature="menu.is_signature"
                  />
                </div>
              </div>

              <div v-if="menuVariation">
                <!-- 배리에이션 메뉴 -->
                <div class="info q-mb-xs">
                  <q-icon size="xs" name="info" class="icon q-pr-xs" />
                  <div class="text_subtitle1">배리에이션 메뉴</div>
                </div>
                <div class="q-pl-lg q-pr-xs q-pb-sm">
                  <menu-item
                    v-for="menu in menuVariation"
                    :name="menu.menu_name"
                    :aromaNotes="menu.menu_aromanote"
                    :key="menu.menu_name"
                    :type="menu.menu_type"
                    :hot="menu.menu_price_hot"
                    :ice="menu.menu_price_ice"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 최근리뷰 -->
        <div class="col-5 q-py-md q-pr-md row justify-end">
          <div class="recent_review">
            <div class="subtitle q-mb-xs">최근 리뷰</div>
            <card-review />
          </div>
        </div>
      </section>
    </section>

    <!-- CafeInformation -->

    <!-- <cafe-information
      :reviewData="reviewData"
      :userData="userData"
      :cafeData="cafeData"
      :mainKeywordsData="mainKeywordsData"
    />
    /> -->

    <!-- Coffee Menu-->
    <!-- <cafe-menu :cafeMenuData="cafeMenuData" :cafeData="cafeData" class="half" /> -->

    <!-- User Reveiw -->
    <!-- <div class="row q-mt-xl">
      <div class="card_wrap q-mr-md">
        <card-review
          v-for="review in reviews"
          :key="review.review_id"
          :review="review"
        />
      </div>
    </div> -->
    <q-separator />

    <!-- 최근 리뷰 -->
    <section class="cafe_review_section q-pa-md">
      <!-- 기본정보 -->
      <div class="title_wrap row justify-between items-center">
        <div class="subtitle q-pl-sm">xx건의 방문자 리뷰</div>
        <div class="row items-center q-pr-sm">
          <btn-basic color="grey-6" label="추천순" size="sm" />
          <btn-basic color="grey-6" label="최신순" size="sm" />
        </div>
      </div>

      <div class="reviews_container row">
        <div
          class="review_wrap"
          v-for="review in reviews"
          :key="review.review_id"
        >
          <card-review :review="review" />
        </div>
      </div>

      <div class="q-pa-lg flex flex-center">
        <q-pagination v-model="current" :max="5" direction-links />
      </div>
    </section>

    <!-- 페이지네이션 -->
  </q-page>
  <!-- <infinite-scroll /> -->

  <!-- 저작권 문구
"icons created by www.flaticon.com from Freepik" -->
</template>

<script>
import { defineComponent } from 'vue'

// import cafeKeywordsData from '../data/CafeKeywordsData'
// import cafeMenuData from '../data/CafeMenuData'
import cafeData from '../data/CafeData.json'
import reviewData from '../data/ReviewData'
// import userData from '../data/UserData'

// import CafeInformation from '../components/Etc/CafeInformation.vue'
// import InfiniteScroll from '../components/Scroll/InfiniteScroll.vue'
import CafeImageGrid from '../components/Etc/CafeImageGrid.vue'
// import CafeMenu from '../components/Etc/CafeMenu.vue'
import BadgeCafe from 'src/components/Badge/BadgeCafe.vue'
import BtnBasic from 'src/components/Button/BtnBasic.vue'
// import BtnBasicRight from 'src/components/Button/BtnBasicRight.vue'
import BtnLike from 'src/components/Button/BtnLike.vue'
import BtnBeenThere from 'src/components/Button/BtnBeenThere.vue'
import CardReview from '../components/Card/CardReview.vue'
import MenuItem from 'src/components/Etc/MenuItem.vue'

export default defineComponent({
  name: 'CafeDetailPage',
  components: {
    // CafeInformation,
    // InfiniteScroll,
    // CafeImageGrid,
    // CafeMenu,
    BadgeCafe,
    BtnBasic,
    // BtnBasicRight,
    BtnLike,
    BtnBeenThere,
    CardReview,
    MenuItem
  },
  data() {
    return {
      // cafeMenuData,
      // mainKeywordsData,
      cafeData,
      reviewData,
      // userData,
      cafe: null,
      menuBrewing: null,
      menuVariation: null,
      recent_review: {},
      reviews: []
    }
  },
  mounted() {
    // console.log(cafeData[0])
    // this.cafe = { ...cafeData[0] }
    this.cafe = cafeData[0]
    if (this.cafe.menu) {
      this.menuBrewing = this.cafe.menu.filter((m) => m.menu_type === 'br')
      this.menuVariation = this.cafe.menu.filter(
        (menu) => menu.menu_type !== 'br'
      )
    }

    console.log(this.cafe)
    this.reviews = reviewData
    console.log(this.reviews)
  }
})
</script>

<style lang="scss" scoped>
.icon {
  color: $icon;
  padding-right: 6px;
}
.rounded {
  border-radius: 6px;
}
.cafe_detail_page {
  color: $grey-8;
  .subtitle {
    font-size: 1.4rem;
    // font-weight: 500;
    color: $primary;
  }

  // 상단 타이틀 섹션
  .cafe_title_section {
    .title {
      font-size: 1.6rem;
      font-weight: 500;
      color: $grey-10;
    }
    .btn_likeit {
      position: relative;
      left: -8px;
    }
    .btn_been_there {
      position: relative;
      left: -18px;
    }
  }

  // 기본정보, 최근리뷰 섹션
  .cafe_information_section {
    position: relative;

    .cafe_detail_wrap {
      .info {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
      }
      .info_mid {
        .cafe_keywords_wrap {
          border: 1px solid $border-color;
          padding: 6px 10px;
          border-radius: $border-radius;
        }
        .info_right {
          display: flex;
          flex-direction: column;
          justify-content: end;
          .info {
            justify-content: end;
          }
        }
      }
      .info_bottom {
        .info {
          justify-content: end;
        }
        .cafe_sns {
          cursor: pointer;
          text-align: right;
          font-size: 0.85rem;
          width: 370px;
          color: $brown-4;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          &:hover {
            color: $primary;
          }
        }
      }
    }
    .recent_review {
      // position: absolute;
      width: 540px;
      // top: 0;
      // right: 0;
      // @media (max-width: 977px) {
      //   position: relative;
      // }
    }
  }

  // 리뷰 섹션
  .cafe_review_section {
    .reviews_container {
      .review_wrap {
        // display: -webkit-box;
        // display: inline-block;
        padding: 8px 8px;
        max-width: 50%;
      }
    }
  }

  .cafe_basic_info,
  .coffe_menu {
    max-width: 500px;
  }
}
</style>
