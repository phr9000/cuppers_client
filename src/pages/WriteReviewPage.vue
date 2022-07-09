<template>
  <q-page class="flex flex-center">
    {{ title }}
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'WriteReviewPage',
  components: {},
  data() {
    return {
      title: 'Write Review Page'
    }
  },
  mounted() {}
})
</script>
