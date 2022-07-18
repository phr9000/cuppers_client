<template>
  <q-layout view="hHh Lpr fFf">
    <header-global />

    <q-drawer
      v-model="drawer"
      show-if-above
      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"
      :width="200"
      :breakpoint="500"
      bordered
      class="bg-grey-3"
    >
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item class="text-primary" clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="note_alt" />
            </q-item-section>

            <q-item-section> 커핑노트 쓰기 </q-item-section>
          </q-item>

          <q-separator />

          <q-item
            @click="clickTab('cnote')"
            class="tabs"
            :class="{ active: tab === 'cnote' }"
            clickable
            v-ripple
          >
            <q-item-section avatar>
              <q-icon name="rate_review" />
            </q-item-section>

            <q-item-section> 커핑노트 </q-item-section>
          </q-item>

          <q-item
            @click="clickTab('review')"
            class="tabs"
            :class="{ active: tab === 'review' }"
            clickable
            v-ripple
          >
            <q-item-section avatar>
              <q-icon name="reviews" />
            </q-item-section>

            <q-item-section> 리뷰 </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container class="conainer_sns" style="padding-bottom: 0px">
      <router-view :key="$route.fullPath" />
    </q-page-container>

    <!-- <footer-global /> -->
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'
import { computed } from 'vue'
import { useStore } from 'vuex'

import HeaderGlobal from 'src/components/Global/HeaderGlobal.vue'
import FooterGlobal from 'src/components/Global/FooterGlobal.vue'

export default defineComponent({
  name: 'SNSLayout',
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
