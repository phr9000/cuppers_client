<template>
  <div v-if="review" class="card_review_container">
    <div class="user_info row items-center">
      <btn-avatar :url="user_thumbnail_url" />
      <div class="q-ml-sm user_name">{{ review.user_nickname }}</div>
    </div>
    <q-card class="card_review" bordered flat>
      <q-card-section class="cafe_info row items-center justify-between">
        <div @click="cafeNameClick" class="text-h5 cafe_name q-mb-xs q-mr-xs">
          {{ review.cafe_name_pr }}
        </div>
        <div class="cafe_keywords_wrap">
          <badge-cafe
            v-for="keyword in review.review_keyword"
            :key="keyword.keyword_name"
            :value="keyword.keyword_name"
          />
        </div>
      </q-card-section>
      <q-card-section class="coffee_info_wrap row q-pt-md q-pr-md">
        <div class="col-12 col-sm-7 coffee_info q-py-none q-pl-xs q-pr-md">
          <menu-item
            :name="review.review_drink"
            :type="drinkType"
            :is_signature="isSignature"
            :is_review="true"
          />
          <div
            v-html="contentHTML"
            class="caption text-caption text-grey q-my-sm"
          ></div>
        </div>
        <q-img
          class="col-12 col-sm-5 q-pr-sm review_image"
          :initial-ratio="16 / 9"
          :src="review.review_img"
          ><div
            class="rounded-borders absolute-full text-subtitle2 flex flex-center"
          >
            모든 이미지 보기
          </div>
        </q-img>
      </q-card-section>
      <q-card-section
        class="review_bottom row justify-between items-center q-mb-sm"
      >
        <div class="btn_like">
          <btn-like
            :user_id="1"
            :id_what="review.review_id"
            like_what="review"
            :is_liked="review.user_liked"
            :likeit_cnt="review.like_cnt"
          />
        </div>

        <div class="text-grey">{{ createDate }}</div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { format, toDate } from 'date-fns'
import { defineComponent } from 'vue'
import BtnAvatar from 'src/components/Button/BtnAvatar.vue'
import BadgeCafe from 'src/components/Badge/BadgeCafe.vue'
import BtnLike from 'src/components/Button/BtnLike.vue'
import MenuItem from 'src/components/Etc/MenuItem.vue'

export default defineComponent({
  name: 'CardReview',
  components: { BtnAvatar, BadgeCafe, BtnLike, MenuItem },
  props: {
    review: {
      type: Object,
      default: () => {
        return null
      }
    }
  },
  data() {
    return {
      thumbnail: '',
      user_thumbnail_url: ''
    }
  },
  computed: {
    createDate() {
      let time = toDate(Date.parse(this.review.created_at))
      return format(time, 'MMM dd. yyyy')
    },
    cafeKeywords() {
      return this.review.review_keyword.filter((key) => {
        return key.keyword_type === 'cafe'
      })
    },
    drinkType() {
      const type = this.review.drink_type
      if (type) {
        return type.includes('br') ? 'br' : type.includes('va') ? 'va' : ''
      } else {
        return ''
      }
    },
    isSignature() {
      const type = this.review.drink_type
      if (type) {
        return type.includes('sg') ? 1 : 0
      } else {
        return ''
      }
    },
    contentHTML() {
      if (this.review.review_content) {
        return this.review.review_content.replaceAll('\\n', '<br />')
      } else {
        return ''
      }
    }
  },
  mounted() {},
  methods: {
    cafeNameClick() {
      this.$router.push({ path: `/cafe/${this.review.cafe_id}` })
    }
  }
})
</script>

<style lang="scss" scoped>
.user_info {
  .user_name {
    color: $grey-9;
  }
}
.card_review {
  background-color: $card-bg-color;
  // box-shadow: 0 1px 9px rgb(0 0 0 / 14%), 0 2px 2px rgb(0 0 0 / 10%),
  //   0 3px 1px -2px rgb(0 0 0 / 4%);
  border: 1px solid $grey-4;
  .cafe_info {
    padding-bottom: 0;
    max-height: 100px;
    overflow-y: hidden;
    .cafe_name {
      transition: all 0.5s;
      color: $grey-9;
      cursor: pointer;
      &:hover {
        color: $grey-6;
      }
    }
    .cafe_keywords_wrap {
      flex-wrap: nowrap;
    }
  }
  .caption {
    max-height: 100px;
    overflow-y: auto;
  }
  .review_image {
    border-radius: 4px;
  }
  .review_bottom {
    padding: 4px 16px 8px 16px;
    .btn_like {
      position: relative;
      left: -5px;
    }
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
