<template>
  <q-btn
    @click="handleCLick"
    padding="2px 8px"
    flat
    dense
    rounded
    color="primary"
    class="btn row no-wrap items-center"
  >
    <q-icon size="xs" class="icon_fav" name="notes" />
    <span class="review_cnt q-ml-xs text-h6"> {{ review_cnt }}</span>
  </q-btn>
</template>
<script>
export default {
  name: 'BtnReview',
  components: {},
  props: {
    cafe_id: { type: Number, required: true },
    review_cnt: {
      type: Number,
      required: true
    } // 이 '~'의 좋아요 총 합
  },
  data() {
    return {
      icon: 'favorite_border'
    }
  },
  mounted() {},
  methods: {
    handleCLick(event) {
      event.stopPropagation() // 버튼 클릭시 상위 컴포넌트 클릭이벤트 호출 방지

      console.log('click')
    }
  }
}
</script>
<style lang="scss" scoped>
.btn {
  cursor: pointer;

  .icon_fav {
    color: $grey-5;
    &.colored {
      color: $primary;
    }
  }
  .review_cnt {
    line-height: 18px;
    color: $grey-5;
    font-size: 18px;
    &.colored {
      color: $primary;
    }
  }

  &:hover {
    .icon_fav {
      transition: all 0.3s;
      color: $primary;
    }
    .review_cnt {
      line-height: 18px;
      transition: all 0.3s;
      color: $primary;
    }
  }
}
</style>
