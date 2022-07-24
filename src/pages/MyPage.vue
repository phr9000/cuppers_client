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
      <section class="section_list_wrap">
        <!-- 커핑노트 리스트 -->
        <div>커핑노트 리스트</div>
        <!-- 리뷰 리스트 -->
        <div>리뷰 리스트</div>
        <!-- 가본곳(카페) 리스트 -->
        <div>가본곳(카페) 리스트</div>
        <!-- 좋아요(카페) 리스트 -->
        <div>좋아요(카페) 리스트</div>
      </section>
    </main>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { computed } from 'vue'
import { useStore } from 'vuex'

import CardUserInfo from 'src/components/Card/CardUserInfo.vue'

export default defineComponent({
  name: 'MyPage',
  components: {
    CardUserInfo
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
      userInfo: null,
      drawer: false,
      tab: 'cnote' // current tab
      // {
      //   user_id: 1,
      //   user_email: 'hba@kakao.com',
      //   user_introduce: '맛있는 커피를 찾아서~!',
      //   user_lv: 1,
      //   user_thumbnail_url:
      //     'http://localhost:3000/static/images/avatar/1/thumb.jpg',
      //   user_nickname: 'AestasKwak'
      // }
    }
  },
  mounted() {
    setTimeout(() => {
      this.loadUserInfo()
    }, 300)
  },
  methods: {
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
    },
    logout() {
      this.user = null
      this.$q.notify({
        position: 'top',
        timeout: 1000,
        message: '로그아웃 되었습니다.',
        color: 'primary'
      }),
        // this.$q.localStorage.remove('auth')
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
</style>
