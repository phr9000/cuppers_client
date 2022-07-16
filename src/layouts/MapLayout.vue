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
import { computed } from 'vue'
import { useStore } from 'vuex'

import HeaderGlobal from 'src/components/Global/HeaderGlobal.vue'
import MapPage from 'src/pages/MapPage.vue'
export default defineComponent({
  name: 'MapLayout',
  components: {
    HeaderGlobal,
    MapPage
    // MapSearch,
    // MapMyList
  },
  setup() {
    const $store = useStore()

    const user = computed({
      get: () => $store.state.auth.user,
      set: (val) => {
        $store.commit('auth/setUser', val)
      }
    })

    return {
      user
    }
  },
  data() {
    return {}
  },
  created() {
    if (this.user == null) {
      this.user = this.getAuthFromLocalStorage()
    }
  },
  methods: {
    toggleDrawer() {
      this.$refs.map.toggleDrawer()
    },
    getAuthFromLocalStorage() {
      return this.$q.localStorage.getItem('auth')
    }
  }
})
</script>
