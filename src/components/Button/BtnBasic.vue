<template>
  <q-btn class="q-mr-xs" :color="color" :label="label" />
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    color: { type: String, default: 'secondary' },
    label: { type: String, default: 'BTN BASIC' }
  }
})
</script>
