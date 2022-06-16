<template>
  <q-layout view="hHh Lpr fFf">
    <header-global />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import HeaderGlobal from 'src/components/Global/HeaderGlobal.vue'

export default defineComponent({
  name: 'LoginLayout',
  components: {
    HeaderGlobal
  }
})
</script>
