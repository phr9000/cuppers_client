<template>
  <div class="row justify-center q-my-md">
    <q-spinner-dots v-if="active" id="inf" color="primary" size="40px" />
    <div v-else class="text-grey">마지막입니다.</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // cool: true, // testing..
      active: true
    }
  },
  mounted() {
    setTimeout(() => {
      // this.cool = false
      const observer = new IntersectionObserver(this.callback)

      // 관찰자가 inf를 관찰대상으로 감지
      const inf = document.querySelector('#inf')
      observer.observe(inf)
    }, 1000)
  },
  methods: {
    // 화면상에서 관찰대상이 보여질 때 마다 이 콜백 부분이 실행된다.
    callback(entries, observer) {
      // if (this.cool) {
      //   console.log('now cooling down.')
      //   return
      // }
      if (!this.active) {
        return
      }

      entries.forEach((entry) => {
        // Each entry describes an intersection change for one observed
        if (entry.isIntersecting) {
          this.$emit('entry')
          // this.cool = true
          // setTimeout(() => {
          //   this.cool = false
          // }, 300)
        }
      })
    },
    stop() {
      console.log('inf scroll stoped.')
      this.active = false
    }
  }
}
</script>

<style></style>
