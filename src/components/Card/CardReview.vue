<template>
  <div v-if="review" class="card_review_container">
    <div class="user_info row items-center">
      <btn-avatar :url="review.user_thumbnail_url" />
      <div class="q-ml-sm user_name">{{ review.user_nickname }}</div>
    </div>
    <q-card class="card_review" :bordered="bordered" :flat="flat">
      <q-card-section class="cafe_info row items-center justify-between">
        <div @click="cafeNameClick" class="text-h5 cafe_name q-mb-xs q-mr-xs">
          {{ review.cafe_name_pr }}
        </div>
        <div class="cafe_keywords_wrap">
          <badge-cafe
            v-for="keyword in review.review_keyword"
            :key="keyword.name"
            :value="keyword.name"
          />
        </div>
      </q-card-section>
      <q-card-section class="review_mid row q-pt-md q-pr-md">
        <div class="q-py-none q-pl-xs q-pr-md">
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
        <div class="carousel_wrap">
          <div class="overay"></div>
          <div @click="clickThumbnail" class="show_all">모든 이미지</div>
          <q-carousel
            v-if="images"
            class="carousel"
            animated
            v-model="slide"
            navigation
            infinite
            arrows
            height="200px"
            transition-prev="slide-right"
            transition-next="slide-left"
            control-type="flat"
          >
            <q-carousel-slide
              v-for="(img, i) in images"
              :key="img.images_review_id"
              :name="i"
              :img-src="img.thumbnail_url"
            />
          </q-carousel>

          <!-- 모든 이미지 - 전체 화면 -->
          <modal-swiper
            :show="showModal"
            :images="images"
            @close="showModal = false"
          />
        </div>
      </q-card-section>
      <q-card-section
        class="review_bottom row justify-between items-center q-mb-sm"
      >
        <div class="btn_like">
          <btn-like
            :user="user"
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
import { defineComponent } from 'vue'
import { computed } from 'vue'
import { useStore } from 'vuex'
import { format, toDate } from 'date-fns'
import BtnAvatar from 'src/components/Button/BtnAvatar.vue'
import BadgeCafe from 'src/components/Badge/BadgeCafe.vue'
import BtnLike from 'src/components/Button/BtnLike.vue'
import MenuItem from 'src/components/Etc/MenuItem.vue'
import ModalSwiper from 'src/components/Modal/ModalSwiper.vue'

export default defineComponent({
  name: 'CardReview',
  components: { BtnAvatar, BadgeCafe, BtnLike, MenuItem, ModalSwiper },
  props: {
    review: {
      type: Object,
      default: () => {
        return null
      }
    },
    bordered: {
      type: Boolean,
      default: true
    },
    flat: {
      type: Boolean,
      default: true
    }
  },
  setup() {
    const $store = useStore()

    const user = computed({
      get: () => $store.state.auth.user
    })

    return {
      user
    }
  },
  data() {
    return { slide: 0, showModal: false, sliderImages: [] }
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
    },
    images() {
      if (this.review.review_images.length > 0) {
        const images = this.review.review_images.map((img) => {
          if (img.thumbnail_url.startsWith('images/')) {
            img.thumbnail_url = `${process.env.STATIC}/${img.thumbnail_url}`
          }
          if (img.images_review_url.startsWith('images/')) {
            img.images_review_url = `${process.env.STATIC}/${img.images_review_url}`
          }
          img = { ...img, url: img.images_review_url, id: img.images_review_id }

          return img
        })
        // console.log(images)
        return images
      } else {
        return null
      }
    }
  },
  mounted() {},
  methods: {
    clickCafeName() {
      // console.log(this.review.review_images)
      this.$router.push({ path: `/cafe/${this.review.cafe_id}` })
    },
    clickThumbnail() {
      this.showModal = true
      console.log('show all images')
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
  .review_mid {
    display: grid;
    grid-template-columns: 1fr 200px;

    @media (max-width: $breakpoint-md-max) {
      grid-template-columns: 1fr 160px;
    }
    // @media (max-width: $breakpoint-sm-max) {
    //   grid-template-columns: 1fr 120px;
    // }

    .caption {
      // max-height: 100px;
      // overflow-y: auto;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 7;
      -webkit-box-orient: vertical;
    }
    .review_image {
      border-radius: 4px;
    }
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
.carousel_wrap {
  position: relative;
  border-radius: $border-radius;
  max-height: 200px;

  @media (max-width: $breakpoint-md-max) {
    max-height: 160px;
  }
  // @media (max-width: $breakpoint-sm-max) {
  //   max-height: 120px;
  // }

  .overay {
    pointer-events: none; // 마우스 클릭 안되게
    position: absolute;
    border-radius: $border-radius;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.25);
    z-index: 1;
    &:hover {
      background-color: rgba(0, 0, 0, 0.45);
    }
  }
  // 모든이미지 보기
  .show_all {
    text-align: center;
    color: antiquewhite;
    position: absolute;
    cursor: pointer;
    display: flex;
    justify-content: center;
    z-index: 2;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 50%;
    align-items: center;
    opacity: 0;
    transition: all 0.3s;

    &:hover {
      opacity: 0.8;
    }
  }
}
.carousel {
  border-radius: $border-radius;
  max-height: 200px;

  // @media (max-width: 962px) {
  //   max-height: 160px;
  // }
  @media (max-width: $breakpoint-md-max) {
    max-height: 160px;
  }
  // @media (max-width: $breakpoint-sm-max) {
  //   max-height: 120px;
  // }

  :deep(.q-carousel__navigation) {
    transform: scale(0.45);
    bottom: 0px;
  }
  :deep(.q-carousel__prev-arrow) {
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    transition: all 0.3s;

    &:hover {
      opacity: 0.7;
    }
  }
  :deep(.q-carousel__next-arrow) {
    height: 100%;
    top: 0;
    right: 0;
    opacity: 0;
    transition: all 0.3s;

    &:hover {
      opacity: 0.7;
    }
  }
  :deep(.q-carousel__arrow .q-btn-item) {
    height: 100%;
    border-radius: 0;
  }
}
</style>
