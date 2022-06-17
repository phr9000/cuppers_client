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
      default: '/public/icons/avatar.jpg'
    }
  },
  methods: {
    clickAvatar() {
      console.log('clickAvatar')
    }
  }
})
</script>
