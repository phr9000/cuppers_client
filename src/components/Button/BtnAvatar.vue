<template>
  <q-btn @click="clickAvatar" round size="sm" class="q-my-sm">
    <q-avatar size="md">
      <img :src="url" />
    </q-avatar>
  </q-btn>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    userId: {
      type: Number,
      default: 1
    },
    url: {
      type: String,
      default:
        'https://lh3.googleusercontent.com/a-/AOh14GggDZ_vzX_GCd3BjndXJiua3NszhmGTdr-CK82pLcU=s83'
    }
  },
  methods: {
    clickAvatar() {
      console.log('clickAvatar')
    }
  }
})
</script>
