<template>
  <q-btn flat dense>
    <q-avatar @click="clickReqNewCafe" square size="lg">
      <img src="/icons/new_cafe.png" />
    </q-avatar>
  </q-btn>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  data() {
    return {}
  },
  methods: {
    clickReqNewCafe() {
      console.log('clickReqNewCafe')
    }
  }
})
</script>
<style lang="scss" scoped>
img {
  height: 30px !important;
}
</style>
