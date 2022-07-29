<template>
  <!-- 카페카드 (지도화면) -->
  <q-card v-if="!deleted" flat class="card_cafe q-pa-md column overflow-hidden">
    <q-card-section class="row q-pa-none">
      <div class="col-8">
        <div class="">
          <div class="row justify-between items-start q-mb-xs">
            <div class="row items-center">
              <div class="text_title text-left">
                {{ cafe.cafe_name_pr }}
              </div>
              <!-- cafe type, region -->
              <cafe-type
                :cafe_type="cafe.cafe_type"
                :cafe_region="cafe.cafe_region"
              />
            </div>
          </div>
          <div class="btns row justify-start items-center no-wrap q-mb-xs">
            <btn-like
              class="btn_like"
              :id_what="cafe.cafe_id"
              like_what="cafe"
              :is_liked="cafe.user_liked"
              :likeit_cnt="cafe.like_cnt"
            />
            <btn-review
              class="btn_review"
              :cafe_id="cafe.cafe_id"
              :review_cnt="cafe.review_cnt"
            />
          </div>

          <div class="caption text-caption overflow-hidden">
            <div v-if="cafe.cafe_description">{{ cafe.cafe_description }}</div>
            <div v-else>
              <!-- 키워드 -->
              <div class="info q-mb-xs">
                <q-icon size="xs" name="tag" class="icon icon_key" />
                <div class="cafe_keywords_wrap">
                  <badge-cafe
                    v-for="keyword in cafe.keywords"
                    :key="keyword.keyword_name"
                    :value="keyword.keyword_name"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 영업시간 -->
        <q-card-section v-if="today" class="q-pa-none">
          <div class="info info_today q-mb-xs">
            <q-icon size="xs" name="calendar_today" class="icon icon_cal" />

            <div class="text q-pt-xs">
              {{ today.day }} :
              {{ today.time }}
            </div>
          </div>
        </q-card-section>
      </div>
      <div class="col-4 q-pl-md q-pt-xs">
        <!-- style="max-width: 280px; max-height: 320px" -->
        <q-img v-if="calUrl" class="thumbnail" :ratio="1" :src="calUrl" />
        <div
          v-if="cafe.distance > -1"
          class="row items-center justify-end q-mt-xs q-pb-md text-grey text-caption"
        >
          <q-icon name="place" />
          <div class="distance q-pr-xs">{{ calDistance }}Km</div>
        </div>
      </div></q-card-section
    >
    <q-card-section
      v-if="cafe.cafe_description && cafe.keywords"
      class="q-pa-none row justify-between"
    >
      <!-- 키워드 -->
      <div class="info q-mb-xs">
        <q-icon size="xs" name="tag" class="icon icon_key" />
        <div class="cafe_keywords_wrap">
          <badge-cafe
            v-for="keyword in cafe.keywords"
            :key="keyword.keyword_name"
            :value="keyword.keyword_name"
          />
        </div>
      </div>
      <div v-if="cafe.mylist_cafe_id">
        <btn-basic
          flat
          class="btn_remove"
          @click="delFromList"
          size="md"
          icon="playlist_remove"
          label="제거"
        />
      </div>
    </q-card-section>

    <q-card-section v-else class="q-pa-none row justify-between">
      <div></div>
      <div>
        <btn-basic
          flat
          class="btn_remove"
          @click="delFromList"
          size="md"
          icon="playlist_remove"
          label="제거"
        />
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue'
import BtnBasic from 'src/components/Button/BtnBasic.vue'
import BtnLike from 'src/components/Button/BtnLike.vue'
import BtnReview from 'src/components/Button/BtnReview.vue'
import BadgeCafe from 'src/components/Badge/BadgeCafe.vue'
import CafeType from 'src/components/Etc/CafeType.vue'

// composables
import useDistance from 'src/composables/useDistance'
const { getDistanceFromLatLng } = useDistance()
import useFormatter from 'src/composables/useFormatter'
const { formatNumber } = useFormatter()

