<template>
  <q-page class="q-pa-sm">
    <!-- CardCafe 카페카드(block) -->
    <div class="q-ma-xs q-pa-xs custom_test radius_border">
      <p>card-cafe 카페카드(block)</p>
      <div class="row">
        <div class="q-mr-sm" style="width: 100%">
          <card-cafe />
        </div>
        <div class="q-mr-sm" style="width: 700px">
          <card-cafe />
        </div>
        <div style="width: 500px"><card-cafe /></div>
      </div>
    </div>
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
import CardCafe from 'src/components/Card/CardCafe.vue'

export default defineComponent({
  components: { CardCafeMap, CardCafe },
  data() {
    return {}
  },
  methods: {
    handleClose() {}
  }
})
</script>
