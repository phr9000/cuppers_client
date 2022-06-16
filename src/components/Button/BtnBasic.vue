<template>
  <q-btn
    :dense="dense"
    outline
    rounded
    :size="size"
    class="btn_basic q-mr-xs"
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
    dense: { type: Boolean, default: true },
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
<style lang="scss">
.btn_basic {
  &.btn_sm {
    padding: 3px 9px 3px 9px;
    font-size: 14px !important;
    line-height: 14px;
    min-height: 14px;
    i {
      font-size: 1rem !important;
    }
  }
  &.btn_md {
    padding: 3px 11px 3px 11px;
    font-size: 16px !important;
    line-height: 16px;
    min-height: 16px;
    i {
      font-size: 1.2rem !important;
    }
  }
}
</style>
