<template>
  <q-page class="q-pa-sm">
    <!-- 유저카드 -->
    <div class="q-ma-xs q-pa-xs custom_test radius_border">
      <p>card-user 유저카드</p>
      <div class="row">
        <div style="width: 382px">
          <card-user />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import CardUser from 'src/components/Card/CardUser.vue'

export default defineComponent({
  components: {
    CardUser
  },
  data() {
    return {}
  },
  methods: {}
})
</script>
