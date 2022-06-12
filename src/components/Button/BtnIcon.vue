<template>
  <q-btn :flat="flat" round :icon="icon" :color="color" :aria-label="icon" />
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    flat: { type: Boolean, default: false },
    color: { type: String, default: 'secondary' },
    icon: { type: String, default: 'cruelty_free' }
  }
})
</script>
