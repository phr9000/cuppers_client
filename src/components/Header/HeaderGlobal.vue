<template>
  <q-header elevated>
    <q-toolbar class="bg-white text-grey-10">
      <q-btn
        class="text-grey-6"
        flat
        round
        icon="menu"
        aria-label="Menu"
        @click="toggleLeftDrawer"
      />

      <btn-logo />

      <q-toolbar-title class="font_caveat"> Cuppers' </q-toolbar-title>
      <q-btn to="/map" class="q-mr-sm" flat color="primary" label="카페찾기" />
      <q-btn to="sns" class="q-mr-md" flat color="primary" label="커피SNS" />
      <div>
        <btn-req-new-cafe to="reqnewcafe" />
        <btn-my-avatar to="profile" />
      </div>
    </q-toolbar>
  </q-header>
</template>
<script>
import { defineComponent } from 'vue'
import BtnLogo from '../Button/BtnLogo.vue'
import BtnMyAvatar from '../Button/BtnMyAvatar.vue'
import BtnReqNewCafe from '../Button/BtnReqNewCafe.vue'
export default defineComponent({
  components: { BtnLogo, BtnReqNewCafe, BtnMyAvatar },
  data() {
    return {}
  },
  methods: {
    toggleLeftDrawer() {
      this.$emit('toggle')
    }
  }
})
</script>
