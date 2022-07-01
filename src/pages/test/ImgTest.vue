<template>
  <div>
    <input v-on:change="fileSelct()" type="file" ref="burgerimage" />
    <button @click="submit()">submit</button>
  </div>
</template>

<script>
export default {
  data() {},
  methods: {
    submit() {
      const formData = new FormData()
      formData.append('bugerImage', this.burgerImage)
    }
  }
}
</script>

<style lang="scss" scoped></style>
