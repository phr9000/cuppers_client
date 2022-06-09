<template>
  <q-page class="flex flex-center">
    {{ title }}
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'CoffeeSNSPage',
  components: {},
  data() {
    return {
      title: 'coffee sns page'
    }
  },
  mounted() {}
})
</script>
