<template>
  <q-img class="rounded" src="/GRIDIMAGES_TEMP.JPG" />
</template>
<script>
export default {
  name: 'ImageGrid',
  props: {
    cafeData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {}
}
</script>
<style scoped lang="scss"></style>
