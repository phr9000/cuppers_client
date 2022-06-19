<template>
  <q-btn
    @click="handleCLick"
    padding="2px 8px"
    flat
    dense
    rounded
    color="red-4"
    class="btn_like row no-wrap items-center"
  >
    <q-icon
      v-if="isLiked"
      size="xs"
      class="icon_fav colored white"
      name="favorite"
    />
    <q-icon v-else size="xs" class="icon_fav" name="favorite_border" />
    <span class="likeit_cnt q-ml-xs text-h6" :class="{ colored: isLiked }">{{
      likeitCnt
    }}</span>
  </q-btn>
</template>
<script>
export default {
  name: 'BtnLike',
  components: {},
  props: {
    user_id: { type: Number, required: true }, // 로그인한 사용자의 아이디
    like_what: { type: String, required: true }, // 'review' or 'cnote' or 'cafe'
    id_what: { type: Number, required: true }, // 'review_id' or 'cnote_id' or 'cafe_id'
    is_liked: {
      type: Boolean,
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
  mounted() {
    this.isLiked = this.is_liked
    this.likeitCnt = this.likeit_cnt
  },
  methods: {
    handleCLick() {
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
