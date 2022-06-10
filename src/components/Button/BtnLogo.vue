<template>
  <span class="btn_logo clickable" @click="clickLogo">
    <q-avatar square size="34px" class="q-mr-xs q-mb-sm">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/8/8a/Noto_Emoji_Oreo_2615.svg"
      />
    </q-avatar>
    <span class="q-ml-xs q-mr-md">Cuppers'</span>
  </span>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  data() {
    return {}
  },
  methods: {
    clickLogo() {
      this.$router.push({ path: '/' })
    }
  }
})
</script>
<style lang="scss" scoped>
.btn_logo {
  line-height: 50px;
  display: inline-block;
  height: 50px;
}
</style>
