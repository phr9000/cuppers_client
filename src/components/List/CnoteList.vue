<template>
  <div class="cnote_list">
    <div v-if="cnotes.length">
      <div v-if="single">
        <div
          class="cards_wrap q-mb-sm"
          v-for="cnote in cnotes"
          :key="cnote.cnote_id"
        >
          <card-cnote-li :cnote="cnote" class="card" />
        </div>
      </div>
      <div v-else>
        <div class="whole">
          <div
            class="cards_wrap q-mb-sm"
            v-for="cnote in cnotes"
            :key="cnote.cnote_id"
          >
            <card-cnote-li :cnote="cnote" class="card" />
          </div>
        </div>
        <div class="lr">
          <div class="left">
            <div
              class="q-mb-sm"
              v-for="cnote in leftList"
              :key="cnote.cnote_id"
            >
              <card-cup-note :cnote="cnote" class="card" />
            </div>
          </div>
          <div class="right">
            <div
              class="q-mb-sm"
              v-for="cnote in rightList"
              :key="cnote.cnote_id"
            >
              <card-cup-note :cnote="cnote" class="card" />
            </div>
          </div>
        </div>
      </div>

      <btn-scroll-top />
    </div>
    <div v-else class="text-grey text-center q-py-md">
      <p class="q-pb-sm">불러온 커핑노트가 없습니다</p>
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
import CardCupNote from 'src/components/Card/CardCupNote.vue'
import BtnScrollTop from 'src/components/Scroll/BtnScrollTop.vue'
import BtnBasic from 'src/components/Button/BtnBasic.vue'

export default defineComponent({
  name: 'CnoteList',
  components: {
    CardCnoteLi,
    CardCupNote,
    BtnScrollTop,
    BtnBasic
  },
  props: {
    cnotes: {
      type: Array,
      default: () => {
        return null
      }
    },
    single: { type: Boolean, default: false }
  },
  data() {
    return {}
  },
  computed: {
    leftList() {
      return this.cnotes.filter((item, i) => {
        return i % 2 === 0
      })
    },
    rightList() {
      return this.cnotes.filter((item, i) => {
        return i % 2 === 1
      })
    }
  },
  created() {},
  mounted() {},
  methods: {}
})
</script>
<style lang="scss" scoped>
.cnote_list {
  width: 100%;
  .whole {
    display: none;
    width: 100%;
    @media (max-width: $breakpoint-sm-max) {
      display: block;
    }
  }
  .lr {
    @media (max-width: $breakpoint-sm-max) {
      display: none;
    }
    display: grid;
    grid-template-columns: 1fr 1fr;

    .left {
      padding-right: 5px;
    }
    .right {
      padding-left: 5px;
    }
  }
}
</style>
