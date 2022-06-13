<template>
  <div @click="handleCLick" class="likeit_wrap row items-center">
    <q-icon v-if="likedIt" size="xs" class="icon_fav red" name="favorite" />
    <q-icon v-else size="xs" class="icon_fav" name="favorite_border" />
    <span class="likeit_cnt q-ml-xs text-h6" :class="{ red: likedIt }">{{
      likeItCount
    }}</span>
  </div>
</template>
<script>
import { el } from 'date-fns/locale'
export default {
  name: 'BtnLike',
  components: {},
  props: {
    userId: { type: Number, required: true }, // 로그인한 사용자의 아이디
    likeWhat: { type: String, required: true }, // 'review' or 'cnote' or 'cafe'
    whatId: { type: Number, required: true }, // 'review_id' or 'cnote_id' or 'cafe_id'
    likedIt: {
      type: Boolean,
      required: true
    }, // 좋아요 했는지 여부
    likeItCount: {
      type: Number,
      required: true
    } // 이 '~'의 좋아요 총 합
  },
  data() {
    return {}
  },
  methods: {
    handleCLick() {
      if (this.likedIt) {
        console.log(
          `user:id(${this.userId}) just dislike this ${this.likeWhat}:id(${this.whatId})  `
        )
      } else {
        console.log(
          `user:id(${this.userId}) just like this ${this.likeWhat}:id(${this.whatId})  `
        )
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.likeit_wrap {
  cursor: pointer;
  &:hover {
    .icon_fav {
      transition: all 0.3s;
      color: $red-4;
    }
    .likeit_cnt {
      transition: all 0.3s;
      color: $red-4;
    }
  }

  .icon_fav {
    color: $grey-5;
    &.red {
      color: $red-4;
    }
  }
  .likeit_cnt {
    color: $grey-5;
    font-size: 18px;
    &.red {
      color: $red-4;
    }
  }
}
</style>
