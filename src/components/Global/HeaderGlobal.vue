<template>
  <q-header bordered class="header_global">
    <q-toolbar class="bg-white text-grey-10">
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
        <q-btn
          to="/test"
          class="text-grey-3"
          flat
          round
          icon="cruelty_free"
          aria-label="Menu"
        />
        <current-location class="text-grey-3" />
      </q-toolbar-title>

      <q-btn to="/map" class="q-mr-sm" flat color="primary" label="카페찾기" />
      <q-btn to="/sns" class="q-mr-md" flat color="primary" label="커피SNS" />
      <div>
        <btn-req-new-cafe to="/newcafe" />
        <btn-my-avatar to="/profile" />
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
