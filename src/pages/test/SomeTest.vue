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
  mounted() {
    this.axiosTest()
  },
  methods: {
    axiosTest() {
      // 이렇게 하는건 테스트 실패
      // console.log(this.$api.baseURL)
      // let apiUrl = `${this.$api}/cnote`

      // 아래와 같은 방법으로 해결
      console.log(process.env.API)
      let apiUrl = `${process.env.API}/cnote`
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
