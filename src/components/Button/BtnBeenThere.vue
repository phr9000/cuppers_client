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
    user: {
      type: Object,
      default: () => {
        return null
      }
    }, // 로그인한 사용자
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
    console.log(this.beenThere, this.been_there)
  },
  methods: {
    handleCLick(event) {
      event.stopPropagation() // 버튼 클릭시 상위 컴포넌트 클릭이벤트 호출 방지

      // user 없을때 예외처리
      let uid
      if (this.user) {
        uid = this.user.uid
      } else {
        console.log(
          'user id가 없습니다. 로그인이 필요합니다. 로그인 하시겠습니까?'
        )
        return
      }

      let apiUrl = `${process.env.API}/cafe/beenthere/${uid}/${this.cafe_id}` // real-server

      this.$axios
        .get(apiUrl)
        .then((result) => {
          if (!result.data.error) {
            if (this.beenThere) {
              this.beenThere = false
              console.log(
                `user:id(${uid}) just unchecked beenthere this cafe:id(${this.cafe_id})`
              )
            } else {
              this.beenThere = true
              console.log(
                `user:id(${uid}) just checked beenthere this cafe:id(${this.cafe_id})`
              )
            }
          } else {
            console.log(
              'cafe_id 또는 user_id가 잘못되었습니다. 요청을 수행할 수 없습니다.'
            )
            console.log(apiUrl)
            console.log(result.data.error)
          }
        })
        .catch((err) => {
          console.log(err)
        })
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
