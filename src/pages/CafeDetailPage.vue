<template>
  <q-page v-if="cafe" class="cafe_detail_page constrain">
    <!-- 카페이름 및 기본버튼들 -->
    <section class="cafe_title_section column q-pl-lg q-pr-md q-pt-lg">
      <div class="col">
        <div class="row items-center">
          <div class="title text-h5 cafe_name q-mb-xs q-mr-sm">
            {{ cafe.cafe_name_pr }}
          </div>
          <div class="row items-center">
            <span v-if="cafe.cafe_type === '로스터리'" class="icon_cafe_type"
              ><q-icon size="xs" name="img:/icons/roastery.png" class="icon"
            /></span>
            <span class="text-subtitle1 text-grey q-pt-xs">
              {{ cafe.cafe_region }}</span
            >
          </div>
        </div>
      </div>
      <!-- 좋아요 가본곳 리뷰수 리뷰 쓰기 -->
      <div class="col q-mb-xs">
        <div class="row justify-between">
          <div class="row items-center">
            <!-- 좋아요 버튼 -->
            <div class="btn_likeit q-mr-xs">
              <btn-like
                :user_id="1"
                :id_what="cafe.cafe_id"
                like_what="cafe"
                :is_liked="cafe.user_liked"
                :likeit_cnt="cafe.like_cnt"
              />
            </div>
            <!-- 가본곳 버튼 -->
            <div class="btn_been_there q-mr-xs">
              <btn-been-there
                :user_id="1"
                :cafe_id="cafe.cafe_id"
                :been_there="cafe.user_beenthere"
              />
            </div>

            <!-- 리뷰수 -->
            <div>
              <!-- <a href="#review_section"> $route.fullPath 와 호환되지 않아 새로고침 되는 문제 때문에 -->
              <btn-review
                class="btn_review"
                :cafe_id="cafe.cafe_id"
                :review_cnt="cafe.review_cnt"
              />
              <!-- </a> -->
            </div>
          </div>
          <div class="row items-end">
            <div>
              <!-- 리뷰 쓰기 -->
              <btn-basic
                to="/review/write"
                class="btn_show_all bg-grey-2"
                :rounded="false"
                icon="note_alt"
                color="grey-9"
                label="리뷰 쓰기"
                padding="3px 8px "
              />
              <!-- 공유 -->
              <btn-basic
                class="btn_show_all bg-grey-2"
                :rounded="false"
                icon="share"
                color="grey-9"
                label="공유"
                padding="3px 8px "
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Image Grid -->
    <section v-if="cafeImages" class="q-mx-sm q-px-sm q-pt-xs">
      <!-- Image Grid -->
      <image-grid :images="cafeImages" />
    </section>

    <!-- 기본정보, 커피메뉴 & 최근리뷰 컨테이너 -->
    <section class="cafe_information_section column">
      <section class="cafe_detail_wrap row">
        <!-- 기본정보, 커피메뉴 -->
        <div class="col-12 col-sm-7 cafe_basic_info_wrap q-pa-md">
          <div class="subtitle q-pl-sm q-mb-md">기본 정보</div>
          <!-- 기본정보 -->
          <div class="cafe_basic_info col q-pl-md">
            <!-- 기본정보1 : 키워드, 카페설명 -->
            <div class="info_top">
              <!-- 키워드 -->
              <div class="info q-mb-xs">
                <q-icon size="xs" name="tag" class="icon q-mb-xs" />

                <div class="cafe_keywords_wrap">
                  <badge-cafe
                    v-for="keyword in cafe.keywords"
                    :key="keyword.name"
                    :value="keyword.name"
                  />
                </div>
              </div>
              <!-- 카페 설명 -->
              <div class="info start q-mb-xs">
                <q-icon size="xs" name="place" class="icon" />

                <div
                  class="text_subtitle1 q-pr-xs"
                  v-html="cafe.cafe_description"
                ></div>
              </div>
            </div>
            <!-- 기본정보2 : 주소, 영업시간, 시설, 분점  -->
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
                    <div v-for="time in cafe.opTime" :key="time.day">
                      {{ time.day }} : {{ time.time }}
                    </div>
                    <!-- <div class="text-red-5">
                      영업시간을 클릭했을때만 크게 보여주도록 (like googlemap)
                    </div> -->
                  </div>
                </div>

                <!-- 시설정보 -->
                <div class="info q-mb-xs">
                  <q-icon size="xs" name="info" class="icon q-pr-xs" />
                  <div class="text_subtitle1">시설 정보</div>
                </div>
                <div class="row items-center q-pl-lg q-pb-sm">
                  <facility-item
                    class="q-pr-sm"
                    v-for="item in cafeFacility"
                    :key="item.name"
                    :name="item.name"
                    :icon="item.icon"
                  />
                </div>
              </div>

              <div class="info_right column justify-end col-12 col-md-5">
                <!-- 전화번호 -->
                <div class="info justify-end q-mb-xs">
                  <div class="text_subtitle1">{{ cafe.cafe_phone }}</div>

                  <q-icon size="xs" name="phone_in_talk" class="icon q-pl-xs" />
                </div>
                <!-- 분점정보 -->
                <div v-if="cafe.branches" class="info justify-end q-mb-xs">
                  <btn-basic
                    v-for="branch in cafe.branches"
                    :key="branch.cafe_id"
                    :label="branch.cafe_branch_name"
                    size="sm"
                    color="grey-5"
                    @click="clickBranch(branch.cafe_id)"
                  />
                  <div class="text_subtitle1">분점</div>

                  <q-icon size="xs" name="storefront" class="icon q-pl-xs" />
                </div>
              </div>
            </div>
            <!-- 기본정보2 : 홈페이지  -->
            <div class="info_bottom">
              <!-- 홈페이지 -->
              <div class="info q-mb-xs">
                <div class="text_subtitle1 cafe_sns">
                  {{ cafe.cafe_webpage }}
                </div>

                <q-icon size="xs" name="language" class="icon q-pl-xs" />
              </div>
            </div>
          </div>

          <!-- 커피메뉴 -->
          <div class="subtitle q-pl-sm q-my-md">커피 메뉴</div>
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
                    :menu_aromanote="menu.menu_aromanote"
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

        <!-- 최근리뷰, 메뉴판 -->
        <div
          class="review_menu_container col-12 col-sm-5 q-py-md q-pr-md column justify-between align-end"
        >
          <!-- 최근 리뷰 -->
          <div v-if="reviewRecent" class="recent_review large_screen_only">
            <div class="subtitle q-mb-xs">최근 리뷰</div>
            <card-review :review="reviewRecent" />
          </div>

          <!-- 대표 메뉴 이미지 -->
          <div
            v-if="menuImages && menuImages.length > 0"
            class="menu_image_wrap column"
          >
            <div class="info q-mb-xs">
              <q-icon size="xs" name="img:/icons/menu.png" class="q-mx-xs" />
              <div class="text_subtitle1">메뉴판 이미지</div>
            </div>
            <q-img
              class="menu_image"
              width="100%"
              height="130px"
              :src="menuImages[0].cafe_image_url"
            >
              <div
                class="rounded-borders absolute-full text-subtitle2 flex flex-center"
              >
                크게 보기
              </div></q-img
            >
          </div>
        </div>
      </section>
    </section>

    <q-separator />

    <!-- 리뷰 -->
    <!-- <a name="review_section"> -->
    <section class="review_section q-pa-md">
      <!--  -->
      <div class="title_wrap row justify-between items-center">
        <div class="subtitle q-pl-sm">
          {{ cafe.review_cnt }}건의 방문자 리뷰
        </div>
        <div class="row items-center q-pr-sm">
          <!-- <btn-basic @click="changeSort('like')" label="추천순" size="sm" />
          <btn-basic
            @click="changeSort('recent')"
            :class="{ 'red-4': sort === 'recent' }"
            :disabled="sort === 'recent'"
            label="최신순"
            size="sm"
          /> -->
          <btn-sort :sort_items="sortItems" @change="changeSort" />
        </div>
      </div>

      <div class="cards_container row justify-between">
        <div
          class="cards_wrap"
          v-for="review in reviews"
          :key="review.review_id"
        >
          <card-review :review="review" />
        </div>
      </div>

      <!-- 페이지네이션 -->
      <div class="q-pa-lg flex flex-center">
        <q-pagination v-model="current" :max="maxReivewPage" direction-links />
      </div>
    </section>
    <!-- </a> -->

    <!-- 지도 미리보기 -->
    <section v-if="showMiniMap" class="minimap q-mx-lg q-mb-xl">
      <kakao-mini-map :lat="cafe.cafe_latitude" :lng="cafe.cafe_longitude" />
    </section>

    <!-- 커핑 노트 -->
    <!-- <section class="cnote_section q-pa-md">
      <div class="title_wrap row justify-between items-center">
        <div class="subtitle q-pl-sm">{{ cafe.cnote_cnt }}건의 커핑노트</div>
        <div class="row items-center q-pr-sm">
          <btn-basic color="grey-6" label="추천순" size="sm" />
          <btn-basic color="grey-6" label="최신순" size="sm" />
        </div>
      </div>

      <div class="cards_container row justify-between">
        <div class="cards_wrap" v-for="cnote in cnotes" :key="cnote.cnote_id">
          <card-cnote :cnote="cnote" />
        </div>
      </div>
    </section> -->
  </q-page>

  <q-page v-else-if="loading" class="constrain">
    <skeleton-cafe-detail />
  </q-page>

  <q-page v-else class="cafe_detail_page constrain">
    <div class="flex flex-center text-grey-5">
      <h4>존재하지 않는 카페 또는 잘못된 접근입니다.</h4>
    </div>
  </q-page>

  <!-- 저작권 문구
