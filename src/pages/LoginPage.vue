<template>
  <q-page class="flex flex-center">
    <div class="column items-center">
      <div>login page</div>
      <div>
        <q-input label="uid" v-model="uid" dense class="q-mb-sm"></q-input>
      </div>
      <div><button @click="login">입력한 uid로 로그인</button></div>
      <div v-if="user">logged user: {{ user }}</div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
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
      uid: 0
    }
  },
  created() {},
  methods: {
    login() {
      const uid = parseInt(this.uid)
      this.user = {
        uid: uid,
        thumbUrl: `${process.env.STATIC}/images/avatar/${uid}/thumb.jpg`
      }
      this.$q.localStorage.set('auth', this.user)
      this.$router.push('/')
    }
  }
})
</script>

<style></style>
