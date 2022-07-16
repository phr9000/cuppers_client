<template>
  <q-btn
    dense
    outline
    rounded
    :size="size"
    class="btn_basic_right"
    :class="[
      size === 'sm'
        ? btnSmClass
        : size === 'md'
        ? btnMdClass
        : size === 'lg'
        ? btnLgClass
        : ''
    ]"
    :color="color"
    :icon-right="icon"
    :label="label"
  />
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'BtnBasicRight',
  props: {
    size: { type: String, default: 'md' },
    color: { type: String, default: 'secondary' },
    label: { type: String, default: 'BTN BASIC' },
    icon: { type: String, default: null }
  },
  data() {
    return {
      btnSmClass: 'btn_sm',
      btnMdClass: 'btn_md',
      btnLgClass: 'btn_lg'
    }
  }
})
</script>
<style lang="scss">
.btn_basic_right {
  &.btn_sm {
    padding: 3px 9px 3px 9px;
    font-size: 13px !important;
    line-height: 13px;
    min-height: 13px;
    i {
      font-size: 1rem !important;
    }
  }
  &.btn_md {
    padding: 3px 11px 3px 11px;
    font-size: 14px !important;
    line-height: 14px;
    min-height: 14px;
    i {
      font-size: 1rem;
    }
  }
  &.btn_lg {
    padding: 3px 13px 3px 13px;
    // font-size: 18px !important;
    // line-height: 18px;
    // min-height: 18px;
    i {
      font-size: 1.6rem !important;
    }
  }
}
</style>