export default defineComponent({
  name: 'CardCafeLi',
  components: {
    BtnBasic,
    BtnLike,
    BtnReview,
    BadgeCafe,
    CafeType
  },
  props: {
    cafe: {
      type: Object,
      default: () => {
        return null
      }
    },
    today: {
      type: Object,
      default: () => {
        return null
      }
    }
    // curLoc: {
    //   type: Object,
    //   default: () => {
    //     return null
    //   }
    // }
  },
  data() {
    return { deleted: false }
  },
  computed: {
    calUrl() {
      if (this.cafe.cafe_img.startsWith('images/')) {
        return `${process.env.STATIC}/${this.cafe.cafe_img}`
      }
      return this.cafe.cafe_img
    },
    calDistance() {
      const dist = this.cafe.distance
      if (dist > 5) {
        return formatNumber(dist, '#,###')
      } else {
        return formatNumber(dist, '#,###.#')
      }

      // 삭제 보류
      // calDistance() {
      //   try {
      //     if (this.curLoc) {
      //       const dist = getDistanceFromLatLng(
      //         this.curLoc.lat,
      //         this.curLoc.lng,
      //         this.cafe.cafe_latitude,
      //         this.cafe.cafe_longitude
      //       )
      //       if (dist > 5) {
      //         return formatNumber(dist, '#,###')
      //       } else {
      //         return formatNumber(dist, '#,###.#')
      //       }
      //     }
      //   } catch {
      //     return -1
      //   }
      //   return -1
      // },
    }
  },
  mounted() {},
  methods: {
    // 리스트에서 제거
    delFromList(event) {
      event.stopPropagation() // 버튼 클릭시 상위 컴포넌트 클릭이벤트 호출 방지
      console.log(this.cafe.mylist_cafe_id)
      let apiUrl = `${process.env.API}/cafe/mylist/remove`
      this.$axios
        .post(apiUrl, {
          param: {
            mylist_cafe_id: this.cafe.mylist_cafe_id
          }
        })
        .then((result) => {
          if (result.data.affectedRows > 0) {
            this.$q.notify({
              position: 'top',
              timeout: 1000,
              message: '마이리스트에서 제거되었습니다.',
              color: 'info'
            })
            this.deleted = true
          }
        })
        .catch((err) => {
          console.log('마이리스트 생성 실패')
          console.log(err)
        })
    }
  }
})
</script>

<style lang="scss" scoped>
.card_cafe {
  width: 100%;
  min-width: 300px;
  border-bottom: 1px solid $grey-4;
  cursor: pointer;
  &:hover {
    background-color: $grey-2;
  }
  .text_title {
    font-size: 18px;
    font-weight: 500;
  }
  .btns {
    .btn_like {
      position: relative;
      transform: scale(0.9);
      left: -10px;
    }
    .btn_review {
      position: relative;
      transform: scale(0.9);
      left: -24px;
    }
  }
  .btn_remove {
    position: relative;
    top: -2px;
    left: 6px;
    line-height: 16px;
    padding: 1px 10px;
    color: $grey-5 !important;
    transform: scale(0.9);
  }
  .thumbnail {
    border-radius: $border-radius-md;
  }
  .btn_detail {
    min-width: 100px;
    padding-top: 3px;
  }
  .caption {
    color: $grey-8;
    height: 43px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .info {
    color: $grey-8;
    display: flex;
    flex-wrap: nowrap;
    align-items: flex-start;
    &.info_today {
      align-items: center;
      .text {
        color: $grey-7;
        font-size: 12px;
        font-weight: 500;
      }
    }
    .icon {
      // padding-top: 1px;
      padding-right: 4px;
      &.icon_cal {
        padding-top: 1px;
        transform: scale(0.8);
      }
      &.icon_key {
        padding-top: 2px;
        transform: scale(0.95);
      }
    }
  }
}
</style>
