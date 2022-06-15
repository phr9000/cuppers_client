<template>
  <q-page v-if="cafe" class="cafe_detail_page constrain">
    <!-- 카페이름 및 기본버튼들 -->
    <section class="cafe_title_wrap column q-px-lg q-pt-lg">
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
            <div class="q-mr-xs">
              <btn-like
                :user_id="1"
                :id_what="cafe.cafe_id"
                like_what="cafe"
                :is_liked="false"
                :likeit_cnt="cafe.likeIt.count"
              />
            </div>
            <div class="q-mr-xs">
              <btn-been-there
                :user_id="1"
                :id_what="cafe.cafe_id"
                like_what="cafe"
                :is_liked="false"
                :likeit_cnt="cafe.likeIt.count"
              />
            </div>

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
    <div class="q-mx-xs q-px-sm q-pt-xs">
      <!-- Image Grid -->
      <q-img class="rounded" src="/public/GRIDIMAGES_TEMP.JPG" />
    </div>

    <!-- 기본정보 & 최근리뷰 컨테이너 -->
    <section class="cafe_information column">
      <section class="cafe_detail_wrap row">
        <!-- 기본정보 -->
        <div class="cafe_basic_info col-7 q-pa-md bg-grey-1">
          <div class="subtitle q-pl-sm q-mb-md">기본 정보</div>
          <div class="col">
            <!-- info_top -->
            <div class="info_top">
              <!-- 키워드 -->
              <div class="info q-mb-xs">
                <q-icon size="xs" name="img:/icons/tag_f.png" class="q-mx-sm" />

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
                  <!-- <q-icon size="sm" name="room" class="q-pr-xs" /> -->
                  <q-icon
                    size="xs"
                    name="img:/icons/location_f.png"
                    class="q-mx-sm"
                  />
                  <!-- <q-img src="/public/icons/location_bk.png" style="width: 20px" /> -->
                  <div class="text_subtitle1">{{ cafe.cafe_address }}</div>
                </div>

                <!-- 영업시간 -->
                <div class="info q-mb-xs">
                  <q-icon
                    size="xs"
                    name="img:/icons/clock_f.png"
                    class="q-mx-sm"
                  />

                  <div class="cafe_keywords_wrap text_subtitle1">
                    <div
                      v-for="time in cafe.operationTime"
                      :key="time.operation_day"
                    >
                      {{ time.operation_day }} : {{ time.operation_time }}
                    </div>
                  </div>
                </div>

                <!-- 시설정보 -->
                <div class="row items-bottom q-mb-xs">
                  <q-icon
                    class="q-mx-sm"
                    size="xs"
                    name="img:/icons/phone_f.png"
                  />
                  <div class="text_subtitle1">시설 정보</div>
                </div>
                <div class="q-pl-lg q-py-sm">
                  <q-img width="210px" src="/public/facility.png" />
                </div>
              </div>

              <div class="info_right col-12 col-md-5">
                <!-- 전화번호 -->
                <div class="info q-mb-xs">
                  <div class="text_subtitle1">{{ cafe.cafe_phone }}</div>
                  <q-icon
                    class="q-mx-sm"
                    size="xs"
                    name="img:/icons/phone_f.png"
                  />
                </div>
                <!-- 분점정보 -->
                <div class="info q-mb-xs">
                  <div class="text_subtitle1">분점 송파점 | 강남점</div>
                  <q-icon
                    class="q-mx-sm"
                    size="xs"
                    name="img:/icons/phone_f.png"
                  />
                </div>
              </div>
            </div>
            <div class="info_bottom">
              <!-- 홈페이지 -->
              <div class="info q-mb-xs">
                <div class="text_subtitle1 cafe_sns">
                  {{ cafe.cafe_sns }}
                </div>
                <q-icon
                  class="q-mx-sm"
                  size="xs"
                  name="img:/icons/phone_f.png"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- 최근리뷰 -->
        <div class="col-5 q-py-md q-pr-md bg-grey-1 row justify-end">
          <div class="recent_review">
            <div class="subtitle q-mb-xs">최근 리뷰</div>
            <card-review />
          </div>
        </div>
      </section>
    </section>

    <!-- 기존 코드 -->
    <!-- <cafe-image-grid
      :cafeData="cafeData"
      :reviewData="reviewData"
      :userData="userData"
    /> -->

    <!-- CafeInformation -->

    <!-- <cafe-information
      :reviewData="reviewData"
      :userData="userData"
      :cafeData="cafeData"
      :cafeKeywordsData="cafeKeywordsData"
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
    <!-- 페이지네이션 -->
    <!-- <div class="q-pa-lg flex flex-center">
      <q-pagination v-model="current" :max="5" direction-links />
    </div> -->
  </q-page>
  <!-- <infinite-scroll /> -->
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
// import CafeImageGrid from '../components/Etc/CafeImageGrid.vue'
// import CafeMenu from '../components/Etc/CafeMenu.vue'
import BadgeCafe from 'src/components/Badge/BadgeCafe.vue'
import BadgeAroma from 'src/components/Badge/BadgeAroma.vue'
import BtnBasic from 'src/components/Button/BtnBasic.vue'
import BtnBasicRight from 'src/components/Button/BtnBasicRight.vue'
import BtnLike from 'src/components/Button/BtnLike.vue'
import BtnBeenThere from 'src/components/Button/BtnBeenThere.vue'
import CardReview from '../components/Card/CardReview.vue'

export default defineComponent({
  name: 'CafeDetailPage',
  components: {
    // CafeInformation,
    // InfiniteScroll,
    // CafeImageGrid,
    // CafeMenu,
    BadgeCafe,
    //BadgeAroma,
    BtnBasic,
    // BtnBasicRight,
    BtnLike,
    BtnBeenThere,
    CardReview
  },
  data() {
    return {
      // cafeMenuData,
      // cafeKeywordsData,
      cafeData,
      reviewData,
      // userData,
      cafe: null,
      recent_review: {},
      reviews: []
    }
  },
  mounted() {
    // console.log(cafeData[0])
    // this.cafe = { ...cafeData[0] }
    this.cafe = cafeData[0]

    console.log(this.cafe)
    this.reviews = reviewData
    console.log(this.reviews)
  }
})
</script>

<style lang="scss" scoped>
.rounded {
  border-radius: 6px;
}
.cafe_detail_page {
  color: $grey-9;

  .cafe_title_wrap {
    .title {
      font-size: 1.6rem;
      font-weight: 500;
      color: $grey-10;
    }
  }

  .cafe_information {
    .subtitle {
      font-size: 1.4rem;
      // font-weight: 500;
      color: $primary;
    }
    position: relative;
    .cafe_detail_wrap {
      .cafe_basic_info {
        .text_subtitle1 {
          font-size: 1rem;
        }
        .info {
          display: flex;
          flex-wrap: nowrap;
          align-items: baseline;
        }
        .info_top {
          .info {
            align-items: center;
          }
        }
        .info_mid {
          .info_right {
            display: flex;
            flex-direction: column;
            justify-content: end;
            .info {
              display: flex;
              flex-wrap: nowrap;
              justify-content: end;
              align-items: baseline;
            }
          }
        }
        .info_bottom {
          .info {
            display: flex;
            flex-wrap: nowrap;
            justify-content: end;
            align-items: baseline;
          }
          .cafe_sns {
            cursor: pointer;
            text-align: right;
            font-size: 0.9rem;
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
        width: 500px;
        // top: 0;
        // right: 0;
        // @media (max-width: 977px) {
        //   position: relative;
        // }
      }
    }
  }
}
</style>
