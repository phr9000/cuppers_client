<template>
  <q-avatar
    @click="clickLogo"
    square
    size="34px"
    class="clickable q-ml-md q-mb-xs"
  >
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/8/8a/Noto_Emoji_Oreo_2615.svg"
    />
  </q-avatar>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  data() {
    return {}
  },
  methods: {
    clickLogo() {
      console.log('clickLogo')
    }
  }
})
</script>
