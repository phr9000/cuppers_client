<template>
  <q-page class="flex flex-center">
    <div class="column items-center">
      <div>login page</div>
      <div>
        <q-label>uid</q-label
        ><q-input v-model="uid" dense class="q-mb-sm"></q-input>
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
      get: () => $store.state.user.user,
      set: (val) => {
        $store.commit('user/setUser', val)
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
  methods: {
    login() {
      this.user = {
        uid: this.uid,
        thumbUrl: `${process.env.STATIC}/images/avatar/${this.uid}/thumb.jpg`
      }
      this.$router.push('/')
    }
  }
})
</script>

<style></style>
