<template>
  <q-drawer
    v-model="drawer"
    show-if-above
    :width="200"
    :breakpoint="500"
    bordered
    class="bg-grey-3"
  >
    <q-scroll-area class="fit">
      <q-list padding>
        <q-item
          @click="clickTab('cnote')"
          class="tabs"
          :class="{ active: tab === 'cnote' }"
          clickable
          v-ripple
        >
          <q-item-section avatar>
            <q-icon name="rate_review" />
          </q-item-section>

          <q-item-section> 커핑노트 </q-item-section>
        </q-item>

        <q-item
          @click="clickTab('review')"
          class="tabs"
          :class="{ active: tab === 'review' }"
          clickable
          v-ripple
        >
          <q-item-section avatar>
            <q-icon name="reviews" />
          </q-item-section>

          <q-item-section> 리뷰 </q-item-section>
        </q-item>

        <q-item
          @click="clickTab('likeit')"
          class="tabs"
          :class="{ active: tab === 'likeit' }"
          clickable
          v-ripple
        >
          <q-item-section avatar>
            <q-icon name="favorite" />
          </q-item-section>

          <q-item-section> 좋아요 </q-item-section>
        </q-item>

        <q-item
          @click="clickTab('beenthere')"
          class="tabs"
          :class="{ active: tab === 'beenthere' }"
          clickable
          v-ripple
        >
          <q-item-section avatar>
            <q-icon name="beenhere" />
          </q-item-section>

          <q-item-section> 가본곳 </q-item-section>
        </q-item>

        <q-separator />

        <q-item @click="logout" class="text-grey" clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="logout" />
          </q-item-section>

          <q-item-section> 로그아웃 </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-drawer>

  <q-page class="page">
    <main>
      <section class="section_user_info">
        <card-user-info :user_info="userInfo" />
      </section>
      <section class="section_list_wrap bg-grey-1">
        <div v-if="tab === 'cnote'">
          <!-- 커핑노트 리스트 -->
          <div class="text-center q-py-sm">내가 쓴 커핑노트 리스트</div>
          <div class="cnotes_wrap q-px-md">
            <cnote-list :cnotes="cnotes" />
          </div>
        </div>
        <div v-else-if="tab === 'review'">
          <!-- 리뷰 리스트 -->
          <div class="text-center q-py-sm">내가 쓴 리뷰 리스트</div>
          <div class="cnotes_wrap q-px-md">
            <review-list :reviews="reviews" />
          </div>
        </div>
        <div v-else>
          <!-- 가본곳(카페) 리스트 -->
          <div>가본곳(카페) 리스트</div>
          <!-- 좋아요(카페) 리스트 -->
          <div>좋아요(카페) 리스트</div>
        </div>
      </section>
    </main>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { computed } from 'vue'
import { useStore } from 'vuex'

import CardUserInfo from 'src/components/Card/CardUserInfo.vue'
import CnoteList from 'src/components/List/CnoteList.vue'
import ReviewList from 'src/components/List/ReviewList.vue'

export default defineComponent({
  name: 'MyPage',
  components: {
    CardUserInfo,
    CnoteList,
    ReviewList
  },
  setup() {
    const $store = useStore()

    const user = computed({
      get: () => $store.state.auth.user,
      set: (val) => {
        $store.commit('auth/setUser', val)
      }
    })

    return {
      user
    }
  },
  data() {
    return {
      drawer: false,
      tab: 'cnote', // current tab
      userInfo: null,
      // {
      //   user_id: 1,
      //   user_email: 'hba@kakao.com',
      //   user_introduce: '맛있는 커피를 찾아서~!',
      //   user_lv: 1,
      //   user_thumbnail_url:
      //     'http://localhost:3000/static/images/avatar/1/thumb.jpg',
      //   user_nickname: 'AestasKwak'
      // }

      cnotes: [],
      cnotePage: 1,
      cnoteLimit: 10,
      isReviewLoaded: false,
      reviews: []
    }
  },
  mounted() {
    setTimeout(() => {
      this.loadUserInfo()
    }, 100)
    this.loadCnotes()
  },
  methods: {
    loadCnotes() {
      const PAGE = this.cnotePage
      const LIMIT = this.cnoteLimit
      const uid = this.user.uid
      const SORT = 'recent'

      let apiUrl = `${process.env.API}/cnote/${uid}?user_id=${uid}&page=${PAGE}&limit=${LIMIT}&sort=${SORT}`

      this.$axios
        .get(apiUrl)
        .then((result) => {
          // console.log(apiUrl)
          // console.log(result.data.arr)
          if (result.data.length < 1) {
            // this.$refs.infScroll.stop()
            return
          }
          result.data.arr.forEach((item) => {
            this.cnotes.push(item)
          })
        })
        .catch((err) => {
          console.log(err)
        })
    },
    loadReviews() {
      this.isReviewLoaded = true
      const uid = this.user.uid
      let apiUrl = `${process.env.API}/review/mypage/${uid}`

      this.$axios
        .get(apiUrl)
        .then((result) => {
          console.log(apiUrl)
          console.log(result.data.arr)
          if (result.data.arr.length < 1) {
            // this.$refs.infScroll.stop()
            return
          }
          result.data.arr.forEach((item) => {
            const review = { ...item, user_liked: 1 }
            this.reviews.push(review)
          })
          console.log(this.reviews)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    loadUserInfo() {
      if (this.user) {
        let apiUrl = `${process.env.API}/user/detail/${this.user.uid}`
        this.$axios
          .get(apiUrl)
          .then((result) => {
            if (result.statusText === 'OK') {
              this.userInfo = {
                ...result.data[0],
                thumbUrl: `${process.env.STATIC}/${result.data[0].user_thumbnail_url}`
              }
            }
          })
          .catch((err) => {
            console.log(err)
          })
      }
    },
    clickTab(tab) {
      this.tab = tab
      if (!this.isReviewLoaded) {
        this.loadReviews()
      }
    },
    logout() {
      this.user = null
      this.$q.notify({
        position: 'top',
        timeout: 1000,
        message: '로그아웃 되었습니다.',
        color: 'primary'
      })

      this.$router.push('/')
    }
  }
})
</script>

<style lang="scss" scoped>
.tabs {
  color: $grey;
  &.active {
    color: $secondary;
  }
}
.section_user_info {
  border-bottom: 1px solid $grey-4;
}
</style>
