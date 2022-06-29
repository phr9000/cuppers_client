<template>
  <q-btn
    @click="handleCLick"
    padding="2px 8px"
    flat
    dense
    rounded
    color="red-4"
    class="btn_like"
  >
    <div class="row no-wrap items-center">
      <q-icon
        v-if="isLiked"
        size="xs"
        class="icon_fav colored"
        name="favorite"
      />
      <q-icon v-else size="xs" class="icon_fav" name="favorite_border" />
      <span class="likeit_cnt q-ml-xs text-h6" :class="{ colored: isLiked }">{{
        computedCnt
      }}</span>
    </div>
  </q-btn>
</template>
<script>
import useFormatter from 'src/composables/useFormatter'
const { formatNumber } = useFormatter()
export default {
  name: 'BtnLike',
  components: {},
  props: {
    user_id: { type: Number, required: true }, // 로그인한 사용자의 아이디
    like_what: { type: String, required: true }, // 'review' or 'cnote' or 'cafe'
    id_what: { type: Number, required: true }, // 'review_id' or 'cnote_id' or 'cafe_id'
    is_liked: {
      type: Number,
      required: true
    }, // 좋아요 했는지 여부
    likeit_cnt: {
      type: Number,
      required: true
    } // 이 '~'의 좋아요 총 합
  },
  data() {
    return {
      isLiked: false,
      likeitCnt: 0,
      icon: 'favorite_border'
    }
  },
  computed: {
    computedCnt() {
      if (this.likeitCnt >= 1000) {
        return formatNumber(this.likeitCnt / 1000, '#,###.#') + 'K'
      } else {
        return this.likeitCnt
      }
    }
  },
  mounted() {
    this.isLiked = this.is_liked === 1 ? true : false
    this.likeitCnt = this.likeit_cnt
  },
  methods: {
    handleCLick(event) {
      event.stopPropagation() // 버튼 클릭시 상위 컴포넌트 클릭이벤트 호출 방지

      if (this.isLiked) {
        this.isLiked = false
        this.likeitCnt--
        console.log(
          `user:id(${this.user_id}) just dislike this ${this.like_what}:id(${this.id_what})  `
        )
      } else {
        this.isLiked = true
        this.likeitCnt++
        console.log(
          `user:id(${this.user_id}) just like this ${this.like_what}:id(${this.id_what})  `
        )
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.block {
  font-size: 4rem !important;
}
.btn_like {
  cursor: pointer;

  .icon_fav {
    color: $grey-5;
    &.colored {
      color: $red-4;
    }
  }
  .likeit_cnt {
    line-height: 18px;
    color: $grey-5;
    font-size: 18px;
    &.colored {
      color: $red-4;
    }
  }

  &:hover {
    .icon_fav {
      transition: all 0.3s;
      color: $red-3;
    }
    .likeit_cnt {
      line-height: 18px;
      transition: all 0.3s;
      color: $red-3;
    }
  }
}
</style>
