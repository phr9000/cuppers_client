<template>
  <q-btn
    @click="handleCLick"
    padding="2px 8px"
    flat
    dense
    rounded
    color="secondary"
    class="likeit_wrap row items-center"
  >
    <q-icon v-if="marked" size="xs" class="icon_fav colored" name="bookmark" />
    <q-icon v-else size="xs" class="icon_fav" name="bookmark_border" />
  </q-btn>
</template>
<script>
export default {
  name: 'BtnBookMark',
  components: {},
  props: {
    user_id: { type: Number, required: true }, // 로그인한 사용자의 아이디
    cnote_id: { type: Number, required: true },
    is_marked: {
      type: Boolean,
      required: true
    } // 북마크 했는지 여부
  },
  data() {
    return {
      marked: false
    }
  },
  mounted() {
    this.marked = this.is_marked
  },
  methods: {
    handleCLick() {
      if (this.marked) {
        this.marked = false
        console.log(
          `user:id(${this.user_id}) just unchecked bookmark this cnote:id(${this.cnote_id})`
          // 추후 백엔드 호출
        )
      } else {
        this.marked = true
        console.log(
          `user:id(${this.user_id}) just checked bookmark this cnote:id(${this.cnote_id})`
          // 추후 백엔드 호출
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
    transform: scale(1.25);
    color: $grey-5;
    &.colored {
      color: $teal-4;
    }
  }
  .likeit_cnt {
    padding-left: 2px;
    line-height: 18px;
    color: $grey-5;
    font-size: 15px;
    font-weight: 400;
    &.colored {
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
