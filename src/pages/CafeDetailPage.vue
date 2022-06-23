<template>
  <q-page v-if="cafe" class="cafe_detail_page constrain">
    <!-- 카페이름 및 기본버튼들 -->
    <section class="cafe_title_section column q-px-lg q-pt-lg">
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
      <!-- 좋아요 가본곳 리뷰수 -->
      <div class="col q-mb-xs">
        <div class="row justify-between">
          <div class="row items-center">
            <!-- 좋아요 버튼 -->
            <div class="btn_likeit q-mr-xs">
              <btn-like
                :user_id="1"
                :id_what="cafe.cafe_id"
                like_what="cafe"
                :is_liked="cafe.user_like"
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
              <btn-basic
                color="grey-8"
                label="리뷰 쓰기"
                icon="edit"
                size="md"
              />
              <btn-basic color="grey-8" label="공유" icon="share" size="md" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Image Grid -->
    <section v-if="cafeImages" class="q-mx-xs q-px-sm q-pt-xs">
      <!-- Image Grid -->
      <!-- <q-img class="rounded" src="/GRIDIMAGES_TEMP.JPG" /> -->
      <image-grid class="image-grid rounded" :images="cafeImages" />
    </section>

    <!-- 기본정보, 커피메뉴 & 최근리뷰 컨테이너 -->
    <section class="cafe_information_section column">
      <section class="cafe_detail_wrap row">
        <!-- 기본정보, 커피메뉴 -->
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
              <!-- 카페 설명 -->
              <div class="info start q-mb-xs">
                <q-icon size="xs" name="place" class="icon" />

                <div
                  class="text_subtitle1 q-pr-xs"
                  v-html="cafe.cafe_description"
                ></div>
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
                <div class="q-pl-lg q-pb-sm">
                  <q-img width="210px" src="/facility.png" />
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
                    :label="branch.branch_name"
                    size="sm"
                    color="grey-5"
                    @click="clickBranch(branch.cafe_id)"
                  />
                  <div class="text_subtitle1">분점</div>

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
        <div class="col-5 q-py-md q-pr-md column justify-between align-end">
          <!-- 최근 리뷰 -->
          <div class="recent_review">
            <div class="subtitle q-mb-xs">최근 리뷰</div>
            <card-review />
          </div>

          <!-- 대표 메뉴 이미지 -->
          <div
            v-if="menuImages.length > 0"
            class="menu_image_wrap column items-end q-mt-md"
          >
            <div class="info q-mb-xs">
              <q-icon size="xs" name="img:/icons/menu.png" class="q-mx-xs" />
              <div class="text_subtitle1">메뉴판 이미지</div>
            </div>
            <q-img
              class="menu_image"
              width="80%"
              height="130px"
              :src="menuImages[0].url"
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
    <section class="cafe_review_section q-pa-md">
      <!--  -->
      <div class="title_wrap row justify-between items-center">
        <div class="subtitle q-pl-sm">
          {{ cafe.review_cnt }}건의 방문자 리뷰
        </div>
        <div class="row items-center q-pr-sm">
          <btn-basic color="grey-6" label="추천순" size="sm" />
          <btn-basic color="grey-6" label="최신순" size="sm" />
        </div>
      </div>

      <div class="reviews_container row justify-between">
        <div
          class="review_wrap"
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
    <section class="q-mx-xs q-px-sm q-pt-xs">
      <q-img class="rounded" src="/MAP_TEMP.JPG" />
    </section>

    <!-- 커핑 노트 -->
    <section class="cafe_review_section q-pa-md">
      <!--  -->
      <div class="title_wrap row justify-between items-center">
        <div class="subtitle q-pl-sm">{{ cafe.cnote_cnt }}건의 커핑노트</div>
        <div class="row items-center q-pr-sm">
          <btn-basic color="grey-6" label="추천순" size="sm" />
          <btn-basic color="grey-6" label="최신순" size="sm" />
        </div>
      </div>

      <div class="reviews_container row justify-between">
        <div v-for="cnote in cnotes" :key="cnote.cnote_id" class="review_wrap">
          <card-cnote :cnote="cnote" />
        </div>
      </div>

      <!-- 인피니티 스크롤 -->
      <!-- <infinite-scroll /> -->
    </section>
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
import CardCnote from 'src/components/Card/CardCupNote.vue'
import SkeletonCafeDetail from 'src/components/Skeleton/SkeletonCafeDetail.vue'

export default defineComponent({
  name: 'CafeDetailPage',
  components: {
    // InfiniteScroll,
    ImageGrid,
    BadgeCafe,
    BtnBasic,
    BtnLike,
    BtnBeenThere,
    BtnReview,
    CardReview,
    CardCnote,
    MenuItem,
    SkeletonCafeDetail
  },
  data() {
    return {
      cafe: null,
      loading: true,
      menuBrewing: null,
      menuVariation: null,
      recent_review: {},
      reviews: [],
      cnotes: [],
      current: 1, // for pagination
      maxReivewPage: 1, // for pagination
      // reviews_per_page: 4
      cafeImages: null,
      menuImages: null
    }
  },
  watch: {
    current(newPage) {
      this.getReviews(newPage) // go to that page number
    }
  },
  async created() {
    // load delay test
    setTimeout(() => {
      this.loadCafe(this.$route.params.id)
    }, 100)
  },
  mounted() {
    // console.log('mounted')
  },
  methods: {
    loadCafe(cafe_id) {
      this.loading = true
      // cafe info load
      let apiUrl = `${process.env.API}/cafe/${cafe_id}`
      this.$axios
        .get(apiUrl)
        .then((result) => {
          this.cafe = result.data

          // 0,1 -> boolean
          this.cafe.user_like = this.cafe.user_like === 1 ? true : false
          this.cafe.user_beenthere =
            this.cafe.user_beenthere === 1 ? true : false

          this.cafe.cafe_description = this.cafe.cafe_description.replace(
            '#',
            '<br>'
          )

          // 해당카페 대표이미지 5개 호출 for 이미지 그리드
          this.getImages(cafe_id)

          // 브루잉(필터) 메뉴, 배리에이션 메뉴 구분
          if (this.cafe.menu) {
            this.menuBrewing = this.cafe.menu.filter(
              (m) => m.menu_type === 'br'
            )
            this.menuVariation = this.cafe.menu.filter(
              (menu) => menu.menu_type !== 'br'
            )
          }

          // review count 로 토탈 페이지 계산
          this.maxReivewPage = Math.ceil(this.cafe.review_cnt / 4)

          // 해당카페 모든 리뷰 호출 (1 page)
          this.getReviews(1) // 추후 (cafe_id, 1)로 수정

          let apiUrl = `${process.env.API}/cnote`
          this.$axios
            .get(apiUrl)
            .then((result) => {
              this.cnotes = result.data
            })
            .catch((err) => {
              console.log(err)
            })

          this.loading = false
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getImages(cafe_id) {
      let apiUrl = `${process.env.API}/cafeImages/${cafe_id}?_limit=5`
      this.$axios
        .get(apiUrl)
        .then((result) => {
          this.cafeImages = result.data.images.filter((item) => {
            return item.type === 'g'
          })
          this.menuImages = result.data.images.filter((item) => {
            return item.type === 'm'
          })
          // console.log(this.cafeImages)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getReviews(page) {
      let apiUrl = `${process.env.API}/review?_page=${page}&_limit=4`
      this.$axios
        .get(apiUrl)
        .then((result) => {
          this.reviews = result.data
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

      .menu_image {
        // border: 1px solid rgb(141, 141, 141);
        border-radius: 4px;
      }
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
