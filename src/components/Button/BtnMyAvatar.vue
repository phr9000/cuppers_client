<template>
  <q-btn @click="clickMyAvatar" round size="sm" class="q-my-sm">
    <q-avatar size="md"> <img :src="url" /> </q-avatar
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
      get: () => $store.state.auth.user
    })

    const url = computed({
      get: () => {
        if (user.value == null) {
          return '/icons/avatar_default.jpg'
        } else {
          return user.value.thumbUrl
        }
      }
    })

    return {
      user,
      url
    }
  },
  methods: {
    clickMyAvatar() {
      this.$router.push('/my')
    }
  }
})
</script>
