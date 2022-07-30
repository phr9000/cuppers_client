<template>
  <q-header bordered class="header_global">
    <q-toolbar class="text-grey-10" style="height: 100%; min-height: 60px">
      <q-btn
        v-if="hasBtnMenu"
        class="text-grey-6"
        flat
        round
        icon="menu"
        aria-label="Menu"
        @click="clickMenu"
      />
      <q-toolbar-title class="row items-center"
        ><btn-logo class="font_caveat" to="/" />
        <!-- <q-btn
          to="/test"
          class="text-white"
          flat
          round
          icon="cruelty_free"
          aria-label="Menu"
        /> -->
        <current-location class="text-grey-3" />
      </q-toolbar-title>

      <q-btn to="/map" class="q-mr-sm" flat color="primary" label="카페찾기" />
      <q-btn to="/sns" class="q-mr-md" flat color="primary" label="커피SNS" />
      <div>
        <btn-req-new-cafe to="/cafe/create" />
        <btn-my-avatar />
      </div>
    </q-toolbar>
  </q-header>
</template>
<script>
import { defineComponent } from 'vue'
import BtnLogo from '../Button/BtnLogo.vue'
import BtnMyAvatar from '../Button/BtnMyAvatar.vue'
import BtnReqNewCafe from '../Button/BtnReqNewCafe.vue'
import CurrentLocation from './CurrentLocation.vue'
export default defineComponent({
  components: { BtnLogo, BtnReqNewCafe, BtnMyAvatar, CurrentLocation },
  props: {
    hasBtnMenu: { type: Boolean, default: false }
  },
  data() {
    return {}
  },
  methods: {
    clickMenu() {
      this.$emit('clickMenu')
    }
  }
})
</script>
<style>
.header_global {
  min-height: 60px;
  background-color: hsla(0, 0%, 100%, 0.9);
  border-bottom: 1px solid #ddd;
}
</style>
