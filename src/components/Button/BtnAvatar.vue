<template>
  <q-btn @click="clickAvatar" round size="sm" class="q-my-sm">
    <q-avatar size="md">
      <img :src="calUrl" />
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
      default: 'images/avatar/1/thumb.jpg'
    }
  },
  computed: {
    calUrl() {
      return `${process.env.STATIC}/${this.url}`
    }
  },
  methods: {
    clickAvatar() {
      console.log('clickAvatar')
    }
  }
})
</script>
