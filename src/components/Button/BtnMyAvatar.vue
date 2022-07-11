<template>
  <q-btn @click="clickMyAvatar" round size="sm" class="q-my-sm">
    <q-avatar size="md"> <img :src="user.thumbUrl" /> </q-avatar
  ></q-btn>
</template>
<script>
import { defineComponent } from 'vue'
import { computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'BtnMyAvatar',
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
  methods: {
    clickMyAvatar() {
      this.$router.push('/my')
    }
  }
})
</script>
