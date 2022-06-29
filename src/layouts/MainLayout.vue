<template>
  <q-layout view="hHh Lpr fFf">
    <header-global />

    <q-page-container>
      <router-view :key="$route.fullPath" />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import HeaderGlobal from 'src/components/Global/HeaderGlobal.vue'

export default defineComponent({
  name: 'MainLayout',
  components: {
    HeaderGlobal
  }
})
</script>
<style>
/* .fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
} */
</style>
