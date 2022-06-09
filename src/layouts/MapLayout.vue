<template>
  <q-layout view="hHh Lpr fFf">
    <header-global @toggle="toggleLeftDrawer" />
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> 지도 검색 </q-item-label>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'

import HeaderGlobal from 'src/components/Header/HeaderGlobal.vue'

export default defineComponent({
  name: 'MapLayout',

  components: {
    HeaderGlobal
  },

  setup() {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
