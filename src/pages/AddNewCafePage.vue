<template>
  <q-page class="flex flex-center">
    {{ title }}
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'AddNewCafePage',
  components: {},
  data() {
    return {
      title: 'add new cafe page'
    }
  },
  mounted() {}
})
</script>
