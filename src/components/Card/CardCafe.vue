<template>
  <!-- 카페카드 (커핑노트) -->
  <q-card v-if="cafe" class="card_cafe row overflow-hidden">
    <div class="col-5 q-pl-md q-py-md">
      <q-img
        height="184px"
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
            <!-- cafe type, region -->
            <cafe-type
              :cafe_type="cafe.cafe_type"
              :cafe_region="cafe.cafe_region"
            />
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

      <q-card-section class="key_and_address q-pt-none">
        <!-- 키워드 -->
        <div v-if="cafe.keywords" class="info info_key q-mb-xs">
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
        <!-- <div class="info q-mb-xs">
          <q-icon
            size="xs"
            name="calendar_today"
            class="icon icon_cal q-pt-xs"
          />

          <div class="cafe_keywords_wrap text_subtitle1 q-pt-xs">
            {{ cafe.opTime[0].day }} :
            {{ cafe.opTime[0].time }}
          </div>
        </div> -->
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
import CafeType from 'src/components/Etc/CafeType.vue'

export default defineComponent({
  name: 'CardCafe',
  components: {
    BtnLike,
    BtnReview,
    BtnBasicRight,
    BadgeCafe,
    CafeType
  },
  props: {
    cafe: {
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
