<template>
  <q-btn flat round :icon="icon" :color="color" :aria-label="icon" />
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    color: { type: String, default: 'secondary' },
    icon: { type: String, default: 'cruelty_free' }
  }
})
</script>
