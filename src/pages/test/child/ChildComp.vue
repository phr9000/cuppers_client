<template>
  <div class="q-pa-sm">{{ val }}</div>
</template>

<script>
export default {
  data() {
    return {
      val: 'aaa'
    }
  },
  methods: {
    changeVal() {
      this.val = 'bbb'
    }
  }
}
</script>

<style lang="scss" scoped></style>
