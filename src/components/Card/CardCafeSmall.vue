<template>
  <!-- 카페카드 (지도화면) -->
  <q-card
    @click="handleCardClick"
    flat
    class="card_cafe q-pa-md column overflow-hidden"
  >
    <q-card-section class="row q-pa-none">
      <div class="col-8">
        <div class="">
          <div class="row justify-between items-start q-mb-xs">
            <div class="row items-center">
              <div class="text_title text-left q-mr-sm">
                {{ cafe.cafe_name_pr }}
              </div>
            </div>
          </div>
          <div class="btns row justify-start items-center no-wrap q-mb-xs">
            <btn-like
              class="btn_like"
              :user_id="1"
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
            {{ cafe.cafe_description }}
          </div>
        </div>

        <!-- 영업시간 -->
        <q-card-section v-if="today" class="q-pa-none">
          <div class="info q-mb-xs">
            <q-icon size="xs" name="calendar_today" class="icon icon_cal" />

            <div class="text_caption q-pt-xs">
              {{ today.day }} :
              {{ today.time }}
            </div>
          </div>
        </q-card-section>
      </div>
      <div class="col-4 q-pl-md q-pt-xs">
        <!-- style="max-width: 280px; max-height: 320px" -->
        <q-img class="thumbnail" :ratio="1" :src="cafe.cafe_img" /></div
    ></q-card-section>
    <q-card-section v-if="keywords" class="q-pa-none">
      <!-- 키워드 -->
      <div class="info q-mb-xs">
        <q-icon size="xs" name="tag" class="icon icon_key" />
        <div class="cafe_keywords_wrap">
          <badge-cafe
            v-for="keyword in keywords"
            :key="keyword.keyword_name"
            :value="keyword.keyword_name"
          />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue'
import BtnLike from 'src/components/Button/BtnLike.vue'
import BtnReview from 'src/components/Button/BtnReview.vue'
import BadgeCafe from 'src/components/Badge/BadgeCafe.vue'

export default defineComponent({
  name: 'CardCafeSmall',
  components: {
    BtnLike,
    BtnReview,
    BadgeCafe
  },
  props: {
    cafe: {
      type: Object,
      default: () => {
        return {
          cafe_id: 1,
          cafe_name_pr: '커피앰비언스 (송파구)',
          cafe_address: '서울 송파구 송이로17길 51',
          cafe_region: '송파',
          cafe_address_dong: '(가락동)',
          cafe_type: '로스터리',
          cafe_latitude: 37.5015764,
          cafe_longitude: 127.124833,
          cafe_description:
            '‘커피를 커피답게’ 10년차 큐그레이더가 운영하는 호주식 로스터리 카페#한적한 주택가에 위치해 있으며, 카펜터, 아이리스, 헬로다크니스 등 3종의 자체 블렌딩을 비롯해 다양한 싱글오리진 원두 라인업을 갖추고 있다. 핸드드립 커피를 즐기는 이들에게 좋은 평을 받고 있다.',
          cafe_img:
            'http://bwissue.com/files/attach/images/243/259/163/5f5e0b133235349e19e997c5bf5f9440.jpg',
          like_cnt: 114,
          user_liked: 1,
          review_cnt: 32,
          user_beenthere: 0
        }
      }
    },
    keywords: {
      type: Array,
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
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {
    handleCardClick() {
      // 해당 카페 클릭 처리
      console.log('card clicked. cafe_id: ', this.cafe.cafe_id)
      // this.$router.push(`/cafe/${this.cafe.cafe_id}`)
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
  .thumbnail {
    border-radius: $border-radius-md;
  }
  .btn_detail {
    min-width: 100px;
    padding-top: 3px;
  }
  .caption {
    color: $grey-8;
    height: 40px;
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
    .icon {
      // padding-top: 1px;
      padding-right: 4px;
      &.icon_cal {
        padding-top: 5px;
        transform: scale(0.85);
      }
      &.icon_key {
        padding-top: 2px;
        transform: scale(0.95);
      }
    }
  }
}
</style>
