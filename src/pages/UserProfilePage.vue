<template>
  <q-page class="flex flex-center">
    {{ title }}
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'UserProfilePage',
  components: {},
  data() {
    return {
      title: 'user profile page'
    }
  },
  mounted() {}
})
</script>
