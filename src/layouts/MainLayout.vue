<template>
  <q-layout view="hHh Lpr fFf">
    <header-global />

    <q-page-container style="padding-bottom: 0px">
      <router-view :key="$route.fullPath" />
    </q-page-container>

    <footer-global />
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'
import HeaderGlobal from 'src/components/Global/HeaderGlobal.vue'
import FooterGlobal from 'src/components/Global/FooterGlobal.vue'

export default defineComponent({
  name: 'MainLayout',
  components: {
    HeaderGlobal,
    FooterGlobal
  }
})
</script>
<style></style>
