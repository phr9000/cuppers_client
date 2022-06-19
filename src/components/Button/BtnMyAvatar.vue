<template>
  <q-btn @click="clickMyAvatar" round size="sm" class="q-my-sm">
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
      default: '/icons/avatar_my.jpg'
    }
  },
  methods: {
    clickMyAvatar() {
      console.log('clickMyAvatar')
    }
  }
})
</script>
