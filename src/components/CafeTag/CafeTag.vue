<template>
  <!-- 카페 태그 -->
  <div class="q-pa-md q-gutter-md">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'CafeTag',
  props: {
    CafeTagData: Array
  }
}
</script>

<style></style>
