<template>
  <q-page class="q-pa-sm">
    <div class="q-ma-xs q-pa-xs custom_test radius_border">
      <p>기타등등 테스트</p>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  components: {},
  data() {
    return {}
  },
  mounted() {},
  methods: {
    axiosTest() {
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
  }
})
</script>
