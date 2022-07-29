<template>
  <div>
    <div v-if="cnotes.length" class="cnote_list section_top">
      <div
        class="cards_wrap q-mb-sm"
        v-for="cnote in cnotes"
        :key="cnote.cnote_id"
      >
        <card-cnote-li :cnote="cnote" class="card" />
      </div>

      <btn-scroll-top />
    </div>
    <div v-else class="text-grey text-center q-py-md">
      <p class="q-pb-sm">작성한 커핑노트가 없습니다.</p>
      <div>
        <btn-basic
          to="/cnote/write"
          size="md"
          color="brown-5"
          label="커핑노트 쓰기"
          icon="rate_review"
          padding="4px 15px 4px 15px"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

import CardCnoteLi from 'src/components/Card/CardCnoteLi.vue'
import BtnScrollTop from 'src/components/Scroll/BtnScrollTop.vue'
import BtnBasic from 'src/components/Button/BtnBasic.vue'

export default defineComponent({
  name: 'CnoteList',
  components: {
    CardCnoteLi,
    BtnScrollTop,
    BtnBasic
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
