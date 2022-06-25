<template>
  <!-- 카페카드 (지도화면) -->
  <q-card class="card_cafe row overflow-hidden">
    <div class="col-5 q-pl-md q-py-md">
      <!-- style="max-width: 280px; max-height: 320px" -->
      <q-img
        height="200px"
        class="thumbnail"
        :ratio="3 / 4"
        :src="cafe.cafe_img"
      />
    </div>

    <div class="col-7">
      <q-card-section class="title_wrap">
        <div class="row justify-between items-start q-mb-xs">
          <div class="row items-center">
            <div class="title text-left text-h6 q-mr-sm">
              {{ cafe.cafe_name_pr }}
            </div>
            <!-- type and region -->
            <div class="row items-center">
              <span v-if="cafe.cafe_type === '로스터리'" class="icon_cafe_type"
                ><q-icon size="14px" name="img:/icons/roastery.png"
              /></span>
              <span class="text-subtitle2 text-grey q-pt-xs">
                {{ cafe.cafe_region }}</span
              >
            </div>
          </div>

          <div class="btn_detail">
            <btn-basic-right
              @click="goDetail"
              class="bg-grey-2"
              :rounded="false"
              icon="open_in_new"
              color="grey-7"
              label="상세보기"
              padding="4px 8px "
            />
          </div>
        </div>
        <div class="row justify-start items-center no-wrap q-mb-xs">
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
        <q-separator class="q-mt-md" />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <!-- 키워드 -->
        <div class="info info_key q-mb-xs">
          <q-icon size="xs" name="tag" class="icon q-mb-xs" />
          <div class="cafe_keywords_wrap">
            <badge-cafe
              v-for="keyword in cafe.keywords"
              :key="keyword.keyword_name"
              :value="keyword.keyword_name"
            />
          </div>
        </div>
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
            class="icon icon_cal q-pt-xs"
          />

          <div class="cafe_keywords_wrap text_subtitle1 q-pt-xs">
            {{ cafe.opTime[0].day }} :
            {{ cafe.opTime[0].time }}
          </div>
        </div>
      </q-card-section>
    </div>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue'
import BtnLike from 'src/components/Button/BtnLike.vue'
import BtnReview from 'src/components/Button/BtnReview.vue'
import BtnBasicRight from 'src/components/Button/BtnBasicRight.vue'
import BadgeCafe from 'src/components/Badge/BadgeCafe.vue'

export default defineComponent({
  name: 'CardCafe',
  components: {
    BtnLike,
    BtnReview,
    BtnBasicRight,
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
          user_beenthere: 0,
          keywords: [
            {
              keyword_id: 1,
              keyword_name: '커피에 대한 설명'
            },
            {
              keyword_id: 11,
              keyword_name: '내추럴 커피'
            },
            {
              keyword_id: 12,
              keyword_name: '추출도구 선택 가능'
            },
            {
              keyword_id: 13,
              keyword_name: 'COE 취급'
            }
          ],
          opTime: [
            {
              day: '월',
              time: '정기휴무'
            },
            {
              day: '화~토',
              time: '11:30 - 21:30 (21:00 라스트오더)'
            },
            {
              day: '일',
              time: '정기휴무'
            }
          ]
        }
      }
    },
    title: { type: String, default: '커퍼즈커피 본점' },
    distance: { type: String, default: '4.7km' },
    caption: {
      type: String,
      default:
        '커피즈커피는 커피를 매개로 만나는 사람들의 미각적 행복과 기술적 진보를 위해 노력합니다. 커피리브레는 커피를 매개로 만나는 사람들의 미각적 행복과 기술적 진보를 위해 노력합니다.'
    }
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {
    goDetail() {
      // 해당 카페의 상세 페이지로 이동
      console.log('card clicked. cafe_id: ', this.cafe.cafe_id)
      this.$router.push(`/cafe/${this.cafe.cafe_id}`)
    }
  }
})
</script>

<style lang="scss" scoped>
.card_cafe {
  width: 100%;
  min-width: 500px;
  max-width: 900px;
  .thumbnail {
    border-radius: $border-radius;
    max-height: 268px;
  }
  .icon {
    padding-right: 4px;
  }
  .icon_cafe_type {
    padding-bottom: 1px;
    padding-right: 6px;
    // position: relative;
    // left: -3px;
  }
  .btn_detail {
    min-width: 100px;
    padding-top: 3px;
  }
  .btn_like {
    position: relative;
    left: -8px;
  }
  .btn_review {
    position: relative;
    left: -12px;
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
    align-items: center;
    &.info_key {
      align-items: start;
      .icon {
        padding-top: 2px;
      }
    }
    .icon_cal {
      transform: scale(0.85);
    }
  }
}
</style>
