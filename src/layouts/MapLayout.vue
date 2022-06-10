<template>
  <q-layout view="hHh Lpr fFf">
    <header-global :hasBtnMenu="true" @clickMenu="toggleDrawer" />

    <q-page-container>
      <map-page ref="map" />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'

import HeaderGlobal from 'src/components/Header/HeaderGlobal.vue'
import MapPage from 'src/pages/MapPage.vue'
export default defineComponent({
  name: 'MapLayout',

  components: {
    HeaderGlobal,
    MapPage
    // MapSearch,
    // MapMyList
  },
  data() {
    return {}
  },
  methods: {
    toggleDrawer() {
      this.$refs.map.toggleDrawer()
    }
  }
})
</script>
