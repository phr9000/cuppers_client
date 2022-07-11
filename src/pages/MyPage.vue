<template>
  <q-page class="flex flex-center">
    {{ title }}
    <br />
    {{ user }}
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'MyProfilePage',
  setup() {
    const $store = useStore()

    const user = computed({
      get: () => $store.state.user.user,
      set: (val) => {
        $store.commit('user/setUser', val)
      }
    })

    return {
      user
    }
  },
  components: {},
  data() {
    return {
      title: 'my page'
    }
  },
  mounted() {}
})
</script>
