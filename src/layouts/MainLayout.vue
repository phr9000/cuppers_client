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
import { computed } from 'vue'
import { useStore } from 'vuex'

import HeaderGlobal from 'src/components/Global/HeaderGlobal.vue'
import FooterGlobal from 'src/components/Global/FooterGlobal.vue'

export default defineComponent({
  name: 'MainLayout',
  components: {
    HeaderGlobal,
    FooterGlobal
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
  created() {
    // this.user = { uid: '1234' }
    // console.log(this.$store.state.auth.user)
    // console.log(this.$store.getters['auth/isLoggedIn'])
    if (this.user == null) {
      this.user = this.getAuthFromLocalStorage()
    }
  },
  methods: {
    getAuthFromLocalStorage() {
      return this.$q.localStorage.getItem('auth')
    }
  }
})
</script>
<style></style>
