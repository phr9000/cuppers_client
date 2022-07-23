<template>
  <q-footer bordered class="footer_global column justify-center">
    <q-toolbar class="q-px-lg q-pt-lg">
      <div class="row items-center">
        <div class="column text-grey-5">
          <div>고객 문의 : cuppers@gmail.com</div>
          <div>© Cuppers’ . All rights reserved.</div>
        </div>
        <div class="q-px-md">
          <q-avatar size="sm" class="q-mr-xs">
            <img src="/icons/sns_insta.png" />
          </q-avatar>
          <q-avatar size="sm" class="q-mr-xs">
            <img src="/icons/sns_tw.png" />
          </q-avatar>
          <q-avatar size="sm">
            <img src="/icons/sns_fb.png" />
          </q-avatar>
        </div>
      </div>
      <q-toolbar-title class="row justify-end items-center text-grey-5">
        <btn-logo class="font_caveat unclickable" to="/" />
      </q-toolbar-title>
    </q-toolbar>
  </q-footer>
</template>
<script>
import { defineComponent } from 'vue'
import BtnLogo from '../Button/BtnLogo.vue'
import BtnIcon from '../Button/BtnIcon.vue'

export default defineComponent({
  components: { BtnLogo },
  props: {
    hasBtnMenu: { type: Boolean, default: false }
  },
  data() {
    return {}
  },
  methods: {
    clickMenu() {
      // this.$emit('clickMenu')
    }
  }
})
</script>
<style lang="scss">
.footer_global {
  position: relative;
  background-color: #000;
  height: 110px;
  // padding-bottom: 10px;
}
</style>
