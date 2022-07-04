<template>
  <div>
    login page
    <div>logged user: {{ uid }}</div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
  setup() {
    const $store = useStore()

    const uid = computed({
      get: () => $store.state.user.uid,
      set: (val) => {
        $store.commit('user/setUid', val)
      }
    })

    return {
      uid
    }
  },
  mounted() {
    this.uid = 2
  }
}
</script>

<style></style>
