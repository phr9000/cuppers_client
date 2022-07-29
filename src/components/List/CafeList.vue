<template>
  <div>
    <div
      v-if="cafes.length"
      class="cafe_list justify-center q-gutter-sm row section_top"
    >
      <div class="cards_wrap q-mb-sm" v-for="cafe in cafes" :key="cafe.cafe_id">
        <card-cafe-main
          :cafe_id="cafe.cafe_id"
          :title="cafe.cafe_name_pr"
          :distance="cafe.distance"
          :imgUrl="cafe.cafe_img"
        />
      </div>

      <btn-scroll-top />
    </div>
    <div v-else class="text-grey text-center q-py-md">
      <p class="q-pb-sm">좋아요한 카페가 없습니다.</p>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

import CardCafeMain from 'src/components/Card/CardCafeMain.vue'
import BtnScrollTop from 'src/components/Scroll/BtnScrollTop.vue'

export default defineComponent({
  name: 'CnoteList',
  components: {
    CardCafeMain,
    BtnScrollTop
  },
  props: {
    cafes: {
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
  mounted() {},
  methods: {}
})
</script>
<style lang="scss" scoped>
.cafe_list {
  width: 100%;

  .cards_wrap {
    width: 293px;
    transition: all 0.2s;
    &:hover {
      transform: translatey(-3px);
    }
    // &:nth-child(3n) {
    //   margin-right: 0;
    // }
    @media (max-width: 977px) {
      width: 217px;
      // margin-bottom: 1rem;
    }
    @media (max-width: 749px) {
      width: 220px;
      // &:nth-child(2n) {
      //   margin-right: 0;
      // }
    }
  }
}
</style>
