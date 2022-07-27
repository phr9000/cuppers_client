<template>
  <div class="review_list">
    <div class="left">
      <!-- <card-review :review=""></card-review> -->
      <card-review></card-review>
    </div>
    <div class="right"></div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

import CardReview from 'src/components/Card/CardReview.vue'

export default defineComponent({
  name: 'ReviewList',
  components: { CardReview },
  props: {
    cnotes: {
      type: Array,
      default: () => {
        return null
      }
    }
  },
  data() {
    return {}
  },
  created() {},
  methods: {}
})
</script>
<style lang="scss" scoped>
.review_list {
  background-color: antiquewhite;
  width: 100%;
}
</style>
