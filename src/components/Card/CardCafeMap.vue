<template>
  <!-- 카페카드 (지도화면) -->
  <q-card v-if="cafe" class="card_cafe overflow-hidden">
    <btn-icon
      @click="clickClose"
      :flat="true"
      color="grey-9"
      class="btn_close"
      icon="close"
    />
    <q-img class="border-rad" :ratio="16 / 9" :src="cafe.cafe_img" />

    <q-card-section class="title_wrap">
      <div class="row justify-between items-start no-wrap q-mb-xs">
        <div class="row items-center">
          <div class="title text-left text-h6 q-mr-sm">
            {{ cafe.cafe_name_pr }}
            <!-- type and region -->
            <span class="row items-center">
              <span v-if="cafe.cafe_type === 'r'" class="icon_cafe_type"
                ><q-icon size="14px" name="img:/icons/roastery.png" class=""
              /></span>
              <span class="text-subtitle1 text-grey q-pt-xs">
                {{ cafe.cafe_region }}</span
              >
            </span>
          </div>
        </div>
      </div>
      <div class="row justify-between items-center no-wrap q-mb-xs">
        <div class="row no-wrap">
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
        <div class="">
          <btn-basic-right
            @click="goDetail"
            class="btn_detail bg-grey-2"
            :rounded="false"
            icon="open_in_new"
            color="grey-7"
            label="상세보기"
            padding="4px 8px "
          />
        </div>
      </div>
      <div class="caption text-caption overflow-hidden">
        {{ cafe.cafe_description }}
      </div>
    </q-card-section>

    <q-separator />

    <q-card-section class="key_and_address">
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
      <div v-if="today" class="info q-mb-xs">
        <q-icon size="xs" name="calendar_today" class="icon icon_cal q-pt-xs" />

        <div class="cafe_keywords_wrap text_subtitle1 q-pt-xs">
          {{ today.day }} :
          {{ today.time }}
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue'
import BtnIcon from 'src/components/Button/BtnIcon.vue'
import BtnLike from 'src/components/Button/BtnLike.vue'
import BtnReview from 'src/components/Button/BtnReview.vue'
import BtnBasicRight from 'src/components/Button/BtnBasicRight.vue'
import BadgeCafe from 'src/components/Badge/BadgeCafe.vue'

export default defineComponent({
  name: 'CardCafeMap',
  components: {
    BtnIcon,
    BtnLike,
    BtnReview,
    BtnBasicRight,
    BadgeCafe
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
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {
    goDetail() {
      // 해당 카페의 상세 페이지로 이동
      this.$router.push(`/cafe/${this.cafe.cafe_id}`)
    },
    clickClose() {
      this.$emit('close')
    }
  }
})
</script>

<style lang="scss" scoped>
.card_cafe {
  width: 100%;

  .btn_close {
    position: absolute;
    top: 0px;
    right: 0px;
    z-index: 1;
    border-radius: 50%;
    transform: scale(1.2);
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
    width: 93px;
    margin-top: 3px;
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
