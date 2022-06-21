<template>
  <q-page class="q-pa-sm">
    <!-- CardCafeMap 카페카드(지도화면) -->
    <div class="q-ma-xs q-pa-xs custom_test radius_border">
      <p>card-cafe-map 카페카드(지도화면)</p>
      <div class="row">
        <div class="q-mr-sm" style="width: 500px">
          <card-cafe-map @close="handleClose" />
        </div>
        <div class="q-mr-sm" style="width: 400px">
          <card-cafe-map @close="handleClose" />
        </div>
        <div style="width: 300px"><card-cafe-map @close="handleClose" /></div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import CardCafeMap from 'src/components/Card/CardCafeMap.vue'

export default defineComponent({
  components: { CardCafeMap },
  data() {
    return {}
  },
  methods: {
    handleClose() {}
  }
})
</script>
