<template>
  <div class="q-pa-sm">
    ( {{ id }} )
    <input type="text" v-model="val" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      val: 'Hello'
    }
  },
  props: ['id'],
  methods: {
    getVal() {
      return this.val
    }
  }
}
</script>

<style lang="scss" scoped></style>
