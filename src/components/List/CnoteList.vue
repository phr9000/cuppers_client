<template>
  <div v-if="cnotes" class="cnote_list section_top">
    <div
      class="cards_wrap q-mb-sm"
      v-for="cnote in cnotes"
      :key="cnote.cnote_id"
    >
      <card-cnote-li :cnote="cnote" class="card" />
    </div>

    <btn-scroll-top />
  </div>
</template>

<script>
import { defineComponent } from 'vue'

import CardCnoteLi from 'src/components/Card/CardCnoteLi.vue'
import BtnScrollTop from 'src/components/Scroll/BtnScrollTop.vue'

export default defineComponent({
  name: 'CnoteList',
  components: {
    CardCnoteLi,
    BtnScrollTop
  },
  props: {
    cnotes: {
      type: Array,
      default: () => {
        return null
      }
    }
  },
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {}
})
</script>
<style lang="scss" scoped>
.cnote_list {
  width: 100%;
}
</style>
