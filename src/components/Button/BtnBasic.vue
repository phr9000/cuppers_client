<template>
  <q-btn
    dense
    outline
    rounded
    :size="size"
    class="btn q-mr-xs"
    :class="[size === 'sm' ? btnSmClass : size === 'md' ? btnMdClass : '']"
    :color="color"
    :label="label"
  />
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'BtnBasic',
  props: {
    size: { type: String, default: 'md' },
    color: { type: String, default: 'secondary' },
    label: { type: String, default: 'BTN BASIC' }
  },
  data() {
    return {
      btnSmClass: 'btn_sm',
      btnMdClass: 'btn_md'
    }
  }
})
</script>
<style lang="scss" scoped>
.btn_sm {
  padding: 2px 8px;
  font-size: 11px !important;
}
.btn_md {
  padding: 2px 10px;
  font-size: 15px !important;
}
</style>
