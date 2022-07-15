<template>
  <q-page class="flex flex-center">
    {{ title }}
    <br />
    <btn-my-avatar />
    <br />
    {{ user }}
    <button @click="logout">logout</button>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { computed } from 'vue'
import { useStore } from 'vuex'

import BtnMyAvatar from 'src/components/Button/BtnMyAvatar.vue'

export default defineComponent({
  name: 'MyProfilePage',
  setup() {
    const $store = useStore()

    const user = computed({
      get: () => $store.state.auth.user,
      set: (val) => {
        $store.commit('user/setUser', val)
      }
    })

    return {
      user
    }
  },
  components: { BtnMyAvatar },
  data() {
    return {
      title: 'my page'
    }
  },
  mounted() {
    // if (!this.user || this.user.uid < 1) {
    //   console.log('로그인 안된 상태, 로그인 페이지로 이동')
    //   this.$router.push('/login')
    // } else {
    //   console.log('로그인 정보 있음')
    // }
  },
  methods: {
    logout() {
      this.user = null
      this.$q.localStorage.remove('user')
      this.$router.push('/login')
    }
  }
})
</script>
