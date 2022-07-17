<template>
  <q-page class="page">
    <aside>
      <div>커핑노트</div>
      <div>리뷰</div>
      <div>가본곳</div>
      <div>좋아요</div>
      <button @click="logout">logout</button>
    </aside>

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
  components: {
    CardUserInfo
  },
  data() {
    return {
      userInfo: null
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
    // if (!this.user || this.user.uid < 1) {
    //   console.log('로그인 안된 상태, 로그인 페이지로 이동')
    //   this.$router.push('/login')
    // } else {
    //   console.log('로그인 정보 있음')
    // }
    setTimeout(() => {
      this.loadUserInfo()
    }, 300)
  },
  methods: {
    loadUserInfo() {
      if (this.user) {
        let apiUrl = `${process.env.API}/user/detail/${this.user.uid}` // json-server
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
    logout() {
      this.user = null
      this.$q.localStorage.remove('auth')
      this.$router.push('/login')
    }
  }
})
</script>

<style lang="scss" scoped>
.page {
  display: grid;
  grid-template-columns: 180px 1fr;
}
</style>
