<template>
  <div @click="handleCLick" class="likeit_wrap row items-center">
    <q-icon v-if="isLiked" size="xs" class="icon_fav red" name="fmd_good" />
    <q-icon v-else size="xs" class="icon_fav" name="fmd_good" />
    <span class="likeit_cnt text-h6" :class="{ red: isLiked }">가본곳</span>
  </div>
</template>
<script>
// 아직 데이터 등등 정리 전 상태입니다 !!
export default {
  name: 'BtnBeenThere',
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
      likeitCnt: 0
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
        console.log(
          `user:id(${this.user_id}) just dislike this ${this.like_what}:id(${this.id_what})  `
        )
      } else {
        this.isLiked = true
        console.log(
          `user:id(${this.user_id}) just like this ${this.like_what}:id(${this.id_what})  `
        )
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.likeit_wrap {
  cursor: pointer;
  .icon_fav {
    color: $grey-5;
    &.red {
      color: $teal-4;
    }
  }
  .likeit_cnt {
    padding-left: 2px;
    line-height: 18px;
    color: $grey-5;
    font-size: 16px;
    &.red {
      color: $teal-4;
    }
  }

  &:hover {
    .icon_fav {
      transition: all 0.3s;
      color: $teal-3;
    }
    .likeit_cnt {
      line-height: 18px;
      transition: all 0.3s;
      color: $teal-3;
    }
  }
}
</style>
