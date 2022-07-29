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
import { computed } from 'vue'
import { useStore } from 'vuex'
const { formatNumber } = useFormatter()
import useFormatter from 'src/composables/useFormatter'
export default {
  name: 'BtnLike',
  components: {},
  setup() {
    const $store = useStore()

    const user = computed({
      get: () => $store.state.auth.user
    })

    return {
      user
    }
  },
  props: {
    // user: {
    //   type: Object,
    //   default: () => {
    //     return null
    //   }
    // }, // 로그인한 사용자
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

      // user 없을때 예외처리
      let uid
      if (this.user) {
        uid = this.user.uid
      } else {
        this.$q.notify({
          position: 'top',
          timeout: 5000,
          message: '로그인이 필요합니다. 로그인 하시겠습니까?',
          color: 'primary',
          actions: [
            {
              label: '로그인',
              color: 'yellow',
              handler: () => {
                this.$router.push('/login')
              }
            },
            {
              label: '나중에',
              color: 'grey',
              handler: () => {}
            }
          ]
        })

        return
      }

      let apiUrl = `${process.env.API}/${this.like_what}/like/${uid}/${this.id_what}` // real-server

      this.$axios
        .get(apiUrl)
        .then((result) => {
          if (!result.data.error) {
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
                `user:id(${uid}) just like this ${this.like_what}:id(${this.id_what})  `
              )
            }
          } else {
            console.log(
              `${this.id_what} 또는 user_id가 잘못되었습니다. 요청을 수행할 수 없습니다.`
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
