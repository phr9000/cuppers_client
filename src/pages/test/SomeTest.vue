<template>
  <q-page class="flex flex-center">
    {{ title }}
    <test-card class="green q-ma-lg" />
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import TestCard from 'src/components/TestCard.vue'

export default defineComponent({
  name: 'IndexPage',
  components: { TestCard },
  data() {
    return {
      title: '커퍼즈 Cuppers'
    }
  },
  mounted() {
    let apiUrl = 'http://localhost:3000/posts'
    this.$axios
      .get(apiUrl)
      .then((result) => {
        console.log(result)
      })
      .catch((err) => {
        console.log(err)
      })
  }
})
</script>
