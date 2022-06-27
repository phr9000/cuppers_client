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
    <q-icon
      v-if="beenThere"
      size="xs"
      class="icon_fav colored"
      name="beenhere"
    />
    <q-icon v-else size="xs" class="icon_fav" name="beenhere" />
    <span class="likeit_cnt" :class="{ colored: beenThere }">가본곳</span>
  </q-btn>
</template>
<script>
export default {
  name: 'BtnBeenThere',
  components: {},
  props: {
    user_id: { type: Number, required: true }, // 로그인한 사용자의 아이디
    cafe_id: { type: Number, required: true },
    been_there: {
      type: Number,
      required: true
    } // 가본곳 눌렀는지 여부
  },
  data() {
    return {
      beenThere: false
    }
  },
  mounted() {
    this.beenThere = this.been_there === 1 ? true : false
  },
  methods: {
    handleCLick(event) {
      event.stopPropagation() // 버튼 클릭시 상위 컴포넌트 클릭이벤트 호출 방지

      if (this.beenThere) {
        this.beenThere = false
        console.log(
          `user:id(${this.user_id}) just unchecked beenthere this cafe:id(${this.cafe_id})`
          // 추후 백엔드 호출
        )
      } else {
        this.beenThere = true
        console.log(
          `user:id(${this.user_id}) just checked beenthere this cafe:id(${this.cafe_id})`
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
    transform: scale(0.95);
    transform: translateY(1px);
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
