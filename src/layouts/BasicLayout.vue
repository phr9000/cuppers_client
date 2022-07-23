<template>
  <q-layout view="hHh Lpr fFf">
    <header-global />

    <q-page-container class="conainer_basic" style="padding-bottom: 0px">
      <router-view :key="$route.fullPath" />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'
import { computed } from 'vue'
import { useStore } from 'vuex'

import HeaderGlobal from 'src/components/Global/HeaderGlobal.vue'

export default defineComponent({
  name: 'BasicLayout',
  components: {
    HeaderGlobal
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
    return {
      drawer: false,
      miniState: false,
      tab: 'cnote' // current tab
    }
  },
  computed: {},
  created() {
    // this.user = { uid: '1234' }
    // console.log(this.$store.state.auth.user)
    // console.log(this.$store.getters['auth/isLoggedIn'])
    if (this.user == null) {
      this.user = this.getAuthFromLocalStorage()
    }
  },
  methods: {
    clickTab(tab) {
      this.tab = tab
      this.$router.push(`/sns/${tab}`)
    },
    getAuthFromLocalStorage() {
      return this.$q.localStorage.getItem('auth')
    }
  }
})
</script>
<style lang="scss" scoped>
.tabs {
  color: $grey;
  &.active {
    color: $secondary;
  }
}
</style>
