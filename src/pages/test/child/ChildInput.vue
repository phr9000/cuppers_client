<template>
  <div class="q-pa-sm">
    ( {{ id }} )
    <input type="text" v-model="val" />
    <q-btn @click="delVal" size="sm" class="q-mx-md" label="x" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      val: 'Hello'
    }
  },
  props: ['id', 'type'],
  methods: {
    getVal() {
      return this.val
    },
    delVal(id) {
      console.log(this.id)
      this.$emit('delVal', this.id)
    }
  }
}
</script>

<style lang="scss" scoped></style>
