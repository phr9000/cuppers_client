<template>
  <q-btn
    v-scroll="onScroll"
    @click="click"
    class="btn_scroll_top"
    :class="{ show: show }"
    round
    color="secondary"
    icon="expand_less"
  />
</template>

<script>
import { debounce } from 'quasar'

export default {
  name: 'BtnScrollTop',
  setup() {
    function onScroll(position) {
      // when this method is invoked then it means user
      // has scrolled the page to `position`
      //
      // `position` is an Integer designating the current
      // scroll position in pixels.
      console.log(position)

      if (position > 300) {
        this.show = true
      } else {
        this.show = false
      }
    }

    return {
      onScroll: debounce(onScroll, 200) // debounce for 200ms
    }
  },
  data() {
    return {
      show: false
    }
  },
  methods: {
    click() {
      this.smoothScroll('.section_top', 800)
    },
    smoothScroll(_target, _duration) {
      const target = document.querySelector(_target)
      const targetPosition = target.getBoundingClientRect().top
      const startPosition = window.pageYOffset
      const distance = targetPosition - startPosition
      let startTime = null

      function animation(currnetTime) {
        if (startTime === null) startTime = currnetTime
        const timeElapsed = currnetTime - startTime
        const run = ease(timeElapsed, startPosition, distance, _duration)
        window.scrollTo(0, run)
        if (timeElapsed < _duration) requestAnimationFrame(animation)
      }

      function ease(t, b, c, d) {
        t /= d / 2
        if (t < 1) return (c / 2) * t * t + b
        t--
        return (-c / 2) * (t * (t - 2) - 1) + b
      }

      requestAnimationFrame(animation)
    }
  }
}
</script>

<style lang="scss" scoped>
.btn_scroll_top {
  position: fixed;
  right: 10px;
  bottom: 10px;
  transition: all 0.3s;
  pointer-events: none; // 마우스 클릭 안되게
  opacity: 0;
  &.show {
    opacity: 1;
    pointer-events: initial;
  }
}
</style>