"icons created by www.flaticon.com from Freepik" -->
</template>

<script>
import { defineComponent } from 'vue'

// import InfiniteScroll from '../components/Scroll/InfiniteScroll.vue'
import ImageGrid from '../components/Etc/ImageGrid.vue'
import BadgeCafe from 'src/components/Badge/BadgeCafe.vue'
import BtnBasic from 'src/components/Button/BtnBasic.vue'
import BtnLike from 'src/components/Button/BtnLike.vue'
import BtnBeenThere from 'src/components/Button/BtnBeenThere.vue'
import BtnReview from 'src/components/Button/BtnReview.vue'
import CardReview from '../components/Card/CardReview.vue'
import MenuItem from 'src/components/Etc/MenuItem.vue'
import FacilityItem from 'src/components/Etc/FacilityItem.vue'
import KakaoMiniMap from 'src/components/Etc/KakaoMiniMap.vue'
import BtnSort from 'src/components/Tab/BtnSort.vue'
// import CardCnote from 'src/components/Card/CardCupNote.vue'

import SkeletonCafeDetail from 'src/components/Skeleton/SkeletonCafeDetail.vue'

export default defineComponent({
  name: 'CafeDetailPage',
  components: {
    ImageGrid,
    BadgeCafe,
    BtnBasic,
    BtnLike,
    BtnBeenThere,
    BtnReview,
    CardReview,
    // CardCnote,
    MenuItem,
    FacilityItem,
    SkeletonCafeDetail,
    KakaoMiniMap,
    BtnSort
  },
  data() {
    return {
      cafeId: null,
      cafe: null, // api 에서 laod
      cafeMenu: null, // api 에서 laod
      cafeFacility: null, // api 에서 laod
      loading: true,
      menuBrewing: null,
      menuVariation: null,
      reviewRecent: null,
      reviews: [],
      // cnotes: [],
      current: 1, // for pagination
      maxReivewPage: 1, // for pagination
      // reviews_per_page: 4
      cafeImages: null,
      menuImages: null,
      sort: 'recent', // for reviews sort
      sortItems: [
        {
          label: '추천순',
          val: 'like'
        },
        {
          label: '최신순',
          val: 'recent'
        }
      ],
      showMiniMap: false
    }
  },
  watch: {
    current(newPage) {
      this.loadReviews(newPage) // go to that page number
    }
  },
  async created() {
    this.cafeId = this.$route.params.id
    // load delay test
    setTimeout(() => {
      this.loadCafe(this.cafeId)
    }, 100)
  },
  mounted() {
    // console.log('mounted')
  },
  methods: {
    // 카페 기본정보 로드
    loadCafe(cafe_id) {
      this.loading = true
      // cafe info load
      // let apiUrl = `${process.env.API}/cafe/${cafe_id}` // json-server
      let apiUrl = `${process.env.API}/cafe/${cafe_id}?user_id=3` // real-server
      this.$axios
        .get(apiUrl)
        .then((result) => {
          this.cafe = result.data
          this.loading = false

          this.cafe.cafe_description = this.cafe.cafe_description
            ? this.cafe.cafe_description.replace('#', '<br>')
            : ''

          // 해당카페 대표이미지 5개 호출 for 이미지 그리드
          this.getImages(cafe_id)

          // 카페 메뉴와 시설정보 로드
          this.loadCafeInfo(cafe_id)

          // review count 로 토탈 페이지 계산
          this.maxReivewPage = Math.ceil(this.cafe.review_cnt / 4)

          // 해당카페 모든 리뷰 호출 (1 page)
          this.loadReviews(1) // 추후 (cafe_id, 1)로 수정

          // 해당카페 모든 커핑노트 호출 (1 page)
          // this.loadCnotes(1) // 추후 (cafe_id, 1)로 수정

          // 미니맵에 카페의 위치를 표시
          this.showMiniMap = true
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 카페 메뉴와 시설정보 로드
    loadCafeInfo(cafe_id) {
      let apiUrl = `${process.env.API}/cafe/info/${cafe_id}` // real-server
      this.$axios
        .get(apiUrl)
        .then((result) => {
          console.log(result.data)
          this.cafeMenu = result.data['cafeMenu']
          this.cafeFacility = result.data['cafeFacility']

          // 브루잉(필터) 메뉴, 배리에이션 메뉴 구분
          if (this.cafeMenu) {
            this.menuBrewing = this.cafeMenu.filter((m) => m.menu_type === 'br')
            this.menuVariation = this.cafeMenu.filter(
              (menu) => menu.menu_type !== 'br'
            )
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getImages(cafe_id) {
      // let apiUrl = `${process.env.API_LOCAL}/cafeImages?_limit=5` // json-server
      let apiUrl = `${process.env.API}/cafe/image/${cafe_id}` // real-server
      this.$axios
        .get(apiUrl)
        .then((result) => {
          // console.log(result.data)

          this.cafeImages = result.data.filter((item) => {
            return item.type === 'g'
          })
          this.menuImages = result.data.filter((item) => {
            return item.type === 'm'
          })
        })
        .catch((err) => {
          console.log(err)
        })
    },
    changeSort(val) {
      this.sort = val
      this.loadReviews(1)
    },
    // 리뷰 로드
    loadReviews(page) {
      // let apiUrl = `${process.env.API_LOCAL}/review?_page=${page}&_limit=4` // json-server
      // real-server
      let apiUrl = `${process.env.API}/review/${this.cafeId}?user_id=3&sort=${this.sort}&order=d&page=${page}&limit=4`
      this.$axios
        .get(apiUrl)
        .then((result) => {
          if (!this.reviewRecent) {
            this.reviewRecent = result.data.arr[0]
          }
          this.reviews = result.data.arr
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 삭제 보류
    loadCnotes(page) {
      let apiUrl = `${process.env.API_LOCAL}/cnote` // json-server
      // let apiUrl = `${process.env.API}/cnote` // real-server
      this.$axios
        .get(apiUrl)
        .then((result) => {
          this.cnotes = result.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    clickBranch(cafe_id) {
      this.$router.push({ path: `/cafe/${cafe_id}` })
    }
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
    .icon_cafe_type {
      padding-bottom: 2px;
      position: relative;
      left: 3px;
      .icon {
        opacity: 0.8;
      }
    }
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
      left: -16px;
    }
    .btn_review {
      position: relative;
      left: -24px;
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
        &.start {
          align-items: start;
          .icon {
            padding-top: 2px;
          }
        }
      }
      .info_mid {
        .cafe_keywords_wrap {
          border: 1px solid $border-color;
          padding: 6px 10px;
          border-radius: $border-radius;
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
      .review_menu_container {
        @media (max-width: $breakpoint-xs-max) {
          padding: 0;
        }
        .menu_image_wrap {
          padding-top: 16px;
          align-items: end;
          @media (max-width: $breakpoint-xs-max) {
            align-items: start;
            padding-top: 0;
            margin: 0 16px 16px 32px;
          }

          .menu_image {
            // border: 1px solid rgb(141, 141, 141);
            border-radius: 4px;
          }
        }
      }
    }
  }

  .cards_wrap {
    padding: 8px 8px;
    width: 50%;
    @media (max-width: 749px) {
      width: 100%;
    }
  }

  // // 리뷰 섹션
  // .review_section {
  // }
  .minimap {
    border-radius: $border-radius-md;
    overflow: hidden;
    // border-radius: $border-radius;
    // border: 1px solid $grey-4;
  }
  // // 커핑노트 섹션
  // .cnote_section {
  // }

  .cafe_basic_info,
  .coffe_menu {
    max-width: 500px;
  }
  .absolute-full {
    cursor: pointer;
    background: rgba(69, 69, 69, 0.15);
    transition: all 0.5s;
    color: transparent;
    &:hover {
      background: rgba(0, 0, 0, 0.35);
      color: $grey-4;
    }
  }
}
</style>
