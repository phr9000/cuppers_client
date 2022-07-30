<template>
  <div>
    <div v-if="reviews.length" class="review_list">
      <div class="whole">
        <div
          class="cards_wrap"
          v-for="review in reviews"
          :key="review.review_id"
        >
          <card-review :review="review" />
        </div>
      </div>
      <div class="lr">
        <div class="left">
          <div
            class="q-mb-sm"
            v-for="review in leftList"
            :key="review.review_id"
          >
            <card-review :review="review" :borderd="true" :flat="true" />
          </div>
        </div>
        <div class="right">
          <div
            class="q-mb-sm"
            v-for="review in rightList"
            :key="review.review_id"
          >
            <card-review :review="review" />
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-grey-5 text-center q-py-md">
      <p class="q-pb-sm">불러온 리뷰가 없습니다</p>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

import CardReview from 'src/components/Card/CardReview.vue'

export default defineComponent({
  name: 'ReviewList',
  components: { CardReview },
  props: {
    reviews: {
      type: Array,
      default: () => {
        return null
      }
    }
  },
  data() {
    return {}
  },
  computed: {
    leftList() {
      console.log(this.reviews)
      return this.reviews.filter((item, i) => {
        return i % 2 === 0
      })
    },
    rightList() {
      return this.reviews.filter((item, i) => {
        return i % 2 === 1
      })
    }
  },
  created() {},
  methods: {}
})
</script>
<style lang="scss" scoped>
.review_list {
  width: 100%;
  .whole {
    display: none;
    width: 100%;
    @media (max-width: $breakpoint-sm-max) {
      display: block;
    }
  }
  .lr {
    @media (max-width: $breakpoint-sm-max) {
      display: none;
    }
    display: grid;
    grid-template-columns: 1fr 1fr;

    .left {
      padding-right: 5px;
    }
    .right {
      padding-left: 5px;
    }
  }
}
</style>
